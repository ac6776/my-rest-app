package com.buntoweb.myrestapp.services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import com.buntoweb.myrestapp.entities.MyMessage;

import org.springframework.stereotype.Service;

@Service
public class MsgService {
    private List<MyMessage> msgList;
    private int counter;

    public List<MyMessage> getList() {
        return msgList;
    }

    @PostConstruct
    public void init() {
        this.counter = 10;
        msgList = new ArrayList<MyMessage>();
        msgList.add(new MyMessage(this.counter++, "Hello"));
        msgList.add(new MyMessage(this.counter++, "GoodBye"));
        msgList.add(new MyMessage(this.counter++, "Cheers"));
    }

    public MyMessage removeMsg(int id) {
        for (int i = 0; i < msgList.size(); i++) {
            if (msgList.get(i).getId() == id){
                counter--;
                System.out.println("removed: "  + msgList.get(i).getId() + " " + msgList.get(i).getMsg());
                return msgList.remove(i);
            }
        }
        return null;
    }

    public MyMessage editMsg(MyMessage msg) {
        int i;
        for (i = 0; i < msgList.size(); i++) {
            if (msgList.get(i).getId() == msg.getId()) break;
        }
        return msgList.set(i, msg);
    }

    public MyMessage addMsg(MyMessage msg) {
        msg.setId(counter++);
        msgList.add(msg);
        System.out.println("added: " + msg.getId() + " " + msg.getMsg());
        return msgList.get(msgList.size() - 1);
    }
}