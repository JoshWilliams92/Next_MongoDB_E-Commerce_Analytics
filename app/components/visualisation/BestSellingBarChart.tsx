'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface BestSellingBarChartProps {
  data: { name: string; totalQuantity: number }[];
}

export default function BestSellingBarChart({ data }: BestSellingBarChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Best Selling Products</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Total units sold per product</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={11} angle={-20} textAnchor="end" height={60} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip />
          <Bar dataKey="totalQuantity" name="Units Sold" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
