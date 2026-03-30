'use client';

interface KPICardsProps {
  userCount: number;
  productCount: number;
  orderCount: number;
  averageOrderValue: number;
  averageItemsPerOrder: number;
}

const cards = [
  { key: 'userCount', label: 'Total Users', color: 'bg-blue-500' },
  { key: 'productCount', label: 'Total Products', color: 'bg-emerald-500' },
  { key: 'orderCount', label: 'Total Orders', color: 'bg-violet-500' },
  { key: 'averageOrderValue', label: 'Avg Order Value', color: 'bg-amber-500', prefix: '£' },
  { key: 'averageItemsPerOrder', label: 'Avg Items / Order', color: 'bg-rose-500' },
] as const;

export default function KPICards(props: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map(({ key, label, color, ...rest }) => {
        const value = props[key as keyof KPICardsProps];
        const prefix = 'prefix' in rest ? rest.prefix : '';
        const display = typeof value === 'number' && !Number.isInteger(value)
          ? `${prefix}${value.toFixed(2)}`
          : `${prefix}${value}`;

        return (
          <div key={key} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <span className={`inline-block h-3 w-3 rounded-full ${color}`} />
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {display}
            </p>
          </div>
        );
      })}
    </div>
  );
}
