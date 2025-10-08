
 # Thrift-web


Web site preview :https://thrift-web-two.vercel.app/


```markdown
# 🛍️ Thrift Web

**Thrift Web** is a modern thrift store web application where users can **sign up, log in, and sell their pre-owned items** such as clothes, electronics, books, and more.  
The platform allows users to manage their listings, browse available items, and connect with buyers — built with a clean UI and efficient backend integration.

---

## 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Next.js 14](https://nextjs.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Backend / Auth / DB | [Supabase](https://supabase.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## ✨ Features

- 🔐 **User Authentication** (Sign up / Login / Logout) via Supabase  
- 🧍 **Profile Management** – each user has their own account  
- 📦 **Product Uploads** – sell used clothes, electronics, books, etc.  
- 💰 **Product Listings** – browse and view all uploaded items  
- 🛒 **Add to Cart & Save Items** functionality  
- 📱 **Responsive Design** – works on mobile and desktop  
- ⚡ **Fast and Modern UI** powered by Next.js & Tailwind CSS  

---

## 🧩 Folder Structure

```

Thrift-web/
│
├── app/                  # Next.js app directory
│   ├── auth/             # Authentication pages (login, signup, etc.)
│   ├── dashboard/        # User dashboard with saved products
│   ├── upload/           # Page to upload products
│   └── ...               # Other pages
│
├── components/           # Reusable UI components
├── lib/                  # Supabase client setup
├── public/               # Static assets (images, icons, etc.)
├── styles/               # Global styles (if any)
└── package.json

````

---

## 🛠️ Installation and Setup (Local Development)

Follow these steps to set up the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/harsha0679/Thrift-web.git
cd Thrift-web
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env.local` file in the root directory

Add your Supabase credentials (from your Supabase project settings):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Never commit this file to GitHub.

### 4️⃣ Run the development server

```bash
npm run dev
```

Visit:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

To deploy your project using **Vercel**:

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/), import your repo.
3. Add your Supabase environment variables in the Vercel dashboard.
4. Click **Deploy**.

Your app will be live in seconds!

---

## 🧠 How It Works

1. **Supabase Authentication** – handles user sign-up and login securely.
2. **Supabase Database** – stores product details, user data, and saved items.
3. **Next.js Pages** – handle routes for uploading, viewing, and managing products.
4. **Tailwind CSS** – provides fast and responsive UI styling.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -m "Added new feature"
   ```
4. Push your branch and create a Pull Request

---

## 📸 Screenshots (Optional)



[home page](./public/screenshots/desk3.png)


[sign in ](./public/screenshots/desk2.png)

[Browse page](./public/screenshots/desk1.png)


---



## 👨‍💻 Author

**Nunna Harshavardhan**
📧 [email](harshavardhannunna944@gmail.com)
🌐 [GitHub Profile](https://github.com/harsha0679)

---

### ⭐ If you like this project, don’t forget to give it a star on GitHub!

```






