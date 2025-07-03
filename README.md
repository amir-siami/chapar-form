# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Chapar Form

A multi‑step volunteer signup form built with React, TypeScript, Vite, Tailwind CSS, Zustand, React Hook Form, Zod, and Subframe’s Radix‑based Stepper.  
Users enter personal info, select skills, review, and submit to the Chapar API.

---

## 📦 Features

- **Three-step wizard** with a visual progress indicator (Radix/Subframe Stepper)
- **Client‑side validation** with Zod & React Hook Form
  - Full Name (min 3 chars)
  - Birthday (≥ 18 years old)
  - Email OR Phone required (with per‑field rules)
- **State management** via Zustand
- **Tailwind CSS** for utility‑first styling
- **API integration**: posts to `https://task.chapar.co/api/volunteers`
- **Success & error handling** with inline messages

---

## 🚀 Quick Start

### 1. Clone & install

```bash
git clone https://github.com/amir-siami/chapar-form.git
cd chapar-form
npm install
