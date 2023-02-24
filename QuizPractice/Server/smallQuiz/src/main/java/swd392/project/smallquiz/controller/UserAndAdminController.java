package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swd392.project.smallquiz.model.dto.RoleDto;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.request.UserInfoRequest;
import swd392.project.smallquiz.services.GettingRoleService;
import swd392.project.smallquiz.services.UserAndAdminService;

@RestController
@CrossOrigin
public class UserAndAdminController {
    @Autowired
    UserAndAdminService userAndAdminService;
    @PostMapping({"/info"})

    public UserAccountDto getInfo(@RequestBody UserInfoRequest userInfoRequest){
        return userAndAdminService.getUserAndAdminInfo(userInfoRequest);
    }
}
