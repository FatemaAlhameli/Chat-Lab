window.addEventListener("load", () => {

    setInterval(() => {
        refreshMsgs();
    }, 2000);

    let chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let chatName = document.getElementById("chat-name").value;
        let chatMsg = document.getElementById("chat-msg").value;
        console.log("chat sent!", chatName, chatMsg);

        let msgObj = {
            "name": chatName,
            "msg": chatMsg,
            "updateAt": new Date()
        };

        let msgObjJSON = JSON.stringify(msgObj);
        console.log(msgObj);

        fetch('/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: msgObjJSON

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });

    });
});

function refreshMsgs() {
    fetch('/messages')
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data))
            document.getElementById("chat-msgs").innerHTML = "";
            let allChats = data.msgs;
            let li = "";
            allChats.forEach((chat) => {
                li += "<li class= 'msg-style'> " + chat.name + ":  " + chat.msg + " </li>"
            });
            document.getElementById("chat-msgs").innerHTML = li;
        });
}

// function refreshMsgs() {
//     fetch('/messages')
//         .then(res => res.json())
//         .then(data => {
//             console.log(JSON.stringify (data))
//             document.getElementById("chat-msgs").innerHTML = "";
//             let allChats = data.msgs;
//             allChats.forEach((chat) => {
//                 let chatContainer = document.createElement('li');
//                 let nameElt = document.createElement('p');
//                 let msgElt = document.createElement('p');
//                 nameElt.innerHTML = chat.name;
//                 msgElt.innerHTML = chat.msg;
//                 chatContainer.appendChild(nameElt);
//                 chatContainer.appendChild(msgElt);
//                 document.getElementById("chat-msgs").appendChild(chatContainer);
//             });
//         });

// }




