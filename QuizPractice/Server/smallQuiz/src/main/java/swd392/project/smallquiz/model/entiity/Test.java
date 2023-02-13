package swd392.project.smallquiz.model.entiity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "test")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "create_date")
    private Instant create_date;

    @Column(name = "score")
    private Long score;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;
}
