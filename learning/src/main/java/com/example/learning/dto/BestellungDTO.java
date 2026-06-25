package com.example.learning.dto;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class BestellungDTO {

    private String id;
    private List<BestellPositionDTO> positionen;
    private double gesamtpreis;
    private OffsetDateTime erstellt_am;
}