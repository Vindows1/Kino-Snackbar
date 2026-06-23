package com.example.learning.controller;

import com.example.learning.dto.BestellPositionDTO;
import com.example.learning.dto.BestellungDTO;
import com.example.learning.dto.NeueBestellungRequest;
import com.example.learning.model.BestellPosition;
import com.example.learning.model.Bestellung;
import com.example.learning.model.Getraenke;
import com.example.learning.model.Snacks;
import com.example.learning.repository.BestellungRepository;
import com.example.learning.repository.GetraenkeRepository;
import com.example.learning.repository.SnacksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class BestellungController {
    @Autowired
    private BestellungRepository bestellungRepository;
    @Autowired
    private SnacksRepository snacksRepository;
    @Autowired
    private GetraenkeRepository getraenkeRepository;

    @GetMapping("/bestellungen/{publicId}")
    public ResponseEntity<BestellungDTO> getBestellung(@PathVariable String publicId) {
        java.util.UUID uuid = java.util.UUID.fromString(publicId);
        Bestellung bestellung = bestellungRepository.findByPublicId(UUID.fromString(publicId));
        if (bestellung == null) {
            return ResponseEntity.notFound().build();
        }

        BestellungDTO dto = new BestellungDTO();
        dto.setId(bestellung.getPublicId());

        List<BestellPositionDTO> positionenDTOs = bestellung.getPositionen().stream().map(pos -> {
            BestellPositionDTO posDto = new BestellPositionDTO();
            posDto.setMenge(pos.getMenge());

            if (pos.getGetraenk() != null) {
                posDto.setProduktName(pos.getGetraenk().getName());
                posDto.setPreis(pos.getGetraenk().getPreis());
            } else if (pos.getSnack() != null) {
                posDto.setProduktName(pos.getSnack().getName());
                posDto.setPreis(pos.getSnack().getPreis());
            }
            return posDto;
        }).toList();

        dto.setPositionen(positionenDTOs);

        double gesamt = positionenDTOs.stream().mapToDouble(p -> p.getPreis() * p.getMenge()).sum();
        dto.setGesamtpreis(gesamt);

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/bestellungen/all")
    public ResponseEntity<List<BestellungDTO>> getAllBestellungen() {
        List<BestellungDTO> bestellungen = bestellungRepository.findAll().stream().map(bestellung -> {
            BestellungDTO dto = new BestellungDTO();
            dto.setId(bestellung.getPublicId());

            List<BestellPositionDTO> posDtos = bestellung.getPositionen().stream().map(pos -> {
                BestellPositionDTO pDto = new BestellPositionDTO();
                pDto.setMenge(pos.getMenge());
                if (pos.getGetraenk() != null) {
                    pDto.setProduktName(pos.getGetraenk().getName());
                    pDto.setPreis(pos.getGetraenk().getPreis());
                } else if (pos.getSnack() != null) {
                    pDto.setProduktName(pos.getSnack().getName());
                    pDto.setPreis(pos.getSnack().getPreis());
                }
                return pDto;
            }).toList();

            dto.setPositionen(posDtos);

            double gesamt = posDtos.stream().mapToDouble(p -> p.getPreis() * p.getMenge()).sum();
            dto.setGesamtpreis(gesamt);

            return dto;
        }).toList();

        return ResponseEntity.ok(bestellungen);
    }

    @PostMapping("/bestellungen/add")
    public ResponseEntity<BestellungDTO> createBestellung(@RequestBody NeueBestellungRequest request) {
        Bestellung neueBestellung = new Bestellung();

        for (NeueBestellungRequest.PositionRequest posReq : request.getPositionen()) {
            if (posReq.getMenge() <= 0) continue;

            if (posReq.getProduktId() == null) {
                System.out.println(" Bestellposition ohne Produkt-ID wurde empfangen und übersprungen.");
                continue;
            }

            BestellPosition position = new BestellPosition();
            position.setMenge(posReq.getMenge());
            position.setBestellung(neueBestellung);

            try {
                UUID produktUuid = UUID.fromString(posReq.getProduktId());

                if ("GETRAENK".equals(posReq.getTyp())) {
                    Getraenke g = getraenkeRepository.findByPublicId(produktUuid);
                    position.setGetraenk(g);
                } else if ("SNACK".equals(posReq.getTyp())) {
                    Snacks s = snacksRepository.findByPublicId(produktUuid);
                    position.setSnack(s);
                }

                neueBestellung.getPositionen().add(position);
            } catch (IllegalArgumentException e) {
                System.out.println(" Ungültiges UUID-Format empfangen: " + posReq.getProduktId());
            }
        }

        bestellungRepository.save(neueBestellung);
        return ResponseEntity.ok().build();
    }
}