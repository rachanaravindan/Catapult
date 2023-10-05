package com.examly.springapp.service;

import com.examly.springapp.model.Admin;
import com.examly.springapp.model.User;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public interface AuthService {
    public User saveUser(User user);
    public User saveAdmin(User adminData);
    Optional<User> getUserByEmailAndPassword(String email, String password);
    Optional<User> getAdminByEmailAndPassword(String email, String password);
    Optional<User> getUserByEmail(String email);
    public List<User> getAllUsers();
}
