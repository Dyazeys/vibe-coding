# Project Setup Planning

## Objective

Buat project web application baru di folder ini menggunakan Next.js sebagai framework utama, dengan full-stack capabilities termasuk authentication, database, dan form handling.

---

## Phase 1: Project Initialization

1. Inisialisasi project Next.js baru dengan TypeScript menggunakan `npx create-next-app@latest` di folder ini (gunakan App Router).
2. Pastikan Tailwind CSS sudah ter-setup (biasanya sudah include di create-next-app).
3. Setup Shadcn UI:
   - Jalankan `npx shadcn@latest init`
   - Konfigurasi sesuai default (New York style, CSS variables enabled)
   - Install beberapa komponen dasar: `button`, `input`, `form`, `card`, `dialog`, `table`, `dropdown-menu`, `avatar`, `toast`
4. Install dependencies tambahan:
   - `prisma` dan `@prisma/client` untuk ORM database
   - `next-auth` untuk authentication
   - `react-hook-form` dan `@hookform/resolvers` untuk form handling
   - `zod` untuk schema validation
   - `lucide-react` untuk icons (biasanya sudah include di Shadcn)

---

## Phase 2: Database Setup (Prisma + Postgres)

1. Jalankan `npx prisma init` untuk generate folder `prisma/` dan file `.env`.
2. Konfigurasi `DATABASE_URL` di `.env` pointing ke PostgreSQL database.
3. Buat schema dasar di `prisma/schema.prisma`:
   - Model `User` (id, name, email, password, image, createdAt, updatedAt)
   - Model `Account` dan `Session` untuk NextAuth adapter
   - Model `VerificationToken` untuk NextAuth
4. Jalankan `npx prisma migrate dev` untuk create initial migration.
5. Buat file `lib/prisma.ts` sebagai singleton Prisma Client instance.

---

## Phase 3: Authentication (NextAuth)

1. Buat file konfigurasi NextAuth di `lib/auth.ts`:
   - Gunakan Prisma Adapter
   - Setup Credentials Provider (email + password)
   - Konfigurasi session strategy: JWT
2. Buat API route handler di `app/api/auth/[...nextauth]/route.ts`.
3. Buat `AuthProvider` component (client component) yang wrap `SessionProvider`.
4. Wrap root layout dengan `AuthProvider`.
5. Buat middleware `middleware.ts` untuk protect routes yang membutuhkan authentication.

---

## Phase 4: Pages & Features

### Auth Pages
1. **Register Page** (`app/(auth)/register/page.tsx`):
   - Form: name, email, password, confirm password
   - Gunakan React Hook Form + Zod untuk validation
   - API route `app/api/register/route.ts` untuk handle registration
2. **Login Page** (`app/(auth)/login/page.tsx`):
   - Form: email, password
   - Gunakan React Hook Form + Zod untuk validation
   - Integrate dengan NextAuth `signIn()`

### Dashboard
1. **Dashboard Layout** (`app/(dashboard)/layout.tsx`):
   - Sidebar navigation menggunakan Shadcn components
   - Header dengan user avatar dan dropdown menu (logout, profile)
   - Responsive: sidebar collapse di mobile
2. **Dashboard Home** (`app/(dashboard)/dashboard/page.tsx`):
   - Welcome message dengan user info dari session
   - Summary cards (placeholder data)
3. **Profile Page** (`app/(dashboard)/profile/page.tsx`):
   - Display dan edit user profile
   - Form menggunakan React Hook Form + Zod

---

## Phase 5: Shared Components & Utilities

1. Buat reusable form components yang integrate Shadcn + React Hook Form:
   - `components/forms/FormInput.tsx`
   - `components/forms/FormSelect.tsx`
2. Buat Zod schemas di folder `lib/validations/`:
   - `auth.ts` (login schema, register schema)
   - `profile.ts` (profile update schema)
3. Buat utility functions di `lib/utils.ts` (extend yang sudah ada dari Shadcn).
4. Setup proper error handling dan loading states.

---

## Phase 6: Final Polish

1. Tambahkan loading states dan skeleton components.
2. Setup proper error boundaries.
3. Tambahkan toast notifications untuk user feedback (menggunakan Shadcn toast).
4. Pastikan semua halaman responsive.
5. Buat file `.env.example` sebagai template environment variables.
6. Update `README.md` dengan instruksi setup project.

---

## Folder Structure (Expected)

```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   └── profile/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   └── register/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/          (Shadcn components)
│   ├── forms/
│   └── providers/
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations/
├── prisma/
│   └── schema.prisma
├── .env
└── middleware.ts
```

---

## Notes

- Gunakan App Router (bukan Pages Router).
- Semua form harus menggunakan React Hook Form + Zod, bukan uncontrolled form biasa.
- Gunakan Shadcn UI components sebanyak mungkin, hindari styling manual kecuali memang diperlukan.
- Pastikan setiap page yang butuh auth di-protect via middleware.
- Gunakan server components sebagai default, client components hanya jika diperlukan (forms, interactivity).
