package com.example.learning.controller;

import com.example.learning.model.Snacks;
import com.example.learning.repository.SnacksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SnacksController {
    @Autowired
    private SnacksRepository snacksRepository;

    @GetMapping("/snacks/all")
    public ResponseEntity<List<Snacks>> GetAllSnacks(){
        List<Snacks> snacks = snacksRepository.findAll();
        return ResponseEntity.ok(snacks);
    }
}
