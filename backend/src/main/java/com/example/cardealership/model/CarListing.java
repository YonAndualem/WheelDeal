package com.example.cardealership.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
// CarListing entity
@Data
@Entity
public class CarListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String listingTitle;

    @Column
    private String tagLine;

    @Column(nullable = false)
    private String originalPrice;

    @Column(nullable = false)
    private String sellingPrice;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String condition;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String year;

    @Column(nullable = false)
    private String driveType;

    @Column(nullable = false)
    private String transmission;

    @Column(nullable = false)
    private String fuelType;

    @Column(nullable = false)
    private String mileage;

    @Column
    private String engineSize;

    @Column
    private String cylinder;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String door;

    @Column
    private String vin;

    @Column
    private String offerType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String listingDescription;

    @Column(nullable = false)
    private String createdBy;

    @Column(nullable = false)
    private String userName;

    @Column(columnDefinition = "TEXT")
    private String userImageUrl;

    @Column(nullable = false)
    private String postedOn;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Boolean> features;

    @OneToMany(mappedBy = "carListing", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CarImages> images;
}
