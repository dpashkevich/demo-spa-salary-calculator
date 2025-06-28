import * as stylex from "@stylexjs/stylex";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export interface SalaryLevel {
  level: string;
  salary: number;
}

const defaultData: Record<string, unknown>[] = [
  { level: "L7", salary: 95000 },
  { level: "L6", salary: 80000 },
  { level: "L5", salary: 65000 },
  { level: "L4", salary: 50000 },
  { level: "L3", salary: 35000 },
  { level: "L2", salary: 20000 },
  { level: "L1", salary: 10000 },
];

interface SalaryChartProps {
  data?: Record<string, unknown>[];
  xKey?: string;
  yKey?: string;
  xLabel?: string;
}

export default function SalaryChart({
  data = defaultData,
  xKey = "salary",
  yKey = "level",
  xLabel = "Salary",
}: SalaryChartProps) {
  if (!data || data.length === 0) {
    return <div {...stylex.props(styles.container)}>No data available</div>;
  }
  const plotData = data.map((d, i) => ({
    y: i,
    x: d[xKey],
    yLabel: d[yKey],
    ...d,
  }));
  return (
    <div {...stylex.props(styles.container)}>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 16, right: 32, left: 32, bottom: 16 }}>
          <CartesianGrid stroke="#ecebfa" strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            tickFormatter={(v) => `$${v / 1000}K`}
            axisLine={false}
            tickLine={false}
            stroke="#888"
            fontSize={14}
          />
          <YAxis
            type="category"
            dataKey="yLabel"
            ticks={plotData.map((d) => String(d.yLabel))}
            tickFormatter={(y) => String(y)}
            axisLine={false}
            tickLine={false}
            stroke="#888"
            fontSize={14}
            width={80}
          />
          {/* Horizontal lines for each y value */}
          {plotData.map((d) => (
            <ReferenceLine
              key={String(d.yLabel)}
              y={String(d.yLabel)}
              stroke="#ecebfa"
              strokeDasharray="2 2"
              ifOverflow="extendDomain"
            />
          ))}
          <Tooltip
            cursor={{ stroke: "#b18cff", strokeWidth: 2 }}
            formatter={(v, name) =>
              name === xKey ? `$${v.toLocaleString()}` : v
            }
            labelFormatter={(label) => `${label}`}
          />
          <Scatter
            data={plotData}
            fill="#6b57ff"
            shape={(props: { cx?: number; cy?: number }) => (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={10}
                fill="#b18cff"
                stroke="#6b57ff"
                strokeWidth={3}
                opacity={0.95}
              />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = stylex.create({
  container: {
    width: "100%",
    height: 320,
    background: "transparent",
  },
});
