const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 750,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle file selection
ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Encrypted Files', extensions: ['encrypted'] }
        ]
    });
    
    if (result.canceled) {
        return null;
    }
    
    const filePath = result.filePaths[0];
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    return {
        path: filePath,
        content: fileContent
    };
});

// Handle saving decrypted file and deleting encrypted file
ipcMain.handle('save-decrypted-file', async (event, { encryptedPath, decryptedData, fileName }) => {
    // Remove .encrypted extension from path
    const decryptedPath = encryptedPath.replace(/\.encrypted$/, '');
    const directory = path.dirname(decryptedPath);
    const finalPath = path.join(directory, fileName);
    
    // Convert base64 or array data to buffer
    let buffer;
    if (typeof decryptedData === 'string') {
        buffer = Buffer.from(decryptedData, 'base64');
    } else {
        buffer = Buffer.from(decryptedData);
    }
    
    // Save decrypted file
    await fs.writeFile(finalPath, buffer);
    
    // Delete encrypted file
    await fs.unlink(encryptedPath);
    
    return { success: true };
});