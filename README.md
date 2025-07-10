# Task Management App - Frontend Take-Home Assignment

This project is a frontend engineering take-home assignment designed to showcase skills in modern web development. It features a complete task management page built with React, TypeScript, Tailwind CSS, and React Query, using Subframe for the initial UI scaffolding.

## 🚀 Live Demo

[**View the live application here**](https://melt-proto-dev-deimer.vercel.app/)

## ✨ Features

- ✅ **Full CRUD Functionality:** Create, Read, Update, and Delete tasks through a user-friendly interface.
- ✅ **Interactive Table:** Sort data by clicking on column headers (Title, Status, Due Date).
- ✅ **Pagination:** Navigate through long lists of tasks with ease.
- ✅ **Dynamic Filtering & Searching:** Filter tasks by status and search by title in real-time.
- ✅ **Responsive Design:** A clean table view on desktop and an intuitive card view on mobile devices.
- ✅ **Modal Forms:** A single, reusable modal for both creating new tasks and editing existing ones.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/) (with TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Scaffolding:** [Subframe](https://subframe.com/)
- **State Management & Data Fetching:** [React Query (TanStack Query)](https://tanstack.com/query/latest)
- **Deployment:** Vercel

---

## 🔧 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js ()
- npm, yarn, or pnpm

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/MeltStudio/melt-proto-dev-deimer
    ```
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Run the development server:
    ```sh
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

The project follows a standard Next.js `app` directory structure, with a focus on clean component organization.


```
melt-proto-dev/
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks for business logic
│   ├── ui/                     # Contains shared UI used throughout the app.
│   ├── providers/              # React context providers
│   └── utils/                  # TypeScript type definitions
├── public/                     # Static assets
└── config files                # ESLint, Prettier, Tailwind, TypeScript
```

Version 1.0.0