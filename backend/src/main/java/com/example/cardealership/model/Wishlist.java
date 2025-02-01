package com.example.cardealership.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail; // The email of the user adding to wishlist

    @ManyToOne
    @JoinColumn(name = "car_listing_id", nullable = false)
    private CarListing carListing; // The car listing that the user is interested in
}
