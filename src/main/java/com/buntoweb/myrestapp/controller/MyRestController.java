package com.buntoweb.myrestapp.controller;

import java.util.List;

import com.buntoweb.myrestapp.entities.MyMessage;
import com.buntoweb.myrestapp.services.MsgService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyRestController {
    private MsgService msgService;

    @Autowired
    public void setMsgService(MsgService msgService) {
        this.msgService = msgService;
    }

    @GetMapping("/msg")
    public List<MyMessage> getMessages() {
        return msgService.getList();
    }

    @PostMapping("/msg")
    public MyMessage addMsg(@RequestBody MyMessage msg){
        return msgService.addMsg(msg);
    }

    @PutMapping("/msg/{id}")
    public MyMessage editMsg(@PathVariable int id, @RequestBody MyMessage msg) {
        return msgService.editMsg(msg);
    }

    @DeleteMapping("/msg/{id}") 
    public MyMessage deleteMsg(@PathVariable int id) {
        return msgService.removeMsg(id);
    }
}