$(document).ready(e=>{
	$("#enter").click(()=>{
		let name = $("#name-value").val();
		localStorage.setItem("name",name);
		$("#user-text").html(`Welcome ${name}`);
		connect();
	});
	$("#send").click(()=>{
		sendMessage();
	});
	$("#logout").click(()=>{
		logout();
	})
	
});

var stompClient = null;
function connect(){
	let socket = new SockJS("/server");
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame){
		$("#name-from").addClass("d-none");
		$("#chat-from").removeClass("d-none");
		console.log("connected"+frame);
		stompClient.subscribe("/topic/return",function(response){
			showMessage(JSON.parse(response.body));
		})
	});
}

function showMessage(message){
	$("#messages-container").prepend(`<tr><td><b>${message.name}</b></td></tr>
									  <tr><td>${message.content}</td>
									  <td class='dt'>${message.sentOn.split(".")[0].replace("T", " ")}</td></tr>`);
}

function sendMessage(){
	let msgJson = {
		name : localStorage.getItem("name"),
		content : $("#send-value").val(),
		sentOn : new Date()
	}
	if(msgJson.content == ""){
		$("#no_msg_err").removeClass("d-none");
	}else{
		$("#no_msg_err").addClass("d-none");
		stompClient.send("/app/message",{}, JSON.stringify(msgJson));
		$("#send-value").val('');
	}
	
}

function logout(){
	stompClient.disconnect();
	$("#name-from").removeClass("d-none");
	$("#chat-from").addClass("d-none");
}

