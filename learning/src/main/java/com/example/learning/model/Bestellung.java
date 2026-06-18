package com.example.learning.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bestellung")
public class Bestellung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private String Wunsch_G;
    private String Wunsch_S;
    private int G_menge;
    private int S_menge;

    @ManyToOne
    @JoinColumn(name = "getraenke_id")
    private Getraenke getraenk;

    @ManyToOne
    @JoinColumn(name = "snacks_id")
    private Snacks snack;
}
