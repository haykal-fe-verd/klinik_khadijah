import React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import Admin from "./partials/Admin";
import Dokter from "./partials/Dokter";
import Pasien from "./partials/Pasien";

function Dashboard() {
    const {
        auth,
        totalAntrianHariIni,
        totalPelayanan,
        totalDokter,
        totalPasien,
        antrianBerjalan,
        chartPendapatan,
        bulan,

        //dokter
        totalPasienRelasiDokter,
        totalPasienMenunggu,
        totalPasienDiperiksa,
        totalPasienSelesai,
        chartTotalPasien,
    } = usePage().props;

    return (
        <AuthLayout>
            <Head title="Dashboard" />
            <div className="m-10 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Dashboard
                    </h2>
                </div>
                <Separator />
                {auth.user.role == "admin" && (
                    <Admin
                        totalPelayanan={totalPelayanan}
                        totalDokter={totalDokter}
                        totalPasien={totalPasien}
                        totalAntrianHariIni={totalAntrianHariIni}
                        antrianBerjalan={antrianBerjalan}
                        chartPendapatan={chartPendapatan}
                        bulan={bulan}
                    />
                )}
                {auth.user.role == "dokter" && (
                    <Dokter
                        totalPasienRelasiDokter={totalPasienRelasiDokter}
                        totalPasienMenunggu={totalPasienMenunggu}
                        totalPasienDiperiksa={totalPasienDiperiksa}
                        totalPasienSelesai={totalPasienSelesai}
                        antrianBerjalan={antrianBerjalan}
                        chartTotalPasien={chartTotalPasien}
                        bulan={bulan}
                    />
                )}
                {auth.user.role == "pasien" && <Pasien />}
            </div>
        </AuthLayout>
    );
}

export default Dashboard;
