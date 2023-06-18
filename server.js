var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3000 });

var usersAnDroid=[]
/* to store the connection details */
var users = {};
/* to store the user list details */
var map = new Map();

wss.on('listening', function () {
	console.log(`Server started with port ${this.address().port}`);
});

function handle_login(data,connection){
	/* If anyone login with same user name - refuse the connection */
	if (users[data.name]) {
		/* Already same username has logged in the server */
		/* send response to client back with login failed */
		sendTo(connection, { "type": "server_login", "success": false });
		console.log("login failed");
	} else {
		/* store the connection details */
		users[data.name] = connection;
		connection.name = data.name;
		connection.otherName = null;
		/* store the connection name in the userList */
		map.set(data.name,'online')
		/* send response to client back with login success */
		sendTo(connection, { "type": "server_login", "success": true })
		console.log("Login success")
		/* send updated user lists to all users */
		for (var i in users) {
			sendUpdatedUserList(users[i],[...map])}}
		}

function handle_answer(data){
	/* Get the peer user connection details */
	var userToReceiveAnswer 
	if(data.target!=null || data.target!=undefined){
		userToReceiveAnswer=users[data.target]
	}
	else{userToReceiveAnswer = users[data.name]}
	if (userToReceiveAnswer != null) {
		/* Send the answer back to requested user */
		sendTo(userToReceiveAnswer, { "type": "server_answer", "data": data.data.sdp })}
}
function handle_offer(data,connection){
	//Check the peer user has logged in the server 
	if (users[data.name]) {
		//Get the peer connection from array 
		var userToReceiveOffer 
		if(data.target!=null || data.target!=undefined){
			userToReceiveOffer=users[data.target]
		}
		else
			{userToReceiveOffer = users[data.name]}
		if (userToReceiveOffer == null) {
			//Error handling 
			sendTo(connection, { "type": "server_no_user", "success": false });
		}
		else if (userToReceiveOffer.otherName == null) {
			//When user is free and available for the offer 
			//Send the offer to peer user 
			sendTo(userToReceiveOffer, { "type": "server_offer", "data": data.data.sdp, "name": connection.name });
		}
		else {
			//User in room, User can't accept the offer 
			sendTo(connection, { "type": "server_already_in_room", "success": true, "name": data.name });
		}
	}
	else {
		//Error handling with invalid query 
		console.log("offer -> server_no_user")
		sendTo(connection, { "type": "server_no_user", "success": false })
	}
}
function handle_candidate(data){
	//Get connection details /
	var userToReceiveCandidate
	if(data.target!=null || data.target!=undefined)
		{userToReceiveCandidate=users[data.target]}
	else
	{userToReceiveCandidate = users[data.name]}
	if (userToReceiveCandidate != null) {
		//Send candidate details to user 
		sendTo(userToReceiveCandidate, { "type": "server_candidate", "data":{
			sdpMLineIndex:data.data.sdpMLineIndex,
            sdpMid:data.data.sdpMid,
            candidate: data.data.candidate
		} });
	}
}
function handle_leave(data,connection){
	//Get connection details 
	var conn = users[data.name];
	if (conn != null) {
		//Send response back to users who are in the room 
		sendTo(conn, { "type": "server_user_want_to_leave" });
		sendTo(connection, { "type": "server_user_want_to_leave" });
		map.set(data.name,'online');
		map.set(connection.name,'online');
		//Update the connection status with available 
		conn.otherName = null;
		connection.otherName = null;
		for (var i in users) {
			sendUpdatedUserList(users[i], [...map])}
		console.log("end room");
	}
}
function handle_busy(data){
	//Get connection details 
	var conn = users[data.name];
	if (conn != null) {
		//Send response back to user 
		sendTo(conn, { "type": "server_busy_user" });
	}
}
function handle_want_to_call(data,connection){
	var peerToCall = users[data.name];
					if (peerToCall != null) {
						if((peerToCall.otherName != null) && map.get(data.name) == "busy"){
							//User in room, User can't accept the offer 
							sendTo(connection, { "type": "server_already_in_room", "success": true, "name": data.name });
						}
						else{
							//User is available, User can accept the offer 
							sendTo(connection, { "type": "server_already_in_room", "success": false, "name": data.name });
						}
					}
					else{
						//Error handling with invalid query 
						sendTo(connection, { "type": "server_no_user", "success": false });
					}
}
function handle_ready(data,connection){
	/* Get connection details */
	var conn = users[data.name];
	if (conn != null) {
		/* Update the user status with peer name*/
		connection.otherName = data.name;
		conn.otherName = connection.name;
		map.set(data.name,'busy');
		map.set(connection.name,'busy');
		/* Send response to each users */
		sendTo(conn, { "type": "server_user_ready", "success": true, "peer_name": connection.name });
		sendTo(connection, { "type": "server_user_ready", "success": true, "peer_name": conn.name });
		/* Send updated user list to all existing users */
		for (var i in users) {
			sendUpdatedUserList(users[i], [...map]);
		}
	}
}
function handle_quit(data,connection){
	/* Get the user details */
	if (data.name) {
		var quit_user = data.name;
		delete users[connection.name];
		map.delete(quit_user);
		/* Send updated user list to all existing users */
		for (var i in users) {
			sendUpdatedUserList(users[i], [...map]);
		}
	}
}
function handle_close(connection){
	console.log("** leaving **");
		if (connection.name) {
			var quit_user = connection.name;
			/* Remove from the connection */
			delete users[connection.name];
			map.delete(quit_user);
			if (connection.otherName) {
				/* when user is inside the room with peer user */
				var conn = users[connection.otherName];
				if (conn != null) {
					/* Update the details */
					conn.otherName = null;
					connection.otherName = null;
					/* Send the response back to peer user */
					sendTo(conn, { "type": "server_exit_from" });
					map.set(conn.name,'online');
				}
			}
			/* Send the updated userlist to all the existing users  */
			for (var i in users) {
				sendUpdatedUserList(users[i], [...map])
			}
		}
}
/* function to send the userlist */
function sendUpdatedUserList(conn, message) {
	conn.send(JSON.stringify({ "type": "server_user_list", "name": message }));
}

/* function to send the message */
function sendTo(conn, message) {
	conn.send(JSON.stringify(message));
}

/* function to check the message is JSON or not */
function checkIsJson(str) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}
wss.on('connection', function (connection) {
	//Successful connection
	console.log("User has connected")
	connection.on('message', function (message) {
		
		var isJsonString = checkIsJson(message);
		if(isJsonString == true)
		{
			// Parse the messages from client 
			var data = JSON.parse(message)
			
			console.log(data)
			switch (data.type.toLowerCase()) {
					//login request from client 
				case "login" :
					
						handle_login(data,connection)
						console.log("login successfully handled")
						break
	
					// Offer request from client
				case "offer" :	
									
						handle_offer(data,connection)
						console.log("offer successfully handled")
						break
					
	
					//Answer request from client
				case "answer" :
					
					handle_answer(data)
					console.log("answer successfully handled")
					break
					
	
					//candidate request 
				case "candidate":
					
					handle_candidate(data)
					console.log("candidate successfully handled")
					break
	
					//when user want to leave from room 
				case "leave":
					handle_leave(data,connection)
					console.log("leaving successfully handled")
					break
	
					//When user reject the offer 
				case "busy":
					handle_busy(data)
					console.log("busy successfully handled")
					break
	
				case "want_to_call" :
					
						handle_want_to_call(data,connection)
						console.log("want to call successfully handled")
						break	
	
					//Once offer and answer is exchange, ready for a room 
				case "ready":
					handle_ready(data,connection)
					console.log("ready for call successfully handled")
					break
	
					//user quit/sign_out 
				case "quit":
					handle_quit(data,connection)
					console.log("quitting successfully handled")
					break
	
					//default 
				default:
					sendTo(connection, { type: "server_error", message: "Unrecognized command: " + data.type })
					console.log("error handling the message")
					break
			}
		}
		else{
			//ping from client, so response with pong to get server is alive.
			if(message == "client_ping"){
				sendTo(connection, { type: "server_pong", name: "pong" })
			}
		}
	})

	//When socket connection is closed 
	connection.on('close', function () {
		handle_close(connection)
		console.log("closing handled successfully")
	})})



