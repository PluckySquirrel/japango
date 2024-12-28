import React, { useState } from "react";
import {
  BsFillStarFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsTrash,
  BsVolumeUpFill,
} from "react-icons/bs";
import getAction from "../utils/getAction";
import getLanguage from "../utils/getLanguage";
import getDate from "../utils/getDate";
import getOutputLanguageTag from "../utils/getOutputLanguageTag";

const SavedItem = (props) => {
  const { action, input, output, sourceLanguage, targetLanguage, timestamp } =
    props;
  const [liked, setLiked] = useState(props.liked);

  const suaGauGau = (phrase, language = "ja") => {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  };

  const deleteItem = async (uuid) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const response = await fetch(
        `http://localhost:8080/api/v1/saved/${uuid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        props.fetchSaved();
      }
    }
  };

  return (
    <div className="relative w-full p-6 flex flex-col gap-2 items-start rounded-md shadow-md">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 text-red">
          <BsFillStarFill />
          <h3 className="text-lg">{getAction(action)}</h3>
          <p className="text-gray">
            {action === "TRANSLATION" &&
              `${getLanguage(sourceLanguage)} → ${getLanguage(targetLanguage)}`}
          </p>
        </div>
        <p className="text-gray">{getDate(timestamp)}</p>
      </div>
      <div className="flex items-start gap-2">
        <button onClick={() => suaGauGau(input)}>
          <BsVolumeUpFill size="1.5rem" />
        </button>
        <h2 className="text-xl font-bold text-left">{input}</h2>
      </div>
      <div className="flex items-start gap-2">
        <button
          onClick={() =>
            suaGauGau(output, getOutputLanguageTag(targetLanguage))
          }
        >
          <BsVolumeUpFill size="1.5rem" />
        </button>
        <h3 className="text-lg text-blue text-left">{output}</h3>
      </div>
      <button
        className="absolute bottom-6 right-6 text-red hover:text-darkRed"
        onClick={() => {
          deleteItem(props.uuid);
        }}
      >
        <BsTrash size="1.6rem" />
      </button>
    </div>
  );
};

export default SavedItem;