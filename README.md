# Fundraiser Platform

A modern Vue 3 fundraising platform built with Vite, Pinia, Supabase, and shadcn-vue components.

## 🚀 Features

- Campaign creation and approval workflow
- Donation functionality
- Admin dashboard
- Categories and organizations management
- Responsive design with Tailwind CSS and shadcn-vue
- Supabase as backend (auth + database + storage)

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a .env file in the root of the project and add the following variables, the values are provided in the email and the PDF:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_H_CAPTCHA_SITE_KEY=captcha-key
```

### 4. Run the app

```bash
npm run dev
```

The app will be available at http://localhost:5173.
