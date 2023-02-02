package swd392.project.smallquiz.entity;
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
    public int groupId;
    @Column(name="user_id")
    public int userId;
    @Column(name="role_id")
    public int roleId;
}