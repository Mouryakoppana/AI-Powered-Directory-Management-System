# 🤖 AI-Powered Directory Management System

> A smart web-based file organization system that automatically analyzes files and categorizes them into meaningful groups using extension-based rules and adaptive user-defined categorization.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222222?style=for-the-badge&logo=github)

---

## 📌 Overview

The **AI-Powered Directory Management System** is a lightweight browser-based application designed to simplify file organization.

The system analyzes file extensions and automatically categorizes files into different groups such as:

- 📄 Documents
- 🖼️ Images
- 🎵 Audio
- 🎬 Videos
- 💻 Code
- 📦 Archives
- 📁 Custom Categories
- ❓ Others

The application also supports **adaptive categorization**. When an unknown file extension is detected, the user can define a category for it. The new rule is stored locally in the browser and can be reused in future sessions.

> **Note:** The current web version is a simulation. It analyzes and categorizes selected files in the interface but does not physically move files on the user's computer.

---

## ✨ Features

### 📂 File & Folder Selection

Users can select:

- Multiple individual files
- An entire folder

The application uses browser file-selection capabilities to process the selected files.

### 🧠 Smart File Categorization

Files are categorized according to their extensions.

Example:

```text
document.pdf   → Documents
photo.jpg      → Images
song.mp3       → Audio
movie.mp4      → Videos
program.cpp    → Code
archive.zip    → Archives
