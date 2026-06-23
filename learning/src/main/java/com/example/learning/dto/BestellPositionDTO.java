package com.example.learning.dto;

import lombok.Data;

@Data
public class BestellPositionDTO {
    private String produktName;
    private int menge;
    private float preis;
}
