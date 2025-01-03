package vn.edu.hust.soict.japango.dto.conversion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutputDTO {
    private String output;
    private String uuid;
}
