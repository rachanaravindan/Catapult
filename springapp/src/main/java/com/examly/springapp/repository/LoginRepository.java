package com.examly.springapp.repository;

import com.examly.springapp.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    // You can add custom query methods here if needed
}