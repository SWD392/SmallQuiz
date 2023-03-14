package swd392.project.smallquiz.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.model.entiity.UserAnswer;
import swd392.project.smallquiz.repository.AnswerRepository;
import swd392.project.smallquiz.repository.QuestionRepository;
import swd392.project.smallquiz.repository.TestRepository;
import swd392.project.smallquiz.repository.UserAnswerRepository;
import swd392.project.smallquiz.request.QuestionRequest;
import swd392.project.smallquiz.response.QuestionResponse;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    private TestRepository testRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    public List<QuestionResponse> findAllQuestion() {
        List<QuestionResponse> questionResponses = new ArrayList<>();

        List<Question> questions = questionRepository.findAll().stream()
                .filter(question -> !question.getDeleteFlag())
                .collect(Collectors.toList());

        for (Question question : questions) {
            List<AnswerDto> answerDtos = new ArrayList<>();
            answerRepository.findByQuestion(question)
                    .forEach(answer -> {
                        AnswerDto answerDto = new AnswerDto();
                        BeanUtils.copyProperties(answer, answerDto);
                        answerDtos.add(answerDto);
                    });
            QuestionResponse questionResponse = new QuestionResponse();

            BeanUtils.copyProperties(question, questionResponse);
            questionResponse.setAnswers(answerDtos);
            questionResponses.add(questionResponse);
        }
        return questionResponses;
    }

    public List<QuestionResponse> findQuestionByContent(String content) {
        List<QuestionResponse> questionResponses = new ArrayList<>();

        List<Question> questions = questionRepository.findQuestionByContent(content);
        questions.forEach(question -> {
            List<AnswerDto> answerDtos = new ArrayList<>();
            answerRepository.findByQuestion(question)
                    .forEach(answer -> {
                        AnswerDto answerDto = new AnswerDto();
                        BeanUtils.copyProperties(answer, answerDto);
                        answerDtos.add(answerDto);
                    });
            QuestionResponse questionResponse = new QuestionResponse();

            BeanUtils.copyProperties(question, questionResponse);
            questionResponse.setAnswers(answerDtos);
            questionResponses.add(questionResponse);
        });
        return questionResponses;
    }

    public List<UserAnswer> FindUserAnswersByTestId(Long testId) {
        return userAnswerRepository.findByTestId(testId);
    }

    @Transactional(rollbackOn = {Exception.class, Throwable.class})
    public ResponseEntity<?> createNewQuestion(QuestionRequest questionRequest) {
        try {
            QuestionResponse questionResponse = new QuestionResponse();
            Question question = new Question();
            question.setContent(questionRequest.getQuestionContent());
            question.setCreatedDate(Instant.now());
            question.setDeleteFlag(Boolean.FALSE);
            Question response = questionRepository.save(question);

            List<AnswerDto> answerList = insertAnswer(questionRequest, question);

            BeanUtils.copyProperties(response, questionResponse);
            questionResponse.setAnswers(answerList);
            return ResponseEntity.ok().body(questionResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Cannot Create New Question: " + questionRequest);
        }
    }

    @Transactional(rollbackOn = {Exception.class, Throwable.class})
    public ResponseEntity<?> createAnswerByQuestionId(Long questionId, List<AnswerDto> answerDtos) {
        try {
            Question question = questionRepository.findById(questionId).orElseThrow(Exception::new);
            List<Answer> answers = new ArrayList<>();
            answerDtos.forEach(answerDto -> {
                Answer answer = new Answer();
                BeanUtils.copyProperties(answerDto, answer);
                answer.setQuestion(question);
                answer.setDeleteFlag(false);
                answers.add(answer);
            });

            List<Answer> response = answerRepository.saveAll(answers);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional(rollbackOn = {Exception.class, Throwable.class})
    public ResponseEntity<?> deleteQuestion(Long questionId) {
        try {
            Optional<Question> optionalQuestion = questionRepository.findById(questionId);
            if (optionalQuestion.isPresent()) {
                Question question = optionalQuestion.get();
                answerRepository.findByQuestion(question)
                        .forEach(answer -> answer.setDeleteFlag(Boolean.TRUE));
                question.setDeleteFlag(Boolean.TRUE);

                return ResponseEntity.ok().body("delete success.");
            } else {
                return ResponseEntity.ok("Do not found the question");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Fail to delete: ");
        }
    }


    @Transactional(rollbackOn = {Exception.class, Throwable.class})
    public ResponseEntity<?> updateQuestion(Long questionId, QuestionRequest questionRequest) {
        try {

            Optional<Question> optionalQuestion = questionRepository.findById(questionId);
            if (optionalQuestion.isPresent()) {
                Question question = optionalQuestion.get();
                answerRepository.deleteAll(answerRepository.findByQuestion(question));
                question.setContent(questionRequest.getQuestionContent());
                List<AnswerDto> answerList = insertAnswer(questionRequest, question);
                return ResponseEntity.ok().body("update success.");
            } else {
                return ResponseEntity.ok("Do not found the question");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Fail to update: " + questionRequest);
        }


    }

    private List<AnswerDto> insertAnswer(QuestionRequest questionRequest, Question question) {
        List<Answer> answerList = new ArrayList<>();
        questionRequest.getAnswers().forEach(answerDto -> {
            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setContent(answerDto.getContent());
            answer.setStatus(answerDto.getStatus());
            answerList.add(answer);
        });
        answerRepository.saveAll(answerList);
        return questionRequest.getAnswers();
    }
}
