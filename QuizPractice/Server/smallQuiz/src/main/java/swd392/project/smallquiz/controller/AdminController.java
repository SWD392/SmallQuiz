package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


}