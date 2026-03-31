const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFile: () => ipcRenderer.invoke('select-file'),
    saveEncryptedFile: (data) => ipcRenderer.invoke('save-encrypted-file', data)
});