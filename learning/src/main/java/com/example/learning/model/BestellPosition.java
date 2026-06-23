package com.example.learning.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bestellposition")
public class BestellPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int menge;

    @ManyToOne
    @JoinColumn(name = "bestellung_id", nullable = false)
    private Bestellung bestellung;

    @ManyToOne
    @JoinColumn(name = "getraenke_id")
    private Getraenke getraenk;

    @ManyToOne
    @JoinColumn(name = "snacks_id")
    private Snacks snack;
}