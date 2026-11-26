<div align="center">

# 🚀 SmartCanteen Backend Architecture & REST API
### *High-Performance Digital Canteen Ecosystem Built for Next-Generation Scalability*

[![NestJS](https://img.shields.io/badge/Framework-NestJS-e0234e?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Cloud-Supabase-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Swagger](https://img.shields.io/badge/API_Docs-Swagger-85ea2d?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

</div>

---

## 📖 Executive Summary (Deskripsi & Filosofi Program)

**SmartCanteen** bukan sekadar aplikasi pencatatan kantin konvensional. Program ini dirancang sebagai **Enterprise-Grade RESTful API** yang memecahkan masalah inefisiensi transaksi, antrean panjang, dan pencatatan manual di lingkungan sekolah/institusi. 

Dengan mengadopsi arsitektur modular **NestJS** yang dikombinasikan dengan kekuatan tipe data ketat **TypeScript** dan ORM performa tinggi **TypeORM**, sistem ini memastikan integritas data transaksional tetap terjaga secara *real-time* menggunakan infrastruktur cloud **PostgreSQL (Supabase)**.

---

## 🏛️ System Architecture & Database Schema (ERD)

Sistem ini dibangun di atas fondasi relasional yang ketat untuk memastikan tidak ada redundansi data antara entitas pengguna, inventaris menu, dan riwayat pesanan.

### Struktur Relasi Entitas (ERD Overview)
* **`User` (1) ──< (`Order`)** : Seorang pengguna dapat melakukan banyak riwayat pemesanan (*One-to-Many*).
* **`Menu` (1) ──< (`Order`)** : Menu makanan dapat dipesan ke dalam berbagai entri transaksi pesanan (*One-to-Many* / Relasi Relasional Terkelola).

+-------------------------------------------------------+
|                       USERS                           |
+-------------------------------------------------------+
| PK  id          | UUID / SERIAL  | Primary Key        |
|     email       | VARCHAR(255)   | Unique, Index      |
|     password    | VARCHAR(255)   | Hashed (Bcrypt)    |
|     role        | VARCHAR(50)    | 'admin' | 'customer'|
|     createdAt   | TIMESTAMP      | Auto Generated     |
+-------------------------------------------------------+
           │
           │ 1
           │
           │ (One-to-Many: Seorang user dapat memiliki banyak riwayat pesanan)
           ▼
+-------------------------------------------------------+
|                      ORDERS                           |
+-------------------------------------------------------+
| PK  id          | UUID / SERIAL  | Primary Key        |
| FK  userId      | INT / UUID     | References Users   |
|     status      | VARCHAR(50)    | PENDING/COMPLETED  |
|     createdAt   | TIMESTAMP      | Auto Generated     |
+-------------------------------------------------------+
           │
           │ 1 (Relasi Penghubung Detail Transaksi Menu)
           │
           ▼
+-------------------------------------------------------+
|                       MENU                            |
+-------------------------------------------------------+
| PK  id          | UUID / SERIAL  | Primary Key        |
|     category    | VARCHAR(100)   | Kategori Makanan   |
|     name        | VARCHAR(150)   | Nama Menu Unik     |
|     price       | DECIMAL(10,2)  | Harga Satuan       |
|     description | TEXT           | Detail Menu        |
|     createdAt   | TIMESTAMP      | Auto Generated     |
+-------------------------------------------------------+
