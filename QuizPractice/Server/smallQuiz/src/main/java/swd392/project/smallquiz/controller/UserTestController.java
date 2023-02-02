package swd392.project.smallquiz.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class UserTestController {
    @RequestMapping({ "user" })
    @PreAuthorize("hasRole('ROLE_USER')")
    public String firstPage() {
        return "Hello User";
    }
}