package com.examly.springapp.controller;

import com.examly.springapp.model.Product;
import com.examly.springapp.model.ServiceCenter;
import com.examly.springapp.repository.ProductRepository;
import com.examly.springapp.repository.ServiceCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.persistence.EntityNotFoundException;


@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController{
    @Autowired
    private ServiceCenterRepository serviceCenterRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/dashboard/{cardId}")
    public ServiceCenter showDashboard(@PathVariable Long cardId, Model model) {
        ServiceCenter serviceCenter = serviceCenterRepository.findById(cardId)
                .orElseThrow(() -> new EntityNotFoundException("Service center not found"));
        model.addAttribute("serviceCenter", serviceCenter);
        // Create an empty product object to bind form
        Product product = new Product();
        model.addAttribute("product", product);
        return serviceCenter;
    }

    @GetMapping("/appointment/{cardId}")
    public Product showProductForm(@PathVariable Long cardId, Model model) {
        ServiceCenter serviceCenter = serviceCenterRepository.findById(cardId)
                .orElseThrow(() -> new EntityNotFoundException("Service center not found"));

        model.addAttribute("serviceCenter", serviceCenter);

        Product product = new Product();
        model.addAttribute("product", product);

        return product;
    }
}