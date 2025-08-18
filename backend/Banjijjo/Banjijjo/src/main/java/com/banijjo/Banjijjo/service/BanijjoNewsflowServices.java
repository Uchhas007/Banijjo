package com.banijjo.Banjijjo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BanijjoNewsflowServices {
    public final String API_KEY = "TY12BBUJFDGIF62G";
    public final String API_URL = "https://www.alphavantage.co/query";

    public JsonNode getStockData(String symbol) {
        try {
            String url = API_URL
                    + "?function=NEWS_SENTIMENT"
                    + "&tickers=" + symbol
                    + "&apikey=" + API_KEY;

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(response.getBody());
        } catch (Exception e) {
            throw new RuntimeException("Error Fetching Stock Data: " + e.getMessage(), e);
        }
    }
}
