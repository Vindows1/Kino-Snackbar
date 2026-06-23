package com.example.learning.dto;
import com.example.learning.model.Snacks;
import lombok.Getter;

import java.util.UUID;

@Getter
public class SnacksDTO
{
    private UUID id;
    private String name;
    private float groeße;
    private float preis;

    public SnacksDTO(Snacks snack){
        this.id = snack.getPublicId();
        this.name = snack.getName();
        this.preis = snack.getPreis();

    }
}
