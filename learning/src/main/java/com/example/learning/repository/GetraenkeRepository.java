package com.example.learning.repository;

import com.example.learning.model.Getraenke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GetraenkeRepository extends JpaRepository<Getraenke, Long> {

    List<Getraenke> findAll();

}
