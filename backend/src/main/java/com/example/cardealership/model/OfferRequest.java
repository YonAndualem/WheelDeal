package com.example.cardealership.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfferRequest {
    private String buyerEmail;
    private String sellerEmail;
    private String carTitle;
    private double offerPrice;
}
