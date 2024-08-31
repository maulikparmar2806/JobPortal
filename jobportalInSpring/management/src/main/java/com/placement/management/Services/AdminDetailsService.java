package com.placement.management.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.management.Entity.AdminDetails;
import com.placement.management.repository.AdminDetailsRepository;

@Service
public class AdminDetailsService {

    @Autowired
    private AdminDetailsRepository repository;

    public Optional<AdminDetails> validateLogin(String username, String password) {
        return repository.findByUsernameAndPassword(username, password);
    }
}
