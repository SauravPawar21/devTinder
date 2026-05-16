# 🔧 DevTinder — Backend

> REST API server for DevTinder, a developer networking platform where developers can discover, connect, and match with each other — like Tinder, but for developers.

---

## 🚀 Live Demo

Frontend: [devTinder-web](https://github.com/SauravPawar21/devTinder-web)

---

## 📌 Features

- 🔐 **JWT Authentication** — Secure login/signup with bcrypt password hashing and HTTP-only cookie tokens
- 👤 **Profile Management** — View and edit your developer profile (name, bio, skills, photo, age, gender)
- 🃏 **Smart Feed Algorithm** — Discover developers excluding already-swiped users, existing connections, and yourself
- 🤝 **Connection Request System** — Send, accept, reject, or ignore connection requests
- 📋 **Request & Connection Management** — View pending received requests and all accepted connections
- 🛡️ **Auth Middleware** — All protected routes verified via JWT stored in cookies
- 📄 **Pagination** — Feed API supports page & limit query params for efficient data loading

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Atlas) |
| ODM | Mongoose |
| Authentication | JWT + bcrypt |
| Validation | validator.js |
| Cookie Handling | cookie-parser |
| CORS | cors |

---

## 📁 Project Structure

```
devTinder/
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── middlewares/
│   │   └── auth.js            # JWT auth middleware
│   ├── models/
│   │   ├── user.js            # User schema & methods
│   │   └── connectionRequest.js # Connection request schema
│   ├── routes/
│   │   ├── auth.js            # /signUp, /login, /logout
│   │   ├── profile.js         # /profile/view, /profile/edit
│   │   ├── requests.js        # /request/send, /request/review
│   │   └── user.js            # /feed, /user/connections, /user/requests/received
│   ├── utils/
│   │   └── validation.js      # Request validation helpers
│   └── app.js                 # Express app entry point
├── seedUsers.js               # Script to seed 50 dummy developer profiles
└── package.json
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signUp` | Register a new user |
| POST | `/login` | Login and receive JWT cookie |
| POST | `/logout` | Clear auth cookie |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile/view` | Get logged-in user's profile |
| PATCH | `/profile/edit` | Update profile fields |

### Connection Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/request/send/:status/:userId` | Send interested / ignored request |
| POST | `/request/review/:status/:requestId` | Accept or reject a received request |

### User / Feed
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/feed` | Get paginated feed of unswiped developers |
| GET | `/user/connections` | Get all accepted connections |
| GET | `/user/requests/received` | Get all pending received requests |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Clone the repo
git clone https://github.com/SauravPawar21/devTinder.git
cd devTinder

# Install dependencies
npm install

# Start the server
node src/app.js
```

> Server runs on **http://localhost:3000**

### Seed the Database

To populate 50 developer profiles for testing:

```bash
node seedUsers.js
```

All seeded users have the password: `Seed@1234!`

---

## 🗃️ Data Models

### User
```
firstName, lastName, emailId, password (hashed),
age, gender, photoUrl, about, skills[]
```

### ConnectionRequest
```
fromUserId, toUserId, status (interested | ignored | accepted | rejected)
```

---

## 🔒 Environment Note

The MongoDB URI and JWT secret are currently hardcoded for development. In production, move them to a `.env` file:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
PORT=3000
```

---

## 📸 Screenshots

> See the frontend repo for UI screenshots → [devTinder-web](https://github.com/SauravPawar21/devTinder-web)

---

## 🙋‍♂️ Author

**Saurav Pawar**
- LinkedIn: [linkedin.com/in/sauravp21](https://linkedin.com/in/sauravp21)
- GitHub: [github.com/SauravPawar21](https://github.com/SauravPawar21)
- Email: pawarsaurav11@gmail.com