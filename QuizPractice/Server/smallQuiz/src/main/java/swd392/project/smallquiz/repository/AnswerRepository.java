package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;

import java.util.List;

@Repository
    public interface AnswerRepository extends JpaRepository<Answer, Long> {

        List<AnswerDto> findByQuestion(Question question);

}
