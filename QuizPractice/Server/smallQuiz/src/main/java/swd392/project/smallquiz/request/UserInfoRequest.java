package swd392.project.smallquiz.request;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
@Data
@AllArgsConstructor
public class UserInfoRequest {
    @NotNull
    private String username;
}
