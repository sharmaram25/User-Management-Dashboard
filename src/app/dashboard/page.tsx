"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from "../ThemeToggle";
import UserDetailModal from "../components/UserDetailModal";
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { User } from '@/types/user';

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const usersPerPage = 10;

  function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('91') ? `+${digits}` : `+91${digits}`;
  }

  function sortUsers(users: User[]): User[] {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }

  function maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visible = user.length > 2 ? user.slice(0, 2) : user;
    return `${visible}${'.'.repeat(Math.max(2, user.length - 2))}@${domain}`;
  }

  function maskPhone(phone: string): string {
    // Show only last 2 digits, mask rest
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 4) return phone;
    return `+91-xxxxxx${digits.slice(-4, -2)}..${digits.slice(-2)}`;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId: number) {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(users.filter(u => u.id !== userId));
      setSelectedUser(null);
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  }

  const filtered = users
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address.city.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filtered.length / usersPerPage);
  const paginated = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);

  function handleUserUpdate(updatedUser: User) {
    const formattedUser = {
      ...updatedUser,
      phone: formatPhone(updatedUser.phone)
    };

    const newUsers = sortUsers(
      users.map(u => u.id === formattedUser.id ? formattedUser : u)
    );
    setUsers(newUsers);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-6 right-8 z-20">
        <ThemeToggle />
      </div>

      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <svg className="absolute left-1/2 top-0 -translate-x-1/2 animate-pulse" width="1200" height="600" viewBox="0 0 1200 600" fill="none">
          <ellipse cx="600" cy="200" rx="500" ry="120" fill="url(#paint0_radial)" fillOpacity="0.25"/>
          <ellipse cx="300" cy="400" rx="200" ry="80" fill="url(#paint1_radial)" fillOpacity="0.18"/>
          <ellipse cx="900" cy="500" rx="180" ry="60" fill="url(#paint2_radial)" fillOpacity="0.15"/>
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(600 200) scale(500 120)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1"/>
              <stop offset="1" stopColor="#a5b4fc" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 400) scale(200 80)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a21caf"/>
              <stop offset="1" stopColor="#f472b6" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientTransform="translate(900 500) scale(180 60)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9"/>
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="w-full max-w-5xl relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl-custom p-6 sm:p-10 mt-8 mb-8 border border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient tracking-tight drop-shadow-xl animate-fade-in leading-tight sm:leading-tight">User Management Dashboard</h1>
          <Link href="/dashboard/add" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-xl hover:scale-110 hover:from-indigo-600 hover:to-pink-600 transition-all font-semibold text-lg flex items-center gap-2 animate-bounce">
            <span className="material-icons"></span> Add User
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between animate-fade-in-up">
          <input
            type="text"
            placeholder="Search by name or city (e.g. Mumbai, Amit)"
            className="w-full sm:w-96 px-4 py-3 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white text-lg transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="text-black dark:text-gray-300 text-sm mt-2 sm:mt-0">{filtered.length} user{filtered.length !== 1 ? 's' : ''} found</span>
        </div>
        {loading && <div className="text-center text-gray-600 dark:text-gray-300 animate-pulse py-10">Loading users...</div>}
        {error && <div className="text-center text-red-600 dark:text-red-400 py-10">{error}</div>}
        {!loading && !error && (
          <div className="rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 overflow-hidden animate-fade-in-up transition-colors backdrop-blur-sm border border-indigo-100/20">
            <table className="min-w-full divide-y divide-indigo-200 dark:divide-indigo-800">
              <thead className="bg-gradient-to-r from-indigo-50 to-rose-50 dark:from-gray-800 dark:to-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left text-lg font-semibold text-indigo-700 dark:text-indigo-200">Name</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold text-indigo-700 dark:text-indigo-200">Email</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold text-indigo-700 dark:text-indigo-200">Phone</th>
                  <th className="py-3 px-6 text-left text-lg font-semibold text-indigo-700 dark:text-indigo-200">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100 dark:divide-indigo-800">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">No users found.</td>
                  </tr>
                ) : (
                  paginated.map(u => (
                    <tr
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className="hover:bg-indigo-50/50 dark:hover:bg-gray-800/50 transition-all group cursor-pointer backdrop-blur-sm"
                    >
                      <td className="py-3 px-6 font-medium flex items-center gap-2">
                        <span className="truncate max-w-[120px] sm:max-w-[180px]">{u.name}</span>
                      </td>
                      <td className="py-3 px-6 max-w-[180px] truncate">{maskEmail(u.email)}</td>
                      <td className="py-3 px-6">{maskPhone(u.phone)}</td>
                      <td className="py-3 px-6">{u.address.city}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-4 bg-white/80 dark:bg-gray-900/80">
                <button
                  className="px-3 py-1 rounded bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 font-semibold disabled:opacity-50 hover:bg-indigo-300 dark:hover:bg-indigo-600 transition"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded font-semibold transition-all ${page === i + 1 ? 'bg-indigo-600 text-white scale-110 shadow' : 'bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-600'}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 font-semibold disabled:opacity-50 hover:bg-indigo-300 dark:hover:bg-indigo-600 transition"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-up { animation: fade-in 0.9s cubic-bezier(.4,0,.2,1) both; }
        .animate-bounce { animation: bounce 1.2s infinite alternate; }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
      `}</style>
    </main>
  );
}
