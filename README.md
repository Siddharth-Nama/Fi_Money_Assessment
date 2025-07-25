# 📦 Inventory Management System — Fi-Money Backend Assessment

This repository contains a Django REST API backend for managing an inventory system. It is part of my assessment submission for **Fi-Money**.

---

## 👋 Introduction

Hi, I’m **Siddharth Nama**, a passionate developer currently pursuing my B.Tech in Computer Science and Engineering from **IIIT Bhagalpur**.

I’m not athletic, bad at singing, can’t dance — but I love building things. That’s what I’m truly good at. I focus on shipping real-world, impactful products that solve meaningful problems.

### 🧠 Things I've Built:
- ✍️ **Scripty**: AI-powered PDF-to-handwritten answer generator (1,000+ active users)
- 📊 **AI Student Progress Tracker**: Real-time academic analytics platform (1,000+ users)
- 🗳️ **Election Portal**, **Attendance System**, and **Medical Management System** for IIIT Bhagalpur (used by 2,000+ students)
- 📱 Interned at **eSaral** (Full Stack Developer), and delivered high-performance web solutions at **Mercato Agency**

---

## 🧰 Tech Stack

- **Frontend**: React, React Native, Tailwind CSS, JavaScript  
- **Backend**: Django, Django REST Framework (DRF)  
- **Database**: PostgreSQL / SQLite  
- **Infra**: REST APIs, JWT Authentication  
- **Tools**: Git, VS Code, Swagger, Postman

---

## ✅ Core Features

- 🔐 JWT-based user authentication
- 🧾 User registration, login, and logout
- 📦 Product creation and listing
- 🔄 Quantity update by product ID
- 📜 Swagger/OpenAPI documentation
- 🛠 Django Admin Panel for backend control

---

## 🚀 API Endpoints

| Endpoint                     | Method | Auth Required | Description                     |
|-----------------------------|--------|---------------|---------------------------------|
| `/register`                 | POST   | ❌            | Register a new user             |
| `/login`                    | POST   | ❌            | Login & receive JWT tokens      |
| `/logout`                   | POST   | ✅            | Logout with token blacklisting  |
| `/products`                 | GET    | ✅            | Get paginated list of products  |
| `/products`                 | POST   | ✅            | Add a new product               |
| `/products/<id>/quantity`   | PUT    | ✅            | Update product quantity         |

---

## 📄 Swagger API Docs

You can test and explore all APIs here:

🧪 **Swagger UI**:  
```

[http://localhost:9000/swagger/](http://localhost:9000/swagger/)

````

---

## 🧪 Testing the API

Run the automated testing script:

```bash
python test_api.py
````

Covers:

* ✅ Register
* ✅ Login
* ✅ Add product
* ✅ Update quantity
* ✅ Fetch products

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fi-money-inventory-system.git
cd fi-money-inventory-system
```

### 2. Create and activate virtual environment

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply migrations and run server

```bash
python manage.py migrate
python manage.py runserver 9000
```

---

## 📁 Project Structure

```
├── backendInventorySystem/
│   ├── settings.py
│   └── ...
├── inventory/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── test_api.py
├── requirements.txt
├── README.md
└── postman/
    └── InventoryAPI.postman_collection.json
```

---

## 🔐 Django Admin Portal

The Django Admin Panel is enabled for backend management:

🔗 Admin URL:

```
http://localhost:9000/admin/
```

➡️ Use `python manage.py createsuperuser` to create an admin user.

---

## 🧪 Sample Postman Collection

Postman collection is provided for manual testing.

📂 Location:

```
/postman/InventoryAPI.postman_collection.json
```

You can import this file in Postman and start testing immediately.

---

## 🧾 Deliverables Checklist

* ✅ Working backend server
* ✅ Django models as schema
* ✅ Swagger/OpenAPI documentation
* ✅ Setup guide (this README)
* ✅ Sample Postman collection
* ✅ `test_api.py` script working end-to-end

---

## 📬 Contact

Let’s connect:

* 📧 [siddharthnama.work@gmail.com](mailto:siddharthnama.work@gmail.com)
* 📱 +91 8000694996
* 🌐 [GitHub](https://github.com/Siddharth-Nama) | [LinkedIn](https://www.linkedin.com/in/siddharth-nama/) | [Portfolio](https://portfolio-siddharth-namas-projects.vercel.app/)

---

> I’m excited about the opportunity at Fi-Money and would love to be part of the journey! Let’s build something impactful — together. 🚀

---

```
