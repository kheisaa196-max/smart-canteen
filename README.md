# 🚀 SmartCanteen Backend API
### *High-Performance Digital Canteen Ecosystem & Order Management REST API*

[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0803?logo=typeorm&logoColor=white)](https://typeorm.io)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Swagger](https://img.shields.io/badge/Docs-Swagger_OpenAPI-85EA2D?logo=swagger&logoColor=black)](https://swagger.io)

---

## 📋 Daftar Isi (Table of Contents)

- [Deskripsi Proyek](#deskripsi-proyek)
- [Tech Stack & Arsitektur](#tech-stack--arsitektur)
- [Fitur & Penjelasan Modul Kode](#fitur--penjelasan-modul-kode)
- [Alur Kerja Sistem (System Flowchart)](#alur-kerja-sistem-system-flowchart)
- [Skema Relasi Database (ERD)](#skema-relasi-database-erd)
- [Struktur Direktori Proyek](#struktur-direktori-proyek)
- [Prasyarat / Kebutuhan Sistem (Requirements)](#prasyarat--kebutuhan-sistem-requirements)
- [Cara Instalasi & Menjalankan Server (Installation)](#cara-instalasi--menjalankan-server-installation)
- [Dokumentasi & Daftar Endpoint API](#dokumentasi--daftar-endpoint-api)
- [Panduan Pengujian di Swagger UI](#panduan-pengujian-di-swagger-ui)

---

## 📌 Deskripsi Proyek

**SmartCanteen API** adalah layanan *backend* RESTful untuk ekosistem kantin digital yang dirancang untuk menyelesaikan permasalahan transaksi manual, antrean panjang, dan inefisiensi pengelolaan menu di lingkungan sekolah atau institusi. 

Program ini dibangun menggunakan standar industri modern dengan framework **NestJS**, ORM **TypeORM**, serta infrastruktur basis data cloud **PostgreSQL (Supabase)**. Aplikasi ini memfasilitasi autentikasi pengguna yang aman berbasis JWT, manajemen inventaris menu makanan oleh admin, serta sistem pemesanan (*order management*) mandiri yang terstruktur secara *real-time*.

---

## 🛠️ Tech Stack & Arsitektur

- **Runtime & Language**: Node.js & TypeScript
- **Backend Framework**: NestJS (Modular Architecture)
- **Database & ORM**: PostgreSQL (Supabase) & TypeORM
- **Autentikasi & Keamanan**: `@nestjs/jwt`, `passport-jwt`, `bcrypt` (Password Hashing)
- **Validasi Data**: `class-validator` & `class-transformer`
- **Dokumentasi Interaktif**: `@nestjs/swagger` (OpenAPI 3.0)

---

## 📂 Fitur & Penjelasan Modul Kode

Struktur kode di dalam direktori `src/` dipisahkan secara modular berdasarkan domain bisnis agar mudah dipelihara dan diskalakan:

- **1. Auth Module (`src/auth`)**
  - Menangani proses autentikasi masuk pengguna dengan memvalidasi kredensial serta menerbitkan token akses `JWT` privat.
  - Berisi `JwtStrategy` dan `JwtAuthGuard` untuk memproteksi endpoint agar hanya bisa diakses oleh pengguna yang memiliki token sah.
- **2. Users Module (`src/users`)**
  - Mengelola entitas pengguna (`User`) termasuk proses registrasi akun baru (`POST /users/register`) dengan enkripsi kata sandi menggunakan `bcrypt`.
- **3. Menu Module (`src/menu`)**
  - Mengelola entitas `Menu` untuk katalog makanan dan minuman kantin (kategori, nama, harga, dan deskripsi).
  - Menyediakan operasi CRUD penuh: melihat seluruh menu secara publik (`GET /menu`), menambah menu baru khusus admin (`POST /menu`), memperbarui data menu berdasarkan ID (`PATCH /menu/:id`), serta menghapus menu (`DELETE /menu/:id`).
- **4. Orders Module (`src/orders`)**
  - Mengelola entitas pesanan (`Order`) yang menghubungkan aktivitas belanja pengguna.
  - Menyediakan fitur pembuatan pesanan (`POST /orders`), pemantauan riwayat pesanan pribadi bagi pengguna yang sedang login (`GET /orders/my-orders`), serta pembaruan status siklus pesanan (`PATCH /orders/:id/status`).
- **5. Common & Database Module (`src/common` & `src/database`)**
  - Mengatur konfigurasi koneksi TypeORM ke PostgreSQL Supabase serta pengelolaan exception handling yang terstandarisasi.

---

## 🔄 Alur Kerja Sistem (System Flowchart)

```mermaid
flowchart TD
    Client[Frontend / Swagger UI] -->|HTTP Request + Bearer Token| Guard[JwtAuthGuard]
    Guard --> Pipe[Global ValidationPipe]

    Pipe --> AuthMod[Auth Module: Login]
    Pipe --> UserMod[Users Module: Register]
    Pipe --> MenuMod[Menu Module: CRUD Menu]
    Pipe --> OrderMod[Orders Module: Transaksi & Status]

    AuthMod <--> DB[(PostgreSQL Supabase)]
    UserMod <--> DB
    MenuMod <--> DB
    OrderMod <--> DB
Jalankan POST /users/register untuk membuat akun, lalu lakukan POST /auth/login untuk mengambil access_token.

Klik tombol Authorize di sudut kanan atas Swagger, masukkan token dengan format Bearer <token_anda>, lalu klik Authorize.

Uji endpoint terproteksi seperti POST /menu, POST /orders, atau GET /orders/my-orders dengan mudah secara interaktif.
