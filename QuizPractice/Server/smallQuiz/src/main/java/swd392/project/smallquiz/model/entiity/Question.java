package swd392.project.smallquiz.model.entiity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "content")
    private String content;

//    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
//    private List<Answer> answerList = new ArrayList<>();
}
