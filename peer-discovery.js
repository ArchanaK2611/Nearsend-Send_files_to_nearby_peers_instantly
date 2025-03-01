const mdns = require('multicast-dns')();
const os = require('os');

const PEER_SERVICE_NAME = 'file-share-service';
const HOSTNAME = os.hostname();

// Announce this device every 5 seconds
setInterval(() => {
    mdns.respond({
        answers: [{
            name: PEER_SERVICE_NAME,
            type: 'A',
            ttl: 300,
            data: HOSTNAME
        }]
    });
}, 5000);

// Listen for other peers
mdns.on('query', (query) => {
    query.questions.forEach(question => {
        if (question.name === PEER_SERVICE_NAME) {
            console.log(`🔍 Found Peer: ${query.questions[0].name}`);
        }
    });
});

console.log(`🔵 Peer discovery started. Listening for peers...`);
