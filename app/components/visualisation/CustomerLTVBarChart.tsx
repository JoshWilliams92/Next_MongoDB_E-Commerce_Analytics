'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface CustomerLTVBarChartProps {
  data: { name: string; totalSpent: number; orderCount: number; avgOrderValue: number }[];
}

export default function CustomerLTVBarChart({ data }: CustomerLTVBarChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Lifetime Value</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Total spend and order count per customer</p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={11} angle={-20} textAnchor="end" height={60} />
          <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} tickFormatter={(v) => `£${v}`} />
          <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} />
          <Tooltip formatter={(value, name) => [name === 'Total Spent' ? `£${Number(value).toFixed(2)}` : value, name]} />
          <Legend />
          <Bar yAxisId="left" dataKey="totalSpent" name="Total Spent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="orderCount" name="Orders" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
