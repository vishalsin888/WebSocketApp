package com.app.chat.model;

import java.util.Date;

import lombok.Data;

@Data
public class Message {

	private String name;
	private String content;
	private Date sentOn;
	
	public enum type{
		CONTINUE,
		JOINED,
		LEFT
	}
}
