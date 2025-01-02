import { useState } from "react";
import {
    Table,
    TableHeader,
    Input,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Selection,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { Plus, Pencil, Trash, Search, Filter } from "lucide-react";
import { useInventory } from "../../hooks/useInventory";
import TechnicianInventoryForm from "../../components/inventory-technician/TechnicianInventoryForm";
import ExportButtons from "../../components/shared/ExportButtons";
import { formatCurrency } from "../../lib/utils";
import { InventoryFilterOptions } from "../../types/inventory";

export default function TechnicianInventoryList() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState<InventoryFilterOptions>({
        minPrice: undefined,
        maxPrice: undefined,
        minStock: undefined,
        maxStock: undefined,
        unit: "",
    });
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

    const {
        items,
        addItem,
        updateItem,
        deleteItems,
        getItemById,
        getFilteredItems,
    } = useInventory();

    const filteredItems = getFilteredItems(filters);

    const handleAdd = () => {
        setSelectedItem(null);
        onOpen();
    };

    const handleEdit = (id: string) => {
        setSelectedItem(id);
        onOpen();
    };

    const handleDelete = () => {
        if (selectedKeys === "all") {
            deleteItems(items.map((item) => item.id));
        } else {
            deleteItems(Array.from(selectedKeys as Set<string>));
        }
        setSelectedKeys(new Set([]));
        setShowDeleteModal(false);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Inventaris Teknisi</h1>

            <div className="flex items-end justify-between gap-3">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name or ID..."
                    startContent={
                        <Search className="w-4 h-4 text-default-400" />
                    }
                    value={search}
                    onClear={() => setSearch("")}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-3">
                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <Button
                                variant="flat"
                                startContent={<Filter className="w-4 h-4" />}
                            >
                                Harga
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-4">
                            <div className="flex gap-4">
                                <Input
                                    type="number"
                                    label="Harga Min"
                                    value={filters.minPrice?.toString() || ""}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            minPrice:
                                                Number(e.target.value) ||
                                                undefined,
                                        })
                                    }
                                />
                                <Input
                                    type="number"
                                    label="Harga Max"
                                    value={filters.maxPrice?.toString() || ""}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            maxPrice:
                                                Number(e.target.value) ||
                                                undefined,
                                        })
                                    }
                                />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <Button
                                variant="flat"
                                startContent={<Filter className="w-4 h-4" />}
                            >
                                Stok
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-4">
                            <div className="flex gap-4">
                                <Input
                                    type="number"
                                    label="Stok Min"
                                    value={filters.minStock?.toString() || ""}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            minStock:
                                                Number(e.target.value) ||
                                                undefined,
                                        })
                                    }
                                />
                                <Input
                                    type="number"
                                    label="Stok Max"
                                    value={filters.maxStock?.toString() || ""}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            maxStock:
                                                Number(e.target.value) ||
                                                undefined,
                                        })
                                    }
                                />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                startContent={<Filter className="w-4 h-4" />}
                            >
                                Unit: {filters.unit || "Semua"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Unit Filter"
                            onAction={(key) =>
                                setFilters({ ...filters, unit: key as string })
                            }
                        >
                            <DropdownItem key="">Semua</DropdownItem>
                            <DropdownItem key="Liter">Liter</DropdownItem>
                            <DropdownItem key="Unit">Unit</DropdownItem>
                            <DropdownItem key="Piece">Piece</DropdownItem>
                            <DropdownItem key="Box">Box</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <ExportButtons
                        data={filteredItems}
                        filename="technician-inventory"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                {selectedKeys !== "all" && selectedKeys.size > 0 && (
                    <Button
                        color="danger"
                        variant="flat"
                        startContent={<Trash className="w-4 h-4" />}
                        onPress={() => setShowDeleteModal(true)}
                    >
                        Hapus ({selectedKeys.size})
                    </Button>
                )}
            </div>

            <Table
                aria-label="Inventory items table"
                // selectionMode="multiple"
                // selectedKeys={selectedKeys}
                // onSelectionChange={setSelectedKeys}
            >
                <TableHeader>
                    <TableColumn allowsSorting>ID</TableColumn>
                    <TableColumn allowsSorting>Nama</TableColumn>
                    <TableColumn allowsSorting>Harga</TableColumn>
                    <TableColumn allowsSorting>Stok</TableColumn>
                    <TableColumn allowsSorting>Unit</TableColumn>
                    {/* <TableColumn align="center">Aksi</TableColumn> */}
                </TableHeader>
                <TableBody>
                    {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{formatCurrency(item.price)}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            {/* <TableCell>
                                <div className="flex justify-center gap-2">
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        size="sm"
                                        onPress={() => handleEdit(item.id)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color="danger"
                                        size="sm"
                                        onPress={() => {
                                            setSelectedKeys(new Set([item.id]));
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* <TechnicianInventoryForm
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={selectedItem ? updateItem : addItem}
                initialData={
                    selectedItem ? getItemById(selectedItem) : undefined
                }
            />

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <ModalContent>
                    <ModalHeader>Konfirmasi Hapus</ModalHeader>
                    <ModalBody>
                        Apakah Anda yakin ingin menghapus{" "}
                        {selectedKeys === "all"
                            ? filteredItems.length
                            : selectedKeys.size}{" "}
                        barang yang dipilih?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="light"
                            onPress={() => setShowDeleteModal(false)}
                        >
                            Batal
                        </Button>
                        <Button color="danger" onPress={handleDelete}>
                            Hapus
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </div>
    );
}
