package vn.edu.hust.soict.japango.dto.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordRequestDTO {
    @NotEmpty(message = "旧パスワードを入力してください")
    private String oldPassword;
    @NotEmpty(message = "新しいパスワードを入力してください")
    @Size(min = 8, message = "新しいパスワードは8文字以上である必要があります")
    private String newPassword;
}
