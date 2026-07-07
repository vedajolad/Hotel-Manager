# Hotel Manager REST API

## Project Overview

Hotel Manager REST API is a simple Full-Stack CRUD application developed using **React**, **Node.js**, **Express**, **SQLite (better-sqlite3)**, and **Vite**. It allows hotel staff to register customers, search records, update customer information, and delete customer records.

This project is designed for beginners to understand how a React frontend communicates with an Express backend using REST APIs and SQLite database.

---

# Technologies Used

### Frontend
- React
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- better-sqlite3
- CORS

### Database
- SQLite (data.db)

### API Testing
- Postman

---

# Project Folder Structure

```
Project
│
├── backend
│   └── server
│       └── index.js
│
├── frontend
│   └── apiDemo
│       └── src
│           ├── App.jsx
│           └── App.css
│
└── postman
    ├── Hotel-Manager-API.postman_collection.json
    └── Hotel-Manager.postman_environment.json
```

---

# Features

- Customer Registration
- Update Customer Details
- Delete Customer
- Search Customer
- Pagination
- Character Counter
- Loading Indicator
- Last Updated Time
- Avatar Initials
- Dark Mode
- REST API
- SQLite Database
- Postman Collection Included

---

# Database Table

**Hotel**

| Column | Type |
|---------|------|
| id | INTEGER (Primary Key) |
| name | TEXT |
| address | TEXT |
| date | TEXT |
| gender | TEXT |
| phone | TEXT |
| registered_at | TEXT |

---

# REST API Endpoints

## Create Customer

```
POST /customers
```

Request Body

```json
{
  "name":"Rahul",
  "address":"Belagavi",
  "date":"2026-07-07",
  "gender":"Male",
  "phone":"9876543210"
}
```

---

## Get All Customers

```
GET /customers
```

Example

```
GET /customers?page=1&limit=5&search=rahul
```

---

## Get Customer By ID

```
GET /customers/:id
```

Example

```
GET /customers/1
```

---

## Update Customer

```
PUT /customers/:id
```

---

## Delete Customer

```
DELETE /customers/:id
```

---

# Frontend Features

- Register Customer
- Edit Customer
- Delete Customer
- Search Customer
- Pagination
- Character Counter (40 Characters)
- Dark Mode
- Loading Indicator
- Customer Avatar
- Last Updated Time

---

# Installation

## Backend

```bash
cd backend/server

npm install

node index.js
```

Server starts at

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend/apiDemo

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Testing

Import the following files into Postman.

```
Hotel-Manager-API.postman_collection.json
```

and

```
Hotel-Manager.postman_environment.json
```

---

# Validation

- Name is Required
- Phone Number is Required
- Duplicate Address is Not Allowed
- Required Fields Return HTTP 400
- Duplicate Address Returns HTTP 409

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Created|
|400|Bad Request|
|404|Not Found|
|409|Duplicate Data|

---

# Screens

- Customer Registration Form
- Customer List
- Search Box
- Pagination
- Dark Mode
- Edit Customer
- Delete Customer

---

# Future Enhancements

- Login Authentication
- Room Booking Module
- Payment Management
- Room Availability
- Customer Reports
- Dashboard Analytics
- Export to PDF
- Email Notifications

---

# Author

Hotel Manager REST API Project

Developed using React, Express, SQLite (better-sqlite3), and Vite for learning Full-Stack CRUD application development.

---
