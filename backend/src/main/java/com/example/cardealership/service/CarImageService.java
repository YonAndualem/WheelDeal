package com.example.cardealership.service;

import com.example.cardealership.model.CarImages;
import com.example.cardealership.model.CarListing;
import com.example.cardealership.repository.CarImagesRepository;
import com.example.cardealership.repository.CarListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarImageService {

    @Autowired
    private CarImagesRepository carImagesRepository;

    @Autowired
    private CarListingRepository carListingRepository;

    //  Fetch all images for a specific car listing
    public List<CarImages> getImagesByCarListingId(Long carListingId) {
        return carImagesRepository.findByCarListingId(carListingId);
    }

    //  Upload multiple images for a specific car listing
    public List<CarImages> addImagesToCarListing(Long carListingId, List<String> imageUrls) {
        CarListing carListing = carListingRepository.findById(carListingId)
                .orElseThrow(() -> new RuntimeException("Car listing not found"));

        List<CarImages> images = imageUrls.stream().map(url -> {
            CarImages carImage = new CarImages();
            carImage.setImageUrl(url);
            carImage.setCarListing(carListing);
            return carImage;
        }).collect(Collectors.toList());

        return carImagesRepository.saveAll(images);
    }

    //  Delete an image by ID
    public void deleteImage(Long imageId) {
        carImagesRepository.deleteById(imageId);
    }
}
