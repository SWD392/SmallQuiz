package swd392.project.smallquiz.request;
import lombok.Data;

import javax.validation.constraints.NotNull;
@Data
public class UserInfoRequest {
    @NotNull
    private String username;
}
