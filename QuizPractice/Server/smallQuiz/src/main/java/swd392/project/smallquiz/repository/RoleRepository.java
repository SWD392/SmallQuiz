package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {
    boolean existsByRoleName(String role);
    Role findRoleByRoleName(String role);
    Role findRoleByRoleId(int roleId);
}