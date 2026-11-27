 SmartCanteen Backend APIHigh-Performance Digital Canteen Ecosystem & Order Management REST API📋 Daftar Isi (Table of Contents)Deskripsi ProyekTech Stack & ArsitekturFitur & Penjelasan Modul KodeAlur Kerja Sistem (System Flowchart)Skema Relasi Database (ERD)Struktur Direktori ProyekPrasyarat / Kebutuhan Sistem (Requirements)Cara Instalasi & Menjalankan Server (Installation)Dokumentasi & Daftar Endpoint APIPanduan Pengujian di Swagger UI📌 Deskripsi ProyekSmartCanteen API adalah layanan backend RESTful untuk ekosistem kantin digital yang dirancang untuk menyelesaikan permasalahan transaksi manual, antrean panjang, dan inefisiensi pengelolaan menu di lingkungan sekolah atau institusi.Program ini dibangun menggunakan standar industri modern dengan framework NestJS, ORM TypeORM, serta infrastruktur basis data cloud PostgreSQL (Supabase). Aplikasi ini memfasilitasi autentikasi pengguna yang aman berbasis JWT, manajemen inventaris menu makanan oleh admin, serta sistem pemesanan (order management) mandiri yang terstruktur secara real-time.🛠️ Tech Stack & ArsitekturRuntime & Language: Node.js & TypeScriptBackend Framework: NestJS (Modular Architecture)Database & ORM: PostgreSQL (Supabase) & TypeORMAutentikasi & Keamanan: @nestjs/jwt, passport-jwt, bcrypt (Password Hashing)Validasi Data: class-validator & class-transformerDokumentasi Interaktif: @nestjs/swagger (OpenAPI 3.0)📂 Fitur & Penjelasan Modul KodeStruktur kode di dalam direktori src/ dipisahkan secara modular berdasarkan domain bisnis agar mudah dipelihara dan diskalakan:1. Auth Module (src/auth)Menangani proses autentikasi masuk pengguna (POST /menu atau login) dengan memvalidasi kredensial serta menerbitkan token akses JWT privat.Berisi JwtStrategy dan JwtAuthGuard untuk memproteksi endpoint agar hanya bisa diakses oleh pengguna yang memiliki token sah.2. Users Module (src/users)Mengelola entitas pengguna (User) termasuk proses registrasi akun baru (POST /users/register) dengan enkripsi kata sandi menggunakan bcrypt.3. Menu Module (src/menu)Mengelola entitas Menu untuk katalog makanan dan minuman kantin (kategori, nama, harga, dan deskripsi).Menyediakan operasi CRUD penuh: melihat seluruh menu secara publik (GET /menu), menambah menu baru khusus admin (POST /menu), memperbarui data menu berdasarkan ID (PATCH /menu/:id), serta menghapus menu (DELETE /menu/:id).4. Orders Module (src/orders)Mengelola entitas pesanan (Order) yang menghubungkan aktivitas belanja pengguna.Menyediakan fitur pembuatan pesanan (POST /orders), pemantauan riwayat pesanan pribadi bagi pengguna yang sedang login (GET /orders/my-orders), serta pembaruan status siklus pesanan (PATCH /orders/:id/status).5. Common & Database Module (src/common & src/database)Mengatur konfigurasi koneksi TypeORM ke PostgreSQL Supabase serta pengelolaan exception handling yang terstandarisasi.🔄 Alur Kerja Sistem (System Flowchart)Cuplikan kodeflowchart TD
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
🗂️ Skema Relasi Database (ERD)Cuplikan kodeerDiagram
    USERS ||--o{ ORDERS : "melakukan"
    MENU ||--o{ ORDERS : "dipesan_dalam"

    USERS {
        int id PK
        string email
        string password
        string role
        timestamp createdAt
    }
    MENU {
        int id PK
        string category
        string name
        decimal price
        string description
        timestamp createdAt
    }
    ORDERS {
        int id PK
        int userId FK
        string status
        timestamp createdAt
    }
📁 Struktur Direktori ProyekPlaintextsmart-canteen/
├── src/
│   ├── auth/                  # Modul autentikasi, Strategy, dan Guard JWT
│   ├── common/                # Kumpulan filter error dan dekorator kustom
│   ├── database/              # Konfigurasi koneksi TypeORM ke Supabase
│   ├── menu/                  # Modul katalog menu & DTO (Create/Update Menu)
│   ├── orders/                # Modul manajemen transaksi pemesanan & riwayat
│   ├── users/                 # Modul registrasi & manajemen akun pengguna
│   ├── app.module.ts          # Root module aplikasi NestJS
│   └── main.ts                # Entry point server, global prefix (/api), & Swagger
├── .env                       # Variabel lingkungan database & secret key
├── package.json               # Daftar dependensi dan skrip proyek
└── tsconfig.json              # Konfigurasi TypeScript
⚙️ Cara Instalasi & Menjalankan Server (Installation)Clone RepositoriBashgit clone https://github.com/kheisaa196-max/smart-canteen.git
cd smart-canteen
Install DependensiBashnpm install
Konfigurasi Environment Variables
Buat berkas .env di direktori root proyek dan sesuaikan dengan kredensial database Supabase serta secret JWT Anda:Cuplikan kodeDB_HOST=db.xxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password_supabase_kamu
DB_NAME=postgres
JWT_SECRET=super_secret_jwt_smart_canteen
Jalankan ServerBash# Mode development (auto-reload)
npm run start:dev

# Mode produksi
npm run build
npm run start:prod
Verifikasi Server Berjalan
Akses dokumentasi interaktif Swagger melalui browser di alamat:Plaintexthttp://localhost:3000/api
📚 Dokumentasi & Daftar Endpoint APISeluruh endpoint utama dapat diuji langsung melalui Swagger. Endpoint dengan simbol 🔒 memerlukan header otorisasi Authorization: Bearer <token>.ModulMethodEndpointAksesDeskripsiAuthPOST/auth/loginPublikMasuk ke sistem dan mendapatkan token JWTUsersPOST/users/registerPublikMendaftarkan akun pengguna baruMenuGET/menuPublikMenampilkan seluruh daftar menu makananMenuPOST/menu🔒 LoginMenambahkan menu makanan baru (Admin)MenuPATCH/menu/:id🔒 LoginMengubah data menu berdasarkan ID (Admin)MenuDELETE/menu/:id🔒 LoginMenghapus menu berdasarkan ID (Admin)OrdersPOST/orders🔒 LoginMembuat transaksi pesanan baruOrdersGET/orders/my-orders🔒 LoginMenampilkan riwayat pesanan pengguna aktifOrdersPATCH/orders/:id/status🔒 LoginMemperbarui status siklus pesanan🧪 Panduan Pengujian di Swagger UIBuka tautan http://localhost:3000/api di browser setelah server berjalan.Jalankan POST /users/register untuk membuat akun, lalu lakukan POST /auth/login untuk mengambil access_token.Klik tombol Authorize di sudut kanan atas Swagger, masukkan token dengan format Bearer <token_anda>, lalu klik Authorize.Uji endpoint terproteksi seperti POST /menu, POST /orders, atau GET /orders/my-orders dengan mudah secara interaktif.
