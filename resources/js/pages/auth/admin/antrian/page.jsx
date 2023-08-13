import React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import DataTable from "@/components/data-table";
import moment from "moment/moment";

function Antrian() {
    const { antrian } = usePage().props;

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nomor Antrian", className: "" },
        { name: "Tanggal", className: "" },
        { name: "Nama Pasian", className: "" },
        { name: "Jenis Kelamin", className: "" },
        { name: "Nama Layanan", className: "" },
        { name: "Keluhan", className: "" },
        { name: "No HP", className: "" },
        { name: "Status", className: "" },
    ];

    return (
        <AuthLayout>
            <Head title="Antrian" />
            <div className="m-10 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">Antrian</h2>
                </div>
                <Separator />

                <DataTable
                    data={antrian}
                    header={header}
                    link={"antrian.index"}
                >
                    {antrian.data.length !== 0 ? (
                        antrian.data.map((item, index) => (
                            <TableRow key={antrian.from + index}>
                                <TableCell className="text-center">
                                    {antrian.from + index}
                                </TableCell>
                                <TableCell>{item.nomor_antrian}</TableCell>
                                <TableCell>
                                    {moment(item.created_at).format(
                                        "DD-MM-YYYY"
                                    )}
                                </TableCell>
                                <TableCell>{item.pasien.user.name}</TableCell>
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
        </AuthLayout>
    );
}

export default Antrian;
