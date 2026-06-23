package com.example.learning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table( name = "snacks")
public class Snacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true, nullable = false, updatable = false)
    private UUID publicId;

    private String name;
    private int preis;
}
