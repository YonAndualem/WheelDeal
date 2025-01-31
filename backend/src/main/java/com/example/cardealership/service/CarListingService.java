package com.example.cardealership.service;

import com.example.cardealership.model.CarImages;
import com.example.cardealership.model.CarListing;
import com.example.cardealership.repository.CarListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class CarListingService {

    @Autowired
    private CarListingRepository carListingRepository;

    //GET requests
    // ✅ Fetch all car listings
    public List<CarListing> getAllCars() {
        return carListingRepository.findAll();
    }
    // ✅ Fetch a specific car listing by ID
    public CarListing getCarById(Long id) {
        return carListingRepository.findById(id).orElseThrow(() -> new RuntimeException("Car listing not found"));
    }
    // ✅ Fetch all car listings by a specific user
    public List<CarListing> getCarsByUserEmail(String email) {
        return carListingRepository.findByCreatedBy(email);
    }

    // ✅ Fetch all car listings by a specific make
    public List<CarListing> getCarsByMake(String make) {
        return carListingRepository.findByMake(make);
    }


    // ✅ Fetch all car listings by condition
    public List<CarListing> getCarsByCondition(String condition) {
        return carListingRepository.findByCondition(condition);
    }

    // ✅ Search for cars based on `condition`, `make`, and `price`
    public List<CarListing> searchCars(String condition, String make, String price) {
        Double parsedPrice = null;
        if (price != null) {
            try {
                parsedPrice = Double.parseDouble(price.replace(",", "").trim()); // ✅ Remove commas before conversion
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid price format: " + price);
            }
        }

        if (condition != null && make != null && parsedPrice != null) {
            return carListingRepository.findByConditionAndMakeAndSellingPriceLessThanEqual(condition, make, parsedPrice);
        } else if (condition != null && make != null) {
            return carListingRepository.findByConditionAndMake(condition, make);
        } else if (condition != null) {
            return carListingRepository.findByCondition(condition);
        } else if (make != null) {
            return carListingRepository.findByMake(make);
        } else if (parsedPrice != null) {
            return carListingRepository.findBySellingPriceLessThanEqual(parsedPrice);
        } else {
            return carListingRepository.findAll();
        }
    }

    // ✅ Fetch cars by category
    public List<CarListing> getCarsByCategory(String category) {
        return carListingRepository.findByCategory(category);
    }

    //POST requests
    // ✅ Create a new car listing
    public CarListing createCarListing(CarListing carListing) {
        // ✅ Format date as "dd/MM/yyyy" and store it as a String
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        carListing.setPostedOn(LocalDate.now().format(formatter));

        // ✅ Link each image to the car listing before saving
        if (carListing.getImages() != null) {
            for (CarImages image : carListing.getImages()) {
                image.setCarListing(carListing);
            }
        }

        return carListingRepository.save(carListing);
    }

    //PUT requests
    // ✅ Update a specific car listing
    public CarListing updateCarListing(Long id, CarListing carListing) {
        CarListing existingCarListing = getCarById(id);
        carListing.setId(id);
        carListing.setPostedOn(existingCarListing.getPostedOn());
        return carListingRepository.save(carListing);
    }

    //DELETE requests
    public void deleteCarListing(Long id) {
        CarListing carListing = getCarById(id);
        carListingRepository.delete(carListing);
    }


}
