package com.example.learning.dto;
import com.example.learning.model.Getraenke;
import lombok.Getter;

@Getter
public class GetraenkeDTO
{
    private long id;
    private String name;
    private float groeße;
    private float preis;

    public class GetraenkeDTO(Getraenke getraenk){
        this.id = getraenk.getId();
        this.name = getraenk.getName();
        this.groeße = getraenk.getgroeße();
        this.preis = getraenk.preis();

    }
}
