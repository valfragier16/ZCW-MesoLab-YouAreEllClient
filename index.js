import MessageService from "./message-service.js";

let userId = "valfragier16";
const messageService = new MessageService();
createFormListener();

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages()
        .then(successCallback, errorCallback);

    function successCallback(response) {
        // This data comes from the resolve method
        populateThread(response);
    }

    function errorCallback(response) {
        // This data comes from the reject method
        console.log(response);
    }
});

function populateThread(messages) {
    messages.forEach(message => {
        addMessageToThread(message);
    });
}

function createFormListener() {
    console.log("listening");
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        // stop the regular form submission
        event.preventDefault();
        console.log("subbed");

        const data = {
            fromid: userId,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            // This data comes from the resolve method
            addMessageToThread(response);
        }

        function errorCallback(response) {
            // This data comes from the reject method
            console.log(response);
        }
    }
}

function addMessageToThread(message) {
    const messageListItem = document.createElement("LI");
    const userIdHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIdContent = document.createTextNode(message.fromid);
    userIdHeading.appendChild(userIdContent);
    messageParagraph.appendChild(messageContent);
    messageListItem
        .appendChild(userIdHeading)
        .appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}