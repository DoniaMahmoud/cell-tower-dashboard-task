# 📡 Cell Tower Dashboard

A single-page web application for monitoring telecom cell towers across cities.  
Built with **React, TypeScript, Vite, SASS, and D3.js**.

---

## 📦 Tech Stack

- ⚛️ [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- ⚡ [Vite](https://vitejs.dev/) (build tool)
- 🎨 [SASS/SCSS](https://sass-lang.com/) for styling
- 📊 [D3.js](https://d3js.org/) for data visualization

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DoniaMahmoud/cell-tower-dashboard-task.git
cd cell-tower-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

This starts the app locally with hot reload at http://localhost:3000/.

### 4. Build for Production

```bash
npm run build
```

---

## 📂 Project Structure

```bash
src/
├── components/     # Reusable UI components
├── mocks/          # Mock data for development
├── styles/         # Global and modular SCSS styles
├── types/          # TypeScript types and interfaces
└── main.tsx        # App entry point
```

---

## 🚀 Features

- 📋 **Data Table** – Displays all tower data with columns:
  - Name
  - City
  - Network Type
  - Status
  - Signal Strength

- 🔍 **Search Filter** – Quickly find towers by name.
- 🏙 **City Dropdown Filter** – Filter towers by city.
- ⚡ **Status Filter** – Filter towers by their current status (Active / Offline).
- 📊 **Bar Chart** – Visualizes the number of towers per city.
- 🥧 **Pie Chart** – Shows the distribution of towers by status (Active vs Offline).
- 📱 **Responsive Design** – Optimized for both mobile and desktop.
