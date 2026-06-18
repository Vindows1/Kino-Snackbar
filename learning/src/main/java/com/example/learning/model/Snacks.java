package com.example.learning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table( name = "snacks")
public class Snacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private String name;
    private int preis;
}
