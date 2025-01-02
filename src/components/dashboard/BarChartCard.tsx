import { useTheme } from "../../contexts/ThemeContext";
import { useJobs } from "../../hooks/useJobs";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function BarChartCard() {
    const { theme } = useTheme();
    const { jobs } = useJobs();

    const statusCounts = {
        pending: jobs.filter((j) => j.status === "pending").length,
        in_progress: jobs.filter((j) => j.status === "in_progress").length,
        completed: jobs.filter((j) => j.status === "completed").length,
        cancelled: jobs.filter((j) => j.status === "cancelled").length,
    };

    const data = [
        { name: "Pending", value: statusCounts.pending, fill: "#F5A524" },
        {
            name: "Dalam Proses",
            value: statusCounts.in_progress,
            fill: "#006FEE",
        },
        { name: "Selesai", value: statusCounts.completed, fill: "#17C964" },
        { name: "Dibatalkan", value: statusCounts.cancelled, fill: "#F31260" },
    ];

    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={
                            theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)"
                        }
                    />
                    <XAxis
                        dataKey="name"
                        stroke={theme === "dark" ? "#fff" : "#000"}
                    />
                    <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor:
                                theme === "dark" ? "#1f2937" : "#fff",
                            borderColor:
                                theme === "dark" ? "#374151" : "#e5e7eb",
                            color: theme === "dark" ? "#fff" : "#000",
                        }}
                    />
                    <Bar
                        dataKey="value"
                        fill="currentColor"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
