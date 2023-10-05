package com.examly.springapp.service;

import org.springframework.stereotype.Service;

@Service
public interface LoginService {
    void duplicateUserData(Long userId);
}
