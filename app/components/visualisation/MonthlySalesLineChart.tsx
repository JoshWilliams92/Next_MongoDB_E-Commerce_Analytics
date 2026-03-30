'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface MonthlySalesLineChartProps {
  data: { name: string; totalSales: number }[];
}

export default function MonthlySalesLineChart({ data }: MonthlySalesLineChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Sales Revenue</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Total revenue by month</p>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `£${v}`} />
          <Tooltip formatter={(value) => [`£${Number(value).toFixed(2)}`, 'Revenue']} />
          <Legend />
          <Line type="monotone" dataKey="totalSales" name="Revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
