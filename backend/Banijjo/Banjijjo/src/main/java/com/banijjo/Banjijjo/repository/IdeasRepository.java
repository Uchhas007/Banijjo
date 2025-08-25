package com.banijjo.Banjijjo.repository;

import com.banijjo.Banjijjo.model.Ideas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IdeasRepository extends JpaRepository<Ideas, Long> {
//    List<Ideas> findByEmail(String useremail);
}
