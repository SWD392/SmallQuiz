package swd392.project.smallquiz.services;

import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.mapper.UserMapper;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.model.entiity.UserAccount;
import swd392.project.smallquiz.repository.UserAccountRepository;
import swd392.project.smallquiz.request.UserRequest;

@Service
public class UserAndAdminService {
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    UserMapper userMapper;

    public UserAccountDto getUserAndAdminInfo(UserRequest userRequest) {
        UserAccount userAccount = userAccountRepository.findByUserName(userRequest.getUsername());
        UserAccountDto userAccountDto= userMapper.employeeToEmployeeDTO(userAccount);
        return userAccountDto;
    }
}
