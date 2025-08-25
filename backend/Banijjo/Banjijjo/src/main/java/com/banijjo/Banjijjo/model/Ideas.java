package com.banijjo.Banjijjo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ideas {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    public String useremail;
    public String title;
    public String description;
    public String image;
    public int upvote;
    public int downvote;
    public int shares;


    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id = id;
    }
    public String getUseremail(){
        return useremail;
    }
    public void setUseremail(String useremail){
        this.useremail = useremail;
    }
    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getImage(){
        return image;
    }
    public void setImage(String image){
        this.image = image;
    }
    public int getUpvote(){
        return upvote;
    }
    public void setUpvote(int upvote){
        this.upvote = upvote;
    }
    public int getDownvote(){
        return downvote;
    }
    public void setDownvote(int downvote){
        this.downvote = downvote;
    }
    public int getShares(){
        return shares;
    }
    public void setShares(int shares){
        this.shares = shares;
    }
}