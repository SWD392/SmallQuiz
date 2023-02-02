package swd392.project.smallquiz.entity;
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
    public int roleId;
    @Column(name = "role_name")
    public String roleName;
}