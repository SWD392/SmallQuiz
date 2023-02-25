package swd392.project.smallquiz.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserAnswerRequest {
    private Long questionId;
    private Long userAnswerId;
}
