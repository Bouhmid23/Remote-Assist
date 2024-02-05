var EndPoint="ws://192.168.3.71:3000"
var connection = new WebSocket(EndPoint)

//This function will check the websocket connection error.
connection.onerror= function (error) {
    console.log("connection.onerror",error)
    document.getElementById('login_error').innerText = "Server is down.. please try later"
    populate_error("server")
}

 //This function will check the websocket connection open.
 //When connection successful , the user name send to server.
connection.onopen= function () {
    console.log("connection is fine")
    setInterval(ping, 10000)
    const styleElement = obj.find(item => item.style !== undefined)
    const generatedCSS = generateStylesFromJSON(styleElement.style)
    addStylesToCSSFile(generatedCSS)
}

 //This function will handle all the messages from server.
 // Main function to receive data from server.
connection.onmessage= function (message) {
    console.log("message from server = ", message)
    var reason=message.data.toString()
    var data = JSON.parse(reason)
    console.log( "received message is of type",typeof data)
    switch (data.type) {
        case "server_pong":
            if (data.name == "pong") {
                pong()}
            break

        case "server_login":
            onLogin(data.success)
            console.log("onLogin")
            break

        case "server_offer":
            onOffer(data.data, data.name)
            console.log("onOffer and the type is :",typeof data.data)
            break

        case "server_answer":
            onAnswer(data.data)
            console.log("onAnswer and the type is :",typeof data.data)
            break

        case "server_candidate":
            onCandidate(data.data)
            console.log("onCandidate and the type is : ",typeof data.data)
            break

        case "server_user_list":
            LoadOnlineUserList(data.name)
            console.log("LoadOnlineUserList")
            break

        case "server_user_ready":
            user_is_ready(data.success, data.peer_name)
            loadToolbarMembers()
            console.log("user_is_ready")
            break

        case "server_user_want_to_leave":
            DisposeRoom()
            console.log("DisposeRoom")
            break

        case "server_busy_user":
            busy_user()
            console.log("busy_user")
            break

        case "server_exit_from":
            left_from_server()
            console.log("left_from_server")
            break
        
        case "server_already_in_room":
            check_user_status(data.success,data.name)
            console.log("server_already_in_room")
            break  

        case "server_drop_object":
            drop_object(data.data)
            console.log("drop_object")
            break

        case "server_delete_object":
            delete_object()
            console.log("delete_object")
            break
        
        case "server_resize_object":
            resize_object(data.data)

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
        //message.origin="web"
    connection.send(JSON.stringify(message))
}
connection.onclose = function() {
    console.log("connection closed")
    // Wait for 5 seconds before trying to reconnect
    setTimeout(function() {
        connection = new WebSocket(EndPoint)
        connection.onopen = function() {
        console.log("connection reopened")
    }
    }, 5000)
}