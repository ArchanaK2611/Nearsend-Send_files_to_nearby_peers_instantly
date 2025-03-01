const WebSocket = require("ws");

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

let peers = {}; // Store connected peers { peerID: socket }

wss.on("connection", (ws) => {
    const peerID = generatePeerID();
    peers[peerID] = ws;
    console.log(`🔗 Peer connected: ${peerID}`);

    // Send the updated peer list to all clients
    broadcastPeers();

    // Handle incoming messages
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "discover") {
                ws.send(JSON.stringify({ type: "peer-list", peers: Object.keys(peers) }));
            }

            if (data.type === "ping") {
                if (peers[data.peerID]) {
                    peers[data.peerID].send(JSON.stringify({ type: "ping-request", from: peerID }));
                }
            }

            if (data.type === "connect") {
                if (peers[data.peerID]) {
                    peers[data.peerID].send(JSON.stringify({ type: "connect-request", from: peerID }));
                }
            }
        } catch (error) {
            console.error("Error processing message:", error);
        }
    });

    // Handle disconnection
    ws.on("close", () => {
        delete peers[peerID];
        console.log(`❌ Peer disconnected: ${peerID}`);
        broadcastPeers();
    });

    ws.on("error", (err) => {
        console.error(`⚠️ WebSocket error for ${peerID}:`, err.message);
    });
});

// Send updated peer list to all clients
function broadcastPeers() {
    const peerIDs = Object.keys(peers);
    peerIDs.forEach((id) => {
        if (peers[id].readyState === WebSocket.OPEN) {
            peers[id].send(JSON.stringify({ type: "peer-list", peers: peerIDs }));
        }
    });
}

// Generate a unique peer ID
function generatePeerID() {
    return "Peer-" + Math.floor(Math.random() * 10000);
}

console.log(`🖥️ WebSocket server running on ws://localhost:${PORT}`);
