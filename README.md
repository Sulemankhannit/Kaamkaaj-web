# KaamKaaj: The Accountability Engine

> **To-do lists are broken. They rely on willpower. KaamKaaj relies on proof.**

---

## 🔗 Enter the Arena

**[kaamkaaj-sooty.vercel.app](https://kaamkaaj-sooty.vercel.app)**

---

## The Brutal Truth About Every App You've Tried

You're reading this because you've tried every productivity app out there.

**Todoist.** Habitica. Notion. Todoist again. Even a paper notebook.

And they all failed. Not because the apps are bad—but because **you can lie to them.**

You can check off tasks you didn't finish. You can postpone endlessly. You can tell yourself "I'll do it tomorrow" and believe it.

Until tomorrow comes. And you postpone again.

**The cycle repeats. You get nowhere.**

---

## What Makes KaamKaaj Different?

**KaamKaaj removes the ability to lie to yourself.**

Here's the rule: **You cannot complete a task without photographic proof.**

Every task requires you to submit a photo of your actual work. An AI judge (the Game Master) reviews your submission and decides—did you actually do it, or are you faking?

If you're faking? **Rejected.** The task stays open. No XP. No achievement.

If you actually did it? **Approved.** XP earned. Streak continues. Level up.

**No shortcuts. No lies. No escape.**

---

## The Core Loop

```
FORGE A LAKSHYA  →  ASSIGN KAAMS  →  SUBMIT PROOF  →  FACE THE GAME MASTER
   (Your Quest)       (Your Tasks)     (Photo Evidence)      (AI Judge)
                                                                      ↓
                                                           LEVEL UP  OR  FAIL
```

1. **Forge a Lakshya** — Set a big goal (e.g., "Master DSA" or "Read 50 Books")
2. **Assign Kaams** — Break it into daily tasks (e.g., "Solve LeetCode #3912"). Mark as "Requires Verification" if you want AI evaluation, or skip for quick everyday tasks.
3. **Submit Saboot** — Upload a photo of your completed work (text-only for low-priority tasks)
4. **Face the Game Master** — AI judges whether you actually did it (only for verification-required Kaams)
5. **Level Up or Fail** — Earn XP or get rejected

---

## Features

### 🔥 Streak System — Never Break the Chain

Every day you complete a task, your streak grows.

- **Current Streak:** How many consecutive days you've crushed it
- **Longest Streak:** Your personal best (the one you tell everyone about)
- **Streak Freezes:** Emergency shields that protect your streak when you miss a day

Miss a day without a freeze? **You enter the Shadow Realm.**

The Shadow Realm is a dishonored state. Your XP goes into debt. You see a warning badge on your profile. You can't level up until you work off the debt.

**The streak isn't just a number—it's your reputation.**

---

### ⭐ XP & Leveling — Every Action Has Weight

Complete tasks to earn XP. Levels aren't just cosmetic—they're a visual record of your grind.

- **Easy tasks:** 25-50 XP
- **Medium tasks:** 50-100 XP
- **Hard tasks:** 100-200 XP
- **Epic tasks:** 200-500 XP

XP adds up. Levels unlock. Your profile shows your journey.

---

### 📸 Saboot — Submit Proof, Your Choice

Some tasks need verification. Some don't.

**For High-Priority Kaams (requires_proof: true):**
- AI Game Master evaluates your submission
- Photo evidence is mandatory
- Get feedback on work quality
- Earn XP when approved
- exmample task:"Master DSA","placement application","Contests" etc

**For Low-Priority Kaams (requires_proof: false):**
- Perfect for everyday tasks: "Buy groceries", "Walk the dog", "Reply to emails"
- Still log text or image proof if you want
- Quick submission, no AI evaluation
- XP awarded automatically

Either way, you're building a record of what you actually did. The Saboot is your proof of the grind.

---

### 👁 The Game Master — AI Evaluation When It Matters

Only Kaams marked as **"Requires Verification"** go to the Game Master.

When your submission arrives, the Game Master (powered by Google's Gemini AI) critically evaluates:
- Does the photo match the task description?
- Is the work actually complete?
- Is this submission legitimate?

**It doesn't care who you are. It doesn't care how much XP you want. It only cares about the truth.**

Approved → XP earned, streak continues
Rejected → Task stays open, streak at risk

For quick everyday tasks (buying groceries, walking the dog), you can skip verification entirely—or still submit a photo, but it won't be judged. Your call.

---

### 🎯 Lakshyas — Your Life Goals, Organized

Lakshyas are your long-term quests. They contain multiple Kaams (tasks) that compound into something meaningful.

Example Lakshya: **"Master Full Stack Development"**
- Kaam: "Complete React documentation" — requires verification ✓
- Kaam: "Build 3 portfolio projects" — requires verification ✓
- Kaam: "Deploy to production" — requires verification ✓

Everyday Lakshya: **"Daily Life"**
- Kaam: "Buy groceries" — no verification needed
- Kaam: "Walk 10,000 steps" — requires verification ✓
- Kaam: "Reply to emails" — no verification needed

Each Lakshya can have a deadline. You see your progress at a glance. Accomplished Lakshyas become trophies on your profile.

**You decide which Kaams need the Game Master's scrutiny.**

---

### ⚡ Urgent Tasks — For When It Can't Wait

Mark any task as urgent. Urgent tasks carry more weight—and more risk.

- Higher XP potential
- Visible to you at all times
- No excuse for missing them

---

### 👥 Clans — Your Accountability Squad

Join a clan or create your own. Clans create social accountability.

- Show your clan name on your profile
- Compete with your clanmates
- Support each other's streaks

---

### 📱 Progressive Web App — It Lives on Your Home Screen

KaamKaaj isn't just a website. It's a **Progressive Web App (PWA)** that installs on your phone like a native app.

**Why install it?**
- No browser chrome—pure immersion
- One-tap access from your home screen
- Feels like a mobile game, works like a productivity tool
- Works offline (basic features)

**How to install:**
1. Open KaamKaaj on your phone
2. Tap the menu button
3. Select "Add to Home Screen"
4. Tap the icon and start grinding

---

## The Psychology Behind KaamKaaj

**Why does photo proof work?**

1. **Commitment devices:** Once you take a photo, you're psychologically committed to finishing. The camera is a witness.

2. **Identity reinforcement:** Each completed task with proof reinforces who you are. You're not "trying to be a programmer"—you ARE a programmer who completes coding tasks.

3. **Loss aversion:** The streak system makes missing a day feel like losing something, not just failing to gain something. Humans respond more strongly to losses than gains.

4. **Instant feedback:** The AI evaluates in seconds. You don't have to wait. The dopamine hits fast—approval or rejection, immediately.

5. **No negotiation with yourself:** Normal apps let you decide "did I do enough?" KaamKaaj takes that decision away. The Game Master decides.

---

## System Architecture

### Backend
- **FastAPI** (Python) — High-performance async API
- **PostgreSQL** (Neon.tech) — Serverless database
- **Google Gemini API** — AI Game Master evaluation
- **Cloudinary** — Image storage and processing
- **JWT Authentication** — Secure token-based auth
- **Background Tasks** — Async AI processing so the API stays fast

### Infrastructure
- **Vercel** — Frontend hosting (Next.js)
- **Cloudflare Tunnel** — Secure backend access
- **PostgreSQL** — Relational data with SQLModel ORM

### Security
- OAuth2 password flow with JWT tokens
- Email OTP verification for new registrations
- Protected routes with automatic token refresh
- 401 handling with automatic logout

---

## Engineering Highlights

- **Smart polling:** Frontend pings server every 2 seconds while AI is evaluating. Results appear instantly—no manual refresh needed.
- **Client-side image compression:** Images auto-compressed to under 1MB before upload (Vercel 4.5MB limit)
- **Payload sanitization:** Empty strings filtered to prevent accidental data wiping on profile updates
- **XP debt system:** Shadow Realm enforces accountability—users must work off debt before leveling up
- **Streak freeze protection:** Users can protect streaks with freezes, balancing mercy with accountability



## Install on Mobile

1. Visit **[kaamkaaj-sooty.vercel.app](https://kaamkaaj-sooty.vercel.app)**
2. Open in Chrome/Safari on your phone
3. Tap Menu → "Add to Home Screen"
4. Launch from your home screen

---

*Rise. Grind. Verify. Repeat.*

---

**Built by [Suleman Khan](https://github.com/Sulemankhannit)**

*"The grind doesn't stop. Neither does your potential."*
