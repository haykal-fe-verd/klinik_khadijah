import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
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
import Detail from "./detail";

function Dokter() {
    const { dokter } = usePage().props;
    const [isEdit, setIsEdit] = React.useState(false);
    const [isShowDetail, setIsShowDetail] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [detailData, setDetailData] = React.useState(null);

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
        tanggal_lahir: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        no_hp: "",
        umur: "",
        alamat: "",
        spesialis: "",
        name: "",
        email: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("dokter.update", data.id), {
                onSuccess: () => {
                    setOpen(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("dokter.store"), {
                onSuccess: () => {
                    setOpen(false), reset();
                },
            });
        }
    };

    const handleShowDetail = (item) => {
        setIsShowDetail(true);
        setDetailData(item);
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpen(true);
        setData({
            id: item.nik,
            name: item.user.name,
            email: item.user.email,
            nik: item.nik,
            tanggal_lahir: item.tanggal_lahir,
            tempat_lahir: item.tempat_lahir,
            jenis_kelamin: item.jenis_kelamin,
            no_hp: item.no_hp,
            umur: item.umur,
            alamat: item.alamat,
            spesialis: item.spesialis,
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
                destroy(route("dokter.destroy", item.nik));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama", className: "" },
        { name: "Spesialis", className: "" },
        { name: "Tanggal Lahir", className: "" },
        { name: "Jenis Kelamin", className: "" },
        { name: "Umur", className: "" },
        { name: "No HP", className: "" },
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
                <Head title="Data Dokter" />
                <div className="m-10 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Data Dokter
                        </h2>
                    </div>
                    <Separator />

                    <DialogTrigger className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Tambah Dokter
                    </DialogTrigger>

                    <DataTable
                        data={dokter}
                        header={header}
                        link={"dokter.index"}
                    >
                        {dokter.data.length !== 0 ? (
                            dokter.data.map((item, index) => (
                                <TableRow key={dokter.from + index}>
                                    <TableCell className="text-center">
                                        {dokter.from + index}
                                    </TableCell>
                                    <TableCell>{item.user.name}</TableCell>
                                    <TableCell>{item.spesialis}</TableCell>
                                    <TableCell>{item.tanggal_lahir}</TableCell>
                                    <TableCell>{item.jenis_kelamin}</TableCell>
                                    <TableCell>{item.umur} Tahun</TableCell>
                                    <TableCell>{item.no_hp}</TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleShowDetail(item)
                                                    }
                                                >
                                                    <Eye className="w-4 h-4 mr-3" />
                                                    <span>Detail</span>
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

                {/* detail */}
                {isShowDetail && (
                    <Detail
                        isShowDetail={isShowDetail}
                        setIsShowDetail={setIsShowDetail}
                        detailData={detailData}
                        setDetailData={setDetailData}
                    />
                )}
            </Dialog>
        </AuthLayout>
    );
}

export default Dokter;
