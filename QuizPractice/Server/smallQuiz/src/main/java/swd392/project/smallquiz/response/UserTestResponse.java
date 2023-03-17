package swd392.project.smallquiz.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Question;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserTestResponse {
    private Long testId;

    private Question question;

    private AnswerDto userAnswer;

    private List<AnswerDto> answers;
}