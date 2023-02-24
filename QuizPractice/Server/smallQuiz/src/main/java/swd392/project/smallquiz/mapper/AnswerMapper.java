package swd392.project.smallquiz.mapper;

import org.mapstruct.Mapper;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Answer;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    List<AnswerDto> convertAnswer(List<Answer> answer);
}
