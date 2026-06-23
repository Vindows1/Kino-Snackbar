package com.example.learning.repository;

import com.example.learning.model.Snacks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnacksRepository extends JpaRepository<Snacks, Long> {
   // List<Snacks> findAll();
    Snacks findByPublicId(java.util.UUID publicId);
}
