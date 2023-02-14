package swd392.project.smallquiz.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.entiity.UserAccount;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount,Long> {
    boolean existsByUserName(String userName);
    UserAccount findByUserName(String userName);
}