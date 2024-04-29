const WebSocket = require('ws');

// Replace 'wss://cometbft.example.com/ws' with your CometBFT WebSocket server URL
const socket = new WebSocket('ws://127.0.0.1:26657/websocket');

// Event listener for when the connection is opened
socket.addEventListener('open', function () {
    console.log('Connected to CometBFT WebSocket server');
    
    // Subscribe to events
    const subscribeRequest = {
        jsonrpc: '2.0',
        method: 'subscribe',
        id: '0',
        params: {
            query: "tm.event='Tx' AND transfer.recipient='cosmos1dw0na20g3pjy5jdz6wt63ymz3rsldnxrjsauza'"
        }
    };

    socket.send(JSON.stringify(subscribeRequest));
});

// Event listener for when a message is received from the server
socket.addEventListener('message', function (event) {
    // console.log('Message from CometBFT server:', event.type);
    const eventData = JSON.parse(event.data);
    console.log(eventData["result"]);
});

// Event listener for when an error occurs
socket.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
});

// Event listener for when the connection is closed
socket.addEventListener('close', function () {
    console.log('Connection to CometBFT WebSocket server closed');
});
