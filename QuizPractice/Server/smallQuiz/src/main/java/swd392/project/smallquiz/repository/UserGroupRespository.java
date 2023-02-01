package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.entity.UserGroup;

import java.util.List;

@Repository
public interface UserGroupRespository extends JpaRepository<UserGroup,Integer> {
    boolean existsByUserId(int userId);
    boolean existsByRoleId(int  roleId);
    List<UserGroup> findUserGroupsByUserId(int userId);
}