'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Vacancy, ApiResponse } from '@/types';
import Navbar from '@/components/Navbar';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function VacancyDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Fetch Data Detail
  const { data: vacancy, isLoading, isError } = useQuery({
    queryKey: ['vacancy', id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Vacancy>>(`/vacancies/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !vacancy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gagal Memuat Data</h2>
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          &larr; Kembali ke halaman utama
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
            onClick={() => router.back()}
            className="mb-6 flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Kembali ke daftar lowongan
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          
          {/* Judul & Logo */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={vacancy.company_logo || 'https://via.placeholder.com/80'}
                alt="Logo"
                className="w-20 h-20 rounded-lg border object-cover shadow-sm"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{vacancy.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="font-semibold text-blue-700">{vacancy.company_name}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{vacancy.location} ({vacancy.is_remote ? 'Remote' : 'On-site'})</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded-full border border-green-100">
                    {vacancy.job_type}
                  </span>
                </div>
              </div>
              
              {/* Tombol Lamar */}
              <div className="mt-4 md:mt-0">
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition transform active:scale-95">
                  Lamar Sekarang
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                    Berakhir: {new Date(vacancy.expires_at).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Deskripsi Utama */}
            <div className="md:col-span-2 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {vacancy.description}
              </div>

              {vacancy.show_salary && (
                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wide">Tawaran Gaji</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(vacancy.salary_min || 0)} 
                        {' - '} 
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(vacancy.salary_max || 0)}
                    </p>
                </div>
              )}
            </div>

            {/* Kolom Kanan: Informasi Tambahan */}
            <div className="p-8 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                Informasi Tambahan
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">Pengalaman</label>
                  <p className="font-semibold text-gray-900 mt-1 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    {vacancy.min_experience}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">Posisi</label>
                  <p className="font-semibold text-gray-900 mt-1 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                    {vacancy.position}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">Kandidat Dibutuhkan</label>
                  <p className="font-semibold text-gray-900 mt-1 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    {vacancy.candidates_needed} Orang
                  </p>
                </div>
              </div>

              {/* Share Button (Dummy) */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full border border-gray-300 text-gray-700 font-medium py-2 rounded hover:bg-gray-50 transition">
                    Bagikan Lowongan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}