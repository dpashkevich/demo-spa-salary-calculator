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

const defaultData: SalaryLevel[] = [
  { level: "L7", salary: 95000 },
  { level: "L6", salary: 80000 },
  { level: "L5", salary: 65000 },
  { level: "L4", salary: 50000 },
  { level: "L3", salary: 35000 },
  { level: "L2", salary: 20000 },
  { level: "L1", salary: 10000 },
];

interface SalaryChartProps {
  data?: SalaryLevel[];
}

export default function SalaryChart({ data = defaultData }: SalaryChartProps) {
  // Map levels to y-index for plotting
  const levels = data.map((d) => d.level);
  const plotData = data.map((d, i) => ({
    y: i,
    x: d.salary,
    level: d.level,
    salary: d.salary,
  }));
  return (
    <div {...stylex.props(styles.container)}>
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 16, right: 32, left: 32, bottom: 16 }}>
          <CartesianGrid stroke="#ecebfa" strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 100000]}
            tickFormatter={(v) => `$${v / 1000}K`}
            axisLine={false}
            tickLine={false}
            stroke="#888"
            fontSize={14}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, levels.length - 1]}
            ticks={plotData.map((d) => d.y)}
            tickFormatter={(y) => levels[y]}
            axisLine={false}
            tickLine={false}
            stroke="#888"
            fontSize={14}
            width={40}
          />
          {/* Horizontal lines for each level */}
          {plotData.map((d) => (
            <ReferenceLine
              key={d.level}
              y={d.y}
              stroke="#ecebfa"
              strokeDasharray="2 2"
              ifOverflow="extendDomain"
            />
          ))}
          <Tooltip
            cursor={{ stroke: "#b18cff", strokeWidth: 2 }}
            formatter={(v) => `$${v.toLocaleString()}`}
            labelFormatter={(_, p) => p && p[0] && levels[p[0].payload.y]}
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
