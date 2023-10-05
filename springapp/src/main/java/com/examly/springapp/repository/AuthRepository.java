package com.examly.springapp.repository;

import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

public interface AuthRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByUserRole(String userRole);

    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByEmailAndPasswordAndUserRole(String email, String password, String userRole);
}