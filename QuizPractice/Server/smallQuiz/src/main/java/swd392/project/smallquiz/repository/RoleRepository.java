package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.entiity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    boolean existsByRoleName(String role);
    Role findRoleByRoleName(String role);
    Role findRoleByRoleId(Long roleId);
}
