package com.examly.springapp.service;

import com.examly.springapp.model.ServiceCenter;
import org.springframework.stereotype.Service;
import java.util.*;

import java.security.Provider;
@Service
public interface ServiceCenterService {
    public ServiceCenter saveServiceCenter(ServiceCenter serviceCenter);
    public List<ServiceCenter> getAllServiceCenters();
    public Optional <ServiceCenter> findById(Long id);
    public ServiceCenter getServiceCenterById(Long id);
    public boolean deleteServiceCenterById(Long id);
}
