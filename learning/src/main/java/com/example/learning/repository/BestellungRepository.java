package com.example.learning.repository;

import com.example.learning.dto.BestellungDTO;
import com.example.learning.model.Bestellung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BestellungRepository extends JpaRepository<Bestellung, Long> {
    //List<Bestellung> findAll();
    //list<BestellungDTO> findall();
}


