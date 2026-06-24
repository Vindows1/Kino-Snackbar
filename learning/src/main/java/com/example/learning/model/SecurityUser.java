package com.example.learning.model;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Getter
public class SecurityUser implements UserDetails {

    private final AppUser AppUser;

    public SecurityUser(AppUser AppUser) {
        this.AppUser = AppUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = AppUser.getRole();
        String prefixedRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;
        return List.of(new SimpleGrantedAuthority(prefixedRole));
    }

    @Override
    public String getPassword() {
        return AppUser.getPasswort();
    }

    @Override
    public String getUsername() {
        return AppUser.getUsername();
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}