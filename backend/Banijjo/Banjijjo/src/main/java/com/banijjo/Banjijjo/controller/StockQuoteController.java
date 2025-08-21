package com.example.stock.controller;

import com.example.stock.model.StockQuote;
import com.example.stock.service.StockQuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stocks/quote")
@CrossOrigin(origins = "http://localhost:3000/")
public class StockQuoteController {

    @Autowired
    private StockQuoteService quoteService;

    @GetMapping
    public StockQuote getQuote(
            @RequestParam String symbol,
            @RequestParam(required = false) String datatype
    ) {
        return quoteService.fetchQuote(symbol, datatype);
    }
}