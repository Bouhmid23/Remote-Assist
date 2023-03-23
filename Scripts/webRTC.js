// WebRTC 
var Send_dataChannel, connectedUser, Receive_dataChannel;
var chat_window_flag = false;
var incoming_popup_set = false, outgoing_popup_set = false;
var conn_offer;
var conn_answer;
var flag_send_datachannel;
var stream;
var m_client_Video;
var count_message = 0;
var configuration = {
    "iceServers": [
        { "urls": "stun:stun.1.google.com:19302",
        "urls": "stun:stun1.l.google.com:19302",
        "urls": "stun:stun2.1.google.com:19302",
        "urls": "stun:stun3.1.google.com:19302",
        "urls": "stun:stun4.1.google.com:19302"},
        
        {urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'}]
};

//This function will handle the data channel open callback.
var onReceive_ChannelOpenState = function (event) {
    flag_send_datachannel = false;
    console.log("dataChannel.OnOpen", event);
    if (Receive_dataChannel.readyState == "open") {
        // Open state 
    }
};

//This function will handle the data channel message callback (Peer user side).
var onReceive_ChannelMessageCallback = function (event) {
    count_message++;           //Count the messages
    handleVisibilityChange(); //if we recive any message and user is in another tab
    UpdateChatMessages(event.data, false);
};

//This function will handle the data channel error callback.
var onReceive_ChannelErrorState = function (error) {
    console.log("dataChannel.OnError:", error);
};

//This function will handle the data channel close callback.
var onReceive_ChannelCloseStateChange = function (event) {
    //close event 
};

//Registration of data channel callbacks
var receiveChannelCallback = function (event) {
    Receive_dataChannel = event.channel;
    Receive_dataChannel.onopen = onReceive_ChannelOpenState;
    Receive_dataChannel.onmessage = onReceive_ChannelMessageCallback;
    Receive_dataChannel.onerror = onReceive_ChannelErrorState;
    Receive_dataChannel.onclose = onReceive_ChannelCloseStateChange;
};

//This function will check webrtc Permissions.
function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;
    window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate;

    return !!window.RTCPeerConnection;
};

//This function will check camera permission.
 async function permission_camera_before_call(channel,name) {
    //get the client and peer video frames Id's
    m_client_Video = document.querySelector('#client_video_frame');
    m_PeerVideo = document.querySelector('#peer_video_frame');
    try {
        await navigator.mediaDevices.getUserMedia({audio: true, video: true})
        .then(stream=>{
            m_client_Video.srcObject = stream;
            current_client_stream = stream;
        });
        console.log('Received local stream');
      } catch (e) {
        alert(`getUserMedia() error: ${e.name}`);
      }
      const videoTracks = current_client_stream.getVideoTracks();
      const audioTracks = current_client_stream.getAudioTracks();
      if (videoTracks.length > 0) {
        console.log(`Using video device: ${videoTracks[0].label}`);
      }
      if (audioTracks.length > 0) {
        console.log(`Using audio device: ${audioTracks[0].label}`);
      }
    peerConnection = new RTCPeerConnection(configuration);
    console.log('Created local peer connection object peerConnection');
    peerConnection.addEventListener('iceconnectionstatechange', e => onIceStateChange(peerConnection, e));
    current_client_stream.getTracks().forEach(track => peerConnection.addTrack(track, current_client_stream));
    peerConnection.addEventListener('track', gotRemoteStream);
    console.log('Added local stream to peerConnection');

    if(channel == false){
        console.log("Creating Answer..");
        peerConnection.ondatachannel = receiveChannelCallback;
        creating_answer(); 
    }

    if(channel == true){
        peerConnection.addEventListener('icecandidate', e => icecandidateAdded(e)); 
        console.log("Creating Offer..");
        Create_DataChannel(name);  
        creating_offer();
    }
}
//This function will handle when when we got ice candidate from another user.
 async function onCandidate(candidate) {
    try {
        await (peerConnection.addIceCandidate(candidate));
        onAddIceCandidateSuccess(peerConnection);
      } catch (e) {
        onAddIceCandidateError(peerConnection, e);
      }    
}

//This function will print the ICE candidate sucess 
function onAddIceCandidateSuccess(pc) {
    console.log(` IceCandidate added successfully..`);
}

//This function will print the ICE candidate error
function onAddIceCandidateError(pc, error) {
    console.log(` Failed to add ICE Candidate: ${error.toString()}`);
}

//This function will set the peer remote streams
function gotRemoteStream(e) {
    if (m_PeerVideo.srcObject !== e.streams[0]) {
        m_PeerVideo.srcObject = e.streams[0];
      console.log('received remote stream..');
    }
}

//This function will handle the ICE state change
function onIceStateChange(pc, event) {
    if (pc) {
      console.log(`ICE state: ${pc.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
}

//This function will handle error message
function errorMessage(message, e) {
    console.error("error ***");
    console.error(message, typeof e == 'undefined' ? '' : e);
}

//This function will handle ICE candidate event. 
function icecandidateAdded(ev) {
    if (ev.candidate) {
        send({
            type: "candidate",
            candidate: ev.candidate
        });
        console.log("ICE candidate has send to Server ..");   
    }
}

//This function will handle the data channel open callback.
 var onSend_ChannelOpenState = function (event) {
    flag_send_datachannel = true;
    console.log("dataChannel.OnOpen", event);
    if (Send_dataChannel.readyState == "open") {
        //Open state event
    }
};

//This function will handle the data channel message callback.
 var onSend_ChannelMessageCallback = function (event) {
    count_message++;
    handleVisibilityChange(); //if we recive any message and user is in another tab
    UpdateChatMessages(event.data, false);
};

//This function will handle the data channel error callback.
var onSend_ChannelErrorState = function (error) {
    console.log("dataChannel.OnError:", error);
};

//This function will handle the data channel close callback.
var onSend_ChannelCloseStateChange = function (event) {
    console.log("dataChannel.OnClose", event);
};

//This function will create data channel when user want a room with other user
function Create_DataChannel(name) {
    document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Creating a channel with user ..");
    const dataChannelOptions = {
        ordered: false,             // do not guarantee order
        maxPacketLifeTime: 3000,    // in milliseconds
    };

    var channelname = "webrtc_label_" + name;
    Send_dataChannel = peerConnection.createDataChannel(channelname, dataChannelOptions);
    console.log("Created DataChannel dataChannel = "+Send_dataChannel);

    Send_dataChannel.onerror = onSend_ChannelErrorState;
    Send_dataChannel.onmessage = onSend_ChannelMessageCallback;
    Send_dataChannel.onopen = onSend_ChannelOpenState;
    Send_dataChannel.onclose = onSend_ChannelCloseStateChange;
}

//This function will create the webRTC offer request for other user.
 async function creating_offer() {
    document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Requesting with user.. Please wait..");
    try {
        console.log('pc1 createOffer start');
        const offer = await peerConnection.createOffer(offerOptions);
        await onCreateOfferSuccess(offer);
      } catch (e) {
        onCreateSessionDescriptionError(e);
      }
}

//This function will set client local description of the webRTC 
async function onCreateOfferSuccess(desc) {
    console.log(`Offer from client\n${desc.sdp}`);
    try {
      await peerConnection.setLocalDescription(desc);
      onSetLocalSuccess(peerConnection);
      console.log("sending offer to server..");
         send({
             type: "offer",
             offer: desc
         });
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
}

//This function will send webRTC answer to server for offer request.
 function make_answer() {
     var name ='';
    create_videocall_page();
    permission_camera_before_call(false,name);
}

//This function will create the webRTC answer for offer.
async function creating_answer() {
    try {
      await peerConnection.setRemoteDescription(conn_offer);
      onSetRemoteSuccess(peerConnection);
      peerConnection.addEventListener('icecandidate', e => icecandidateAdded(e));
    } catch (e) {
      onSetSessionDescriptionError(e);
      clear_incoming_modal_popup(); /*remove modal when any error occurs */
    }
    console.log("creating answer..");
    try {
        const answer = await peerConnection.createAnswer();
        console.log(" answer created = "+ answer);
        await onCreateAnswerSuccess(answer);
      } catch (e) {
        onCreateSessionDescriptionError(e);
    }
}

//This function will handle local description of peer user
async function onCreateAnswerSuccess(desc) {
    console.log('peer setLocalDescription start');
    try {
      await peerConnection.setLocalDescription(desc);
      onSetLocalSuccess(peerConnection);
    } catch (e) {
      onSetSessionDescriptionError(e);
      clear_incoming_modal_popup(); /*remove modal when any error occurs */
    }
    //store the answer
    conn_answer = desc;
    console.log("sending answer to server..");
    send({
             type: "answer",
             answer: conn_answer
        });   
  }

//This function will print log of local description error
function onCreateSessionDescriptionError(error) {
    console.log(`Failed to create session description: ${error.toString()}`);
}

//This function will print log of local description sucess
function onSetLocalSuccess(pc) {
    console.log(`setLocalDescription complete`);
}

//This function will print log of remote description sucess
function onSetRemoteSuccess(pc) {
    console.log(`setRemoteDescription complete`);
}

 //This function will print log of remote description error 
function onSetSessionDescriptionError(error) {
    console.log(`Failed to set session description: ${error.toString()}`);
}

//This function will handle when another user answers to our offer .
 async function onAnswer(answer) { 
    document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Waiting for a answer from user..Please wait ..");
    try {
        await peerConnection.setRemoteDescription(answer);
        onSetRemoteSuccess(peerConnection);
      } catch (e) {
        onSetSessionDescriptionError(e);
      }
    send({
        type: "ready"
    });
}

//This function will handle the login message from server If it is success, it will initiate the webRTC RTCPeerconnection.
 function onLogin(success) {
    if (success === false) {
        alert("Username is already taken .. choose different one");
    } else {
        Update_user_status("clientuser_status","online");
        document.getElementById('signupStart').setAttribute('style', 'display:none');
    }
}

function check_user_status(status, name)
{
    if(status == false)
    {
         //availble user enable the chat window
         Create_Popup_Notifications();
         //make an offer 
         document.getElementById('dynamic_progress_text').setAttribute('data-loading-text', "Creating a connection .. Please wait..");
         //check camera permission before connection
         create_videocall_page();
         permission_camera_before_call(true,name);
    }
    else
    {
        //busy user
        document.getElementById('divStart').removeAttribute('style');
        document.getElementById('chatPanel').setAttribute('style', 'display:none');
        populate_error("busyuser");
    }
}

 // This function will throw messages to user when other 
 //user has left from the Browser/Connection (If user already in call)
function left_from_server() {
    if (chat_window_flag == true) {
        Delete_webrtc_connection();
        //you are in a call
        document.getElementById('divStart').removeAttribute('style');
        document.getElementById('chatPanel').setAttribute('style', 'display:none');
        populate_error("user_unavailble");
    }
}

 //This function will create a message for user dynamically
 //when the room is created sucessfully.
function update_connection_status(textid) {
    var messageDisplay = '';
    var message;
    if(textid == "success")
    {
        message = "WebRTC Chat room is created sucessfully.. Happy chatting !!.";
    }
    else if(textid == "datachannel")
    {
        message = "Error: WebRTC Data channel is not open.. Please leave room and try again";
    }
    else
    {
        message = "NA";
    }
    messageDisplay += "<div class='alert alert-success' role='alert'>" +
        "<p class='mb-0'>"+message+"</p>" +
        "</div>";
    document.getElementById('text-chat').innerHTML = messageDisplay;
}

//This function will terminate the webRTC room.
function DisposeRoom() {
    Delete_webrtc_connection();
    chat_window_flag = false;
    document.getElementById('divStart').removeAttribute('style');
    document.getElementById('chatPanel').setAttribute('style', 'display:none');
    populate_error("endcall");
    document.getElementById('messages_video').innerHTML ='';
    count_message = 0;
    handleVisibilityChange(); //if we recive any message and user is in another tab
}

//This function will delete the webRTC connections.
function Delete_webrtc_connection()
{
    Update_user_status("clientuser_status","online");
    //close all the data channel
    if(flag_send_datachannel == true)
    {
        // close the send datachannel 
        Send_dataChannel.close();
        flag_send_datachannel = false;
    }else
    {
        //close the receive datachannel 
        if(Receive_dataChannel)
        {
            Receive_dataChannel.close();
        }
    }

    // return the gloabl variable value to normal 
    connectedUser = null;
    m_PeerVideo.src = "";
    peerConnection.onicecandidate = null;
    peerConnection.onaddstream = null;
    
    //stop the camera and return to normal status 
    m_client_Video.src = "";
    current_client_stream.getAudioTracks()[0].stop();
    current_client_stream.getVideoTracks()[0].stop();

    //close the RTCpeerConnection 
    peerConnection.close();
    peerConnection = null;
    // clear the chat window 
    document.getElementById('text-chat').innerHTML ='';
}

//This function will send messages to server when user reject the offer from other user.
function reject_answer() {
    send({
        type: "busy"
    });
    clear_incoming_modal_popup();
    chat_window_flag = false;
    incoming_popup_set = false;
}

//This function will send message to server if user want to leave from the room.
function Leaveroom() {
    send({
        type: "leave"
    });
}

//This function will send offer to peer user when user click the chat window
function call_user(name) {
    if (chat_window_flag == true) {
        //already in a room
        populate_error("inaroom");
    }
    else {
        var otherUsername = name;
        connectedUser = otherUsername;

        if (otherUsername.length > 0) {
            
            send({
                type: "want_to_call",
                name: otherUsername
            });
        }
    }
}

//This function will handle when somebody wants to call us 
function onOffer(offer, name) {
    console.log("somebody wants to call us  => offer = "+ offer);
    connectedUser = name;
    conn_offer = offer;
    /*create a popup to accept/reject room request*/
    create_request_room_Modal(name);
}

//This function will remove all the UI popup when the room is created sucessfully.
function user_is_ready(val, peername) {
    if (val == true) {
        document.getElementById('divChatName_peername').innerHTML = peername;
        //clear all dynamic datas
        clear_incoming_modal_popup();
        clear_outgoing_modal_popup();

        Update_user_status("clientuser_status","busy");
        Update_user_status("peeruser_status","busy");
        
        activate_chat_window();
        loadAllEmoji();
        update_connection_status("success");

        chat_window_flag = true;
        incoming_popup_set = false;
        outgoing_popup_set = false;

        var connectionState = RTCPeerConnection.connectionState;
        console.log("RTCPeerConnection.connectionState = "+RTCPeerConnection.connectionState);
    }
}
//This function will send the messages with webRTC data channel.
function SendMessage() {
    var txtmessage = document.getElementById('txtMessage').value;
    if (txtmessage != '') {
        if (flag_send_datachannel == true) {
            Send_dataChannel.send(txtmessage);
            UpdateChatMessages(txtmessage, true);
            //remove current text 
            document.getElementById('txtMessage').value = '';
            document.getElementById('txtMessage').focus();
        }
        else if (flag_send_datachannel == false)
        {
            Receive_dataChannel.send(txtmessage);
            UpdateChatMessages(txtmessage, true);
            //remove current text 
            document.getElementById('txtMessage').value = '';
            document.getElementById('txtMessage').focus();
        }
        else
        {
            update_connection_status("datachannel");
        }
    }
}
