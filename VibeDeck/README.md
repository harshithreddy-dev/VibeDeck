# VibeDeck: The Hyper-Focused Creator's Console

[Image/GIF of the clean VibeDeck app in action, showing the timer and inputs]

*An elegant and minimalist web application designed to eliminate context-switching and drive deep work for content creators and focused professionals. Built for the Vibe Coding Internship technical challenge.*

---

## 💡 Project Goal: Solving the Context-Switching Problem

As a creative coder and content producer, I found constant context-switching (jumping between a task list, a timer, and a key reference link) to be the biggest killer of flow state.

**VibeDeck** is a surgical tool, not a bloated dashboard. It enforces the "one task at a time" principle by consolidating the three critical elements for deep work—**Time, Task, and Context**—into one clean, persistent interface.

This project demonstrates my ability to:
1.  **Identify a niche problem** in the productivity space.
2.  **Design a minimalist, aesthetic solution** (Creativity + Design).
3.  **Execute a clean, modular technical build** using modern frameworks (Code Quality + Execution).

---

## ✨ Features & Technical Details

| Feature | Technical Implementation |
| :--- | :--- |
| **Atomic Focus Timer** | Custom React Hook using `setInterval` within `useEffect` with proper cleanup. Implements a $25/5$ min Pomodoro state machine. |
| **Single Task Slot** | A primary, highly visible input ensuring focus on the current task. |
| **The Vibe Reference** | A secondary input for a crucial link or mantra. |
| **Persistent State** | Uses a custom `useLocalStorage` hook to save the current task and reference across browser sessions. |
| **Sleek UI/UX** | Built with **React** for modularity and **Tailwind CSS** for responsive, utility-first styling (includes Dark/Light theme toggle). |

### Tech Stack

* **Front-End:** React (with Hooks)
* **Styling:** Tailwind CSS (v3+)
* **Hosting:** Vercel / Netlify

---

## 🚀 Setup and Deployment

### Getting Started

1.  Clone the repository:
    ```bash
    git clone [Your-Repo-Link] VibeDeck
    cd VibeDeck
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

### Deployment

The application is fully static and ready for deployment on any modern platform.

1.  Generate the production build:
    ```bash
    npm run build
    ```
2.  Deploy the contents of the generated `dist` folder to Netlify, Vercel, or Firebase Hosting.

---

### 🎥 Short Video Demo Script (30-60 Seconds)

1.  **0-5s (Vibe & Aesthetic):** Start the video on a full-screen shot of the app in **Dark Mode**. Use punchy, minimal electronic music. *Voiceover: "This is VibeDeck: your hyper-focused console for flow state."*
2.  **5-15s (Problem/Solution):** Quickly type a complex task into the "Task Slot" and paste a short YouTube link/quote into the "Vibe Reference". *Voiceover: "No more switching. Just one task, one reference. Focus enforced."*
3.  **15-25s (Execution):** Click **'START FOCUS'**. Show the countdown clearly running. Briefly click the Dark/Light theme toggle to show the polished responsiveness. *Voiceover: "Built with React and Tailwind CSS—clean execution, persistent state, zero distraction."*
4.  **25-40s (Value/Conclusion):** Stop the timer, reset it. Show the app again. *Voiceover: "VibeDeck. Identify a creative problem. Build a clean solution. That's Vibe Coding."*
5.  **40-60s (Call to Action):** Hold a screen showing your name, **GitHub Repo Link**, and **Hosted Demo Link**. (Hold for 10-15 seconds).
