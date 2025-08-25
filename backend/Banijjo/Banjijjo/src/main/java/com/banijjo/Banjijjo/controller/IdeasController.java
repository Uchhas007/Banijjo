package com.banijjo.Banjijjo.controller;

import com.banijjo.Banjijjo.model.Ideas;
import com.banijjo.Banjijjo.repository.IdeasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000/")
public class IdeasController {
    @Autowired
    private IdeasRepository ideasRepository;

    @PostMapping("/idea")
    Ideas newIdea(@RequestBody Ideas newIdea){
        return ideasRepository.save((newIdea));
    }

    @GetMapping("/ideas")
    List<Ideas> getAllIdeas(){
        return ideasRepository.findAll();
    }

//    @GetMapping("/myideas/{useremail}")
//    public List<Ideas> getIdeasByEmail(@PathVariable String useremail){
//        return ideasRepository.findByEmail(useremail);
//    }
    @GetMapping("/ideas/{id}")
    public Ideas getIdeasById(@PathVariable Long id){
        try {
            return ideasRepository.findById(id)
                    .orElseThrow(() -> new Exception("Ideas not found. Maybe you tried find it via url."));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }
}
