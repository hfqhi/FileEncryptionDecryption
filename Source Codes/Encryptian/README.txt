# File EncrypTian - Electron Application

## OVERVIEW
File EncrypTian is a desktop application that encrypts files using AES encryption with a 4-digit PIN. After encryption, the original file is automatically deleted for security.

## HOW TO INSTALL

1. Make sure Node.js is installed on your computer
   - Download from: https://nodejs.org/

2. Place all these files in one folder:
   - main.js
   - preload.js
   - index.html
   - package.json

3. Open terminal/command prompt in that folder

4. Run these commands:
   npm install
   npm start

## HOW TO USE

1. Launch the application by running: npm start

2. Click "Choose File" button to select a file you want to encrypt

3. Enter a 4-digit PIN (example: 1234)
   - PIN must be exactly 4 numbers
   - Remember this PIN - you'll need it to decrypt later

4. Click "Encrypt File" button

5. The encrypted file will be saved with ".encrypted" extension
   - Example: essay.docx becomes essay.docx.encrypted
   - The original file (essay.docx) is PERMANENTLY DELETED

## HOW THE CODE WORKS

### main.js (Main Process)
- Creates the Electron application window
- Handles file selection dialog using Electron's native dialog
- Reads the selected file from the filesystem
- Saves the encrypted file and deletes the original file

### preload.js (Bridge)
- Connects the renderer process (web page) to the main process
- Provides secure communication between UI and filesystem
- Exposes two functions: selectFile() and saveEncryptedFile()

### index.html (UI and Encryption Logic)
- Displays the user interface (dark theme)
- Handles user interactions (file selection, PIN input, encrypt button)
- Performs AES encryption using CryptoJS library
- Creates SHA-256 hash of PIN for verification
- Stores encrypted data in JSON format with metadata

### package.json (Configuration)
- Defines the Electron application settings
- Lists dependencies (Electron framework)
- Contains startup command

## ENCRYPTION PROCESS

1. User selects a file (any type: documents, images, videos, etc.)
2. User enters a 4-digit PIN
3. Application reads the file as binary data
4. File content is encrypted using AES encryption with the PIN as key
5. PIN is hashed using SHA-256 (for verification without storing actual PIN)
6. Encrypted data + metadata is saved as JSON file
7. Original file is permanently deleted from disk

## ENCRYPTED FILE FORMAT

The .encrypted file contains JSON data:
{
  "fileName": "original_name.ext",
  "fileType": "",
  "encryptedContent": "base64_encrypted_data",
  "verification": "sha256_hash_of_pin"
}

## SECURITY NOTES

- The original file is PERMANENTLY DELETED after encryption
- Make sure you remember your PIN - there is no recovery method
- The PIN is not stored anywhere - only its hash is saved
- Keep your encrypted files and PIN in safe locations

## TROUBLESHOOTING

Problem: "npm: command not found"
Solution: Install Node.js from nodejs.org

Problem: Application won't start
Solution: Run "npm install" first, then "npm start"

Problem: File not loading
Solution: Make sure you click the file input once and select a file

Problem: "PIN must be exactly 4 digits" error
Solution: Enter only 4 numbers (0-9), no letters or special characters

## FILE STRUCTURE

your-app-folder/
├── main.js          (Main process - handles filesystem)
├── preload.js       (Security bridge)
├── index.html       (UI and encryption logic)
├── package.json     (App configuration)
├── node_modules/    (Created after npm install)
└── README.txt       (This file)

## TECHNICAL DETAILS

- Framework: Electron
- Encryption: AES (Advanced Encryption Standard)
- Hashing: SHA-256
- Crypto Library: CryptoJS 4.1.1
- Context Isolation: Enabled (for security)
- Node Integration: Disabled (for security)

## IMPORTANT WARNINGS

⚠ The original file is DELETED after encryption - this cannot be undone
⚠ If you lose your PIN, you cannot decrypt the file
⚠ Keep backups of important files before encrypting
⚠ Test with non-important files first