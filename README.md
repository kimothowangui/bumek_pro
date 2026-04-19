# Bumek Pro - Minimalist Construction Supplies Website

A high-performance, minimalist web application for Bumek construction supplies, built with a modern static architecture.

## 🚀 Architecture
This project has been refactored from Next.js to a high-performance minimalist stack:
- **Frontend**: Pure HTML5, Vanilla JavaScript, and Tailwind CSS.
- **Backend**: Supabase (Database, Auth, and Edge Functions).
- **Styling**: Tailwind CSS (via CDN/Standalone).
- **Components**: Dynamic component loading for shared UI (Navbar, Footer).

## 📂 Project Structure
- `index.html`: Home page.
- `products.html`: Dynamic product catalog.
- `about.html`, `contact.html`, `quote.html`: Static information and interaction pages.
- `admin.html`, `admin-quotes.html`: Password-protected administrative dashboards.
- `js/`: Core application logic and component loading.
- `components/`: Reusable HTML fragments.
- `css/`: Global styles and Tailwind configuration.

## 🛠️ Getting Started
1. Clone the repository.
2. Add your Supabase credentials to a `.env.local` file (see `.env.example`).
3. Serve the directory using any local development server (e.g., Live Server in VS Code).

## 🌐 Deployment
Optimized for deployment on **Vercel** or any static hosting provider.
When deploying to Vercel:
1. Connect this repository.
2. Vercel will automatically detect the static project.
3. **Important**: Add your `SUPABASE_URL` and `SUPABASE_ANON_KEY` to the Environment Variables in the Vercel dashboard.

---
*Maintained by kimothowangui*
