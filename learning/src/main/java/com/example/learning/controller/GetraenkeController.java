package com.example.learning.controller;

import com.example.learning.model.Getraenke;
import com.example.learning.repository.GetraenkeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetraenkeController {
    @Autowired
    private GetraenkeRepository getraenkeRepository;
    @GetMapping("/getraenke/all")
    public ResponseEntity<List<Getraenke>>GetAllGetraenke(){
        List<Getraenke> getraenke = getraenkeRepository.findAll();
        return ResponseEntity.ok(getraenke);
    }
}
