# File DecryptJohn - Electron Application

## OVERVIEW
File DecryptJohn is a desktop application that decrypts files encrypted by File EncrypTian. It uses a brute-force attack to discover the 4-digit PIN and then decrypts the file. After decryption, the encrypted file is automatically deleted.

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

2. Click "Choose File" button to select an encrypted file (.encrypted extension)

3. Click "Show Password" button
   - The program will try all 10,000 possible PINs (0000-9999)
   - This takes a few seconds
   - The correct PIN will be displayed automatically

4. Enter the displayed PIN in the "Enter Password" field
   - Or enter any PIN if you already know it

5. Click "Decrypt and Download" button

6. The decrypted file will be saved in the same location as the encrypted file
   - Example: essay.docx.encrypted becomes essay.docx
   - The encrypted file (.encrypted) is PERMANENTLY DELETED

## HOW THE CODE WORKS

### main.js (Main Process)
- Creates the Electron application window
- Handles encrypted file selection using Electron's native dialog
- Filters to show only .encrypted files
- Reads the encrypted file content as text (JSON format)
- Saves the decrypted file to disk
- Deletes the encrypted file after successful decryption

### preload.js (Bridge)
- Connects the renderer process (web page) to the main process
- Provides secure communication between UI and filesystem
- Exposes two functions: selectFile() and saveDecryptedFile()

### index.html (UI and Decryption Logic)
- Displays the user interface (dark theme)
- Handles user interactions (file selection, show password, decrypt)
- Performs brute-force PIN discovery (tries 0000-9999)
- Uses SHA-256 hashing to verify PIN matches
- Performs AES decryption using CryptoJS library
- Converts decrypted data back to original file format

### package.json (Configuration)
- Defines the Electron application settings
- Lists dependencies (Electron framework)
- Contains startup command

## DECRYPTION PROCESS

1. User selects an encrypted file (.encrypted extension)
2. User clicks "Show Password" button
3. Application reads encrypted file and parses JSON data
4. Brute-force attack: Tries all PINs from 0000 to 9999
   - Each PIN is hashed with SHA-256
   - Hash is compared with stored verification hash
   - When match is found, correct PIN is displayed
5. User enters the PIN (or uses the discovered PIN)
6. Application verifies PIN by hashing and comparing
7. If correct: File content is decrypted using AES
8. Decrypted file is saved to disk with original filename
9. Encrypted file is permanently deleted

## ENCRYPTED FILE FORMAT

The .encrypted file contains JSON data:
{
  "fileName": "original_name.ext",
  "fileType": "",
  "encryptedContent": "base64_encrypted_data",
  "verification": "sha256_hash_of_pin"
}

## BRUTE-FORCE ATTACK EXPLANATION

The "Show Password" feature uses a brute-force method:
- There are only 10,000 possible 4-digit PINs (0000-9999)
- The program tries each PIN one by one
- For each PIN: hash it with SHA-256 and compare with stored hash
- When hashes match, the correct PIN is found
- This usually takes 1-5 seconds on modern computers

This demonstrates why 4-digit PINs are not secure for file encryption - they can be cracked in seconds!

## SECURITY NOTES

- 4-digit PINs provide minimal security (can be cracked in seconds)
- The encrypted file is PERMANENTLY DELETED after decryption
- Make sure to keep backups if you need the encrypted version
- The decrypted file is saved in the same location as the encrypted file

## TROUBLESHOOTING

Problem: "npm: command not found"
Solution: Install Node.js from nodejs.org

Problem: Application won't start
Solution: Run "npm install" first, then "npm start"

Problem: File not loading
Solution: Make sure you click the file input once and select a .encrypted file

Problem: "Invalid encrypted file format" error
Solution: The file must be created by File EncrypTian and be valid JSON

Problem: "Decryption failed" error
Solution: The file may be corrupted or the PIN is incorrect

## FILE STRUCTURE

your-app-folder/
├── main.js          (Main process - handles filesystem)
├── preload.js       (Security bridge)
├── index.html       (UI and decryption logic)
├── package.json     (App configuration)
├── node_modules/    (Created after npm install)
└── README.txt       (This file)

## TECHNICAL DETAILS

- Framework: Electron
- Decryption: AES (Advanced Encryption Standard)
- Hashing: SHA-256
- Crypto Library: CryptoJS 4.1.1
- Brute-force Speed: ~10,000 hashes per second
- Context Isolation: Enabled (for security)
- Node Integration: Disabled (for security)

## IMPORTANT WARNINGS

⚠ The encrypted file is DELETED after decryption - this cannot be undone
⚠ 4-digit PINs are NOT secure (can be cracked in seconds)
⚠ Keep backups of encrypted files if you need them
⚠ Test with non-important files first

## RELATIONSHIP TO FILE ENCRYPTIAN

This decryptor is designed to work with files encrypted by File EncrypTian:
- Both use the same AES encryption algorithm
- Both use SHA-256 for PIN verification
- Both use the same JSON file format
- Encrypted files from EncrypTian can be decrypted by DecryptJohn
- After decryption, the original encrypted file is deleted (just like encryption deletes the original unencrypted file)