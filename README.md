## 🛠 Tech Stack

| Technology              | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| Next.js 16 (App Router) | SSR, routing, API routes                        |
| JavaScript (ES6+)       | Core logic and interactivity of the application |
| Tailwind CSS            | Utility-first styling                           |
| Hero UI                 | Premium component library                       |
| Framer Motion           | Smooth animations & micro-interactions          |
| TanStack Query          | Server-state management & caching               |
| Axios                   | HTTP client                                     |
| Zod                     | Schema validation                               |
| Socket.IO Client        | Real-time chat                                  |
| Moment.js               | Date/time formatting                            |
| ESLint + Prettier       | Code quality & formatting                       |
| React Hook Form         | Efficient Form Handling and Validation          |
| Next-intl               | Translation Management for React Nextjs         |
| React Hot Toast         | Feedback & Notifications                        |
| Icons                   | React & Lucid React Icons                       |
| Authentications         | NextAuth.js                                     |
| Security                | Bcryptjs                                        |
| Themes                  | Next-themes                                     |
| NanoID                  | Unique string ID generator for JavaScript.      |

## 🚀 Getting Started

### Prerequisites

- Node.js = v22.14.0
- npm

### Environment Variables (.env)

```bash
NEXT_PUBLIC_SERVER_API_URL=
NEXT_PUBLIC_SERVER_BASE_URL_Backend_Backend=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SERVER_BASE_URL_Backend=
EMAIL_PASS=
EMAIL_USER=
EMAIL_NAME=
NEXTAUTH_URL=
GITHUB_ID=
GITHUB_SECRET=
STORE_ID=
STORE_PASSWORD=
IS_LIVE=
NEXT_PUBLIC_BASE_URL=
```

### project structure

```
src
├── app
│   └── [locale]
│       ├── layout.jsx
│       │
│       ├── (marketing)
│       │   ├── layout.jsx
│       │   ├── page.jsx
│       │   ├── signup
│       │   ├── login
│       │   ├── blog
│       │   ├── cart
│       │   ├── contact
│       │   ├── destination
│       │   ├── payment_success
│       │   ├── reviews
│       │   ├── shop
│       │   ├── wishlist
│       │   ├── [...rest]
│       │   └── not-found.jsx
│       │
│       └── (dashboard)
│           ├── layout.jsx
│           └── dashboard
│               └── page.jsx
│
├── Components/
│   ├── Header/
│   ├── Footer/
│   ├── MainDashboard/
│   ├── DarkMode/                 
│   ├──Card/
│   ├──Blog/
│   ├──Booking/
│   ├──Contact/
│   ├──Explore_DestinationPages
│   ├──HomePage
│   ├──Login/
│   ├──InputEmail/
│   ├──PaymentSuccess
│   ├──PaymentFail
│   ├──ReusableFunction
│   ├──Review/
│   ├──Shop/
│   ├──Signup
│   ├──SingleBlog
│   ├──ThemeProvider
│   ├──ViewDetails
│   ├──Wishlist
│
├── i18n
│   ├──request.js
│
├── lib
│   ├──authAction.js
│   ├──mailAction.js
│   ├──UpdatePassword.js
│
├── provider
│
└── messages
│   ├──bn.json
│   ├──en.json
│
└──middleware.js
```

### Installation

```bash
git clone https://github.com/SHARIFULALAM2025/Travel_Planning.git
cd my-app
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm install -g vercel
vercel login
vercel --prod


```

# GitHub

```bash
git add .
git push origin branch_Name

```

## 🔒 License

**Proprietary Software – All Rights Reserved**
