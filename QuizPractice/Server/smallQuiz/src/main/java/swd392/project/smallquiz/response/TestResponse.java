package swd392.project.smallquiz.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Question;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestResponse {
    Question question;
    List<AnswerDto> answerList;
}
