package swd392.project.smallquiz.model.entiity;
import lombok.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    public Long roleId;
    @Column(name = "role_name")
    public String roleName;
}