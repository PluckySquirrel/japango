package vn.edu.hust.soict.japango.dto.conversion;

import lombok.*;
import vn.edu.hust.soict.japango.common.enums.Language;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TranslationInputDTO {
    private String input;
    private Language targetLanguage;
}
