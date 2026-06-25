package com.example.learning.service;

import com.example.learning.model.AppUser;
import com.example.learning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(String username, String rawPassword, String role) {
        AppUser user = new AppUser();
        user.setUsername(username);

        user.setPasswort(passwordEncoder.encode(rawPassword));
        user.setRole(role);

        repository.save(user);
    }
}