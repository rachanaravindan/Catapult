package com.examly.springapp.model;

import com.examly.springapp.model.User;
import javax.persistence.*;

@Entity
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long LoginId;
    private String email;
    private String password;

    public Login(){
        // left empty to satisfy the requirements for Hibernate/JPA.
    }

    public Long getLoginId() {
        return LoginId;
    }

    public void setLoginId(Long loginId) {
        LoginId = loginId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}

