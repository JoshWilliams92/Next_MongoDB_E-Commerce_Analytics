'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

interface RevenueByCategoryTreemapProps {
  data: { name: string; totalRevenue: number; itemsSold: number }[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  index?: number;
}

function CustomContent({ x = 0, y = 0, width = 0, height = 0, name, index = 0 }: CustomContentProps) {
  if (width < 40 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={COLORS[index % COLORS.length]} rx={4} stroke="#fff" strokeWidth={2} />
      <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={13} fontWeight={600}>
        {name}
      </text>
    </g>
  );
}

export default function RevenueByCategoryTreemap({ data }: RevenueByCategoryTreemapProps) {
  const treemapData = data.map((item) => ({
    name: item.name,
    size: item.totalRevenue,
    itemsSold: item.itemsSold,
  }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue by Category</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Product category revenue breakdown</p>
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={treemapData}
          dataKey="size"
          nameKey="name"
          stroke="#fff"
          content={<CustomContent />}
        >
          <Tooltip formatter={(value) => `£${Number(value).toFixed(2)}`} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
