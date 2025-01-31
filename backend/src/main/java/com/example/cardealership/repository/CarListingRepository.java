package com.example.cardealership.repository;

import com.example.cardealership.model.CarListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarListingRepository extends JpaRepository<CarListing, Long> {
    List<CarListing> findByCreatedBy(String createdBy);
    List<CarListing> findByMake(String make);
    List<CarListing> findByCondition(String condition);
    List<CarListing> findByConditionAndMake(String condition, String make);
    List<CarListing> findByCategory(String category);

    // ✅ Custom Query: Compare `sellingPrice` (as String) with `CAST` conversion
    @Query("SELECT c FROM CarListing c WHERE CAST(REPLACE(c.sellingPrice, ',', '') AS double) <= :price")
    List<CarListing> findBySellingPriceLessThanEqual(@Param("price") double price);

    // ✅ Custom Query: Condition + Make + Price (<=)
    @Query("SELECT c FROM CarListing c WHERE c.condition = :condition AND c.make = :make AND CAST(REPLACE(c.sellingPrice, ',', '') AS double) <= :price")
    List<CarListing> findByConditionAndMakeAndSellingPriceLessThanEqual(
            @Param("condition") String condition,
            @Param("make") String make,
            @Param("price") double price
    );
}
