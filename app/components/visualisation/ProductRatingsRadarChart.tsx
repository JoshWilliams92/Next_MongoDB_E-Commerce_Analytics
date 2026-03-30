'use client';

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

interface ProductRatingsRadarChartProps {
  data: { name: string; rating: number; numReviews: number }[];
}

export default function ProductRatingsRadarChart({ data }: ProductRatingsRadarChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Ratings</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Average rating per product (out of 5)</p>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Radar name="Rating" dataKey="rating" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
