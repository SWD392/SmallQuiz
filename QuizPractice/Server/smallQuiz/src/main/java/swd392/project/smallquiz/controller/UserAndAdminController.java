package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.request.QuestionRequest;
import swd392.project.smallquiz.request.UserInfoRequest;
import swd392.project.smallquiz.request.UserRequest;
import swd392.project.smallquiz.services.UserAndAdminService;

@RestController

public class UserAndAdminController {
    @Autowired
    UserAndAdminService userAndAdminService;
    @PostMapping({"/info"})
    public UserAccountDto getInfo(@RequestBody UserInfoRequest userInfoRequest){
        return userAndAdminService.getUserAndAdminInfo(userInfoRequest);
    }
}
