package vn.edu.hust.soict.japango.service;

import org.springframework.web.multipart.MultipartFile;
import vn.edu.hust.soict.japango.dto.user.*;

public interface UserService {
    AuthenticateResponseDTO authenticate(AuthenticateRequestDTO request);
    RegisterResponseDTO register(RegisterRequestDTO request);
    GetProfileResponseDTO getProfile(String uuid);
    UpdateProfileResponseDTO updateProfile(String uuid, UpdateProfileRequestDTO request);
    ChangePasswordResponseDTO changePassword(String uuid, ChangePasswordRequestDTO request);
    ForgotPasswordResponseDTO forgotPassword(ForgotPasswordRequestDTO request);
    VerifyTokenResponseDTO verifyToken(VerifyTokenRequestDTO request);
    ResetPasswordResponseDTO resetPassword(ResetPasswordRequestDTO request);
    UploadAvatarResponseDTO uploadAvatar(String uuid, MultipartFile file);
}
