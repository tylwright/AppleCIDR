const {app, BrowserWindow, Tray, ipcMain} = require('electron');

// Windows
let mainWindow = null;
let infoWindow = null;

function showMainWindow() {
    // If the main window hasn't been displayed yet, display it.
    // If the main window is already being displayed, focus on it.
    if (mainWindow == null) {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        })

        mainWindow.loadFile('./app/main/index.html')
    } else {
        mainWindow.focus();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Prevent closing the app when all windows are closed (keep running in menubar)
app.on('window-all-closed', e => e.preventDefault());

// Menubar Icon Settings
app.on('ready', () => {
    menubarIcon = new Tray('static/images/icons/AppleCIDR_16.png');
    menubarIcon.setToolTip('AppleCIDR');

    // On single left click, show the main window.
    menubarIcon.on('click', () => {
        showMainWindow()
    });
});

// Set about panel information
app.setAboutPanelOptions({
    applicationName: 'AppleCIDR',
    applicationVersion: app.getVersion(),
    copyright: 'Tyler Wright',
});

// Prevent the app from showing in the dock
app.dock.hide();

// Info Panel
ipcMain.on('open-info-window', function () {
    // If the info window hasn't been displayed yet, display it.
    // If the info window is already being displayed, focus on it.
    if (infoWindow == null) {
        infoWindow = new BrowserWindow({
            width: 400,
            height: 200,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        })

        infoWindow.loadFile('./app/info/info.html')

        //infoWindow.toggleDevTools();
    } else {
        infoWindow.focus();
    }

    infoWindow.on('closed', () => {
        infoWindow = null;
    });
});