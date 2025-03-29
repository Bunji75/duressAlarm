const { app, ipcMain, Tray, Menu, nativeImage, BrowserWindow } = require('electron');
const { globalShortcut, Notification } = require('electron/main');
const io = require('socket.io-client');
const path = require('node:path');

const socket = io("http://192.168.20.54:3000");


function sendDuressAlert() {
	const alertData = {
		user: "John Doe",
		timestamp: new Date().toISOString(),
		location: "Room 4",
	};

	socket.emit("duress-alert", alertData);
}

let tray

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		},
	});
	win.loadFile('index.html');
}


app.whenReady().then(() => {


	ipcMain.handle('serverIP', () => 'ping')


	// This is the icon that shows on the toolbar
	const icon = nativeImage.createFromPath('./images/tempimage.png');
	tray = new Tray(icon);
	// This is the menu items that show when you right click the icon
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Quit', type: 'normal', role: 'quit' }
	])
	tray.setContextMenu(contextMenu);
	// This is the tool tip that shows when you hover over the icon
	tray.setToolTip('This is my duress alarm');
	tray.setTitle('This is a title');

	// This is the global shortcut that will trigger the alarm
	globalShortcut.register('Ctrl+Shift+E', () => {
		console.log('The alarm has been activated');
		sendDuressAlert();
	})

	createWindow();
})

app.on('window-all-closed', () => { })

socket.on("receive-alert", (data) => {
	console.log("Alert Received:", data);
	const NotificationTitle = "Duress Alert";
	const NotificationBody = `Alert from ${data.user} at ${data.location}`;
	new Notification({
		title: NotificationTitle,
		body: NotificationBody
	}).show();
});

