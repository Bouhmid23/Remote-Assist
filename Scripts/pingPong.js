var tm
function ping() {
    connection.send("client_ping")
    tm = setTimeout(function () {
        console.log("Server is down..")
        // Sever down 
        populate_error("server")
        document.getElementById('login_error').innerText = 
            "Server is down.. please try again later"}, 7000)
        }

//This function will clear timeout for ping
function pong() {
    clearTimeout(tm)
}