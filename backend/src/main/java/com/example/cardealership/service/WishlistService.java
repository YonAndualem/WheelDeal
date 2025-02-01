package com.example.cardealership.service;

import com.example.cardealership.model.Wishlist;
import com.example.cardealership.model.CarListing;
import com.example.cardealership.repository.WishlistRepository;
import com.example.cardealership.repository.CarListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private CarListingRepository carListingRepository;
    // Add a car listing to a user's wishlist
    public Wishlist addToWishlist(String userEmail, Long carListingId) {
        CarListing carListing = carListingRepository.findById(carListingId)
                .orElseThrow(() -> new RuntimeException("Car listing not found"));

        Wishlist wishlistItem = new Wishlist();
        wishlistItem.setUserEmail(userEmail);
        wishlistItem.setCarListing(carListing);

        return wishlistRepository.save(wishlistItem);
    }
    // Fetch all wishlist items for a user
    public List<Wishlist> getUserWishlist(String userEmail) {
        return wishlistRepository.findByUserEmail(userEmail);
    }
    // Fetch a wishlist item by user and car listing
    public void deleteFromWishlist(String userEmail, Long carListingId) {
        Wishlist wishlist = wishlistRepository.findByUserEmailAndCarListingId(userEmail, carListingId)
                .orElseThrow(() -> new RuntimeException("Wishlist entry not found"));
        wishlistRepository.delete(wishlist);
    }
}
