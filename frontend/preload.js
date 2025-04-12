const { contextBridge, ipcRenderer, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipAddress: (ip) => ipcRenderer.send('set-ip', ip),
  acknowledgeDuressAlert: () => ipcRenderer.send('acknowledgeDuress'),
  acknowledgementReceived: () => ipcRenderer.on('acknowledgement', deviceName),
  // Variables can be exposed here not just functions
})


