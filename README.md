# 🎧 VibeDeck Pro: The Hyper-Focused AI Dashboard

!(https://i.imgur.com/image_eb87bf.png)

*VibeDeck Pro is a comprehensive, feature-rich productivity dashboard that merges deep-work timers with AI-simulated content generation. Built using **React and Tailwind CSS** for the **Vibe Coding Internship** technical challenge, it demonstrates strong architectural design, code quality, and creative problem-solving.*

---

## 💡 The Vision: Problem Solved & Value Added

As a student and content creator, the biggest enemy to productivity is **context-switching** and **creative block**. VibeDeck Pro solves these two pain points by offering a unified workspace:

1.  **Discipline (Focus):** The Dashboard enforces focus by isolating the current task and time.
2.  **Creation (AI Simulation):** The built-in Generator solves creative block (e.g., writing titles or tags) instantly, eliminating the need to leave the flow state.

This project showcases my ability to:
* **Develop a full-featured dashboard** demonstrating advanced state management and modular architecture (Execution).
* **Design a unique, aesthetic solution** that solves real-world productivity issues (Creativity).
* **Implement complex features** like local storage persistence, task queuing, and API simulation (Problem-Solving).

---

## ✨ Features and Technical Breakdown

VibeDeck Pro is a single-page application (SPA) designed for scalability, demonstrating expertise in modern front-end engineering.

### Core Architecture

| Feature | Description | Technical Implementation Showcase |
| :--- | :--- | :--- |
| **Atomic Focus Timer** | Highly configurable Pomodoro system (15, 25, 45 min presets) to enforce dedicated work sprints. | Advanced React Hooks (`useEffect` with `setInterval`), management of **complex timer state**, and prop passing. |
| **Task Management** | Supports adding tasks, maintains a **Task Queue**, and shows the single **Active Task** slot. | Centralized **Array State Management** and UI logic for task queuing (`tasks.slice(1)`). |
| **Vibe Check System** | A dedicated button that completes the active task, triggering progress updates and animations. | Core business logic that handles state transformation across three different data sets: `tasks`, `profile`, and `vibeHistory`. |
| **VibeDeck Profile** | Tracks user progress: `Vibes Completed` and `Current Streak`. | Custom **`useLocalStorage` Hook** for robust data persistence across browser sessions. |
| **Dashboard Layout** | Modular, responsive layout for a professional aesthetic (includes Dark/Light theme toggle). | **Tailwind CSS Grid** system for a clean sidebar + main content structure. |

### 🧠 The Vibe Generator (AI Simulation)

This feature is structured to be production-ready for an actual AI API integration.

| Technical Aspect | Implementation Detail |
| :--- | :--- |
| **Simulated API** | Uses a 1.5-second `setTimeout` to convincingly mimic network latency and API responsiveness. |
| **Asynchronous UI** | Features a clear **`isLoading`** state that disables the button and displays **"GENERATING VIBE..."** while the mock request is running. |
| **Structured Output**| Instantly generates high-value assets (Video Title, Caption, Tags), demonstrating structure ready for large language model (LLM) output. |

---

## 🚀 Getting Started

### Tech Stack

* **Front-End:** **React** (Built with Vite)
* **Styling:** **Tailwind CSS** (v3+)
* **Deployment:** **Vercel**

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/harshithreddy-dev/VibeDeck](https://github.com/harshithreddy-dev/VibeDeck)
    cd VibeDeck
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

### 🔗 Deployment Note (Vercel)

The project includes a **`vercel.json`** file and is configured to use the **`dist`** output directory. This ensures correct routing for the single-page application (SPA), preventing 404 errors on refresh or direct URL access.

---

## 🎥 The Killer Demo Script (30-60 Seconds)

To maximize impact, your short video should be fast-paced and highlight the unique features in order:

1.  **0-10s | Setup & Focus:** Start on the **Dark Mode** dashboard.
    * **Task:** Add a complex task to the queue. Show it jump to the **Single Task Slot**.
    * **Timer:** Click a custom preset (e.g., **45 min**) and hit **'START FOCUS'**.
2.  **10-25s | The AI Feature:**
    * Navigate to the **Vibe Generator**. Type a content idea.
    * Click **'GENERATE VIBE'**. Show the **"GENERATING VIBE..."** loading state.
    * Show the high-quality **Title, Hook, and Tags** that appear instantly.
3.  **25-40s | Completion & Progress:**
    * Click **'VIBE CHECK ✨'**. (This should trigger a small, quick animation/flash).
    * **Crucially:** Point to the **Profile Card** and show the **Vibes Done** and **Streak** numbers instantly incrementing.
4.  **40-60s | Final Screen:** Hold a final shot showing your name, the **GitHub link**, and the **Hosted Demo Link**.

---
*Built by Harshith Reddy | (https://github.com/harshithreddy-dev)*
