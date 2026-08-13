import {
  AlertTriangle,
  ArrowLeftRight,
  Users,
  Wallet,
} from 'lucide-react';

import { DashboardStatCard } from '../DashboardStatCard/DashboardStatCard';

import './DashboardStats.css';

export function DashboardStats() {
  return (
    <section
      className="dashboard-stats"
      aria-label="Banking statistics"
    >
      <DashboardStatCard
        title="Total Customers"
        value="12,482"
        description="+4.2% from last month"
        icon={Users}
        variant="default"
      />

      <DashboardStatCard
        title="Total Accounts"
        value="18,294"
        description="+2.8% from last month"
        icon={Wallet}
        variant="default"
      />

      <DashboardStatCard
        title="Transactions"
        value="84,921"
        description="+8.4% from last month"
        icon={ArrowLeftRight}
        variant="success"
      />

      <DashboardStatCard
        title="Fraud Alerts"
        value="24"
        description="3 require attention"
        icon={AlertTriangle}
        variant="danger"
      />
    </section>
  );
}