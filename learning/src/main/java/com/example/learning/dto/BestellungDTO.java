package com.example.learning.dto;
import com.example.learning.model.Bestellung;
import lombok.Getter;

@Getter
public class BestellungDTO {

    //private Long Id;
    //private String wunsch_G;
    //private String wunsch_S;
    //private int g_menge;
    //private int s_menge;
    //private double gesamtpreis;
    private Long Id;

    private String wunsch_G;

    private String wunsch_S;

    private int g_menge;

    private int s_menge;

    private float gesamtpreis;

    public BestellungDTO(Bestellung bestellung) {
        this.Id = bestellung.getId();
        this.wunsch_G = bestellung.getWunsch_G();
        this.wunsch_S = bestellung.getWunsch_S();
        this.g_menge = bestellung.getG_menge();
        this.s_menge = bestellung.getS_menge();
        float einzelpreis_g = bestellung.getGetraenk().getPreis() * bestellung.getG_menge();
        float einzelpreis_s = bestellung.getSnack().getPreis() * bestellung.getS_menge();
        this.gesamtpreis = einzelpreis_s + einzelpreis_g;
    }
}