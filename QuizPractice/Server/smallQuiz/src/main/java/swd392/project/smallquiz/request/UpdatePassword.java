package swd392.project.smallquiz.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdatePassword {
    private Long userId;
    private String oldPassword;
    private String newPassword;
}