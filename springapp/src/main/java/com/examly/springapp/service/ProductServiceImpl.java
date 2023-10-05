package com.examly.springapp.service;

import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllAppointments() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getAppointmentsByDateRange(String startDate, String endDate){
        return productRepository.findByAvailableSlotsBetween(startDate, endDate);
    }

    @Override
    public List<Product> getAppointmentsByUserId(Long userId) {
        return productRepository.findByUserUserId(userId);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteAppointmentById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional < Product > findById(Long id) {
        return productRepository.findById(id);
    }
    // @Override
    // public List<Product> getAppointmentsByUserId(Long userId) {
    //     return productRepository.findByUserId(userId);
    // }
}
