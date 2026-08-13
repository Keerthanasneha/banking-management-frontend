import {
  Bell,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Repeat2,
  ShieldAlert,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react';

import './Sidebar.css';

const navigationItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    label: 'Customers',
    icon: Users,
    path: '/customers',
  },
  {
    label: 'Accounts',
    icon: Wallet,
    path: '/accounts',
  },
  {
    label: 'Transactions',
    icon: CreditCard,
    path: '/transactions',
  },
  {
    label: 'Transfers',
    icon: Repeat2,
    path: '/transfers',
  },
  {
    label: 'Fraud Alerts',
    icon: ShieldAlert,
    path: '/fraud-alerts',
  },
  {
    label: 'Notifications',
    icon: Bell,
    path: '/notifications',
  },
  {
    label: 'Profile',
    icon: UserRound,
    path: '/profile',
  },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark">B</div>

        <span className="sidebar__brand-name">
          Banking Management
        </span>
      </div>

      <nav className="sidebar__navigation" aria-label="Main navigation">
        <div className="sidebar__section">
          <span className="sidebar__section-title">Overview</span>

          {navigationItems.slice(0, 1).map((item) => {
            const Icon = item.icon;
    

            return (
              <a
                key={item.path}
                href={item.path}
                className="sidebar__link"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="sidebar__section">
          <span className="sidebar__section-title">Banking</span>

          {navigationItems.slice(1, 5).map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.path}
                href={item.path}
                className="sidebar__link"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="sidebar__section">
          <span className="sidebar__section-title">Monitoring</span>

          {navigationItems.slice(5).map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.path}
                href={item.path}
                className="sidebar__link"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="sidebar__footer">
        <button type="button" className="sidebar__logout">
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}