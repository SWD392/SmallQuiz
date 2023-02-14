package swd392.project.smallquiz.model.entiity;
import lombok.*;
import javax.persistence.*;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "group_user")
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    public Long groupId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccount userAccount;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}