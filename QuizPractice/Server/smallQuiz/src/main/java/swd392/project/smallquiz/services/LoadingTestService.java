package swd392.project.smallquiz.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.mapper.AnswerMapper;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.*;
import swd392.project.smallquiz.repository.*;
import swd392.project.smallquiz.request.UserAnswerRequest;
import swd392.project.smallquiz.response.QuestionResponse;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class LoadingTestService {
    @Autowired
    AnswerMapper answerMapper;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    TestRepository testRepository;

    @Autowired
    UserAnswerRepository userAnswerRepository;

    @Autowired
    UserAccountRepository userAccountRepository;
    public List<QuestionResponse> loadTest(){
        List<Question> questionList= questionRepository.findAllByDeleteFlag(false);
        Map<Integer,Question> map= new HashMap<>();
        for(int i=0;i<questionList.size();i++){
            map.put(i,questionList.get(i));
        }
        List<QuestionResponse> questionResponseList= new ArrayList<>();
           while (questionResponseList.size() < 10){
                Random rd = new Random();
                int number = rd.nextInt(questionList.size());
                if(map.get(number) != null) {
                    addListTest(map, questionResponseList, number);
                }
            }
        return questionResponseList;
    }

    private void addListTest(Map<Integer, Question> map, List<QuestionResponse> questionResponseList, int index) {
        List<Answer> answerList = answerRepository.findByQuestion(map.get(index));
        List<AnswerDto> answerDtoList= answerMapper.convertAnswer(answerList);
        QuestionResponse questionResponse= new QuestionResponse();
        questionResponse.setAnswers(answerDtoList);
        BeanUtils.copyProperties(map.get(index), questionResponse);
        questionResponseList.add(questionResponse);
        map.remove(index);
    }

    @Transactional(rollbackOn = {Exception.class, Throwable.class})
    public ResponseEntity<?> getUserTestAnswer(Long userId, List<UserAnswerRequest> userAnswerRequest) {
        try {

            UserAccount userAccount = userAccountRepository.findById(userId)
                    .orElseThrow(Exception::new);

            List<Long> questionIds = userAnswerRequest.stream()
                    .map(UserAnswerRequest::getQuestionId)
                    .collect(Collectors.toList());

            List<Long> answerIds = userAnswerRequest.stream()
                    .map(UserAnswerRequest::getUserAnswerId)
                    .collect(Collectors.toList());

            Map<Long, Question> questions = questionRepository.findByIdIn(questionIds)
                    .stream().collect(Collectors.toMap(Question::getId, Function.identity()));

            Map<Long, Answer> answers = answerRepository.findByIdIn(answerIds)
                    .stream().collect(Collectors.toMap(answer -> answer.getQuestion().getId(), Function.identity()));

            Map<Question, Answer> questionAnswerMapper = questions.entrySet().stream()
                    .filter(question -> answers.containsKey(question.getKey()))
                    .collect(Collectors.toMap(Map.Entry::getValue, question -> answers.get(question.getKey())));

            Test testRequest = new Test();
            testRequest.setCreate_date(Instant.now());
            testRequest.setUserAccount(userAccount);

            Test testResponse = testRepository.save(testRequest);

            List<UserAnswer> userAnswers = new ArrayList<>();

            questionAnswerMapper.forEach((question, answer) -> {
                UserAnswer userAnswer = new UserAnswer();
                userAnswer.setTest(testResponse);
                userAnswer.setQuestion(question);
                userAnswer.setAnswer(answer);
                userAnswers.add(userAnswer);
            });

            return ResponseEntity.ok().body(userAnswerRepository.saveAll(userAnswers));

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
