import React from "react";
import Chart from "react-apexcharts";

import { Card, CardContent } from "@/components/ui/card";
import { ActivitySquareIcon, Scale3d, Siren, Stethoscope } from "lucide-react";

function LineChartPendapatan(props) {
    const { data, bulan } = props;

    const options = {
        chart: {
            id: "total-pasien",
            type: "line",
            shadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#0f172a"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3"],
                opacity: 0.0,
            },
        },
        markers: {
            size: 6,
        },
        xaxis: {
            categories: Object.values(bulan),
        },
        yaxis: {
            title: {
                text: "Jumlah",
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    const series = [
        {
            name: "Total Pasien",
            data: data,
        },
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            height={500}
            width={"100%"}
        />
    );
}
function Dokter({
    totalPasienRelasiDokter,
    totalPasienMenunggu,
    totalPasienDiperiksa,
    totalPasienSelesai,
    antrianBerjalan,
    chartTotalPasien,
    bulan,
}) {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 ">
                    <CardContent className="flex flex-row items-center justify-between mt-5 space-y-5">
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Pasien
                            </span>
                            <h1 className="text-4xl font-bold text-white">
                                {totalPasienRelasiDokter}
                            </h1>
                        </div>
                        <ActivitySquareIcon className="w-16 h-16 text-yellow-500" />
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 ">
                    <CardContent className="flex flex-row items-center justify-between mt-5 space-y-5">
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Pasien Yang Menunggu
                            </span>
                            <h1 className="text-4xl font-bold text-white">
                                {totalPasienMenunggu}
                            </h1>
                        </div>
                        <Stethoscope className="w-16 h-16 text-violet-500" />
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 ">
                    <CardContent className="flex flex-row items-center justify-between mt-5 space-y-5">
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Pasien Yang Diperiksa
                            </span>
                            <h1 className="text-4xl font-bold text-white">
                                {totalPasienDiperiksa}
                            </h1>
                        </div>
                        <Scale3d className="w-16 h-16 text-rose-500" />
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 ">
                    <CardContent className="flex flex-row items-center justify-between mt-5 space-y-5">
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Pasien Yang Selesai
                            </span>
                            <h1 className="text-4xl font-bold text-white">
                                {totalPasienSelesai}
                            </h1>
                        </div>
                        <Siren className="w-16 h-16 text-cyan-500" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                    <CardContent className="flex flex-col items-center justify-center mt-5">
                        <h1 className="text-xl text-white">
                            Grafik Total Pasien Bulanan
                        </h1>
                        <div className="w-full mt-3 bg-white rounded-md">
                            <LineChartPendapatan
                                data={chartTotalPasien}
                                bulan={bulan}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                    <CardContent className="flex flex-col items-center justify-center mt-5">
                        <h1 className="text-xl text-white">
                            Nomor Antrian Berjalan
                        </h1>
                        <h1 className="mt-16 font-bold text-7xl text-cyan-500">
                            {antrianBerjalan?.nomor_antrian ?? "-"}
                        </h1>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Dokter;
