import { Card, CardBody } from "@nextui-org/react";
import {
    Users,
    Truck,
    Briefcase,
    Calendar,
    Package,
    ClipboardCheck,
    TrendingUp,
    PieChart,
    BarChart2,
    AlertTriangle,
} from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";
import { useSuppliers } from "../hooks/useSuppliers";
import { useJobs } from "../hooks/useJobs";
import { useSchedules } from "../hooks/useSchedules";
import { useInventory } from "../hooks/useInventory";
import { useInventoryRequests } from "../hooks/useInventoryRequests";
import StatCard from "../components/dashboard/StatCard";
import LineChart from "../components/dashboard/LineChart";
import PieChartCard from "../components/dashboard/PieChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import LowStockTable from "../components/dashboard/LowStockTable";
import UpcomingSchedules from "../components/dashboard/UpcomingSchedules";
import RecentJobs from "../components/dashboard/RecentJobs";
import PendingRequests from "../components/dashboard/PendingRequests";
import WarningWidget from "../components/dashboard/WarningWidget";

export default function Dashboard() {
    const { customers } = useCustomers();
    const { suppliers } = useSuppliers();
    const { jobs, nearEndingJobs } = useJobs();
    const { schedules } = useSchedules();
    const { items } = useInventory();
    const { requests } = useInventoryRequests();

    const todaySchedules = schedules.filter(
        (schedule) =>
            new Date(schedule.date).toDateString() === new Date().toDateString()
    );

    const pendingRequests = requests.filter(
        (request) => request.status === "pending"
    );

    const lowStockItems = items.filter((item) => item.stock < 10);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <StatCard
                    title="Total Pelanggan"
                    value={customers.length}
                    icon={Users}
                />
                <StatCard
                    title="Total Supplier"
                    value={suppliers.length}
                    icon={Truck}
                />
                <StatCard
                    title="Pekerjaan Aktif"
                    value={
                        jobs.filter((job) => job.status === "in_progress")
                            .length
                    }
                    icon={Briefcase}
                />
                <StatCard
                    title="Jadwal Hari Ini"
                    value={todaySchedules.length}
                    icon={Calendar}
                />
                <StatCard
                    title="Total Inventaris"
                    value={items.reduce((sum, item) => sum + item.stock, 0)}
                    icon={Package}
                />
                <StatCard
                    title="Pengajuan Pending"
                    value={pendingRequests.length}
                    icon={ClipboardCheck}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold">
                                <TrendingUp className="w-5 h-5" />
                                Pekerjaan Baru per Bulan
                            </h3>
                        </div>
                        <LineChart />
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold">
                                <PieChart className="w-5 h-5" />
                                Distribusi Pelanggan
                            </h3>
                        </div>
                        <PieChartCard />
                    </CardBody>
                </Card>
            </div>

            {/* Status Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold">
                                <BarChart2 className="w-5 h-5" />
                                Status Pekerjaan
                            </h3>
                        </div>
                        <BarChartCard />
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold">
                                <AlertTriangle className="w-5 h-5" />
                                Stok Inventaris Rendah
                            </h3>
                        </div>
                        <LowStockTable items={lowStockItems} />
                    </CardBody>
                </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardBody>
                        <h3 className="mb-4 text-lg font-semibold">
                            Jadwal Hari Ini
                        </h3>
                        <UpcomingSchedules schedules={todaySchedules} />
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <h3 className="mb-4 text-lg font-semibold">
                            Pekerjaan Terbaru
                        </h3>
                        <RecentJobs jobs={jobs.slice(0, 5)} />
                    </CardBody>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card>
                    <CardBody>
                        <h3 className="mb-4 text-lg font-semibold">
                            Pengajuan Inventaris
                        </h3>
                        <PendingRequests requests={pendingRequests} />
                    </CardBody>
                </Card>

                <Card className="lg:col-span-2">
                    <CardBody>
                        <h3 className="mb-4 text-lg font-semibold">
                            Peringatan & Rekomendasi
                        </h3>
                        <div className="space-y-4">
                            <WarningWidget
                                title="Pekerjaan Hampir Berakhir"
                                items={nearEndingJobs}
                                type="job"
                            />
                            <WarningWidget
                                title="Stok Rendah"
                                items={lowStockItems}
                                type="inventory"
                            />
                            <WarningWidget
                                title="Pengajuan Belum Diproses"
                                items={pendingRequests}
                                type="request"
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
