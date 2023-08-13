import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Bitcoin, Check, MoreVertical, Printer } from "lucide-react";

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
import moment from "moment/moment";
import ReactToPrint from "react-to-print";

function Transaksi() {
    const { transaksi } = usePage().props;
    const [open, setOpen] = React.useState(false);

    const { post, reset } = useForm();

    const onSubmit = (item) => {
        Swal.fire({
            title: "Apakah pasien tersebut telah membayar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#0f172a",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                post(
                    route("transaksi.update", {
                        id: item.id,
                        status_pembayaran: 1,
                    }),
                    {
                        onSuccess: () => {
                            setOpen(false);
                            reset();
                        },
                    }
                );
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "NIK", className: "" },
        { name: "Tanggal", className: "" },
        { name: "Nama Pasien", className: "" },
        { name: "Nama Layanan", className: "" },
        { name: "Total Bayar", className: "" },
        { name: "Status Pembayaran", className: "" },
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
                <Head title="Transaksi" />
                <div className="m-10 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Transaksi
                        </h2>
                    </div>
                    <Separator />

                    <DataTable
                        data={transaksi}
                        header={header}
                        link={"transaksi.index"}
                    >
                        {transaksi.data.length !== 0 ? (
                            transaksi.data.map((item, index) => (
                                <TableRow key={transaksi.from + index}>
                                    <TableCell className="text-center">
                                        {transaksi.from + index}
                                    </TableCell>
                                    <TableCell>{item.pasien.nik}</TableCell>
                                    <TableCell>
                                        {moment(item.created_at).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.pasien.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.pelayanan.nama_pelayanan}
                                    </TableCell>
                                    <TableCell>
                                        Rp. {item.pelayanan.harga}
                                    </TableCell>
                                    <TableCell>
                                        {item.status_pembayaran === 0 ? (
                                            <span className="px-4 py-1 text-black rounded-md bg-rose-300">
                                                Belum Bayar
                                            </span>
                                        ) : (
                                            <span className="px-4 py-1 text-black bg-green-300 rounded-md">
                                                Lunas
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell className="items-center text-center">
                                        {item.status_pembayaran === 0 ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            onSubmit(item)
                                                        }
                                                    >
                                                        <Bitcoin className="w-4 h-4 mr-3" />
                                                        <span>Bayar</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <Check className="items-center text-green-500" />
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="text-center" colSpan={5}>
                                    Tidak ada data untuk ditampilkan
                                </TableCell>
                            </TableRow>
                        )}
                    </DataTable>
                </div>
            </Dialog>
        </AuthLayout>
    );
}

export default Transaksi;
