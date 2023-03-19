package swd392.project.smallquiz.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Data
@Setter
@Getter
public class TestDto {
    private Long id;
    private Instant createdDate;

}
