package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import swd392.project.smallquiz.model.dto.RoleDto;
import swd392.project.smallquiz.model.dto.UserAccountDto;
import swd392.project.smallquiz.request.JwtRequest;
import swd392.project.smallquiz.request.UpdatePassword;
import swd392.project.smallquiz.request.UserRequest;
import swd392.project.smallquiz.response.JwtResponse;
import swd392.project.smallquiz.security.JwtTokenUtil;
import swd392.project.smallquiz.services.AuthenticateService;
import swd392.project.smallquiz.services.GettingRoleService;
import swd392.project.smallquiz.services.JwtUserDetailsService;
import swd392.project.smallquiz.services.UserAndAdminService;

@RestController
@CrossOrigin
public class JwtAuthenController {
    @Autowired
    UserAndAdminService userAndAdminService;
    @Autowired
    GettingRoleService gettingRoleService;
    @Autowired
    private AuthenticateService authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserRequest user) throws Exception {
        return ResponseEntity.ok(userDetailsService.saveNewAccount(user));
    }
    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    public boolean changPassword(@RequestBody UpdatePassword updatePassword) throws Exception {
        return userDetailsService.changPassword(updatePassword.getUserName(),updatePassword.getOldPassword(),updatePassword.getNewPassword());
    }
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        if (userDetailsService.checkUsernameAndPassword(authenticationRequest.getUsername(), authenticationRequest.getPassword())){
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            RoleDto role = gettingRoleService.getGettingRole(authenticationRequest.getUsername());
            Long userId = userAndAdminService.getUserAndAdminId(authenticationRequest.getUsername());
        return ResponseEntity.ok(new JwtResponse(token,role.getRoleName(),userId));
    }
        return ResponseEntity.ok(new JwtResponse(null,null,null));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}