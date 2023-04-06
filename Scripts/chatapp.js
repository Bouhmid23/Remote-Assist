var Send_dataChannel, connectedUser, Receive_dataChannel;
let username;
var title = document.title;
var chat_window_flag = false;
var incoming_popup_set = false, outgoing_popup_set = false;
var conn_offer;
var conn_answer;
var id_wordflick;
var flag_send_datachannel;
var stream;
var m_client_Video;
var count_message = 0;
const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
};
let current_client_stream;
let peerConnection;
var configuration = {
    "iceServers": [
        {
            "urls": "stun:stun.1.google.com:19302"
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        }
    ]
};

// Set the name of the hidden property and the change event for visibility
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

// This function will handle the message count in the Title
function handleVisibilityChange() {
    // If the page is hidden, count message and display
    if (document[hidden]) {
        if((count_message != 0) && (chat_window_flag == true))
        {
            var newTitle = '(' + count_message + ') ' + title;
            document.title = newTitle;
        }
        else
        {
             document.title = title;
        }
    } else {
        // if the page is shown, clear the message count
        count_message = 0;
        document.title = title;
    }
} 

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}


//Functions related to login form
 const form  = document.getElementById('signup');
  //This is a click event when press enter from keybord
  // accept key event from keyboard
  // process the send message function
   document.addEventListener('keydown', function (key) {
       //press enter key only allow when the chat window enable
      if ((key.which === 13) && (chat_window_flag == true)) {
          SendMessage();
      }
  });

  // This function will handle the login from UI
  // If it is success, it will initiate the connection.
 form.addEventListener('submit', (event) => {
     // stop form submission
     event.preventDefault();
     // handle the form data
     var username_obj = form.elements['Userame'];
     username = username_obj.value; 
     document.getElementById('divChatName_username').innerHTML = username;
     send({
         type: "login",
         name: username
     });
 });

 //This jQuery function will check the modal popup.
 //If the popup is still avaible after 30 second , then
 //it will be forcefully remove from screen and update to user.
$('#modalNotificationList').on('show.bs.modal', function () {
    var myModal = $(this);
    clearTimeout(myModal.data('hideInterval'));
    myModal.data('hideInterval', setTimeout(function () {
        if (chat_window_flag != true && outgoing_popup_set == true) {
            myModal.modal('hide').data('bs.modal', null);
            populate_error("noresponse");
            outgoing_popup_set = false;
        }
    }, 30000));
});

 //This jQuery function will check the modal popup.
 //If the popup is still avaible after 30 second , then
 //it will be forcefully remove from screen and update to user.
$('#incoming_call_Modal').on('show.bs.modal', function () {
    var myModal = $(this);
    clearTimeout(myModal.data('hideInterval'));
    myModal.data('hideInterval', setTimeout(function () {
        if (chat_window_flag != true && incoming_popup_set == true) {
            myModal.modal('hide').data('bs.modal', null);
            populate_error("noresponse");
            outgoing_popup_set = false;
        }
    }, 30000));
});

 //This function will create the dynamic bootstrap modal to show 
 //the incoming room request from other user. (callee side)
 //This will activate the accept and reject button along with the popup.
function create_request_room_Modal(name) {
    var html = '<div class="vertical-alignment-helper">' +
        '<div class="modal-dialog modal-lg vertical-align-center">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title" id="myModalLabel1"><strong>Incoming chat room request </strong></h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="row intro-banner-vdo-play-btn pinkBg"><i class="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>'+
        '<img src="images/pp.png" class="friend-pic-new rounded-circle"/><span class="ripple pinkBg"></span><span class="ripple pinkBg"></span><span class="ripple pinkBg"></span></div>'+
        '<div id="incoming-call-page" class="page text-center">' +
        '<div id="dynamictext" class="word"></div>' +
        '<div class="row incoming-button-calls">' +
        '<div class="col-xs-2">' +
        '<button style="margin-right:16px" class="btn btn-primary btn-lg" id="incoming-accpt-request" type="button" onclick="make_answer()">' +
        '<span class="glyphicon glyphicon-facetime-video"></span>Accept' +
        '</button>' +
        '</div>' +
        '<div class="col-xs-2">' +
        '<button style="margin-right:16px" data-dismiss="modal" class="btn btn-danger btn-lg" id="incoming-end-call" type="button" onclick="reject_answer()">' +
        '<span class="glyphicon glyphicon-phone-alt"></span>Reject' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer"></div>' +
        '</div>' +
        '</div>' +
        '</div>';

    document.getElementById('incoming_call_Modal').innerHTML = html;
    document.getElementById('dynamictext').innerText = "";
    var string = name +" is requesting for a chat ..";
    var words = [string];
    console.log("calling wordflick ");
    id_wordflick = wordflick(words);
    $("#incoming_call_Modal").modal('show');
    incoming_popup_set = true;
}

function wordflick (words) {
    var part ='',
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
    return window.setInterval(function () {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      }
      else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        }
        else {
          offset--;
        }
      }
      if(part =='')
      {
        document.getElementById('dynamictext').innerText = words[i].substr(0, 1);
        //$('.word').text(words[i].substr(0, 1));
      }
      else
      {
        document.getElementById('dynamictext').innerText = part;
        //$('.word').text(part);
      }
    },speed);
  };

 //This function will create the dynamic bootstrap modal to show 
 //the progress of the webRTC connection (caller side)
 // This will activate the loading icon and text message to user.
function Create_Popup_Notifications() {
    // creation of modal pop up to show the progress 
    var html = '<div class="vertical-alignment-helper">'
        + '<div class="modal-dialog modal-lg vertical-align-center">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<h4 class="modal-title" id="myModalLabel2"><strong>Creating room request</strong></h4>'
        + '</div>'
        + '<div class="modal-body">'
        + `<div class="popup text-center">`
        +'<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>'
        +'<div class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div>'
        + `</div>`
        + `<li id="dynamic_progress_text" class="loading"></li>`
        + '</div>'
        + '<!-- footer content -->'
        + '<div class="modal-footer"></div>'
        + '</div>'
        + '</div>'
        + '</div>';
    document.getElementById('modalNotificationList').innerHTML = html;
    $("#modalNotificationList").modal('show');
    outgoing_popup_set = true;
}

//This function will handle UI when other user reject the webRTC offer.
function busy_user() {
    clear_outgoing_modal_popup();
    chat_window_flag = false;
    outgoing_popup_set = false
    populate_error("reject");
    Delete_webrtc_connection();
}

//This function will handle sliding of bootstrap UI message.
function slide_down_error() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(500);
    });
}

//This function will handle all the UI messages based on the scenario.
function populate_error(errorid) {
    var msg = '';
    var text;
    if (errorid == "reject") {
        text = "User has rejected your request .. it seems user is busy now !!";
    }
    else if (errorid == "inaroom") {
        text = "If you want another room, please leave this room first !!";
    }
    else if (errorid == "server") {
        text = "Server is down, please try again later !!";
    }
    else if (errorid == "noresponse") {
        text = "No response from user .. User may be offline now !!";
    }
    else if (errorid == "endforcecall") {
        text = "Chat room is closed by other user !!";
    }
    else if (errorid == "endcall") {
        text = "You have closed the chat room !!";
    }
    else if (errorid == "user_unavailble") {
        text = "Other user has left from the chat !!";
    }
    else if (errorid == "busyuser") {
        text = "Peer user is in another room.. please try later !!";
    }
    else {
        text = "NA";
    }
    msg += '<button type="button" class="close" data-dismiss="alert">x</button>' +
        '<strong>Note: </strong>' + text + '';

    document.getElementById('success-alert').innerHTML = msg;
    slide_down_error();
}

//This function will clear the incoming offer popup.
function clear_incoming_modal_popup() {
    window.clearInterval(id_wordflick);
    $('#incoming_call_Modal').modal('hide').data('bs.modal', null);
    document.getElementById('incoming_call_Modal').innerHTML = '';
}

//This function will clear the outgoing popup.
function clear_outgoing_modal_popup() {
    $('#modalNotificationList').modal('hide').data('bs.modal', null);
    document.getElementById('modalNotificationList').innerHTML = '';
}

//This function will toggle the video button
function togglevideo(){
    var icon = $('.video');
    if (icon.hasClass("btn-default")) {
        var vidTrack = current_client_stream.getVideoTracks();
        vidTrack.forEach(track => track.enabled = false);
        icon.toggleClass("btn-default");
        icon.addClass("btn-danger");
    }
    else
    {
        var vidTrack = current_client_stream.getVideoTracks();
        vidTrack.forEach(track => track.enabled = true);
        icon.toggleClass("btn-danger");
        icon.addClass("btn-default");
    }
}

//This function will toggle the mute button
function togglemute(){
    var icon = $('.mic');
    if (icon.hasClass("btn-default")) {
        var vidTrack = current_client_stream.getAudioTracks();
        vidTrack.forEach(track => track.enabled = false);
        icon.toggleClass("btn-default");
        icon.addClass("btn-danger");
    }
    else
    {
        var vidTrack = current_client_stream.getAudioTracks();
        vidTrack.forEach(track => track.enabled = true);
        icon.toggleClass("btn-danger");
        icon.addClass("btn-default");
    }
}

//This function will create dynamic video call window
function create_videocall_page(){
    //Activate the video call window
    var VideosDisplay = '';
    VideosDisplay +=
    '<div class="row">'+
    '<div class="col-sm-3">'+ 
    '<div class="modal-dialog-video">'+
            '<div class="modal-body-video">'+
            '<div class="overlay"><h2>Peer user</h2></div>'+
                '<figure>'+
                '<video class="peer_video_class" id="peer_video_frame" playsinline autoplay></video>'+
                '</figure>'+
            '</div>'+
    '</div>'+    
    '<div class="modal-dialog-video">'+
            '<div class="modal-body-video">'+
            '<div class="overlay"><h2>client user</h2></div>'+
                '<figure>'+
                '<video id="client_video_frame" playsinline controls autoplay></video>'+
                '<div class="button_calls">'+
                        '<div class="col-xs-1">'+
                            '<button id="hide_camera" type="button" class="btn" onclick="togglevideo()">'+
                            '<i class="btn-default btn material-icons video" style="color:white">videocam_off</i>'+
                            '</button>'+
                        '</div>'+
                        '<div class="offset-md-2">'+
                            '<button id="mute_camera" type="button" class="btn" onclick="togglemute()">'+
                            '<i class="btn-default btn material-icons mic" style="color:white">mic_off</i>'+
                            '</button>'+
                        '</div>'+
                '</div>'+
                '</figure>'+
            '</div>'+
    '</div>'+
    '</div>'+
    '<div class="col-sm-6 offset-md-2">'+
    '<div id="text-chat">'+
    '</div>'+
    '<div class="card-footer">'+
        '<div class="row" style="position:relative;">'+
            '<div class="col-md-12" id="emoji" style="display:none;">'+
                '<div class="tab-pane fade show active" id="smiley" aria-labelledby="home-tab">'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="row">'+
            '<div class="col-2 col-md-1" style="cursor:pointer;">'+
                '<i class="far fa-grin fa-2x" onclick="showEmojiPanel()"></i>'+
            '</div>'+
            '<div class="col-8 col-md-9">'+
                '<input id="txtMessage" onkeyup="ChangeSendIcon(this)" type="text" onfocus="hideEmojiPanel()" placeholder="Type Message here" class="form-control form-rounded" />'+
            '</div>'+
            '<div class="col-2 col-md-1">'+
                '<i id="send" class="fa fa-paper-plane fa-2x" onclick="SendMessage()" style="display:none"></i>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    document.getElementById('messages_video').innerHTML += VideosDisplay;
}

//This function will activate the chat window.
function activate_chat_window() {
    document.getElementById('chatPanel').removeAttribute('style');
    document.getElementById('divStart').setAttribute('style', 'display:none');
}

//This function will enable the send icon.
function ChangeSendIcon(control) {
    if (control.value !== '') {
        document.getElementById('send').removeAttribute('style');
    }
    else {
        document.getElementById('send').setAttribute('style', 'display:none');
    }
}

//This function will load all the emoji.
function loadAllEmoji() {
    var emoji = '';
    for (var i = 128512; i <= 128566; i++) {
        emoji += `<a href="#" style="font-size: 22px;" onclick="getEmoji(this)">&#${i};</a>`;
    }
    document.getElementById('smiley').innerHTML = emoji;
}

//This function will show all the emoji.
function showEmojiPanel() {
    if ((document.getElementById('emoji').style.display == 'none')) {
        document.getElementById('emoji').removeAttribute('style');
    }
    else {
        //double click
        hideEmojiPanel();
    }
}

//This function will hide the emoji panel.
function hideEmojiPanel() {
    document.getElementById('emoji').setAttribute('style', 'display:none;');
}

//This function will get the emoji for chat.
function getEmoji(control) {
    document.getElementById('txtMessage').value += control.innerHTML;
    ChangeSendIcon(document.getElementById('txtMessage'));
}

//This function will update the messages when user type any of the text and press enter/click send.
function UpdateChatMessages(txtmessage, client) {
    var messageDisplay = '';
    if (client == true) {
        messageDisplay += "<div class='row'>" +
            "<div class='col-2 col-sm-1 col-md-1'>" +
            "<img src='images/pp.png' class='chat-pic rounded-circle' />" +
            "</div>" +
            "<div class='col-6 col-sm-7 col-md-7'>" +
            "<p class='receive'>" + txtmessage + "</p>" +
            "</div>" +
            "</div>";
        document.getElementById('text-chat').innerHTML += messageDisplay;
    }
    else {
        messageDisplay += "<div class='row justify-content-end'>" +
            "<div class='col-6 col-sm-7 col-md-7'>" +
            "<p class='sent float-right'>" + txtmessage + "</p>" +
            "</div>" +
            "<div class='col-2 col-sm-1 col-md-1'>" +
            "<img src='images/pp.png' class='chat-pic rounded-circle'/>" +
            "</div>" +
            "</div>";
        document.getElementById('text-chat').innerHTML += messageDisplay;
    }
    document.getElementById('text-chat').scrollTo(0, document.getElementById('text-chat').scrollHeight);
}

//This function will populate the online userlist from the server.
function LoadOnlineUserList(username_array) {
    //convert the json to Map 
    const map2 = new Map(username_array);
    //Count of online user -> server send all user list , we have to remove our name from that list 
    document.getElementById('onlineusers').innerHTML = '<span class="indicator label-success"></span>' +
                                                        'online users (' + (map2.size - 1) + ')';
    document.getElementById('lstChat').innerHTML = "";
    if (map2.size > 1) {
        var id = 0
        for (let [key, value] of map2) {
            if (username != key) { 
                var id_name = 'online_status_'+id; /* Used for dynamic id */
                //populate the sidebar online users list dynamically
                document.getElementById('lstChat').innerHTML += "<li class='list-group-item list-group-item-action'>" +
                    "<div class='row'>" +
                    "<div class='col-md-2'>" +
                    "<img src='images/pp.png' class='friend-pic rounded-circle' />" +
                    "</div>" +
                    "<div class='col-md-4' style='cursor:pointer;'>" +
                    "<div class='name'>" + key + "</div>" +
                    "<div class='under-name'><span id="+id_name+" class='indicator label-success'></span>" + value + "</div>" +
                    "</div>" +
                    "<div class='col-md-4' style='cursor:pointer;'>" +
                    "<button class='btn btn-success' type='button' onclick='call_user(\"" + key + "\")'>" +
                    "<span class='glyphicon glyphicon-facetime-video'></span>Call" +
                    "</button>" +
                    "</div>" +
                    "</li>";  
                Update_user_status(id_name, value);    
                id++;   
            }
        }
    }
    else
    {
            //Only one user name present ie. only client 
            if (map2.key == username) {
                document.getElementById('lstChat').innerHTML = "";
                console.log("single user = ", map2.key);
            }
    }
}
function Update_user_status(id_name, value)
{
    switch(value)
    {
        // handle the user status 
        case "online":
            document.getElementById(id_name).classList.replace('label-danger', 'label-success');
            break
        case "busy":
            document.getElementById(id_name).classList.replace('label-success','label-danger'); 
            break
        default:
            document.getElementById(id_name).classList.add('label-success');
            break
    }
}


