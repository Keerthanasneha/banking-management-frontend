 import { AppLayout } from '../../../shared/components/layout/AppLayout';
import { DashboardStats } from '../components/DashboardStats/DashboardStats';
import { DashboardWelcome } from '../components/DashboardWelcome/DashboardWelcome';
import { TransactionActivityChart } from '../components/TransactionActivityChart/TransactionActivityChart';

export function DashboardPage() {
  return (
    <AppLayout>
      <DashboardWelcome />
      <DashboardStats />
      <TransactionActivityChart />
    </AppLayout>
  );
}