package com.example.cardealership.controller;

import com.example.cardealership.model.CarImages;
import com.example.cardealership.service.CarImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-images")
@Tag(name = "Car Image Feature", description = "Car Image Feature Management")
public class CarImageController {

    @Autowired
    private CarImageService carImageService;

    // Fetch all images for a car listing
    @Operation(summary = "Get all images for a car listing", description = "Retrieves all the images for a specific car listing.")
    @GetMapping("/{carListingId}")
    public List<CarImages> getImagesByCarListingId(@PathVariable Long carListingId) {
        return carImageService.getImagesByCarListingId(carListingId);
    }

    //  Upload multiple images for a specific car listing
    @Operation(summary = "Upload multiple images for a car listing", description = "Uploads multiple images for a specific car listing.")
    @PostMapping("/{carListingId}")
    public List<CarImages> addImagesToCarListing(@PathVariable Long carListingId, @RequestBody List<String> imageUrls) {
        return carImageService.addImagesToCarListing(carListingId, imageUrls);
    }

    //  Delete an image by ID
    @Operation(summary = "Delete an image by ID", description = "Deletes an image by its ID.")
    @DeleteMapping("/{imageId}")
    public void deleteImage(@PathVariable Long imageId) {
        carImageService.deleteImage(imageId);
    }
}
