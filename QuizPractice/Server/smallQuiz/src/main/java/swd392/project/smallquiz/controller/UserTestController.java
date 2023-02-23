package swd392.project.smallquiz.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import swd392.project.smallquiz.model.dto.TestDto;
import swd392.project.smallquiz.services.LoadingTestService;

import java.util.List;

@RestController
@CrossOrigin
public class UserTestController {
    @Autowired
    LoadingTestService loadingTestService;
//    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping({ "/loadTest" })
    public List<TestDto> loadTest() {
        return loadingTestService.loadTest();
    }
}