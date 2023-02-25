package swd392.project.smallquiz.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.mapper.AnswerMapper;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.repository.AnswerRepository;
import swd392.project.smallquiz.repository.QuestionRepository;
import swd392.project.smallquiz.response.QuestionResponse;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@Service
public class LoadingTestService {
    @Autowired
    AnswerMapper answerMapper;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    AnswerRepository answerRepository;
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
}
