package com.examly.springapp.model;

import javax.persistence.*;
import java.util.*;
import java.security.Provider;

@Entity
public class ServiceCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceCenterId;
    private String serviceCenterName;
    private String serviceCenterPhone;
    private String serviceCenterPrice;
    private String serviceCenterTimings;
    private String serviceCenterAddress;
    private String serviceCenterImageUrl;
    private String serviceCenterEmailId;
    private String serviceCenterDescription;

    @OneToMany(mappedBy = "serviceCenter")
    private List<Product> products;

    public ServiceCenter(){
        // left empty to satisfy the requirements for Hibernate/JPA.
    }

    //Getter and Setter Methods
    public Long getServiceCenterId() {
        return serviceCenterId;
    }

    public void setServiceCenterId(Long serviceCenterId) {
        this.serviceCenterId = serviceCenterId;
    }

    public String getServiceCenterName() {
        return serviceCenterName;
    }

    public void setServiceCenterName(String serviceCenterName) {
        this.serviceCenterName = serviceCenterName;
    }

    public String getServiceCenterPhone() {
        return serviceCenterPhone;
    }

    public void setServiceCenterPhone(String serviceCenterPhone) {
        this.serviceCenterPhone = serviceCenterPhone;
    }

    public String getServiceCenterAddress() {
        return serviceCenterAddress;
    }

    public void setServiceCenterAddress(String serviceCenterAddress) {
        this.serviceCenterAddress = serviceCenterAddress;
    }

    public String getServiceCenterImageUrl() {
        return serviceCenterImageUrl;
    }

    public void setServiceCenterImageUrl(String serviceCenterImageUrl) {
        this.serviceCenterImageUrl = serviceCenterImageUrl;
    }

    public String getServiceCenterPrice() {
        return serviceCenterPrice;
    }

    public void setServiceCenterPrice(String serviceCenterPrice) {
        this.serviceCenterPrice = serviceCenterPrice;
    }

    public String getServiceCenterTimings() {
        return serviceCenterTimings;
    }

    public void setServiceCenterTimings(String serviceCenterTimings) {
        this.serviceCenterTimings = serviceCenterTimings;
    }
    public String getServiceCenterEmailId() {
        return serviceCenterEmailId;
    }

    public void setServiceCenterEmailId(String serviceCenterEmailId) {
        this.serviceCenterEmailId = serviceCenterEmailId;
    }

    public String getServiceCenterDescription() {
        return serviceCenterDescription;
    }

    public void setServiceCenterDescription(String serviceCenterDescription) {
        this.serviceCenterDescription = serviceCenterDescription;
    }
}
