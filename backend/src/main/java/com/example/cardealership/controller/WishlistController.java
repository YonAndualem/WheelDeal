package com.example.cardealership.controller;

import com.example.cardealership.model.Wishlist;
import com.example.cardealership.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    //  Add a car listing to the wishlist
    @PostMapping("/{carListingId}")
    public Wishlist addToWishlist(
            @RequestParam(name = "userEmail", required = false) String userEmail,
            @PathVariable Long carListingId) {
        if (userEmail == null || userEmail.isEmpty()) {
            throw new RuntimeException("User email is required to add a car to the wishlist");
        }
        return wishlistService.addToWishlist(userEmail, carListingId);
    }



    //  Get all wishlist items for a user
    @GetMapping
    public List<Wishlist> getUserWishlist(@RequestParam String userEmail) {
        return wishlistService.getUserWishlist(userEmail);
    }

    // Remove a car listing from the wishlist
    @DeleteMapping("/{carListingId}")
    public ResponseEntity<?> deleteFromWishlist(
            @RequestParam(name = "userEmail") String userEmail,
            @PathVariable Long carListingId) {
        try {
            wishlistService.deleteFromWishlist(userEmail, carListingId);
            return ResponseEntity.ok("Wishlist entry deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete wishlist entry");
        }
    }

}
