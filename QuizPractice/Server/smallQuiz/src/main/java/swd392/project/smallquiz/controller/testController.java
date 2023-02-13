package swd392.project.smallquiz.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class testController {
    @RequestMapping({ "/test" })
    public String firstPage() {
        return "Hello .....";
    }
}
