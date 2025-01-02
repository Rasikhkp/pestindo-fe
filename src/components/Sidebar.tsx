import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Truck,
    Briefcase,
    UserCog,
    Calendar,
    Package,
    Activity,
    ChevronDown,
    X,
    Wrench,
} from "lucide-react";
import { useState, useEffect } from "react";
import { NavItem } from "../types";
import logoPestindo from "../assets/images/logo pestindo 2.png";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems: NavItem[] = [
    { title: "Dashboard", path: "/", icon: "LayoutDashboard" },
    { title: "Pelanggan", path: "/customers", icon: "Users" },
    { title: "Supplier", path: "/suppliers", icon: "Truck" },
    { title: "Pekerjaan", path: "/jobs", icon: "Briefcase" },
    { title: "Pekerjaan Teknisi", path: "/technician-jobs", icon: "Wrench" },
    { title: "Staff", path: "/staff", icon: "UserCog" },
    { title: "Jadwal", path: "/schedule", icon: "Calendar" },
    {
        title: "Inventaris",
        path: "/inventory",
        icon: "Package",
        children: [
            { title: "Daftar Barang", path: "/inventory/items" },
            { title: "Log Inventaris", path: "/inventory/logs" },
            { title: "Pengajuan", path: "/inventory/requests" },
            { title: "Order", path: "/inventory/orders" },
        ],
    },
    {
        title: "Inventaris Teknisi",
        path: "/inventory-technician",
        icon: "Wrench",
        children: [
            { title: "Daftar Barang", path: "/inventory-technician/list" },
            {
                title: "Pengajuan",
                path: "/inventory-technician/approval_request",
            },
        ],
    },
    { title: "Aktivitas", path: "/activities", icon: "Activity" },
];

const iconComponents: { [key: string]: any } = {
    LayoutDashboard,
    Users,
    Truck,
    Briefcase,
    UserCog,
    Calendar,
    Package,
    Activity,
    Wrench,
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleExpand = (title: string) => {
        setExpandedItems((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );
    };

    const renderNavItem = (item: NavItem) => {
        const Icon = iconComponents[item.icon];
        const isActive = location.pathname === item.path;
        const isExpanded = expandedItems.includes(item.title);

        return (
            <div key={item.path}>
                <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                        isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={(e) => {
                        if (item.children) {
                            e.preventDefault();
                            toggleExpand(item.title);
                        } else if (isMobile) {
                            onClose();
                        }
                    }}
                >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{item.title}</span>
                    {item.children && (
                        <ChevronDown
                            className={`ml-auto w-4 h-4 transition-transform ${
                                isExpanded ? "transform rotate-180" : ""
                            }`}
                        />
                    )}
                </Link>
                {item.children && isExpanded && (
                    <div className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                            <Link
                                key={child.path}
                                to={child.path}
                                className={`block py-2 px-4 rounded-lg transition-colors ${
                                    location.pathname === child.path
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                }`}
                                onClick={() => isMobile && onClose()}
                            >
                                {child.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {isOpen && isMobile && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed md:fixed bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full w-[280px] z-50 transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4">
                    {/* <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1> */}
                    <img src={logoPestindo} className="w-40" />
                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="w-5 h-5 dark:text-gray-200" />
                        </button>
                    )}
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map(renderNavItem)}
                </nav>
            </aside>
        </>
    );
}
