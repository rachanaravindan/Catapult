package com.examly.springapp.model;

import javax.persistence.*;

@Entity
public class Admin{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AdminId;
    private String adminEmail;
    private String adminPassword;
    private String adminMobileNumber;
    private String userRole;

    public Admin(){
        // left empty to satisfy the requirements for Hibernate/JPA.
    }
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public long getAdminId(){
        return AdminId;
    }

    public void setAdminId(Long adminId) {
        AdminId = adminId;
    }
    public String getAdminEmail(){
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getAdminMobileNumber() {
        return adminMobileNumber;
    }

    public void setAdminMobileNumber(String adminMobileNumber) {
        this.adminMobileNumber = adminMobileNumber;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
    public void setUser(User user) {
        this.user = user;
    }
}


