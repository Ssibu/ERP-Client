

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f97316",
  "#14b8a6", "#65a30d", "#f59e0b", "#10b981"
];

const PerformanceChart = ({ data, employees = [], viewType = 'self' }) => {
  const isAllEmployeesView = viewType === 'all';

  const chartConfig = {};
  if (isAllEmployeesView) {
    employees.forEach((name, index) => {
      chartConfig[name] = {
        label: name,
        color: COLORS[index % COLORS.length],
      };
    });
  } else {
    chartConfig.rating = {
      label: "My Avg. Rating",
      color: "var(--primary)",
    };
  }

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[0, 5]}
          ticks={[1, 2, 3, 4, 5]}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel={!isAllEmployeesView} />}
        />
        <Legend />
        {isAllEmployeesView ? (
          employees.map((name) => (
            <Bar
              key={name}
              dataKey={name}
              fill={chartConfig[name]?.color || "#8884d8"} 
              radius={4}
            />
          ))
        ) : (
          <Bar dataKey="rating" fill="var(--primary)" radius={4} />
        )}
      </BarChart>
    </ChartContainer>
  );
};

export default PerformanceChart;
