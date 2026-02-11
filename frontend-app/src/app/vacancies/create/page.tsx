'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import api from '@/lib/axios';
import RichTextEditor from '@/components/RichTextEditor';
import Navbar from '@/components/Navbar';
import CurrencyInput from '@/components/CurrencyInput';

export default function CreateVacancyPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    position: '',
    job_type: '',
    candidates_needed: 1,
    expires_at: '',
    location: '',
    is_remote: false,
    description: '',
    salary_min: 0,
    salary_max: 0,
    show_salary: false,
    min_experience: '',
  });

  const POSITIONS = ['Developer', 'Designer', 'Product Manager', 'Marketing', 'Data Scientist', 'DevOps'];
  const LOCATIONS = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bali', 'Medan', 'Semarang'];
  const JOB_TYPES = ['Full-Time', 'Part-Time', 'Kontrak', 'Intern', 'Freelance'];
  const EXPERIENCES = ['Kurang dari 1 tahun', '1-3 tahun', '4-5 tahun', '6-10 tahun', 'Lebih dari 10 tahun'];

  const mutation = useMutation({
    mutationFn: async (newVacancy: typeof formData) => {
      return await api.post('/vacancies', newVacancy);
    },
    onSuccess: () => {
      alert('Lowongan berhasil dibuat!');
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      alert('Gagal membuat lowongan. Pastikan semua field terisi dengan benar.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => router.push('/dashboard')}
            className="mb-6 flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Kembali ke Dashboard
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Buat Lowongan Pekerjaan</h1>
            <p className="mt-2 text-gray-600">
              Isi formulir di bawah ini untuk mempublikasikan lowongan baru.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
            
            {/* Judul Lowongan */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Lowongan *</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Contoh: Android Native Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Posisi & Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Posisi *</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="">Pilih posisi</option>
                  {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lokasi *</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="">Pilih lokasi</option>
                  {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <div className="mt-2 flex items-center">
                  <input
                    id="remote"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.is_remote}
                    onChange={(e) => setFormData({ ...formData, is_remote: e.target.checked })}
                  />
                  <label htmlFor="remote" className="ml-2 block text-sm text-gray-900">Bisa remote work</label>
                </div>
              </div>
            </div>

            {/* Tipe Pekerjaan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Pekerjaan *</label>
              <div className="space-y-2">
                {JOB_TYPES.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="job_type"
                      required
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      checked={formData.job_type === type}
                      onChange={() => setFormData({ ...formData, job_type: type })}
                    />
                    <label className="ml-3 block text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Kandidat & Tanggal Expire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kandidat dibutuhkan *</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  value={formData.candidates_needed}
                  onChange={(e) => setFormData({ ...formData, candidates_needed: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Aktif hingga *</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Pekerjaan *</label>
              <RichTextEditor
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
              />
            </div>

            {/* Gaji */}
            <div className="pt-4 border-t">
              <label className="block text-sm font-medium text-gray-700">Rentang Gaji (Opsional)</label>
              <div className="flex items-center mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={formData.show_salary}
                    onChange={(e) => setFormData({ ...formData, show_salary: e.target.checked })}
                  />
                  <label className="ml-2 block text-sm text-gray-900">Tampilkan gaji di lowongan</label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                    <CurrencyInput 
                      value={formData.salary_min}
                      onChange={(val) => setFormData({ ...formData, salary_min: val })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Maksimum</label>
                    <CurrencyInput 
                      value={formData.salary_max}
                      onChange={(val) => setFormData({ ...formData, salary_max: val })}
                      placeholder="0"
                    />
                  </div>
              </div>
            </div>

            {/* Pengalaman */}
            <div className="pt-4 border-t">
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Pengalaman *</label>
              <div className="space-y-2">
                {EXPERIENCES.map((exp) => (
                  <div key={exp} className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      required
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      checked={formData.min_experience === exp}
                      onChange={() => setFormData({ ...formData, min_experience: exp })}
                    />
                    <label className="ml-3 block text-sm text-gray-700">{exp}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Action */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {mutation.isPending ? 'Menyimpan...' : 'Buat Lowongan'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}