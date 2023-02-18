package swd392.project.smallquiz.model.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AnswerDto {

    private Long id;

    private String content;

    private Boolean status;
}
