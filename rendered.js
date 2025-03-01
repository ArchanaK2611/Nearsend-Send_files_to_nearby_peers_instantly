const { ipcRenderer } = require('electron');

// Listen for theme updates
ipcRenderer.on('theme-update', (_, theme) => {
    document.body.className = theme;
});

// Send request to toggle theme
document.getElementById('theme-toggle').addEventListener('click', () => {
    ipcRenderer.send('toggle-theme');
});

// Discover Peers
document.getElementById('discover-peers').addEventListener('click', () => {
    ipcRenderer.send('discover-peers');
});

ipcRenderer.on('peer-discovered', (_, peer) => {
    const peerList = document.getElementById('peer-list');
    const listItem = document.createElement('li');
    listItem.textContent = peer;
    peerList.appendChild(listItem);
});
