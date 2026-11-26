# SmartCanteen Backend API

Backend REST API untuk aplikasi kantin pintar (*SmartCanteen*) yang dikembangkan sebagai Project Akhir Backend Development menggunakan NestJS dan TypeORM.

## 📌 Deskripsi Project
SmartCanteen adalah sistem backend berbasis REST API yang dirancang untuk mendigitalkan proses pemesanan makanan di lingkungan kantin. Aplikasi ini memfasilitasi manajemen pengguna, pengelolaan menu makanan oleh admin, serta transaksi pemesanan menu oleh pengguna secara aman dan terstruktur.

## 🛠️ Tech Stack
* **Framework:** NestJS
* **ORM:** TypeORM
* **Database:** PostgreSQL (Supabase)
* **Authentication:** Passport-JWT
* **Documentation:** Swagger UI

## 🚀 Fitur Utama (Endpoints)
1. **Auth (`/auth`)**
   * `POST /auth/login` - Masuk ke sistem dan mendapatkan token JWT.
2. **Users (`/users`)**
   * `POST /users/register` - Mendaftarkan akun pengguna baru.
3. **Menu (`/menu`)**
   * `GET /menu` - Menampilkan seluruh daftar menu makanan.
   * `POST /menu` - Menambahkan menu baru (Khusus Admin).
   * `PATCH /menu/:id` - Mengubah data menu berdasarkan ID (Khusus Admin).
   * `DELETE /menu/:id` - Menghapus menu berdasarkan ID (Khusus Admin).
4. **Orders (`/orders`)**
   * `POST /orders` - Membuat pesanan baru.
   * `GET /orders/my-orders` - Melihat riwayat pesanan pengguna yang sedang login.
   * `PATCH /orders/:id/status` - Mengubah status pesanan.

## ⚙️ Cara Menjalankan Project (Installation)

1. Clone repository ini:
   ```bash
   git clone [https://github.com/kheisaa196-max/smart-canteen.git](https://github.com/kheisaa196-max/smart-canteen.git)
