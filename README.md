# PS — Pritam Saha | Business Web Application

A full-stack business web application built as part of a Full-Stack Developer Evaluation Assignment. Demonstrates frontend, backend, database, and REST API skills.

---

## 🔗 Links

- **Live URL:** [Click Here](https://smallbusinessweb.xo.je/)
- **GitHub:** [Click Here](https://github.com/IAmPritamSaha/small-business-web-application)

---

## ✅ Features

### 1. Landing Page
- Company name and hero section
- About / features section
- Contact form (Name, Email, Message)

### 2. User Authentication
- User registration with form validation
- Login with session handling via localStorage
- Passwords hashed using **bcrypt** (`password_hash` / `password_verify`)
- No plain-text passwords stored in the database

### 3. Dashboard (After Login)
- Displays logged-in user's name
- Shows stats — total messages received, total registered users
- Recent messages table
- Logout button

### 4. Contact Form
- Collects Name, Email, Message
- Submitted data stored in MySQL database via PHP REST API
- Client-side and server-side validation both included

### 5. Admin Panel ⭐
- View all contact form submissions in a table
- Search / filter by name or email
- Click any row to view the full message in a modal

---

## ⚙️ Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | HTML5, CSS3, Vanilla JS     |
| Backend    | PHP 8                       |
| Database   | MySQL                       |
| API Style  | REST (JSON responses)       |
| Hosting    | InfinityFree                |

---

## 📁 Project Structure

```
/
├── index.html          # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # User dashboard (auth protected)
├── admin.html          # Admin panel (auth protected)
├── style.css           # All styles (single file)
├── main.js             # Landing page JS (contact form, nav)
├── auth.js             # Login & register JS
├── dashboard.js        # Dashboard JS
├── admin.js            # Admin panel JS
├── db.php              # Database connection & helper functions
├── register.php        # POST /register.php
├── login.php           # POST /login.php
├── contact.php         # POST /contact.php
├── messages.php        # GET  /messages.php
├── stats.php           # GET  /stats.php
└── setup.sql           # Database schema (run once)
```

---

## 🚀 Setup Instructions (Local)

### Requirements
- PHP 8.0+
- MySQL 5.7+
- Apache server (XAMPP / WAMP / LAMP)

### Steps

**1. Clone or download the project**
```bash
git clone https://github.com/pritamsaha/business-app.git
```
Or just download and extract the ZIP.

**2. Place in server root**
- XAMPP (Windows): `C:/xampp/htdocs/business-app/`
- LAMP (Linux): `/var/www/html/business-app/`

**3. Create the database**

Open **phpMyAdmin** and run the contents of `setup.sql`, or use terminal:
```bash
mysql -u root -p < setup.sql
```

This creates:
- Database: `ps_db`
- Table: `users` (id, name, email, password, created_at)
- Table: `messages` (id, name, email, message, created_at)

**4. Configure database connection**

Open `db.php` and update if needed:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');      // your MySQL username
define('DB_PASS', '');          // your MySQL password
define('DB_NAME', 'ps_db');
```

**5. Open in browser**
```
http://localhost/business-app/index.html
```

---
## 🔌 REST API Endpoints

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| POST   | /register.php    | Register a new user                |
| POST   | /login.php       | Login and return user name         |
| POST   | /contact.php     | Submit contact form (saved to DB)  |
| GET    | /messages.php    | Get all contact submissions        |
| GET    | /stats.php       | Get total users and message count  |

All endpoints return JSON:
```json
{ "success": true, "message": "..." }
```

---

## 📸 Pages Overview

| Page             | URL                  | Access       |
|------------------|----------------------|--------------|
| Landing Page     | /index.html          | Public       |
| Register         | /register.html       | Public       |
| Login            | /login.html          | Public       |
| Dashboard        | /dashboard.html      | Login only   |
| Admin Panel      | /admin.html          | Login only   |

---

## 👤 Author

**Pritam Saha**
📧 sahapritam968@gmail.com
📞 +91 6290652802

---

## 📅 Submission

Submitted before **April 24, 2026 — 4:00 PM** as per deadline.
