package swd392.project.smallquiz.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class AdminTestController {
    @RequestMapping({ "/admin" })
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String firstPage() {
        return "Hello Admin";
    }
}