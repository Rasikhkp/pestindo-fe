import { Card, CardBody } from "@nextui-org/react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
    title: string;
    value: number;
    icon: LucideIcon;
    trend?: number;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend = 0,
}: Props) {
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
    const trendColor = trend >= 0 ? "text-success" : "text-danger";

    return (
        <Card>
            <CardBody className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {trend !== 0 && (
                        <div
                            className={`flex items-center gap-1 ${trendColor}`}
                        >
                            <TrendIcon className="w-4 h-4" />
                            <span className="text-sm">{Math.abs(trend)}%</span>
                        </div>
                    )}
                </div>
                <div className="mt-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="mt-1 text-2xl font-semibold">{value}</p>
                </div>
            </CardBody>
        </Card>
    );
}
