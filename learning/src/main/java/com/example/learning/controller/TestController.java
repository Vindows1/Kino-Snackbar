package com.example.learning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {
@GetMapping("/test")
    public ResponseEntity<Boolean>test(){
    return ResponseEntity.ok(true);
}
}
