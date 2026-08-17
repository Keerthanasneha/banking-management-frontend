import { Clock3 } from "lucide-react";

import "./DashboardWelcome.css";

export function DashboardWelcome() {
  return (
    <section className="dashboard-welcome">
      <div className="dashboard-welcome__content">
        <span className="dashboard-welcome__eyebrow">BANKING OVERVIEW</span>

        <h2>Good evening, Sneha</h2>

        <p>
          Here's an overview of your banking operations and recent activity.
        </p>
      </div>

      <div className="dashboard-welcome__updated">
        <Clock3 size={15} />

        <span>Last updated today at 10:42 PM</span>
      </div>
    </section>
  );
}
