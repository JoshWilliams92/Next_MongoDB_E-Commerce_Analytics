import { countUsers, countProducts, countOrders } from './lib/mongodb/document-count';
import {
  getTotalSales,
  getUserSales,
  calculateAverageOrderValue,
  getPopularItems,
  bestSellingOrders,
  getRevenueByPaymentMethod,
  getRevenueByCategory,
  getOrderFulfillmentRate,
  getCustomerLifetimeValue,
  getAverageItemsPerOrder,
  getRevenueByCity,
  getMonthlyOrderCount,
  getProductRatings,
} from './lib/mongodb/aggregations';

import KPICards from './components/visualisation/KPICards';
import MonthlySalesLineChart from './components/visualisation/MonthlySalesLineChart';
import UserSalesBarChart from './components/visualisation/UserSalesBarChart';
import BestSellingBarChart from './components/visualisation/BestSellingBarChart';
import PopularItemsBarChart from './components/visualisation/PopularItemsBarChart';
import PaymentMethodPieChart from './components/visualisation/PaymentMethodPieChart';
import OrderStatusPieChart from './components/visualisation/OrderStatusPieChart';
import RevenueByCityBarChart from './components/visualisation/RevenueByCityBarChart';
import MonthlyOrdersAreaChart from './components/visualisation/MonthlyOrdersAreaChart';
import ProductRatingsRadarChart from './components/visualisation/ProductRatingsRadarChart';
import RevenueByCategoryTreemap from './components/visualisation/RevenueByCategoryTreemap';
import CustomerLTVBarChart from './components/visualisation/CustomerLTVBarChart';
import SeedButtons from './components/SeedButtons';

export default async function Home() {
  // Fetch all data server-side in parallel
  const [
    userCount,
    productCount,
    orderCount,
    aov,
    avgItems,
    totalSales,
    userSales,
    bestSelling,
    popularItems,
    paymentRevenue,
    categoryRevenue,
    fulfillment,
    customerLTV,
    cityRevenue,
    monthlyOrders,
    productRatings,
  ] = await Promise.all([
    countUsers(),
    countProducts(),
    countOrders(),
    calculateAverageOrderValue(),
    getAverageItemsPerOrder(),
    getTotalSales(),
    getUserSales(),
    bestSellingOrders(),
    getPopularItems(),
    getRevenueByPaymentMethod(),
    getRevenueByCategory(),
    getOrderFulfillmentRate(),
    getCustomerLifetimeValue(),
    getRevenueByCity(),
    getMonthlyOrderCount(),
    getProductRatings(),
  ]);

  // Transform aggregation results into chart-ready props
  const totalSalesData = (totalSales ?? []).map((s) => ({ name: s._id, totalSales: s.totalSales }));
  const userSalesData = (userSales ?? []).map((u) => ({ name: u._id, totalRevenue: u.totalRevenue }));
  const bestSellingData = (bestSelling ?? []).map((b) => ({ name: b._id, totalQuantity: b.totalQuantity }));
  const popularItemsData = (popularItems ?? []).map((p) => ({ name: p._id, itemCount: p.itemCount }));
  const paymentData = (paymentRevenue ?? []).map((p) => ({ name: p._id, value: p.totalRevenue, orderCount: p.orderCount }));
  const categoryData = (categoryRevenue ?? []).map((c) => ({ name: c._id, totalRevenue: c.totalRevenue, itemsSold: c.itemsSold }));
  const fulfillmentData = (fulfillment ?? []).map((f) => ({ name: f.status, value: f.count }));
  const ltvData = (customerLTV ?? []).map((c) => ({ name: c._id, totalSpent: c.totalSpent, orderCount: c.orderCount, avgOrderValue: c.avgOrderValue }));
  const cityData = (cityRevenue ?? []).map((c) => ({ name: c._id, totalRevenue: c.totalRevenue, orderCount: c.orderCount }));
  const monthlyOrderData = (monthlyOrders ?? []).map((m) => ({ name: m._id, orderCount: m.orderCount, totalRevenue: m.totalRevenue }));
  const ratingsData = (productRatings ?? []).map((p) => ({ name: p.name, rating: p.rating, numReviews: p.numReviews }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              E-Commerce Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Back-office analytics &mdash; powered by MongoDB &amp; Recharts
            </p>
          </div>
          <SeedButtons />
        </div>

        {/* KPI Cards */}
        <section className="mb-8">
          <KPICards
            userCount={userCount ?? 0}
            productCount={productCount ?? 0}
            orderCount={orderCount ?? 0}
            averageOrderValue={aov ?? 0}
            averageItemsPerOrder={avgItems ?? 0}
          />
        </section>

        {/* Row 2: User Sales | Best Selling | Popular Items */}
        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <UserSalesBarChart data={userSalesData} />
          <BestSellingBarChart data={bestSellingData} />
          <PopularItemsBarChart data={popularItemsData} />
        </section>

        {/* Row 3: Monthly Sales + Monthly Orders */}
        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <MonthlySalesLineChart data={totalSalesData} />
          <MonthlyOrdersAreaChart data={monthlyOrderData} />
        </section>

        {/* Row 4: Payment Method | Order Status | Revenue by City */}
        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <PaymentMethodPieChart data={paymentData} />
          <OrderStatusPieChart data={fulfillmentData} />
          <RevenueByCityBarChart data={cityData} />
        </section>

        {/* Row 5: Customer Lifetime Value */}
        <section className="mb-8">
          <CustomerLTVBarChart data={ltvData} />
        </section>

        {/* Row 6: Product Ratings | Revenue by Category */}
        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <ProductRatingsRadarChart data={ratingsData} />
          <RevenueByCategoryTreemap data={categoryData} />
        </section>
      </main>
    </div>
  );
}
