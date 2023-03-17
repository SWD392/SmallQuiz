package swd392.project.smallquiz.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.model.entiity.UserAccount;

import java.util.List;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount,Long> {
    boolean existsByUserName(String userName);
    UserAccount findByUserName(String userName);
    @Transactional
    @Modifying
    @Query(value = "UPDATE user_account SET password = :password where user_name = :username", nativeQuery = true)
    int updatePassword(@Param(value = "password") String password,@Param(value = "username") String username);
}