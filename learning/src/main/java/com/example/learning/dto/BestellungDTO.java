package com.example.learning.dto;
import com.example.learning.model.Bestellung;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class BestellungDTO {

    //private Long Id;
    //private String Wunsch_G;
    //private String Wunsch_S;
    //private int G_menge;
    //private int S_menge;
    //private double gesamtpreis;
    @JsonProperty("Id")
    private Long Id;

    @JsonProperty("Wunsch_G")
    private String Wunsch_G;

    @JsonProperty("Wunsch_S")
    private String Wunsch_S;

    @JsonProperty("G_menge")
    private int G_menge;

    @JsonProperty("S_menge")
    private int S_menge;

    @JsonProperty("gesamtpreis")
    private float gesamtpreis;

    public BestellungDTO(Bestellung bestellung) {
        this.Id = bestellung.getId();
        this.Wunsch_G = bestellung.getWunsch_G();
        this.Wunsch_S = bestellung.getWunsch_S();
        this.G_menge = bestellung.getG_menge();
        this.S_menge = bestellung.getS_menge();
        float einzelpreis_g = bestellung.getGetraenk().getPreis() * bestellung.getG_menge();
        float einzelpreis_s = bestellung.getSnack().getPreis() * bestellung.getS_menge();
        this.gesamtpreis = einzelpreis_s + einzelpreis_g;
    }
}