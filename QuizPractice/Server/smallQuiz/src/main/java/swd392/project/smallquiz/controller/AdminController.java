package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.project.smallquiz.model.dto.AnswerDto;
import swd392.project.smallquiz.model.entiity.UserAnswer;
import swd392.project.smallquiz.request.QuestionRequest;
import swd392.project.smallquiz.response.QuestionResponse;
import swd392.project.smallquiz.services.AdminService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping({"/admin"})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/listQuestions")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<QuestionResponse> getQuestions() {
        return adminService.findAllQuestion();
    }

    @GetMapping("/search/{content}")
    public List<QuestionResponse> getByQuestionContent(@PathVariable String content) {
        return adminService.findQuestionByContent(content);
    }

    @GetMapping("/user-answers/{testId}")
    public List<UserAnswer> getUserAnswersByTestId(@PathVariable Long testId) {
        return adminService.FindUserAnswersByTestId(testId);
    }

    @PostMapping("/create_question")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionRequest questionRequest) {
        return adminService.createNewQuestion(questionRequest);
    }

    @PostMapping("/create_answer")
    public ResponseEntity<?> createAnswer(@RequestParam Long questionId, @RequestBody List<AnswerDto> answerDtos) {
        return adminService.createAnswerByQuestionId(questionId, answerDtos);
    }

    @PutMapping("/update_question")
    public ResponseEntity<?> updateQuestion(@RequestParam Long questionId, @RequestBody QuestionRequest questionRequest) {
        return adminService.updateQuestion(questionId, questionRequest);
    }

    @PutMapping("/delete_question")
    public ResponseEntity<?> deleteQuestion(@RequestParam Long questionId) {
        return adminService.deleteQuestion(questionId);
    }



}