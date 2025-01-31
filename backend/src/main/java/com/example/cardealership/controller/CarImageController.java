package com.example.cardealership.controller;

import com.example.cardealership.model.CarImages;
import com.example.cardealership.service.CarImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-images")
public class CarImageController {

    @Autowired
    private CarImageService carImageService;

    // ✅ Fetch all images for a car listing
    @GetMapping("/{carListingId}")
    public List<CarImages> getImagesByCarListingId(@PathVariable Long carListingId) {
        return carImageService.getImagesByCarListingId(carListingId);
    }

    // ✅ Upload multiple images for a specific car listing
    @PostMapping("/{carListingId}")
    public List<CarImages> addImagesToCarListing(@PathVariable Long carListingId, @RequestBody List<String> imageUrls) {
        return carImageService.addImagesToCarListing(carListingId, imageUrls);
    }

    // ✅ Delete an image by ID
    @DeleteMapping("/{imageId}")
    public void deleteImage(@PathVariable Long imageId) {
        carImageService.deleteImage(imageId);
    }
}
