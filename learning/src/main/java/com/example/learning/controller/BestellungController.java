package com.example.learning.controller;

import com.example.learning.dto.BestellungDTO;
import com.example.learning.model.Bestellung;
import com.example.learning.repository.BestellungRepository;
import com.example.learning.repository.GetraenkeRepository;
import com.example.learning.repository.SnacksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BestellungController {
    @Autowired
    private BestellungRepository bestellungRepository;
    @GetMapping("/bestellungen/all")
    //public ResponseEntity<List<Bestellung>> GetAllBestellungen() {
    //    List<Bestellung> bestellung = bestellungRepository.findAll();
    //    return ResponseEntity.ok(bestellung);
    //}
    //@GetMapping
    public ResponseEntity<List<BestellungDTO>> getAllBestellungen() {
        return ResponseEntity.ok(bestellungRepository.findAll().stream().map(BestellungDTO::new).toList());
    }

@Autowired
private GetraenkeRepository getraenkeRepository;
@Autowired
private SnacksRepository snacksRepository;

@PostMapping("/bestellungen/add")
public ResponseEntity<BestellungDTO> createBestellung(@RequestBody Bestellung neueBestellung) {
    System.out.println("DEBUG: Suche Getraenk mit ID: " + neueBestellung.getGetraenk().getId());
    var getraenke = getraenkeRepository.findById(neueBestellung.getGetraenk().getId()).orElseThrow();
    var snack = snacksRepository.findById(neueBestellung.getSnack().getId()).orElseThrow();

    neueBestellung.setWunsch_G(getraenke.getName());
    neueBestellung.setWunsch_S(snack.getName());
    neueBestellung.setGetraenk(getraenke);
    neueBestellung.setSnack(snack);
    Bestellung gespeicherteBestellung = bestellungRepository.save(neueBestellung);
    return ResponseEntity.ok(new BestellungDTO(gespeicherteBestellung));
}}
