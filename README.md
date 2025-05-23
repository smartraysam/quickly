# 🚀 Quickly Web App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Business Requirements
## 🔐 Login Page

#### Fields

- **Email** – must be a valid email
- **Password** – must meet minimum length requirements

#### Features

- ✅ Validates input
- ⏳ Shows loading state during submission
- ❌ Handles error messages
- 🔁 Redirects to **Profile Page** on successful login
- 💾 Stores token in `sessionStorage`


### 👤 My Profile Page

#### Displays:
- Full name  
- Email  
- Company/business name  

#### Features:
- 🔐 Fetches user data using the stored token  
- ⏳ Shows loading and error states  
- 🔁 Redirects to **Login Page** if unauthenticated or on `401 Unauthorized`  
- 🚪 Logout functionality that clears session and redirects  

#### UI Includes:
- 🖼️ Profile picture (initials derived from full name)  
- 📍 Top bar with page title  
- ⬇️ Profile dropdown menu with logout option  


### 💳 Payment Date Checker Component

🧾 **Displayed on:** My Profile Page

#### 📅 Date Selectors:
- **Invoice Due Date** (calendar input)  
- **Pay Cycle Date** (monthly payment date, calendar input)

#### 📌 Example:
- **Invoice due:** April 15  
- **Pay cycle:** 30  
- ✅ **Result:** "Your invoice pay date will be April 30"


## 🛠️ Tech Stack

- ⚡ **Next.js (App Router)** – Core framework for routing and rendering
- 🟦 **TypeScript** – Static typing for improved development experience
- 🎨 **Tailwind CSS** – Utility-first CSS framework for styling
- 🧩 **shadcn/ui** – Prebuilt accessible UI components
- 🔄 **React Query (TanStack Query)** – Data fetching and caching
- 📏 **Zod** – Schema validation for forms and API data
- 🔐 **Context API** – Managing global authentication state
- 🌐 **Fetch API** – HTTP requests with `Bearer` token authentication

## 📚 Learn More

### 🔷 Next.js
- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – Interactive Next.js tutorial.
- [Next.js GitHub](https://github.com/vercel/next.js) – Source code and contributions.

### 🔄 React Query (TanStack Query)
- [TanStack Query Docs](https://tanstack.com/query/latest) – Comprehensive guide and API reference.

### 🧩 shadcn/ui
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) – Guides, components, and setup instructions.

### 📏 Zod
- [Zod Documentation](https://zod.dev) – Full API reference and usage examples.



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
