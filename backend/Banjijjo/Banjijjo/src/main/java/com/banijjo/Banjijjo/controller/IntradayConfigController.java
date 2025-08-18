package com.banijjo.Banjijjo.controller;

import com.banijjo.Banjijjo.model.IntradayConfig;
import com.banijjo.Banjijjo.repository.IntradayConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/config/intraday")
@CrossOrigin(origins = "http://localhost:3000/")
public class IntradayConfigController {

    @Autowired
    private IntradayConfigRepository repository;

    @PostMapping("/add")
    public IntradayConfig addConfig(@RequestBody IntradayConfig config) {
        return repository.save(config);
    }

    @GetMapping("/latest")
    public IntradayConfig getLatestConfig() {
        return repository.findTopByOrderByIdDesc();
    }

    @GetMapping("/all")
    public List<IntradayConfig> getAllConfigs() {
        return repository.findAll();
    }
}
