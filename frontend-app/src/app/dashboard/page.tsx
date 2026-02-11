'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Vacancy, ApiResponse } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Fetch Semua Lowongan
  const { data: vacancies, isLoading, isError } = useQuery({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Vacancy[]>>('/vacancies');
      return data.data;
    },
  });

  // 2. Fungsi Hapus Lowongan
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`/vacancies/${id}`);
    },
    onSuccess: () => {
      // Refresh data otomatis setelah hapus
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      alert('Lowongan berhasil dihapus');
    },
    onError: () => {
      alert('Gagal menghapus lowongan');
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Lowongan Saya</h1>
                <p className="text-gray-500 mt-1">Kelola semua lowongan pekerjaan Anda di sini.</p>
            </div>
            <Link 
                href="/vacancies/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center gap-2"
            >
                <span>+ Buat Lowongan</span>
            </Link>
        </div>

        {/* Tabel List Lowongan */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            {isLoading ? (
                <div className="p-8 text-center text-gray-500">Memuat data...</div>
            ) : isError ? (
                <div className="p-8 text-center text-red-500">Gagal memuat data.</div>
            ) : vacancies?.length === 0 ? (
                <div className="p-12 text-center">
                    <p className="text-gray-500 mb-4">Belum ada lowongan yang dibuat.</p>
                    <Link href="/vacancies/create" className="text-blue-600 hover:underline">Buat lowongan pertama</Link>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {vacancies?.map((vacancy) => (
                        <li key={vacancy.id} className="p-4 sm:px-6 hover:bg-gray-50 transition">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-blue-600 truncate">
                                        <Link href={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link>
                                    </h3>
                                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Dibuat: {new Date(vacancy.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Status: <span className="text-green-600 font-medium ml-1">Aktif</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Tombol Edit */}
                                    <Link 
                                        href={`/vacancies/edit/${vacancy.id}`}
                                        className="text-gray-400 hover:text-blue-600 font-medium text-sm border border-gray-300 px-3 py-1 rounded bg-white">
                                        Edit
                                    </Link>
                                    
                                    {/* Tombol Hapus */}
                                    <button 
                                        onClick={() => handleDelete(vacancy.id)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 px-3 py-1 rounded bg-red-50 hover:bg-red-100">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </main>
    </div>
  );
}