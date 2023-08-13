import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { MoreVertical, PencilIcon } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import DataTable from "@/components/data-table";
import Modal from "./modal";

function PeriksaPasien() {
    const { periksa } = usePage().props;
    console.log("🚀  periksa:", periksa);
    const [open, setOpen] = React.useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        id: "",
        resep_obat: "",
        diagnosa: "",
        status: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("periksa.update", data.id), {
            onSuccess: () => {
                setOpen(false), reset();
            },
        });
    };

    const handleEdit = (item) => {
        setOpen(true);
        setData({
            id: item.id,
            resep_obat: item.resep_obat,
            diagnosa: item.diagnosa,
            status: item.status,
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Pasien", className: "" },
        { name: "Jenis Kelamin", className: "" },
        { name: "Layanan", className: "" },
        { name: "Keluhan", className: "" },
        { name: "No HP", className: "" },
        { name: "Status", className: "" },
        { name: "@", className: "text-center" },
    ];

    return (
        <AuthLayout>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        reset();
                    }
                }}
            >
                <Head title="Periksa Pasien" />
                <div className="m-10 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Periksa Pasien
                        </h2>
                    </div>
                    <Separator />

                    <DataTable
                        data={periksa}
                        header={header}
                        link={"periksa.index"}
                    >
                        {periksa.data.length !== 0 ? (
                            periksa.data.map((item, index) => (
                                <TableRow key={periksa.from + index}>
                                    <TableCell className="text-center">
                                        {periksa.from + index}
                                    </TableCell>
                                    <TableCell>
                                        {item.pasien.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.pasien.jenis_kelamin}
                                    </TableCell>
                                    <TableCell>
                                        {item.pelayanan.nama_pelayanan}
                                    </TableCell>
                                    <TableCell>{item.keluhan}</TableCell>
                                    <TableCell>{item.pasien.no_hp}</TableCell>
                                    <TableCell>
                                        {item.status === "menunggu" && (
                                            <span className="p-2 text-black capitalize rounded-lg bg-rose-300">
                                                {item.status}
                                            </span>
                                        )}
                                        {item.status === "diperiksa" && (
                                            <span className="p-2 text-black capitalize bg-yellow-300 rounded-lg">
                                                {item.status}
                                            </span>
                                        )}
                                        {item.status === "selesai" && (
                                            <span className="p-2 text-black capitalize bg-green-300 rounded-lg">
                                                {item.status}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    <PencilIcon className="w-4 h-4 mr-3" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    className="text-center"
                                    colSpan={header.length}
                                >
                                    Tidak ada data untuk ditampilkan
                                </TableCell>
                            </TableRow>
                        )}
                    </DataTable>
                </div>

                {/* form */}
                <Modal
                    onSubmit={onSubmit}
                    setData={setData}
                    data={data}
                    errors={errors}
                    processing={processing}
                />
            </Dialog>
        </AuthLayout>
    );
}

export default PeriksaPasien;
