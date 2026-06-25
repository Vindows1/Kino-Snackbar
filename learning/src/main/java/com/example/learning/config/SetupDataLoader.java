package com.example.learning.config;

import com.example.learning.repository.UserRepository;
import com.example.learning.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SetupDataLoader {

    @Bean
    CommandLineRunner initDatabase(UserService userService, UserRepository userRepository) {
        return args -> {
            // Wir erstellen den AppUser nur, wenn die Tabelle noch leer ist
            if (userRepository.findByUsername("admin").isEmpty()) {
                userService.createUser("admin", "geheim123", "ADMIN");
                System.out.println("--> Test-AppUser 'admin' mit Passwort 'geheim123' wurde erstellt!");
            }
        };
    }
}