package com.example.cardealership.controller;

import com.example.cardealership.model.CarListing;
import com.example.cardealership.service.CarListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarListingController {

    @Autowired
    private CarListingService carListingService;
    //GET request
    // ✅ Fetch all car listings
    @GetMapping
    public List<CarListing> getAllCars() {
        return carListingService.getAllCars();
    }
    // ✅ Fetch a specific car listing by ID
    @GetMapping("/{id}")
    public CarListing getCarById(@PathVariable Long id) {
        return carListingService.getCarById(id);
    }
    // ✅ Fetch all car listings by a specific user
    @GetMapping("/user/{createdBy}")
    public List<CarListing> getCarsByUserEmail(@PathVariable("createdBy") String createdBy) {
        return carListingService.getCarsByUserEmail(createdBy);
    }

    // ✅ Fetch all car listings by a specific make
    @GetMapping("/make/{make}")
    public List<CarListing> getCarsByMake(@PathVariable String make) {
        return carListingService.getCarsByMake(make);
    }

    // ✅ Fetch all car listings by condition
    @GetMapping("/condition/{condition}")
    public List<CarListing> getCarsByCondition(@PathVariable String condition) {
        return carListingService.getCarsByCondition(condition);
    }

    @GetMapping("/category/{category}")
    public List<CarListing> getCarsByCategory(@PathVariable String category) {
        return carListingService.getCarsByCategory(category);
    }

    // ✅ Search cars by condition, make, and price (<=)
    @GetMapping("/search")
    public List<CarListing> searchCars(
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String price) {
        return carListingService.searchCars(condition, make, price);
    }

    @PostMapping
    public CarListing createCarListing(@RequestBody CarListing carListing) {
        return carListingService.createCarListing(carListing);
    }

    @PutMapping("/{id}")
    public CarListing updateCarListing(@PathVariable Long id, @RequestBody CarListing carListing) {
        return carListingService.updateCarListing(id, carListing);
    }

    @DeleteMapping("/{id}")
    public void deleteCarListing(@PathVariable Long id) {
        carListingService.deleteCarListing(id);
    }
}
