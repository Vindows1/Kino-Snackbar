package com.example.learning.dto;

import lombok.Data;
import java.util.List;

@Data
public class NeueBestellungRequest {
    private List<PositionRequest> positionen;

    @Data
    public static class PositionRequest {
        private String produktId;
        private String typ;
        private int menge;
    }
}