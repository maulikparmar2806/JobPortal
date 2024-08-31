package com.placement.management.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.placement.management.Entity.AdminDetails;
import com.placement.management.Services.AdminDetailsService;

// import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class AdminDetailsController {

    @Autowired
    private AdminDetailsService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminDetails loginRequest) {
        Optional<AdminDetails> admin = service.validateLogin(
                loginRequest.getUsername(),
                loginRequest.getPassword());
        if (admin.isPresent()) {
            return ResponseEntity.ok().body(admin);
        } else {
            return ResponseEntity.status(401).body("Unauthorized"); //
        }
    }
}
