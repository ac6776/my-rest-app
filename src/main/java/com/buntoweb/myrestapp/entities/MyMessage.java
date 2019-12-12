package com.buntoweb.myrestapp.entities;

public class MyMessage {
    private int id;
    private String msg;

    public MyMessage(int id, String msg) {
        this.id = id;
        this.msg = msg;
    }
    /**
     * @return the id
     */
    public int getId() {
        return id;
    }
    /**
     * @return the msg
     */
    public String getMsg() {
        return msg;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }
}