package swd392.project.smallquiz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.mapper.AnswerMapper;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.repository.AnswerRepository;
import swd392.project.smallquiz.repository.QuestionRepository;
import swd392.project.smallquiz.response.TestResponse;

import java.util.*;

@Service
public class LoadingTestService {
    @Autowired
    AnswerMapper answerMapper;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    AnswerRepository answerRepository;
    public List<TestResponse> loadTest(){
        List<Question> questionList= questionRepository.findAllByDeleteFlag(false);
        Map<Integer,Question> map= new HashMap<>();
        for(int i=0;i<questionList.size();i++){
            map.put(i,questionList.get(i));
        }
        List<TestResponse> testResponses= new ArrayList<>();
        if(questionList.size()>10) {
            for (int i = 0; i < 10; i++) {
                Random rd = new Random();
                int number = rd.nextInt(questionList.size());
                addListTest(map, testResponses, number);
            }
        }
        else{
            for (int i = 0; i < questionList.size(); i++) {
                addListTest(map, testResponses, i);
            }
        }
        return testResponses;
    }

    private void addListTest(Map<Integer, Question> map, List<TestResponse> testResponses, int index) {
        List<Answer> answerList = answerRepository.findByQuestion(map.get(index));
        List<AnswerDto> answerDtoList= answerMapper.convertAnswer(answerList);
        testResponses.add(new TestResponse(map.get(index), answerDtoList));
    }
}
