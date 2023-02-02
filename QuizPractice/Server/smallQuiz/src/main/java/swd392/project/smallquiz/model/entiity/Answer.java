package swd392.project.smallquiz.model.entiity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer_content")
    private String content;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
