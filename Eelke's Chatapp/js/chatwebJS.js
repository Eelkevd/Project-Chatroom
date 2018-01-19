


var xhr = new XMLHttpRequest();
//var userName = document.getElementById('myKey').value;
var userName = "eelke";
var topID = 0;
var oldMsgs = [];

function sendMessage(){
	//var userName = document.getElementById('myKey').value;
	var value = document.getElementById('chatInput').value;
	var urlWrite = "https://codegorilla.nl/read_write/api.php?action=write&mykey="+ userName +"&value="+ value;
	var chatMessage = document.getElementById('chatField');
	
	//test alertbox
	//alert(urlWrite);
	
	// Post chat message
	if (value != ""){
		
		xhr.open('post', urlWrite, false);
		xhr.send();
		var messageId = xhr.response;
		
		grabChatMessageId(messageId);
		var newMessage = xhr.response;
		
		//chatMessage.innerHTML += "> " + mykey + ":" + " " + newMessage + "<br>";
		document.getElementById("chatInput").value = "";
	}
}

function grabChatMessageId(id){
	var urlRead = "https://codegorilla.nl/read_write/api.php?action=read&mykey=" + userName + "&id=" + id;

	xhr.open('GET', urlRead, false);
	xhr.send();
}

function getAllIds(){
	urlReadIds = "https://codegorilla.nl/read_write/api.php?action=list&mykey="+ userName;
	xhr.open("GET", urlReadIds, false);
	xhr.send();
	oldMsgs = xhr.response;
	oldMsgs = oldMsgs.split(",");
	
	for (i=0 ; i < oldMsgs.length ; i++) {
		oldMsgs[i] = parseInt(oldMsgs[i]);
	}
	var audio = new Audio('audio/unsure.mp3');
			audio.play();
}	

function getOldMsg(){
	var chatMessage = document.getElementById('chatField');
	for (i=0; i  < oldMsgs.length; i++){
		if  (oldMsgs[i] > topID){ 
			grabChatMessageId(oldMsgs[i]);
			var newMessage = xhr.response;
			
			chatMessage.innerHTML += newMessage + "<br>";
			topID = oldMsgs[i];
			scrollBottom();
			
		}
	}
}

window.setInterval(function(){
	getAllIds();
	getOldMsg();
	
}, 5000);

function scrollBottom(){
	$("#chatField").scrollTop($("#chatField").prop("scrollHeight"));
}


