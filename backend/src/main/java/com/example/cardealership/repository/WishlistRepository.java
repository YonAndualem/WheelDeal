package com.example.cardealership.repository;

import com.example.cardealership.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserEmail(String userEmail); // Fetch all wishlist items for a user
    Optional<Wishlist> findByUserEmailAndCarListingId(String userEmail, Long carListingId); // Fetch a wishlist item by user and car listing

}
