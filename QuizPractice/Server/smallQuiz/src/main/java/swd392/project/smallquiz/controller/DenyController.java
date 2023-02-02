package swd392.project.smallquiz.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class DenyController {
    @RequestMapping({ "/deny" })
    public String firstPage() {
        return "deny access";
    }
}