package swd392.project.smallquiz.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.repository.AnswerRepository;
import swd392.project.smallquiz.repository.QuestionRepository;
import swd392.project.smallquiz.response.QuestionResponse;

import java.util.ArrayList;
import java.util.List;

@Component
public class AdminService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public List<QuestionResponse> findAllQuestion() {
        List<QuestionResponse> questionResponses = new ArrayList<>();

        List<Question> questions = questionRepository.findAll();

        for (Question question : questions) {
            List<AnswerDto> answerDtos = answerRepository.findByQuestion(question);
            QuestionResponse questionResponse = new QuestionResponse();

            BeanUtils.copyProperties(question, questionResponse);
            questionResponse.setAnswers(answerDtos);
            questionResponses.add(questionResponse);
        }
        return questionResponses;
    }
}
