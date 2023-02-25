package swd392.project.smallquiz.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.project.smallquiz.request.UserAnswerRequest;
import swd392.project.smallquiz.response.QuestionResponse;
import swd392.project.smallquiz.services.LoadingTestService;

import java.util.List;

@RestController
@CrossOrigin
public class UserTestController {
    @Autowired
    LoadingTestService loadingTestService;
//    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping({ "/loadTest" })
    public List<QuestionResponse> loadTest() {
        return loadingTestService.loadTest();
    }

    @PostMapping("/getResult")
    public ResponseEntity<?> getUserTestResult(@RequestParam Long userId,
                                               @RequestBody List<UserAnswerRequest> userAnswerRequest) {
        return loadingTestService.getUserTestAnswer(userId, userAnswerRequest);
    }
}