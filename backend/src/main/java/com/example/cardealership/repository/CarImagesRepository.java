package com.example.cardealership.repository;

import com.example.cardealership.model.CarImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarImagesRepository extends JpaRepository<CarImages, Long> {
    List<CarImages> findByCarListingId(Long carListingId); // Fetch all images for a car listing
}
