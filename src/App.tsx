import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
}

const data: DataPoint[] = [
  { name: "Page A", uv: 4000, pv: 2400 },
  { name: "Page B", uv: 3000, pv: 1398 },
  { name: "Page C", uv: 2000, pv: 9800 },
  { name: "Page D", uv: 2780, pv: 3908 },
  { name: "Page E", uv: 1890, pv: 4800 },
  { name: "Page F", uv: 2390, pv: 3800 },
  { name: "Page G", uv: 3490, pv: 4300 },
];

const calculateZScores = (values: number[]): number[] => {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const stdDev = Math.sqrt(
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      values.length
  );
  return values.map((val) => (val - mean) / stdDev);
};

const pvValues: number[] = data.map((d) => d.pv);
const uvValues: number[] = data.map((d) => d.uv);
const pvZScores: number[] = calculateZScores(pvValues);
const uvZScores: number[] = calculateZScores(uvValues);

const getColor = (zScore: number): string =>
  Math.abs(zScore) > 1 ? "red" : "currentColor";

const getStrokeDasharray = (zScore: number): string =>
  Math.abs(zScore) > 1 ? "5 5" : "none";

export default function App(): JSX.Element {
  return (
    <ResponsiveContainer width={800} height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          strokeWidth={2}
          dot={({ cx, cy, index }) => (
            <circle cx={cx} cy={cy} r={4} fill={getColor(pvZScores[index])} />
          )}
          strokeDasharray={pvZScores.map(getStrokeDasharray).join(", ")}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={({ cx, cy, index }) => (
            <circle cx={cx} cy={cy} r={4} fill={getColor(uvZScores[index])} />
          )}
          strokeDasharray={uvZScores.map(getStrokeDasharray).join(", ")}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
