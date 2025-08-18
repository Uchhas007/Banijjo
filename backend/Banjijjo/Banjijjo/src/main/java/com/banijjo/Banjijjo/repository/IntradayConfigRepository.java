package com.banijjo.Banjijjo.repository;

import com.banijjo.Banjijjo.model.IntradayConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntradayConfigRepository extends JpaRepository<IntradayConfig, Long> {
    IntradayConfig findTopByOrderByIdDesc(); // always get the latest config
}
