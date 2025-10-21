# VibeDeck 🚀

**Hyper-Focused AI Dashboard for Creators & Builders**

🔗 **Live Demo:** [vibedeck.vercel.app](https://vibedeck.vercel.app)

📂 **Repository:** [github.com/harshithreddy-dev/VibeDeck](https://github.com/harshithreddy-dev/VibeDeck)

---

## The Vision: Focus + Creation

As a student and content creator, I found my flow constantly interrupted by:
1.  **Constant context-switching** (from task → research → distraction)
2.  **Creative block** when trying to generate ideas or push content out

**VibeDeck** solves this by providing a **single, unified workspace** where you can focus deeply and generate content ideas. No more bouncing between tools. The dashboard keeps you locked in, while the built-in "Vibe Generator" provides that creative spark when you're stuck.

---

## ✨ Features

* **Deep Focus Timer:** Pick a sprint (15 / 25 / 45 min), hit **Start**, and lock into your main task.
* **Task Queue & Active Task Slot:** Easily add tasks, clearly see the one you’re **actively working on**, and queue the rest.
* **Vibe Generator (AI Simulation):** Type in your content theme and instantly get a suggested **title, caption, & tags** for video/content. (Mock API for now, ready for real LLM integration.)
* **“Vibe Check” Progress Tracker:** After finishing a task, hit **Vibe Check ✨** to watch your **streak** and **vibes-completed tally** go up.
* **Design & UX:** Sleek Dark/Light Mode + modern Tailwind CSS design. Works smooth on any device.
* **Local Persistence:** Your progress stays safe and sound using **Local Storage**, even if you close the tab.

---

## 🛠 Tech Stack

* **Front-end:** React (via Vite)
* **Styling:** Tailwind CSS v3+
* **State & Logic:** Custom hooks (`useLocalStorage`), advanced timer management with `useEffect` and `setInterval` cleanup.
* **Deployment:** Vercel

---

## 💻 Getting Started (Dev Setup)

### 1. Clone the repository

```bash
git clone [https://github.com/harshithreddy-dev/VibeDeck.git](https://github.com/harshithreddy-dev/VibeDeck.git)
cd VibeDeck
````

### 2\. Install dependencies

```bash
npm install
```

### 3\. Run the development server

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

> **Deployment Note:** The `vercel.json` is pre-configured to route correctly for SPA (Single Page Application), avoiding 404 errors on refresh or direct links.

-----

## 💡 How to Use It (Quick Demo)

1.  **Add a task** → **choose a preset timer** → hit **START**.
2.  While focused, jump into the **Vibe Generator**: type a prompt → click **GENERATE VIBE** → watch the title/caption/tags appear.
3.  Once the timer ends or your task is complete: hit **VIBE CHECK ✨** → see your vibes completed and streak update.
4.  Toggle dark/light mode, check your profile stats, rinse-and-repeat\!

-----

## 🚧 Challenges & Learnings

  * **Timer Management:** Successfully managing timer state and cleanup in React hooks, specifically avoiding lingering `setInterval` calls and handling component unmounts gracefully.
  * **Task Flow Design:** Creating a robust task-queue system where the **active task** is logically separate from the rest of the queue, ensuring clean and snappy UI updates.
  * **Simulated API:** Designing an AI-API workflow (with proper loading states and asynchronous UI) that is production-ready for a real LLM integration.
  * **Responsive UI:** Crafting a clean, minimal, yet highly functional UI using Tailwind CSS.

-----

## ⏭ What’s Next

  * 🔧 **Real AI Integration:** Integrate a real LLM API for the Vibe Generator (e.g., OpenAI, Cohere) for truly dynamic content.
  * ✅ **User Auth & Sync:** Add user authentication and cloud-sync of tasks & profile, allowing cross-device persistence.
  * 📊 **Analytics:** Build a dashboard to visualize key metrics: vibes generated, tasks completed per week, longest streak, etc.
  * 🎯 **UX Deep Dive:** Add keyboard shortcuts and advanced Pomodoro customization (e.g., micro-breaks).
  * 🌍 **Accessibility:** Sync dark/light mode with system preference + general accessibility tweaks (aria, screen-reader friendly).

-----

## 👤 Who Built This

**Harshith Reddy** — content creator, student, always hustling to build things, solve problems, and level up.

**Connect:** [github.com/harshithreddy-dev](https://www.google.com/search?q=https://github.com/harshithreddy-dev)

-----

## ⚖️ License

This project is licensed under the **MIT License**. Feel free to use, fork, and remix. If you build something epic on top of VibeDeck, I'd love to hear about it\!

```
```
