const { remote, ipcRenderer } = require('electron');


function quitApp() {
    // Upon calling this function, the app will be closed completely.
    remote.app.exit(0);
}

function showInfo() {
    // Upon calling this function, the info window will be shown.
    ipcRenderer.send('open-info');
}