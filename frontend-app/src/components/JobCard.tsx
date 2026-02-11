import { Vacancy } from '@/types';
import Link from 'next/link';
import { MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface JobCardProps {
  vacancy: Vacancy;
}

export default function JobCard({ vacancy }: JobCardProps) {
  return (
    <Link href={`/vacancies/${vacancy.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-shrink-0">
          <img
            src={vacancy.company_logo || 'https://cdn.brandfetch.io/ideJF7JZFa/w/48/h/48/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1764476245688'}
            alt={`${vacancy.company_name} Logo`}
            className="w-16 h-16 rounded-full object-cover border"
          />
        </div>

        {/* Konten Utama */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{vacancy.title}</h3>
          
          <div className="flex flex-wrap gap-y-1 gap-x-3 text-sm text-gray-600 mb-3">
            <span className="font-medium text-gray-800">{vacancy.company_name}</span>
            <span>•</span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
              {vacancy.job_type}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {vacancy.location} ({vacancy.is_remote ? 'Remote' : 'On-site'})
            </div>
            <div className="flex items-center gap-1">
              <BriefcaseIcon className="w-4 h-4" />
              {vacancy.min_experience}
            </div>
          </div>
          
           {/* Footer Card: Tanggal dibuat & expire */}
           <div className="mt-4 text-xs text-gray-400 border-t pt-2 flex justify-between">
              <span>Dibuat: {new Date(vacancy.created_at).toLocaleDateString('id-ID')}</span>
              <span className="text-red-400">Lamar sebelum: {new Date(vacancy.expires_at).toLocaleDateString('id-ID')}</span>
           </div>
        </div>
      </div>
    </Link>
  );
}