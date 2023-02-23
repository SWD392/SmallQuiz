package swd392.project.smallquiz.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestDto {
    Question question;
    List<Answer> answerList;
}
