package swd392.project.smallquiz.model.entiity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_account")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    public Long userId;
    @Column(name = "user_name")
    public String userName;
    @Column
    public String password;

    @OneToOne
//    @JoinColumn(name = "user_id")
    private UserInfo userInfo;
}