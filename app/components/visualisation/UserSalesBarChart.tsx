'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface UserSalesBarChartProps {
  data: { name: string; totalRevenue: number }[];
}

export default function UserSalesBarChart({ data }: UserSalesBarChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue by Customer</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Total spend per customer</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={11} angle={-20} textAnchor="end" height={60} />
          <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `£${v}`} />
          <Tooltip formatter={(value) => [`£${Number(value).toFixed(2)}`, 'Revenue']} />
          <Bar dataKey="totalRevenue" name="Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
