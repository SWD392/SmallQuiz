package swd392.project.smallquiz.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.project.smallquiz.model.entiity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    boolean existsByUserName(String userName);
    User findByUserName(String userName);
}