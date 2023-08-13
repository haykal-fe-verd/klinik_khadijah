import React from "react";
import moment from "moment/moment";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const PrintComponent = React.forwardRef((props, ref) => {
    const { rekamMedis } = props;

    return (
        <div ref={ref} className="print-table">
            <div className="m-10 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Detail Rekam Medis
                    </h2>
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dokter</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="grid grid-cols-2">
                                <div>Nama</div>
                                <div>: {rekamMedis.dokter.user.name}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Jenis Kelamin</div>
                                <div>: {rekamMedis.dokter.jenis_kelamin}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Umur</div>
                                <div>: {rekamMedis.dokter.umur} Tahun</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>No Hp</div>
                                <div>: {rekamMedis.dokter.no_hp}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Spesialis</div>
                                <div>
                                    :{" "}
                                    <span className="font-bold">
                                        {rekamMedis.dokter.spesialis}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pasien</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="grid grid-cols-2">
                                <div>Nik</div>
                                <div>: {rekamMedis.pasien.nik}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>No BPJS</div>
                                <div>: {rekamMedis.pasien.no_bpjs}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Nama</div>
                                <div>: {rekamMedis.pasien.user.name}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Jenis Kelamin</div>
                                <div>: {rekamMedis.pasien.jenis_kelamin}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Tanggal Lahir</div>
                                <div>: {rekamMedis.pasien.tanggal_lahir}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Tempat Lahir</div>
                                <div>: {rekamMedis.pasien.tempat_lahir}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Umur</div>
                                <div>: {rekamMedis.pasien.umur} Tahun</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>No Hp</div>
                                <div>: {rekamMedis.pasien.no_hp}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div>Riwayat Penyakit</div>
                                <div>
                                    : {rekamMedis.pasien.riwayat_penyakit}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-5 p-5 bg-white rounded-md shadow-md">
                    <Table>
                        <TableCaption>Hasil rekam medis</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead>Nama Layanan</TableHead>
                                <TableHead>Keluhan</TableHead>
                                <TableHead>Diagnosa</TableHead>
                                <TableHead>Resep Obat</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    {moment(rekamMedis.created_at).format(
                                        "DD-MM-YYYY"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {rekamMedis.pelayanan.nama_pelayanan}
                                </TableCell>
                                <TableCell>{rekamMedis.keluhan}</TableCell>
                                <TableCell>
                                    {rekamMedis.diagnosa ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {rekamMedis.resep_obat ?? "-"}
                                </TableCell>
                                <TableCell>
                                    {rekamMedis.status === "menunggu" && (
                                        <span className="p-2 text-white capitalize rounded-lg bg-rose-300">
                                            {rekamMedis.status}
                                        </span>
                                    )}
                                    {rekamMedis.status === "diperiksa" && (
                                        <span className="p-2 text-white capitalize bg-yellow-300 rounded-lg">
                                            {rekamMedis.status}
                                        </span>
                                    )}
                                    {rekamMedis.status === "selesai" && (
                                        <span className="p-2 text-white capitalize bg-green-300 rounded-lg">
                                            {rekamMedis.status}
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
});

export default PrintComponent;
