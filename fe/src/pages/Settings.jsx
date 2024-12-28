import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Dialog from '../components/Dialog';

const Settings = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const decoded = jwtDecode(cookies.token);

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/users/${decoded.uuid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    });
    const data = await response.json();
    setInputs(data);
  }

  useEffect(() => {
    if (cookies.token) {
      fetchUser();
    }
    else {
      navigate('/login');
    }
  }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setChanged(true);
    setInputs(values => ({...values, [name]: value}))
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`http://localhost:8080/api/v1/users/${decoded.uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });
    setChanged(false);
    setLoading(false);
    if (response.ok) {
      setShowDialog(true);
    }
    const data = response.json();

    if (!response.ok) {  
      setError(data.message);
      return;
    }
  }

  return (
    <div className='h-full py-4 flex items-center justify-center'>
      <form className='w-1/2 flex flex-col items-center justify-center gap-8' onSubmit={submit}>
        <h3 className='text-3xl leading-7'>Settings</h3>
        <div className='w-2/3 flex items-center gap-2'>
          <div className='w-36 text-start text-lg'>
            Username
          </div>
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="Username"
            className="w-96 p-3 text-lg bg-transparent border border-lightGray rounded-md shadow-md"
            defaultValue={inputs.username || ''}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className='w-2/3 flex items-center gap-2'>
          <div className='w-36 text-start text-lg'>
            Name
          </div>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Name"
            className="w-96 p-3 text-lg bg-transparent border border-lightGray rounded-md shadow-md"
            defaultValue={inputs.name || ''}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className='w-2/3 flex items-center gap-2'>
          <div className='w-36 text-start text-lg'>
            E-mail
          </div>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="E-mail"
            className="w-96 p-3 text-lg bg-transparent border border-lightGray rounded-md shadow-md"
            defaultValue={inputs.email || ''}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button 
          className='px-6 h-12 flex items-center bg-blue text-white text-lg shadow-md rounded-md hover:bg-darkBlue disabled:bg-disabled'
          type='submit'
          disabled={loading || !changed}
        >
          Save changes
        </button>
        {showDialog && 
        <Dialog
          message='Changes saved'
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />}
      </form>
    </div>
  )
}

export default Settings