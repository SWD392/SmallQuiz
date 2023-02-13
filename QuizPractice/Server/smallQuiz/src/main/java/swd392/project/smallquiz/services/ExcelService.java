package swd392.project.smallquiz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import swd392.project.smallquiz.helper.ExcelHelper;
import swd392.project.smallquiz.repository.AnswerRepository;
import swd392.project.smallquiz.repository.QuestionRepository;
import swd392.project.smallquiz.response.ExcelConvertResponse;

import java.io.IOException;

@Service
public class ExcelService {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public void save(MultipartFile file) {
        try {
            ExcelConvertResponse response = ExcelHelper.excelToQuizs(file.getInputStream());
            answerRepository.saveAll(response.getAnswers());

            questionRepository.saveAll(response.getQuestions());
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
