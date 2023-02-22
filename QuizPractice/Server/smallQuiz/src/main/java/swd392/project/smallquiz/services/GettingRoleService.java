package swd392.project.smallquiz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.mapper.RoleMapper;
import swd392.project.smallquiz.model.dto.RoleDto;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.model.entiity.Role;
import swd392.project.smallquiz.model.entiity.UserAccount;
import swd392.project.smallquiz.model.entiity.UserGroup;
import swd392.project.smallquiz.repository.RoleRepository;
import swd392.project.smallquiz.repository.UserAccountRepository;
import swd392.project.smallquiz.repository.UserGroupRespository;
import swd392.project.smallquiz.request.UserInfoRequest;

@Service
public class GettingRoleService {
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserGroupRespository userGroupRespository;
    @Autowired
    RoleMapper roleMapper;
    public RoleDto getGettingRole(UserInfoRequest userInfoRequest) {
        UserAccount userAccount = userAccountRepository.findByUserName(userInfoRequest.getUsername());
        UserGroup userGroup= userGroupRespository.findUserGroupByUserAccount(userAccount);
        Role role= roleRepository.findRoleByRoleId(userGroup.getRole().roleId);
        RoleDto roleDto= roleMapper.convertRole(role);
        return roleDto;
    }
}
