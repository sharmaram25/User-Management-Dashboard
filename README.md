This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# User Management Dashboard

![User Management Dashboard Screenshot](./screenshot.png)

A modern, full-stack user management dashboard built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS. This application allows you to view, add, and delete users with a beautiful UI, persistent form progress, and a dark mode-first experience.

## Features

- **User List**: View all users in a sortable, paginated table.
- **User Details Modal**: View user details in a modal with delete functionality.
- **Add User**: Multi-step form with validation and persistent progress (localStorage).
- **API Routes**: Next.js API routes for user CRUD operations (in-memory store).
- **Dark Mode**: Dark theme is default; light mode function will be added in future for theme switching.
- **Responsive Design**: Works great on desktop and mobile.
- **Sample Data**: 30 diverse user included.

## Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [react-hot-toast](https://react-hot-toast.com/) (notifications)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/user-management-dashboard.git
cd user-management-dashboard

# Install dependencies
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
user-management-dashboard/
├── src/
│   ├── app/
│   │   ├── api/users/route.ts         # API routes for user CRUD
│   │   ├── components/UserDetailModal.tsx
│   │   ├── dashboard/page.tsx         # Dashboard (user list)
│   │   ├── dashboard/add/page.tsx     # Add user form
│   │   ├── ThemeToggle.tsx            # Theme toggle button
│   │   ├── layout.tsx                 # App layout
│   │   └── page.tsx                   # Root page (redirects to dashboard)
│   └── types/user.ts                  # User type definitions
├── public/                            # Static assets
├── next.config.ts                     # Next.js config
├── tailwind.config.js                 # Tailwind config
└── README.md
```

## Usage

- **View Users**: The dashboard displays all users. Use the search bar to filter by name or city.
- **Add User**: Click "Add User" to open the multi-step form. Progress is saved in localStorage.
- **View Details**: Click a user row to open the details modal.
- **Delete User**: In the modal, click "Delete User" to remove a user.
- **Theme**: The app starts in dark mode by default. 

## Customization

- **Persistent Data**: The app uses an in-memory array for users. For production, connect to a real database.
- **Sample Data**: Edit `src/app/api/users/route.ts` to change the initial user list.
- **Styling**: Modify Tailwind classes or add your own styles in `globals.css`.

## License

This project is open source and available to use as per user descretion.

---

**Made with ❤️ using Next.js and Tailwind CSS.**
