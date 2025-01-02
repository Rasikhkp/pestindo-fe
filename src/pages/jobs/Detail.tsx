import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react";
import {
    Building2,
    Calendar,
    FileText,
    Tool,
    DollarSign,
    Plus,
    Download,
} from "lucide-react";
import DetailHeader from "../../components/shared/DetailHeader";
import InfoCard from "../../components/shared/InfoCard";
import AddressCard from "../../components/shared/AddressCard";
import TechnicianReportTable from "../../components/jobs/TechnicianReportTable";
import UsedItemsTable from "../../components/jobs/UsedItemsTable";
import { useJobs } from "../../hooks/useJobs";
import { useCustomers } from "../../hooks/useCustomers";
import { formatPhone } from "../../lib/utils";
import DocumentItem from "../../components/jobs/DocumentItem";
import { cn } from "../../lib/utils";
import { technicianReports } from "../../data/mock/technician-reports";
import { usedItems } from "../../data/mock/used-items";

const statusColorMap = {
    pending: "warning",
    in_progress: "primary",
    completed: "success",
    cancelled: "danger",
} as const;

export default function JobDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getJobById } = useJobs();
    const { getCustomerById } = useCustomers();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const job = getJobById(id!);
    if (!job) return <div>Job not found</div>;

    const customer = getCustomerById(job.customerId);
    if (!customer) return <div>Customer not found</div>;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    };

    const handleViewReport = (report: any) => {
        setSelectedReport(report);
        onOpen();
    };

    const totalActualCost = usedItems.reduce(
        (sum, item) => sum + item.price * item.actualUsage,
        0
    );

    const totalBilledCost = usedItems.reduce(
        (sum, item) => sum + item.price * item.billedUsage,
        0
    );

    return (
        <div className="space-y-6">
            <DetailHeader
                title={`Pekerjaan ${job.id}`}
                subtitle={`${job.type.replace(/_/g, " ").toUpperCase()} - ${
                    customer.name
                }`}
                onBack={() => navigate("/jobs")}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader className="pb-0">
                        <h3 className="text-lg font-semibold">
                            Status Pekerjaan
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="p-4 text-center rounded-lg bg-primary/10">
                                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                    Nilai Kontrak
                                </p>
                                <p className="text-lg font-semibold text-primary">
                                    {formatCurrency(job.totalValue)}
                                </p>
                            </div>
                            <div className="p-4 text-center rounded-lg bg-warning/10">
                                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                    Kunjungan/Bulan
                                </p>
                                <p className="text-lg font-semibold text-warning">
                                    {job.visitsPerMonth}x
                                </p>
                            </div>
                            <div className="p-4 text-center rounded-lg bg-success/10">
                                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                    Tipe Pelanggan
                                </p>
                                <p className="text-lg font-semibold text-success">
                                    {job.isNew ? "Baru" : "Existing"}
                                </p>
                            </div>
                            <div className="p-4 text-center rounded-lg bg-secondary/10">
                                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                    Status
                                </p>
                                <Chip
                                    color={statusColorMap[job.status]}
                                    variant="flat"
                                    size="sm"
                                    className="mt-1"
                                >
                                    {job.status.replace("_", " ").toUpperCase()}
                                </Chip>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="col-span-1">
                    <CardHeader className="pb-0">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold">Dokumen</h3>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {/* <DocumentItem
                title="Service Agreement"
                isUploaded={false}
              /> */}
                        <div className="space-y-4">
                            <DocumentItem
                                title="Service Agreement"
                                isUploaded={true}
                                uploadDate={
                                    job.documents.find(
                                        (d) => d.type === "service_agreement"
                                    )?.uploadedAt
                                }
                                onUpload={() => {
                                    /* Handle upload */
                                }}
                                onDownload={() => {
                                    /* Handle download */
                                }}
                            />

                            <DocumentItem
                                title="SPK"
                                isUploaded={job.documents.some(
                                    (d) => d.type === "spk"
                                )}
                                uploadDate={
                                    job.documents.find((d) => d.type === "spk")
                                        ?.uploadedAt
                                }
                                onUpload={() => {
                                    /* Handle upload */
                                }}
                                onDownload={() => {
                                    /* Handle download */
                                }}
                            />

                            <DocumentItem
                                title="Form Survey"
                                isUploaded={job.documents.some(
                                    (d) => d.type === "survey_form"
                                )}
                                uploadDate={
                                    job.documents.find(
                                        (d) => d.type === "survey_form"
                                    )?.uploadedAt
                                }
                                onUpload={() => {
                                    /* Handle upload */
                                }}
                                onDownload={() => {
                                    /* Handle download */
                                }}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">
                        Informasi Pelanggan
                    </h3>
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-4 font-medium">Data Pelanggan</h4>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Nama
                                    </span>
                                    <p className="font-medium">
                                        {customer.name}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">
                                        {customer.type === "company"
                                            ? "NPWP"
                                            : "NIK"}
                                    </span>
                                    <p className="font-medium">
                                        {customer.identityNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AddressCard
                    title={`Alamat ${
                        customer.type === "company" ? "NPWP" : "KTP"
                    }`}
                    address={customer.legalAddress}
                />
                <AddressCard
                    title="Alamat Saat Ini"
                    address={customer.currentAddress}
                />
            </div>

            <Card>
                <CardHeader className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Laporan Teknisi</h3>
                    <Button
                        color="primary"
                        size="sm"
                        startContent={<Plus className="w-4 h-4" />}
                    >
                        Tambah Laporan
                    </Button>
                </CardHeader>
                <CardBody>
                    <TechnicianReportTable
                        reports={technicianReports}
                        onViewReport={handleViewReport}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Alat dan Bahan</h3>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">
                                Total Aktual
                            </p>
                            <p className="font-semibold">
                                {formatCurrency(totalActualCost)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">
                                Total Ditagih
                            </p>
                            <p className="font-semibold">
                                {formatCurrency(totalBilledCost)}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <UsedItemsTable items={usedItems} />
                </CardBody>
            </Card>

            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Detail Laporan Teknisi</ModalHeader>
                    <ModalBody className="pb-6">
                        {selectedReport && (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-2 font-medium">
                                        Informasi Umum
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                ID Laporan
                                            </p>
                                            <p className="font-medium">
                                                {selectedReport.id}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Teknisi
                                            </p>
                                            <p className="font-medium">
                                                {selectedReport.technicianName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Tanggal
                                            </p>
                                            <p className="font-medium">
                                                {new Date(
                                                    selectedReport.createdAt
                                                ).toLocaleDateString("id-ID")}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Lokasi
                                            </p>
                                            <p className="font-medium">
                                                {selectedReport.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-medium">Temuan</h4>
                                    <p>{selectedReport.findings}</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-medium">
                                        Rekomendasi
                                    </h4>
                                    <p>{selectedReport.recommendations}</p>
                                </div>
                            </div>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}
