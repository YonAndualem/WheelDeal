package com.example.cardealership.controller;

import com.example.cardealership.model.CarListing;
import com.example.cardealership.service.CarListingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@Tag(name = "Car Listing Feature", description = "Car Listing Feature Management")
public class CarListingController {

    @Autowired
    private CarListingService carListingService;
    //GET request
    //  Fetch all car listings
    @Operation(summary = "Get all car listings", description = "Retrieves a list of all the car listings on the system.")
    @GetMapping
    public List<CarListing> getAllCars() {
        return carListingService.getAllCars();
    }

    //  Fetch a specific car listing by ID
    @Operation(summary = "Get a car listing by ID", description = "Retrieves a specific car listing by its ID.")
    @GetMapping("/{id}")
    public CarListing getCarById(@PathVariable Long id) {
        return carListingService.getCarById(id);
    }

    //  Fetch all car listings by a specific user
    @Operation(summary = "Get all car listings by user email", description = "Retrieves all the car listings that a user has created.")
    @GetMapping("/user/{createdBy}")
    public List<CarListing> getCarsByUserEmail(@PathVariable("createdBy") String createdBy) {
        return carListingService.getCarsByUserEmail(createdBy);
    }

    //  Fetch all car listings by a specific make
    @Operation(summary = "Get all car listings by make", description = "Retrieves all the car listings that match a specific make.")
    @GetMapping("/make/{make}")
    public List<CarListing> getCarsByMake(@PathVariable String make) {
        return carListingService.getCarsByMake(make);
    }

    //  Fetch all car listings by condition
    @Operation(summary = "Get all car listings by condition", description = "Retrieves all the car listings that match a specific condition.")
    @GetMapping("/condition/{condition}")
    public List<CarListing> getCarsByCondition(@PathVariable String condition) {
        return carListingService.getCarsByCondition(condition);
    }

    //  Fetch all car listings by category
    @Operation(summary = "Get all car listings by category", description = "Retrieves all the car listings that match a specific category.")
    @GetMapping("/category/{category}")
    public List<CarListing> getCarsByCategory(@PathVariable String category) {
        return carListingService.getCarsByCategory(category);
    }

    //  Search cars by condition, make, and price (<=)
    @Operation(summary = "Search car listings by condition, make, and price", description = "Retrieves all the car listings that match the search criteria.")
    @GetMapping("/search")
    public List<CarListing> searchCars(
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String price) {
        return carListingService.searchCars(condition, make, price);
    }

    //POST request
    @Operation(summary = "Create a new car listing", description = "Creates a new car listing in the system.")
    @PostMapping
    public CarListing createCarListing(@RequestBody CarListing carListing) {
        return carListingService.createCarListing(carListing);
    }

    //PUT request
    @Operation(summary = "Update a car listing", description = "Updates a car listing in the system.")
    @PutMapping("/{id}")
    public CarListing updateCarListing(@PathVariable Long id, @RequestBody CarListing carListing) {
        return carListingService.updateCarListing(id, carListing);
    }

    //DELETE request
    @Operation(summary = "Delete a car listing", description = "Deletes a car listing from the system.")
    @DeleteMapping("/{id}")
    public void deleteCarListing(@PathVariable Long id) {
        carListingService.deleteCarListing(id);
    }
}
