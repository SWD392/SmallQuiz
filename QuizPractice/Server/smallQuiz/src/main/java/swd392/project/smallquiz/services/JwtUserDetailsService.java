package swd392.project.smallquiz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.model.entiity.Role;
import swd392.project.smallquiz.model.entiity.UserAccount;
import swd392.project.smallquiz.model.entiity.UserGroup;
import swd392.project.smallquiz.model.entiity.UserInfo;
import swd392.project.smallquiz.repository.RoleRepository;
import swd392.project.smallquiz.repository.UserAccountRepository;
import swd392.project.smallquiz.repository.UserGroupRespository;
import swd392.project.smallquiz.repository.UserInfoRepository;
import swd392.project.smallquiz.request.UserRequest;
import swd392.project.smallquiz.security.PasswordEncode;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    UserGroupRespository userGroupRespository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserInfoRepository userInfoRepository;
    @Autowired
    PasswordEncode passwordEncode;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountRepository.findByUserName(username);
        if (userAccount == null) {
            System.out.println("User not found! " + username);
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        List<UserGroup> userGroup = userGroupRespository.findUserGroupsByUserAccount(userAccount);
        List<String> roles = new ArrayList<>();
        userGroup.forEach((element -> roles.add(roleRepository.findRoleByRoleId(element.getRole().getRoleId()).getRoleName())));
        List<GrantedAuthority> grantList = new ArrayList<>();
        roles.forEach((element) -> grantList.add(new SimpleGrantedAuthority(element)));
        return new org.springframework.security.core.userdetails.User(userAccount.getUserName(), userAccount.getPassword(),
                grantList);
    }

    public boolean saveNewAccount(UserRequest userRequest) {
        if(userRequest != null) {
            if (!userAccountRepository.existsByUserName(userRequest.getUsername())) {
                UserAccount newUserAccount = new UserAccount();
                newUserAccount.setUserName(userRequest.getUsername());
                newUserAccount.setPassword(passwordEncode.passwordEncoder().encode(userRequest.getPassword()));
                userAccountRepository.save(newUserAccount);
                UserInfo userInfo = new UserInfo();
                userInfo.setFirstName(userRequest.getFirstName());
                userInfo.setLastName(userRequest.getLastName());
                userInfoRepository.save(userInfo);
                UserAccount userAccount = userAccountRepository.findByUserName(newUserAccount.getUserName());
                Role role = roleRepository.findRoleByRoleName(userRequest.getRole());
                return saveNewUserGroup(userAccount, role);
            }
            return false;
        }
        return  false;
    }

    public boolean saveNewUserGroup(UserAccount userAccount, Role role) {
        if (!userGroupRespository.existsByUserAccount(userAccount)) {
            UserGroup newUserGroup = new UserGroup();
            newUserGroup.setUserAccount(userAccount);
            newUserGroup.setRole(role);
            userGroupRespository.save(newUserGroup);
            return true;
        }
        return false;
    }
}
