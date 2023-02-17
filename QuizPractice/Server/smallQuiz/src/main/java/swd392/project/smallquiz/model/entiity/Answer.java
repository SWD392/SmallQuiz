package swd392.project.smallquiz.model.entiity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name = "answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer_content")
    private String content;

    private Boolean status;

    @Column(name = "delete_flag")
    private Boolean deleteFlag;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}
