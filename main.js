const {app, BrowserWindow, Menu, Tray, dialog, ipcMain} = require('electron');
window.$ = window.jQuery = require('jquery');

let mainWindow = null;
let infoWindow = null;

// Prevent the app from showing in the dock
app.dock.hide();

function showMainWindow() {
    // If the main window hasn't been displayed yet, display it.
    // If the main window is already being displayed, focus on it.
    if (mainWindow == null) {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });

        mainWindow.loadFile('index.html');
    } else {
        mainWindow.focus();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function showInfoWindow() {
    // If the info window hasn't been displayed yet, display it.
    // If the info window is already being displayed, focus on it.
    if (infoWindow == null) {
        infoWindow = new BrowserWindow({
            width: 200,
            height: 300,
            webPreferences: {
                nodeIntegration: true
            }
        });

        infoWindow.loadFile('info.html');
    } else {
        infoWindow.focus();
    }

    infoWindow.on('closed', () => {
        infoWindow = null;
    });
}


// Prevent closing the app when all windows are closed (keep running in menubar)
app.on('window-all-closed', e => e.preventDefault());

// Menubar Icon Settings
let appIcon = null;
app.on('ready', () => {
    menubarIcon = new Tray('static/images/icons/AppleCIDR_16.png');
    menubarIcon.setToolTip('AppleCIDR');

    // On single left click, show the main window.
    menubarIcon.on('click', () => {
        showMainWindow()
    });

    $('#info').innerHTML(app.getVersion());
});

// Set about panel information
app.setAboutPanelOptions({
    applicationName: 'AppleCIDR',
    applicationVersion: app.getVersion(),
    copyright: 'Tyler Wright',
});

ipcMain.on('open-info', function(){
    showInfoWindow()
});