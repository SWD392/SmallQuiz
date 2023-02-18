package swd392.project.smallquiz.model.entiity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@ToString
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "content")
    private String content;

    @Column(name = "delete_flag")
    private Boolean deleteFlag = Boolean.FALSE;
}
