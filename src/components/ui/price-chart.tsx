"use client";

import { PriceChartData } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const PriceChart = (props: { data: PriceChartData[] }) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tick) => {
            const date = new Date(tick);
            return date.toLocaleDateString("en-US", {
              month: "short",
              year: "2-digit",
            });
          }}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide={true} />
        <Tooltip
          labelFormatter={(label) => {
            const date = new Date(label);
            return date.toLocaleDateString("en-US", {
              month: "short",
              year: "2-digit",
            });
          }}
        />
        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2}>
          <LabelList
            dataKey="price"
            position="top"
            formatter={(value: number) =>
              new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(value)
            }
            style={{ fontSize: 12 }}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;