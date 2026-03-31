# 🔐 File Encryption & Decryption App

A desktop application for securely encrypting and decrypting files, built with **Electron JS** using HTML and JavaScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![Language](https://img.shields.io/badge/language-JavaScript%20%7C%20HTML-yellow)
![Framework](https://img.shields.io/badge/framework-Electron-47848F?logo=electron)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building & Packaging](#building--packaging)
- [Using the App](#using-the-app)
- [Security Notes](#security-notes)
- [Release](#release)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**File Encryption & Decryption** is a cross-platform desktop application that allows users to protect sensitive files by encrypting them with a password or key, and to restore them by decrypting previously encrypted files. Built on top of Electron JS, the app brings the power of Node.js cryptography into an accessible desktop interface powered by web technologies (HTML, CSS, JavaScript).

Whether you want to secure personal documents, sensitive data, or any file type, this app provides a straightforward interface to do so without needing command-line knowledge.

---

## Features

- 🔒 **File Encryption** — Select any file and encrypt it with a secure key/password
- 🔓 **File Decryption** — Restore encrypted files back to their original form
- 🖥️ **Cross-platform** — Works on Windows, macOS, and Linux
- 🗂️ **File Picker** — Native OS file selection dialog for choosing input files
- 💡 **Simple UI** — Clean and intuitive HTML-based interface
- 📦 **Standalone Installer** — Packaged as a native desktop installer (no browser needed)

---

## Tech Stack

| Technology | Role |
|---|---|
| [Electron JS](https://www.electronjs.org/) | Desktop application framework |
| HTML / CSS | User interface |
| JavaScript | Application logic & crypto operations |
| Node.js `crypto` module | Encryption/decryption implementation |

---

## Project Structure

```
FileEncryptionDecryption/
│
├── Source Codes/
│   ├── main.js              # Electron main process (app entry point)
│   ├── index.html           # Main UI (renderer process)
│   ├── renderer.js          # Frontend logic (file handling, UI events)
│   ├── package.json         # Project metadata and dependencies
│   └── ...                  # Additional assets/stylesheets
│
└── Application Documentation.pdf   # Full app documentation
```

---

## Prerequisites

Make sure you have the following installed before running or building the project:

- **[Node.js](https://nodejs.org/)** (v16 or higher recommended)
- **[npm](https://www.npmjs.com/)** (comes with Node.js)
- **[Git](https://git-scm.com/)** (to clone the repository)

You can verify your versions by running:

```bash
node -v
npm -v
```

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/hfqhi/FileEncryptionDecryption.git
cd FileEncryptionDecryption/Source\ Codes
```

2. **Install dependencies:**

```bash
npm install
```

---

## Running the App

After installing dependencies, start the app in development mode:

```bash
npm start
```

This will launch the Electron window with the File Encryption & Decryption interface.

---

## Building & Packaging

To package the application into a platform-specific installer:

```bash
# Install electron-builder (if not already a devDependency)
npm install --save-dev electron-builder

# Build for your current platform
npm run build
```

Or, to target a specific platform:

```bash
# Windows
npm run build -- --win

# macOS
npm run build -- --mac

# Linux
npm run build -- --linux
```

> Pre-built installers for **v1.0.0** are also available in the [Releases](https://github.com/hfqhi/FileEncryptionDecryption/releases/tag/v1.0.0) section.

---

## Using the App

### Encrypting a File

1. Launch the application.
2. Click **"Select File"** to browse and choose the file you want to encrypt.
3. Enter an **encryption key/password** in the provided input field.
4. Click **"Encrypt"**.
5. The encrypted output file will be saved to your chosen destination.

### Decrypting a File

1. Launch the application.
2. Click **"Select File"** and choose the previously encrypted file.
3. Enter the **same key/password** used during encryption.
4. Click **"Decrypt"**.
5. The original file will be restored and saved.

> ⚠️ **Important:** If you lose or forget the encryption key, the file **cannot be recovered**. Always store your key in a safe place.

---

## Security Notes

- Encryption is handled using Node.js's built-in `crypto` module.
- Files are encrypted using a symmetric encryption algorithm (e.g., AES).
- The encryption key is never stored by the application — it is the user's sole responsibility to remember or securely store their key.
- Always keep backups of important files before encrypting them.

---

## Release

The latest release **v1.0.0** includes native installers for supported platforms.

📥 [Download v1.0.0 Installers](https://github.com/hfqhi/FileEncryptionDecryption/releases/tag/v1.0.0)

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and is well-commented.

---

## License

This project is open source. See the repository for license details.

---

> 📄 For detailed technical documentation, refer to [Application Documentation.pdf](./Application%20Documentation.pdf) included in the repository.
