"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/types/user';

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
  onDelete: (userId: number) => void;
}

export default function UserDetailModal({ user: initialUser, onClose, onDelete }: UserDetailModalProps) {
  const [user] = useState(initialUser);

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(user.id);
      onClose();
      toast.success('User deleted successfully!');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white">
              {user.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white">
              {user.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white">
              {user.phone}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white">
              {user.address.city}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white">
              {user.address.street}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white">
              {user.address.zip}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
          >
            Delete User
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
