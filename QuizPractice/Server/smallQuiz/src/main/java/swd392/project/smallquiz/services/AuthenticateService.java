package swd392.project.smallquiz.services;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
@Service
public class AuthenticateService implements AuthenticationManager {
    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        String username = auth.getName();
        String password = auth.getCredentials().toString();
        return new UsernamePasswordAuthenticationToken(username, password,auth.getAuthorities());
    }
}
