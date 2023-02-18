package swd392.project.smallquiz.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import swd392.project.smallquiz.model.dto.AnswerDto;

import java.util.List;

@Getter
@Setter
@ToString
public class QuestionRequest {
    private String questionContent;

    private List<AnswerDto> answers;
}
