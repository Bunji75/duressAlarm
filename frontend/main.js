const { app, Tray, Menu, nativeImage } = require('electron');
const { globalShortcut } = require('electron/main');

let tray

app.whenReady().then(() => {

	// This is the icon that shows on the toolbar
	const icon = nativeImage.createFromPath('./images/tempimage.png');
	tray = new Tray(icon);
	// This is the menu items that show when you right click the icon
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' }
	])
	tray.setContextMenu(contextMenu);
	// This is the tool tip that shows when you hover over the icon
	tray.setToolTip('This is my duress alarm');
	tray.setTitle('This is a title');

	// This is the global shortcut that will trigger the alarm
	globalShortcut.register('Ctrl+Shift+E', () => {
		console.log('The alarm has been activated');
	})

})



console.log('Hello from Electron');
