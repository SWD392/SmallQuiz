package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.entiity.Question;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findById(Long id);

    @Query(value = "select * from question where content like %:content%", nativeQuery = true)
    List<Question> findQuestionByContent(@Param(value = "content") String content);
}
