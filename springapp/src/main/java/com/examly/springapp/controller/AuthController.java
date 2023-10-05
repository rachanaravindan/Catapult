package com.examly.springapp.controller;

import org.springframework.http.HttpStatus;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ServiceCenterRepository;
import com.examly.springapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ServiceCenterRepository serviceCenterRepository;

    //Signup.js
    @PostMapping("/user/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            // Check if the email already exists in the user table
            if (authService.getUserByEmail(user.getEmail()).isPresent()) {
                response.put("message", "Email already exists. Please use a different email.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            } else {
                authService.saveUser(user);
                response.put("message", "New User has been added");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("error", "An error occurred while processing the request");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Signup.js
    @PostMapping("/admin/signup")
    public ResponseEntity<Map<String, String>> adminSignup(@RequestBody User adminUser) {
        Map<String, String> response = new HashMap<>();
        try {
            // Check if the email already exists in the user table
            if (authService.getUserByEmail(adminUser.getEmail()).isPresent()) {
                // Return error message as JSON
                response.put("message", "Email already exists. Please use a different email.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            } else {
                authService.saveUser(adminUser);
                response.put("message", "New Admin User has been added");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("error", "An error occurred while processing the request");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Login.js
    @PostMapping("/user/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestBody User loginUser) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<User> user = authService.getUserByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());
            if (user.isPresent()) {
                response.put("userId", user.get().getUserId().toString());
                return ResponseEntity.ok(response);
            } else {
                response.put("userId", "Not Found");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {

            response.put("error", "An error occurred while processing the request");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Login.js
    @PostMapping("/admin/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody User adminLoginUser) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<User> adminUser = authService.getAdminByEmailAndPassword(adminLoginUser.getEmail(),
                    adminLoginUser.getPassword());
            if (adminUser.isPresent()) {
                response.put("userId", adminUser.get().getUserId().toString());
                return ResponseEntity.ok(response);
            } else {
                response.put("userId", "Not Found");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("error", "An error occurred while processing the request");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/getAll")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }
}
