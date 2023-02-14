package swd392.project.smallquiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swd392.project.smallquiz.model.entiity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
}
