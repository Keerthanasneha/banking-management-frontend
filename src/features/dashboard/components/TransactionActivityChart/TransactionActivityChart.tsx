import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./TransactionActivityChart.css";

const transactionData = [
  { day: "Mon", transactions: 8200 },
  { day: "Tue", transactions: 10500 },
  { day: "Wed", transactions: 9200 },
  { day: "Thu", transactions: 11800 },
  { day: "Fri", transactions: 15100 },
  { day: "Sat", transactions: 11600 },
  { day: "Sun", transactions: 13700 },
];

export function TransactionActivityChart() {
  return (
    <section className="transaction-chart">
      <div className="transaction-chart__header">
        <div>
          <span className="transaction-chart__eyebrow">
            TRANSACTION MONITORING
          </span>

          <h2>Transaction Activity</h2>

          <p>Transaction volume over the last 7 days.</p>
        </div>

        <select
          className="transaction-chart__period"
          defaultValue="7"
          aria-label="Transaction period"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="transaction-chart__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={transactionData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={45}
              tickFormatter={(value) => `${value / 1000}K`}
            />

            <Tooltip
              formatter={(value) => [
                Number(value).toLocaleString(),
                "Transactions",
              ]}
            />

            <Line
              type="monotone"
              dataKey="transactions"
              stroke="#173f5f"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
