'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Vacancy, ApiResponse } from '@/types';
import JobCard from '@/components/JobCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';

// Fungsi Fetch Data dari API Laravel
const fetchVacancies = async (search: string) => {
  const params = search ? { title: search } : {};
  const { data } = await api.get<ApiResponse<Vacancy[]>>('/vacancies', { params });
  return data.data;
};

export default function Home() {
  const [search, setSearch] = useState('');

  const { data: vacancies, isLoading, isError } = useQuery({
    queryKey: ['vacancies', search],
    queryFn: () => fetchVacancies(search),
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      {/* Hero Section & Search */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Temukan lowongan yang cocok untuk kamu
          </h1>
          <p className="mt-4 text-xl text-white">
            Mulai karir digitalmu bersama perusahaan terbaik.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative rounded-md shadow-lg bg-white">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-4 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                placeholder="Pekerjaan apa yang sedang kamu cari?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* List Lowongan */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
                {search ? `Hasil Pencarian "${search}"` : 'Daftar Pekerjaan Terbaru'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                {vacancies?.length || 0} Jobs found
            </p>
        </div>

        {/* State: Loading */}
        {isLoading && (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4 bg-white p-6 rounded-lg border">
                        <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* State: Error */}
        {isError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            Gagal memuat data lowongan. Pastikan server backend menyala.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {/* State: Success & Kosong */}
        {!isLoading && !isError && vacancies?.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada lowongan</h3>
                <p className="mt-1 text-sm text-gray-500">Coba kata kunci lain atau kembali nanti.</p>
            </div>
        )}

        {/* State: Success & Ada Data */}
        <div className="grid gap-6">
            {vacancies?.map((vacancy) => (
                <JobCard key={vacancy.id} vacancy={vacancy} />
            ))}
        </div>
      </main>
    </div>
  );
}