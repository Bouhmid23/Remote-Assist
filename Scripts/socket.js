const EndPoint="ws://localhost:8000"
const connection = new WebSocket(EndPoint)

//This function will check the websocket connection error.
connection.onerror= function (error) {
    console.log("connection.onerror",error);
    document.getElementById('login_error').innerText = "Server is down.. please try later";
    populate_error("server")
};

 //This function will check the websocket connection open.
 //When connection successful , the user name send to server.
connection.onopen= function () {
    console.log("connection is fine")
    setInterval(ping, 10000)
};

 //This function will handle all the messages from server.
 // Main function to receive data from server.
connection.onmessage= function (message) {
    console.log("message from server = ", message.data)
    var reason=message.data.toString()
    var data = JSON.parse(reason)
    console.log(data.type)
    switch (data.type) {
        case "server_pong":
            if (data.name == "pong") {
                pong()}
            break

        case "server_login":
            onLogin(data.success)
            break

        case "server_offer":
            onOffer(data.offer, data.name)
            break

        case "server_answer":
            onAnswer(data.answer)
            break

        case "server_candidate":
            onCandidate(data.candidate)
            break

        case "server_user_list":
            LoadOnlineUserList(data.name)
            break

        case "server_user_ready":
            user_is_ready(data.success, data.peer_name)
            break

        case "server_user_want_to_leave":
            DisposeRoom()
            break

        case "server_busy_user":
            busy_user()
            break

        case "server_exit_from":
            left_from_server()
            break
        
        case "server_already_in_room":
            check_user_status(data.success,data.name)
            break  

        case "server_error":
            break

        case "server_no_user":
            break

        default:
            break
    }
}

//This function will send the user message to server Sending message will be in JSON format.
function send(message) {
    if (connectedUser) {
        message.name = connectedUser}
    connection.send(JSON.stringify(message))
}
connection.onclose = function() {
    console.log("connection closed");
    // Wait for 5 seconds before trying to reconnect
    setTimeout(function() {
      connection = new WebSocket(EndPoint);
      connection.onopen = function() {
        console.log("connection reopened");
      };
      connection.onclose = function() {
        console.log("connection closed again");
        // Recursively call this function to try to reconnect again
        reconnect();
      };
    }, 5000);
  };