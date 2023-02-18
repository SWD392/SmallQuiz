package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/create_question")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionRequest questionRequest){
        return adminService.createNewQuestion(questionRequest);
    }

    @PutMapping("/update_question")
    public ResponseEntity<?> updateQuestion(@RequestParam Long questionId, @RequestBody QuestionRequest questionRequest){
        return adminService.updateQuestion(questionId, questionRequest);
    }
}