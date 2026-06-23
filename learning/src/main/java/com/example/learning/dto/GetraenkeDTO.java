package com.example.learning.dto;
import com.example.learning.model.Getraenke;
import lombok.Getter;

import java.util.UUID;

@Getter
public class GetraenkeDTO
{
    private UUID id;
    private String name;
    private float groeße;
    private float preis;

    public GetraenkeDTO(Getraenke getraenk){
        this.id = getraenk.getPublicId();
        this.name = getraenk.getName();
        this.groeße = getraenk.getGroeße();
        this.preis = getraenk.getPreis();

    }
}
