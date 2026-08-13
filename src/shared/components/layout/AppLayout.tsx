import type { PropsWithChildren } from 'react';

import { Sidebar } from './Sidebar';
import './AppLayout.css';
import { Header } from './Header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <Sidebar />

     <div className="app-layout__content">
        <Header />

        <main className="app-layout__main">
          {children}
        </main>
      </div>
    </div>
  );
}