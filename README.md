# 📖 PagePulse

**Track your reading, feel the pulse.**

PagePulse is a modern reading tracker that helps you build consistent reading habits. Set monthly goals, track your reading time, review books, and join discussions with fellow readers.

🔗 **Live Demo:** [pagepulse.vercel.app](https://pagepulse.vercel.app)

---

## ✨ Features

### 📊 Dashboard
- Real-time reading timer (start/pause/stop)
- Today's reading summary
- Weekly reading summary
- Total sessions count
- Reading streak tracker

### 🎯 Goals & Targets
- Set monthly reading targets (minutes & pages)
- Track progress with visual progress bars
- Automatic progress calculation

### 📈 Statistics
- Total reading time
- Total pages read
- Average per session
- Best reading day
- Monthly breakdown

### 🏆 Achievements
- 10+ badges to unlock
- Progress tracking for each achievement
- Visual rewards system

### ⭐ Book Reviews
- Rate books 1-5 stars
- Write detailed reviews
- Edit or delete your reviews
- Like other users' reviews

### 💬 Discussion Forum
- Create discussion topics
- Reply to existing topics
- View count tracking
- Organized by book title

### 🔐 Authentication
- Email signup with email verification
- Strong password validation (uppercase, lowercase, number, special char)
- Password strength indicator
- Secure login/logout
- Protected routes

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free)

### Environment Variables

Create `.env.local` file:

```env```
```NEXT_PUBLIC_SUPABASE_URL=your_supabase_url```
```NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key```

### Installation
# Clone repository
git clone https://github.com/fitriadamayanti12/pagepulse.git
cd pagepulse

# Install dependencies
npm install

# Run development server
npm run dev