# User Management Admin Panel

A responsive user management admin panel built with **HTML, CSS, JavaScript, and JSON Server**.

## Features

* User login and authentication
* User registration
* Admin dashboard
* Display users in a table
* Add new users
* Edit user information
* Delete users
* User profile page
* Role-based user management
* Responsive design
* REST API with JSON Server

## Technologies

* HTML5
* CSS3
* JavaScript (ES6+)
* JSON Server
* Git & GitHub

## Project Structure

```text
user-management-admin-panel/
├── admin.html
├── login.html
├── register.html
├── profile.html
├── db.json
├── package.json
├── package-lock.json
├── js/
│   ├── admin.js
│   ├── login.js
│   ├── profile.js
│   └── register.js
├── styles/
│   ├── admin.css
│   ├── global.css
│   ├── login.css
│   ├── profile.css
│   └── register.css
└── .gitignore
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/itsmahyar-dev/user-management-admin-panel.git
cd user-management-admin-panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start JSON Server

```bash
npx json-server db.json
```

The API will be available at:

```text
http://localhost:3000
```

### 4. Run the project

Open the project with **VS Code** and run the frontend using a local development server.

## API Endpoints

```text
GET    /users
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

## Author

**Mahyar**

GitHub: https://github.com/itsmahyar-dev
