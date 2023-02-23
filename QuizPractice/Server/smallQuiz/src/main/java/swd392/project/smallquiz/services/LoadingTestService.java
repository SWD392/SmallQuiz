package swd392.project.smallquiz.services;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.model.dto.TestDto;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.repository.AnswerRepository;
import swd392.project.smallquiz.repository.QuestionRepository;

import java.util.*;

@Service
public class LoadingTestService {
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    AnswerRepository answerRepository;
    public List<TestDto> loadTest(){
        List<Question> questionList= questionRepository.findAllByDeleteFlag(false);
        Map<Integer,Question> map= new HashMap<>();
        for(int i=0;i<questionList.size();i++){
            map.put(i,questionList.get(i));
        }
        List<TestDto> testDtos= new ArrayList<>();
        if(questionList.size()>10) {
            for (int i = 0; i < 10; i++) {
                Random rd = new Random();
                int number = rd.nextInt(questionList.size());
                List<Answer> answerList = answerRepository.findByQuestion(map.get(number));
                testDtos.add(new TestDto(map.get(number), answerList));
            }
        }
        else{
            for (int i = 0; i < questionList.size(); i++) {
                List<Answer> answerList = answerRepository.findByQuestion(map.get(i));
                testDtos.add(new TestDto(map.get(i), answerList));
            }
        }
        return testDtos;
    }
}
