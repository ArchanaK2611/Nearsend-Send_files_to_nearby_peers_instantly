const { app, BrowserWindow } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Allows direct access to Node.js in renderer
            contextIsolation: false // Prevents the need for preload.js
        }
    });

    mainWindow.loadFile('index.html');
});

// Global shared data (Accessible in renderer)
global.sharedData = {
    theme: "light",
    peers: [
        { id: 1, name: "Peer 1", ip: "192.168.1.10" },
        { id: 2, name: "Peer 2", ip: "192.168.1.11" }
    ]
};
