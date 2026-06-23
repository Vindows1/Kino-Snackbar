package com.example.learning.dto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
public class BestellungDTO {

    private String id;
    private List<BestellPositionDTO> positionen;
    private double gesamtpreis;
}