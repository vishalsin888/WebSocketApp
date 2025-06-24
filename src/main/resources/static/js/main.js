'use strict';
//var usernamePage = document.querySelector('#username-page');
//var chatPage = document.querySelector('#chat-page');
//var usernameForm = document.querySelector('#usernameForm');
//var messageForm = document.querySelector('#messageForm');
//var messageInput = document.querySelector('#message');
//var messageArea = document.querySelector('#messageArea');
//var connectingElement = document.querySelector('.connecting');
$(document).ready(function(){
	$("#usernameForm").on("submit", function(){
		connect();
	});
	$("#messageForm").on("submit", function(){
		send();
	});
});
var stompClient = null;
var username = null;
var colors = [
	'#2196F3', '#32c787', '#00BCD4', '#ff5652',
	'#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];
function connect() {
	username = $('#name').val().trim();
	if (username) {
		$("#username-page").addClass('d-none');
		$("#chat-page").removeClass('d-none');
		var socket = new SockJS('/server');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, onConnected, onError);
	}
}
function onConnected() {
	// Subscribe to the Public Topic
	stompClient.subscribe('/topic/return', onMessageReceived);
	// Tell your username to the server
	stompClient.send("/app/register",
		{},JSON.stringify({ name: username, type: 'JOIN' }))
	$(".connecting").hide();
}
function onError() {
	$(".connecting").html = 'Could not connect to WebSocket server. Please refresh this page to try again!';
	$(".connecting").css({'color':'red'});
}
function send() {
	var messageContent = $('#message').val().trim();
	if (messageContent && stompClient) {
		var chatMessage = {
			name: username,
			content: messageContent,
			sentOn : new Date(),
			type: 'CHAT'
		};
		stompClient.send("/app/send", {}, JSON.stringify(chatMessage));
		$('#message').val('');
	}
}
function onMessageReceived(payload) {
	var message = JSON.parse(payload.body);
	var messageElement = document.createElement('li');
	if (message.type === 'JOIN') {
		messageElement.classList.add('event-message');
		message.content = message.name + ' joined!';
	} else if (message.type === 'LEAVE') {
		messageElement.classList.add('event-message');
		message.content = message.name + ' left!';
	} else {
		messageElement.classList.add('chat-message');
		var avatarElement = document.createElement('i');
		var avatarText = document.createTextNode(message.name[0]);
		avatarElement.appendChild(avatarText);
		avatarElement.style['background-color'] = getAvatarColor(message.name);
		messageElement.appendChild(avatarElement);
		var usernameElement = document.createElement('span');
		var usernameText = document.createTextNode(message.name);
		var msgDate = document.createTextNode(message.sentOn);
		usernameElement.appendChild(usernameText);
		messageElement.appendChild(usernameElement);
		messageElement.appendChild(msgDate);
	}
	var textElement = document.createElement('p');
	var messageText = document.createTextNode(message.content);
	textElement.appendChild(messageText);
	messageElement.appendChild(textElement);
	messageArea.appendChild(messageElement);
	messageArea.scrollTop = messageArea.scrollHeight;
}
function getAvatarColor(messageSender) {
	var hash = 0;
	for (var i = 0; i < messageSender.length; i++) {
		hash = 31 * hash + messageSender.charCodeAt(i);
	}
	var index = Math.abs(hash % colors.length);
	return colors[index];
}