import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Eye,
    MoreVertical,
    PencilIcon,
    PlusCircle,
    Trash2,
} from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DataTable from "@/components/data-table";
import Swal from "sweetalert2";
import Modal from "./modal";

function RekamMedis() {
    const { rekamMedis } = usePage().props;
    const [isEdit, setIsEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        id: "",
        pasien_id: "",
        dokter_id: "",
        pelayanan_id: "",
        keluhan: "",
        status: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("rekam-medis.update", data.id), {
                onSuccess: () => {
                    setOpen(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("rekam-medis.store"), {
                onSuccess: () => {
                    setOpen(false), reset();
                },
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpen(true);
        setData({
            id: item.id,
            pasien_id: item.pasien_id,
            dokter_id: item.dokter_id,
            pelayanan_id: item.pelayanan_id,
            keluhan: item.keluhan,
            status: item.status,
        });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: "Apakah anda ingin menghapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#0f172a",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("rekam-medis.destroy", item.id));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "NIK", className: "" },
        { name: "Nama Pasien", className: "" },
        { name: "Jenis Kelamin", className: "" },
        { name: "Umur", className: "" },
        { name: "Pelayanan", className: "" },
        { name: "No. Antrian", className: "" },
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
                        setIsEdit(false);
                    }
                }}
            >
                <Head title="Rekam Medis" />
                <div className="m-10 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Rekam Medis
                        </h2>
                    </div>
                    <Separator />

                    <DialogTrigger className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Tambah Rekam Medis
                    </DialogTrigger>

                    <DataTable
                        data={rekamMedis}
                        header={header}
                        link={"rekam-medis.index"}
                    >
                        {rekamMedis.data.length !== 0 ? (
                            rekamMedis.data.map((item, index) => (
                                <TableRow key={rekamMedis.from + index}>
                                    <TableCell className="text-center">
                                        {rekamMedis.from + index}
                                    </TableCell>
                                    <TableCell>{item.pasien.nik}</TableCell>
                                    <TableCell>
                                        {item.pasien.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.pasien.jenis_kelamin}
                                    </TableCell>
                                    <TableCell>
                                        {item.pasien.umur} Tahun
                                    </TableCell>
                                    <TableCell>
                                        {item.pelayanan.nama_pelayanan}
                                    </TableCell>
                                    <TableCell>{item.nomor_antrian}</TableCell>
                                    <TableCell>
                                        {item.status === "menunggu" && (
                                            <span className="p-2 text-white capitalize rounded-lg bg-rose-300">
                                                {item.status}
                                            </span>
                                        )}
                                        {item.status === "diperiksa" && (
                                            <span className="p-2 text-white capitalize bg-yellow-300 rounded-lg">
                                                {item.status}
                                            </span>
                                        )}
                                        {item.status === "selesai" && (
                                            <span className="p-2 text-white capitalize bg-green-300 rounded-lg">
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
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={route(
                                                            "rekam-medis.show",
                                                            item.id
                                                        )}
                                                        className="flex"
                                                    >
                                                        <Eye className="w-4 h-4 mr-3" />
                                                        <span>Detail</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    <PencilIcon className="w-4 h-4 mr-3" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4 mr-3" />
                                                    <span>Hapus</span>
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
                    isEdit={isEdit}
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

export default RekamMedis;
