package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.entiity.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
