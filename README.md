<div align="center">

# 🧬 MediTwin AI

### 💚 Know your body. Own your health. 💚

*Your personal AI-powered digital health twin: risk insights, lifestyle simulations, and a caring health coach, all in one calm dashboard.*

🩺 **Health Score** &nbsp;·&nbsp; 🔮 **What-If Simulator** &nbsp;·&nbsp; 🤖 **AI Coach** &nbsp;·&nbsp; 📋 **Wellness Report**

</div>

---

> 🩹 **Medical disclaimer**
> MediTwin AI is an educational wellness companion. Scores, ages, and risk percentages are AI or heuristic **estimates**, not clinical results. It does not diagnose, treat, or replace advice from a qualified healthcare professional. If you are unwell or concerned, please consult a doctor.

---

## 🌿 Table of Contents

| | Section | | Section |
|---|---|---|---|
| 🌱 | [About the Project](#-about-the-project) | 🧱 | [Project Structure](#-project-structure) |
| ✨ | [Features](#-features) | 🚀 | [Getting Started](#-getting-started) |
| 🧪 | [Tech Stack](#-tech-stack) | ⚙️ | [Configuration](#️-configuration) |
| 🏥 | [How It Works](#-how-it-works) | 🔌 | [Backend API](#-backend-api) |
| 🧭 | [User Journey](#-user-journey) | 🎨 | [Customisation](#-customisation) |
| 🛡️ | [Security & Privacy](#️-security--privacy) | 🛠️ | [Troubleshooting](#️-troubleshooting) |
| ⚠️ | [Limitations](#️-limitations) | 🗺️ | [Roadmap](#️-roadmap) |
| 🤝 | [Contributing](#-contributing) | 📄 | [License](#-license) |

---

## 🌱 About the Project

Most of us never see our everyday habits turned into something concrete. **MediTwin AI** takes a friendly two-minute questionnaire about your body, lifestyle, diet, and goals, and builds a **digital twin of your wellbeing**.

From that twin you get a clear health score, personalised risk predictions, a look at how small changes could reshape your future, and a warm AI coach who already knows your profile.

💡 **Two ways it runs**

| Mode | What happens |
|---|---|
| 🤖 **AI-powered** | The backend securely forwards your profile to an AI model for personalised analysis, simulations, and coaching |
| 🛟 **Offline fallback** | If the AI service is unreachable, a built-in rule-based engine still produces the full dashboard, simulations, and coach replies, so you are never left with a blank screen |

---

## ✨ Features

### 🩺 Health Analysis
- 💯 **Health score** from 0 to 100, graded from Critical to Excellent
- 🕰️ **Biological age** and ❤️ **cardiovascular age** versus your calendar age
- ⚖️ **BMI** with category, and ⚡ **metabolic health** rating
- 🏷️ Personalised profile tags, a positive highlight of your biggest strength, and an encouraging summary

### 🎯 Risk Predictions
Six areas, each with a percentage, a level (low, medium, high), and one actionable tip:

| | Risk Area | | Risk Area |
|---|---|---|---|
| 🩸 | Type 2 Diabetes | ⚖️ | Metabolic Syndrome |
| ❤️ | Heart Disease | 😴 | Sleep Disorder |
| 💢 | Hypertension | 🧠 | Mental Burnout |

### 🔮 What-If Simulator
Pick a positive change and instantly see the projected effect on your score, biological age, and top risks, with a timeframe and milestones.

| | Scenario | | Scenario |
|---|---|---|---|
| 🏃 | 30 minutes of daily exercise | 🧘 | Halve your stress |
| 🍭 | Cut sugar by 50% | 💧 | 8 glasses of water daily |
| 😴 | Sleep 8 hours a night | 🚶 | 10,000 steps a day |
| 🚭 | Quit smoking | 🌟 | **All changes together** |
| 🫒 | Mediterranean diet | | |

### 🤖 AI Health Coach
- 💬 Chats with your full profile, score, and top risks already loaded
- 🎛️ Five coaching modes: **General · Nutrition · Fitness · Mental · Sleep**
- ⚡ Quick questions such as a 7-day workout plan, weekly meal plan, bedtime routine, or a 30-day plan to raise your score
- 🔁 Conversation memory, automatic retry, and graceful fallback replies

### 📋 Wellness Report
A five-dimension assessment, each with a score and explanation:
🏋️ Physical Fitness · 🥗 Nutrition & Diet · 🧠 Mental Wellbeing · 😴 Sleep Quality · ❤️ Cardiovascular Health

### 🛤️ Health Trajectory
A personalised outlook for **1–2 years**, **3–5 years**, and **6–10 years**.

### 🌈 Experience
- 🧭 Guided three-step onboarding with soft sliders and pill selectors
- 🧬 Animated welcome screen with a 3D DNA visual
- 🌗 Light and dark themes that remember your choice
- 📱 Fully responsive for desktop, tablet, and mobile

---

## 🧪 Tech Stack

| Layer | Technology |
|---|---|
| 🖥️ Frontend | React with TypeScript |
| ⚡ Build tool | Vite |
| 🔧 Backend | Node.js (`backend/server.js`) |
| 🧠 AI integration | Server-side calls to an AI model via one chat endpoint |
| 🌐 3D visuals | Three.js |
| 🔤 Typography | Inter and Playfair Display |
| 🔐 Configuration | Environment variables via `.env` |

---

## 🏥 How It Works

| Step | What happens |
|---|---|
| 1️⃣ **Profile** | Your answers are combined with a calculated BMI |
| 2️⃣ **Analysis** | The profile goes to the AI model, which returns a structured result: score, ages, tags, risks, timeline, summary, and report sections |
| 3️⃣ **Safety net** | If the reply is missing or malformed, the rule-based engine produces the same set of results locally |
| 4️⃣ **Dashboard** | Everything is rendered into your dashboard and report |
| 5️⃣ **Simulations** | Each what-if scenario sends your score, risks, and biological age to the AI, or uses a heuristic estimate if that fails |
| 6️⃣ **Coaching** | Every chat request carries a system prompt with your profile and top risks, so advice references your real numbers |

**Architecture at a glance**

| Component | Responsibility |
|---|---|
| 🖼️ React app (`src/`) | Welcome, onboarding, dashboard, simulator, coach, and report screens |
| 🧩 Components (`src/components/`) | Reusable interface pieces |
| 🪝 Hooks (`src/hooks/`) | Reusable logic for state, API calls, and theming |
| 🔌 Backend (`backend/server.js`) | Receives chat requests, adds credentials, calls the AI model, returns the reply |
| 🛟 Fallback engine | Local rule-based logic that takes over if the AI is unreachable |

---

## 🧭 User Journey

1. 🚪 **Start:** open the app and choose *Get Started*
2. 🙋 **About you:** age, sex, height, weight, family history, smoking status
3. 🌿 **Daily habits:** sleep, exercise, water, stress, alcohol, steps
4. 🥗 **Diet & goals:** pick a diet pattern and one or more health goals
5. 🏠 **Dashboard:** explore your score, ages, risks, summary, and trajectory
6. 🔮 **What-If:** test positive changes and watch your outlook improve
7. 🤖 **AI Coach:** ask anything, switch modes, or tap a quick question
8. 📋 **Report:** open your full wellness assessment
9. 🌗 **Theme & reset:** switch light or dark any time, or start over with one tap

---

## 🧱 Project Structure

```
.
├── 🔧 backend/
│   ├── package.json         Backend dependencies and scripts
│   ├── package-lock.json
│   └── server.js            API server and AI proxy
├── 🌐 public/
│   ├── favicon.svg
│   └── icons.svg            Static assets
├── 🖼️ src/
│   ├── components/          Reusable UI components
│   ├── hooks/               Custom React hooks
│   ├── App.tsx              Root application component
│   ├── index.css            Global styles and theme variables
│   └── main.tsx             Application entry point
├── .env.example             Environment variable template
├── .gitignore
├── index.html               Vite HTML entry
├── package.json             Frontend dependencies and scripts
├── package-lock.json
├── tsconfig.json            TypeScript configuration
└── vite.config.js           Vite configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- 🟢 Node.js 18 or later and npm
- 🔑 An API key for the AI provider used by the backend
- 🌐 A modern browser with WebGL support

### 🛠️ Installation

1. 📥 Clone the repository and open the project folder
2. 📦 Install frontend dependencies from the project root with `npm install`
3. 📦 Install backend dependencies by running `npm install` inside the `backend` folder
4. 🔐 Copy `.env.example` to `.env` and fill in your values
5. 🔧 Start the backend server from the `backend` folder
6. 🖥️ Start the frontend from the project root with `npm run dev`
7. 🌿 Open the local address shown in your terminal

> 💡 Check the `scripts` section of each `package.json` for the exact command names in your setup.

### 🏗️ Production build
Run `npm run build` to create an optimised bundle and `npm run preview` to test it locally. Deploy the built frontend together with the backend, and make sure the frontend can reach `/api/chat`.

---

## ⚙️ Configuration

Settings live in `.env`, created from `.env.example`.

| 🔑 Setting | Purpose |
|---|---|
| AI provider API key | Credential the backend uses to call the AI model |
| Model name | Which AI model the backend should request |
| Server port | Port the backend listens on |

> 🔒 See `.env.example` for the exact variable names, and never commit your real `.env` file.

---

## 🔌 Backend API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/chat` | Send a conversation to the AI model and receive its reply |

- 📨 **Request:** a list of messages (role and content), a maximum token limit, and an optional system prompt
- ✅ **Success:** JSON with the assistant's text in a `reply` field
- ❌ **Error:** a non-success status with JSON containing an `error` message

For analysis and simulations, the model is asked to return **raw JSON only**. The frontend strips markdown fences before parsing and uses local logic if parsing fails.

---

## 🎨 Customisation

| 🎯 Goal | 📍 Where to look |
|---|---|
| Change colours and theme | CSS variables in `src/index.css` |
| Add or edit what-if scenarios | The simulator component and its scenario definitions |
| Change coach personalities | Coaching mode definitions in the coach component or hook |
| Modify risks or report sections | The analysis prompt and the matching fallback logic |
| Switch AI model or provider | `backend/server.js` and `.env` |
| Adjust dev server behaviour | `vite.config.js` |

---

## 🛡️ Security & Privacy

- 🙈 **No account required.** Health inputs stay in your browser session, and only the theme preference is stored locally
- 🔄 **Data flow:** profile data goes to your backend and then to your AI provider, so review that provider's data-retention policy first
- 🔑 **Credentials stay on the server.** Never place API keys in frontend code or version control
- 🧼 **Sanitise AI output** before rendering it as HTML to prevent script injection
- 🚧 **Harden the backend** with rate limiting, request-size limits, input validation, and a strict CORS policy before going public
- ⚖️ **Health data is sensitive.** Depending on your region and use, rules such as HIPAA or GDPR may apply

---

## ⚠️ Limitations

- 📉 Results are estimates from an AI model or simplified heuristics, not medically validated
- 🤖 The coach is instructed not to diagnose or prescribe, which relies on model behaviour
- 💾 Profile data and chat history are not saved between sessions
- 🖥️ The 3D visuals need WebGL and may be heavy on low-end devices
- 🔀 AI replies can occasionally be inconsistent or badly formatted, in which case fallback logic steps in

---

## 🛠️ Troubleshooting

| 🩹 Problem | 💊 Suggested fix |
|---|---|
| Generic results or canned coach replies | Backend unreachable or AI call failed. Check the backend is running, the API key is set, and `/api/chat` is reachable |
| `/api/chat` returns 404 | Frontend and backend are on different addresses. Add a dev proxy in `vite.config.js` or serve both from one origin |
| Backend will not start | Confirm backend dependencies are installed and `.env` is filled in |
| JSON errors in the console | The model wrapped the JSON in extra text. The app falls back automatically, but you can tighten the prompt |
| 3D visual missing | WebGL disabled or blocked. The rest of the app still works |
| `.env` changes ignored | Restart the dev servers after editing |

---

## 🗺️ Roadmap

- [ ] 💾 Save profiles and history between sessions
- [ ] 📄 Export the health report as a PDF
- [ ] 📈 Track progress over time with trend charts
- [ ] ⚡ Stream coach replies as they are written
- [ ] 🧼 Safe rendering of formatted coach replies
- [ ] ⌚ Wearable and health-app data import
- [ ] 🌍 Multi-language support
- [ ] ♿ Accessibility improvements and reduced-motion support
- [ ] 🧪 Automated tests and continuous integration

---

## 🤝 Contributing

Contributions that make people's health journeys a little easier are always welcome.

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. ✏️ Make focused changes with clear commit messages
4. 📬 Open a Pull Request describing what changed, why, and how you tested it

---

## 📄 License

No license has been specified for this project. All rights are reserved by the author. If you would like to use or redistribute this code, please contact the author first.

---

<div align="center">

💚 **Built with care for healthier tomorrows.** 💚

*Every positive step you take builds into a healthier tomorrow.*

</div>
