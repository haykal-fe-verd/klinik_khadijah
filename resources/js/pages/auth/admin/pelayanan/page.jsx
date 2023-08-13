import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { MoreVertical, PencilIcon, PlusCircle, Trash2 } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DataTable from "@/components/data-table";
import Swal from "sweetalert2";
import Modal from "./modal";

function Pelayanan() {
    const { data } = usePage().props;
    const [isEdit, setIsEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const {
        data: dataForm,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        id: "",
        nama_pelayanan: "",
        harga: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("pelayanan.update", dataForm.id), {
                onSuccess: () => {
                    setOpen(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("pelayanan.store"), {
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
            nama_pelayanan: item.nama_pelayanan,
            harga: item.harga,
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
                destroy(route("pelayanan.destroy", item.id));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama", className: "" },
        { name: "Harga", className: "" },
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
                <Head title="Pelayanan" />
                <div className="m-10 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Pelayanan
                        </h2>
                    </div>
                    <Separator />

                    <DialogTrigger className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Tambah Pelayanan
                    </DialogTrigger>

                    <DataTable
                        data={data}
                        header={header}
                        link={"pelayanan.index"}
                    >
                        {data.data.length !== 0 ? (
                            data.data.map((item, index) => (
                                <TableRow key={data.from + index}>
                                    <TableCell className="text-center">
                                        {data.from + index}
                                    </TableCell>
                                    <TableCell>{item.nama_pelayanan}</TableCell>
                                    <TableCell>Rp. {item.harga}</TableCell>
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
                                <TableCell className="text-center" colSpan={4}>
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
                    dataForm={dataForm}
                    errors={errors}
                    processing={processing}
                />
            </Dialog>
        </AuthLayout>
    );
}

export default Pelayanan;
