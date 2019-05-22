const { remote, ipcRenderer } = require('electron');


function quitApp() {
    // Upon calling this function, the app will be closed completely.
    remote.app.exit(0);
}

function showInfo() {
    ipcRenderer.send('open-info-window')
}