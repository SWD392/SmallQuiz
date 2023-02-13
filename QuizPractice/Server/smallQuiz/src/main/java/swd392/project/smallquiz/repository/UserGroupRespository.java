package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.entiity.Role;
import swd392.project.smallquiz.model.entiity.UserAccount;
import swd392.project.smallquiz.model.entiity.UserGroup;

import java.util.List;

@Repository
public interface UserGroupRespository extends JpaRepository<UserGroup,Long> {
    boolean existsByUserAccount(UserAccount userAccount);
    boolean existsByRole(Role role);
    List<UserGroup> findUserGroupsByUserAccount(UserAccount userAccount);
}