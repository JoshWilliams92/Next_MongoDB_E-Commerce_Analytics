'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface RevenueByCityBarChartProps {
  data: { name: string; totalRevenue: number; orderCount: number }[];
}

export default function RevenueByCityBarChart({ data }: RevenueByCityBarChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue by City</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Shipping destination breakdown</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" fontSize={12} tickFormatter={(v) => `£${v}`} />
          <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={12} width={70} />
          <Tooltip formatter={(value) => [`£${Number(value).toFixed(2)}`, 'Revenue']} />
          <Bar dataKey="totalRevenue" name="Revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
