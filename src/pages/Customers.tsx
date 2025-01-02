import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import CustomerTable from "../components/customers/CustomerTable";
import { Plus } from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";
import { CustomerFilterOptions } from "../types/customer";

export default function Customers() {
    const navigate = useNavigate();
    const { customers, deleteCustomers } = useCustomers();
    const [filters, setFilters] = useState<CustomerFilterOptions>({
        type: "all",
        minJobs: 0,
        maxJobs: 100,
    });

    const filteredCustomers = customers.filter((customer) => {
        if (filters.type !== "all" && customer.type !== filters.type)
            return false;
        if (customer.totalJobs < filters.minJobs) return false;
        if (customer.totalJobs > filters.maxJobs) return false;
        return true;
    });

    const handleEdit = (id: string) => {
        navigate(`/customers/edit/${id}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-semibold">Pelanggans</h1>
                <Button
                    color="primary"
                    onPress={() => navigate("/customers/create")}
                    startContent={<Plus className="w-4 h-4" />}
                >
                    Tambah Pelanggan
                </Button>
            </div>

            <CustomerTable
                data={filteredCustomers}
                onEdit={handleEdit}
                onDelete={deleteCustomers}
            />
        </div>
    );
}
