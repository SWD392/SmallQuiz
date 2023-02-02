package swd392.project.smallquiz.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import swd392.project.smallquiz.entity.User;
import swd392.project.smallquiz.entity.UserGroup;
import swd392.project.smallquiz.repository.RoleRepository;
import swd392.project.smallquiz.repository.UserGroupRespository;
import swd392.project.smallquiz.repository.UserRepository;
import swd392.project.smallquiz.request.UserRequest;
import swd392.project.smallquiz.security.PasswordEncode;
import java.util.ArrayList;
import java.util.List;
    @Service
    public class JwtUserDetailsService implements UserDetailsService {
        @Autowired
        UserRepository userRepository;
        @Autowired
        UserGroupRespository userGroupRespository;
        @Autowired
        RoleRepository roleRepository;
        @Autowired
        PasswordEncode passwordEncode;
        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userRepository.findByUserName(username);
            if (user == null) {
                System.out.println("User not found! " + username);
                throw new UsernameNotFoundException("User " + username + " was not found in the database");
            }
            List<UserGroup> userGroup= userGroupRespository.findUserGroupsByUserId(user.getUserId());
            List<String> roles= new ArrayList<>();
            userGroup.forEach((element -> roles.add(roleRepository.findRoleByRoleId(element.getRoleId()).getRoleName())));
            List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
            if (roles != null) {
                roles.forEach((element)->grantList.add(new SimpleGrantedAuthority(element)));
            }
            return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
                    grantList);
        }
        public boolean saveNewAccount(UserRequest userRequest) {
            if(!userRepository.existsByUserName(userRequest.getUsername())) {
                User newUser = new User();
                newUser.setUserName(userRequest.getUsername());
                newUser.setPassword(passwordEncode.passwordEncoder().encode(userRequest.getPassword()));
                userRepository.save(newUser);
                int userId=userRepository.findByUserName(newUser.getUserName()).getUserId();
                int roleId=roleRepository.findRoleByRoleName(userRequest.getRole()).getRoleId();
                if(saveNewUserGroup(userId,roleId)){
                    return true;
                }
                return false;
            }
            return false;
        }
        public boolean saveNewUserGroup(int userID, int roleId) {
            if(userGroupRespository.existsByRoleId(roleId)) {
                if(!userGroupRespository.existsByUserId(userID)) {
                    UserGroup newUserGroup = new UserGroup();
                    newUserGroup.setUserId(userID);
                    newUserGroup.setRoleId(roleId);
                    userGroupRespository.save(newUserGroup);
                    return true;
                }
            }
            return false;
        }
}
