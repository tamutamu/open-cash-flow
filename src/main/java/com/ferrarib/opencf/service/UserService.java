package com.ferrarib.opencf.service;

import com.ferrarib.opencf.model.User;
import com.ferrarib.opencf.repository.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by bruno on 3/14/16.
 */
@Service
public class UserService {

    private static final String DEFAULT_PASSWD = "opencf2016";

    @Autowired
    private Users users;

    private User userLogged = null;

    public void updateUserBCryptHash(String username) {
        User user = users.findOne(username);
        user.setPassword(DEFAULT_PASSWD);
        users.save(user);
    }

    public User getUserLoggedEntity() {
        userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User entityUser = users.findOne(userLogged.getEmail());
        entityUser.addBlankPasswd();

        return entityUser;
    }

    public void flushAuthenticationToken(User user) {
        Authentication auth = new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private boolean isPasswordMatch(User user) {
        //TODO - implementation of passwd matching algorithm
        return false;
    }

    public boolean existsNewPasswd(User user) {
        return isPasswordMatch(user) && !user.getNewPassword().isEmpty() ? true : false;
    }
}
