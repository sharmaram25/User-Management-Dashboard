"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps = ['Basic Info', 'Address', 'Review & Confirm'];

const initialForm = {
  name: '',
  email: '',
  street: '',
  city: '',
  zip: '',
  phone: '',
};

export default function AddUserPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('addUserForm');
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('addUserForm', JSON.stringify(form));
  }, [form]);

  function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('91') ? `+${digits}` : `+91${digits}`;
  }

  function validate() {
    const errs: any = {};
    if (step === 0) {
      if (!form.name) errs.name = 'Name is required';
      if (!form.email) errs.email = 'Email is required';
      else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = 'Invalid email';
      if (!form.phone) errs.phone = 'Phone number is required';
      else if (!/^\+91\d{10}$/.test(form.phone)) errs.phone = 'Invalid phone number format. Should be +91 followed by 10 digits';
    }
    if (step === 1) {
      if (!form.street) errs.street = 'Street is required';
      if (!form.city) errs.city = 'City is required';
      if (!form.zip) errs.zip = 'PIN code is required';
      else if (!/^\d{6}$/.test(form.zip)) errs.zip = 'Invalid PIN code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validate()) setStep(s => s + 1);
  }
  function handleBack() {
    setStep(s => s - 1);
  }
  function capitalizeFirst(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === 'phone' ? formatPhone(value)
        : name === 'name' || name === 'city' ? capitalizeFirst(value)
        : value
    }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: capitalizeFirst(form.name),
          email: form.email,
          phone: formatPhone(form.phone),
          address: {
            city: capitalizeFirst(form.city),
            street: form.street,
            zip: form.zip
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add user');
      }

      toast.success('User added successfully!');
      localStorage.removeItem('addUserForm');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add user');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      <Toaster />
      <div className="w-full max-w-2xl bg-glass rounded-2xl shadow-xl-custom p-8 mt-16 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient text-center tracking-tight drop-shadow-xl mb-8 leading-tight">Add New User</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <div className="mb-4">
                  <label className="block mb-1">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. Priya Singh"
                    disabled={isSubmitting}
                  />
                  {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. priya.singh@gmail.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. +919876543210"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <div className="mb-4">
                  <label className="block mb-1">Street</label>
                  <input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. 123 MG Road"
                    disabled={isSubmitting}
                  />
                  {errors.street && <div className="text-red-500 text-sm">{errors.street}</div>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. Mumbai"
                    disabled={isSubmitting}
                  />
                  {errors.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1">PIN Code</label>
                  <input
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. 400001"
                    disabled={isSubmitting}
                  />
                  {errors.zip && <div className="text-red-500 text-sm">{errors.zip}</div>}
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <div className="mb-4">
                  <div className="font-semibold mb-2">Review Details</div>
                  <div className="mb-1"><span className="font-medium">Name:</span> {form.name}</div>
                  <div className="mb-1"><span className="font-medium">Email:</span> {form.email}</div>
                  <div className="mb-1"><span className="font-medium">Phone:</span> {form.phone}</div>
                  <div className="mb-1"><span className="font-medium">Street:</span> {form.street}</div>
                  <div className="mb-1"><span className="font-medium">City:</span> {form.city}</div>
                  <div className="mb-1"><span className="font-medium">PIN Code:</span> {form.zip}</div>
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                        Adding User...
                      </>
                    ) : (
                      'Confirm & Add'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <Link href="/dashboard" className="mt-8 block text-center text-indigo-600 hover:underline dark:text-indigo-400 text-lg font-medium">← Back to Dashboard</Link>
      </div>
    </main>
  );
}
