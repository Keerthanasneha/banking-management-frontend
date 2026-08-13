import { Bell, ChevronDown } from 'lucide-react';

import './Header.css';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__left">
        <h1 className="app-header__title">{title}</h1>
      </div>

      <div className="app-header__right">
        <button
          type="button"
          className="app-header__notification"
          aria-label="View notifications"
        >
          <Bell size={19} strokeWidth={1.8} />

          <span className="app-header__notification-badge">
            3
          </span>
        </button>

        <button
          type="button"
          className="app-header__profile"
          aria-label="Open profile menu"
        >
          <span className="app-header__avatar">
            S
          </span>

          <span className="app-header__user">
            <span className="app-header__user-name">
              Sneha Satish
            </span>

            <span className="app-header__user-role">
              Administrator
            </span>
          </span>

          <ChevronDown
            size={16}
            strokeWidth={1.8}
            className="app-header__chevron"
          />
        </button>
      </div>
    </header>
  );
}