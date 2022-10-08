package com.app.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.chat.model.Message;

@RestController
public class MessagesController {
	
	@MessageMapping("/message")
	@SendTo("/topic/return")
	public Message sendMessage(@RequestBody Message message) throws InterruptedException {
		Thread.sleep(300);
		return message;
	}

}
