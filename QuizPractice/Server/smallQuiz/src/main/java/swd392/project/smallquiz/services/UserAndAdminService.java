package swd392.project.smallquiz.services;

import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.mapper.UserMapper;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.model.entiity.UserAccount;
import swd392.project.smallquiz.repository.UserAccountRepository;
import swd392.project.smallquiz.request.UserInfoRequest;
import swd392.project.smallquiz.request.UserRequest;

@Service
public class UserAndAdminService {
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    UserMapper userMapper;

    public UserAccountDto getUserAndAdminInfo(UserInfoRequest userInfoRequest) {;
        UserAccount userAccount = userAccountRepository.findByUserName(userInfoRequest.getUsername());
        UserAccountDto userAccountDto= userMapper.convertUserAcc(userAccount);
        return userAccountDto;
    }
        public Long getUserAndAdminId(String username) {;
        UserAccount userAccount = userAccountRepository.findByUserName(username);
        UserAccountDto userAccountDto= userMapper.convertUserAcc(userAccount);
        return userAccountDto.getUserId();
    }
}
