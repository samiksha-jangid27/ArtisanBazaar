# Artisan Bazaar

Artisan Bazaar — a curated marketplace for handmade gifts.  
This repository contains a modern **Next.js frontend** and a recommended **Node.js/Express backend** (or any REST backend matching the API contract below). The frontend ships production-ready pages: auth (register/login), profile, orders, wishlist and more.

> This `README.md` is designed to be dropped into the repository root. Update any placeholders (domains, secrets, DB URL) to match your environment.

---

## Table of contents

- [Tech stack](#tech-stack)  
- [Project structure](#project-structure)  
- [Environment variables](#environment-variables)  
- [Local setup — Frontend](#local-setup---frontend)  
- [Local setup — Backend (recommended)](#local-setup---backend-recommended)  
- [API reference](#api-reference)  
- [Auth flow](#auth-flow)  
- [Routes & behaviour (frontend)](#routes--behaviour-frontend)  
- [Scripts](#scripts)  
- [Testing](#testing)  
- [Deployment notes](#deployment-notes)  
- [Security & production considerations](#security--production-considerations)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  
- [License](#license)

---

## Tech stack

**Frontend**
- Next.js (App Router / React)
- Tailwind CSS
- axios
- react-hot-toast
- lucide-react (icons)
- Context API for auth

**Backend (recommended)**
- Node.js + Express
- PostgreSQL (recommended) or MongoDB
- Prisma or Sequelize (ORM)
- JWT for authentication
- bcrypt for password hashing
- helmet, cors, express-rate-limit

---
