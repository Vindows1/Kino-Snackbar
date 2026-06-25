package com.example.learning.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "bestellung")
public class Bestellung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreationTimestamp
    @Column(updatable = false )
    private OffsetDateTime erstellt_am;

    @Column(unique = true, nullable = false)
    private String publicId = java.util.UUID.randomUUID().toString();
    @OneToMany(mappedBy = "bestellung", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BestellPosition> positionen = new ArrayList<>();
}

