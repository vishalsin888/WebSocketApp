package com.app.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

import com.app.chat.model.Message;

@RestController
public class MessagesController {
	
	@MessageMapping("/register")
	@SendTo("/topic/return")
	public Message registerUser(@Payload Message message, SimpMessageHeaderAccessor header) throws InterruptedException {
		Thread.sleep(300);
		header.getSessionAttributes().put("username", message.getName());
		return message;
	}
	
	@MessageMapping("/send")
	@SendTo("/topic/return")
	public Message sendMessage(@Payload Message message, SimpMessageHeaderAccessor header) throws InterruptedException {
		Thread.sleep(300);
		return message;
	}

}
