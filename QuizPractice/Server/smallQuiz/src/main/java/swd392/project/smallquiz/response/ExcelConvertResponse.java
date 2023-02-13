package swd392.project.smallquiz.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExcelConvertResponse {
    private List<Answer> answers;

    private List<Question> questions;
}
