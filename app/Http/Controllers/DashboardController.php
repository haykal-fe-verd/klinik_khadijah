<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Pelayanan;
use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $currentDate = Carbon::now()->format('Y-m-d');
        $currentYear = Carbon::now()->year;

        $bulan = [
            '1' => 'Jan',
            '2' => 'Feb',
            '3' => 'Mar',
            '4' => 'Apr',
            '5' => 'Mei',
            '6' => 'Jun',
            '7' => 'Jul',
            '8' => 'Ags',
            '9' => 'Sep',
            '10' => 'Okt',
            '11' => 'Nov',
            '12' => 'Des'
        ];

        // admin
        $totalPelayanan = Pelayanan::count();
        $totalDokter = Dokter::count();
        $totalPasien = Pasien::count();
        $totalAntrianHariIni = RekamMedis::whereDate('created_at', $currentDate)->count();
        $antrianBerjalan = RekamMedis::whereDate('created_at', $currentDate)
            ->where('status', 'diperiksa')
            ->first();


        $dataPendapatan = DB::table('tb_rekam_medis')
            ->selectRaw('MONTH(tb_rekam_medis.created_at) AS bulan, SUM(tb_pelayanan.harga) AS total_pendapatan')
            ->leftJoin('tb_pelayanan', 'tb_pelayanan.id', '=', 'tb_rekam_medis.pelayanan_id')
            ->where('status_pembayaran', 1)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_pendapatan', 'bulan')
            ->toArray();


        $chartPendapatan = [];

        foreach ($bulan as $key => $value) {
            $chartPendapatan[] = $dataPendapatan[$key] ?? 0;
        }

        // dokter
        $totalPasienRelasiDokter = RekamMedis::where('dokter_id', $request->user()->userData()->nik)->count();
        $totalPasienMenunggu = RekamMedis::where('dokter_id', $request->user()->userData()->nik)
            ->where('status', 'menunggu')->count();
        $totalPasienDiperiksa = RekamMedis::where('dokter_id', $request->user()->userData()->nik)
            ->where('status', 'diperiksa')->count();
        $totalPasienSelesai = RekamMedis::where('dokter_id', $request->user()->userData()->nik)
            ->where('status', 'selesai')->count();

        $dataPasien = RekamMedis::where('dokter_id', $request->user()->userData()->nik)
            ->selectRaw('MONTH(created_at) AS bulan, COUNT(*) AS total_pasien')
            ->whereYear('created_at', $currentYear)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_pasien', 'bulan')
            ->toArray();


        $chartTotalPasien = [];

        foreach ($bulan as $key => $value) {
            $chartTotalPasien[] = $dataPasien[$key] ?? 0;
        }

        // pasien

        return Inertia::render('auth/dashboard/page', compact('bulan', 'totalAntrianHariIni', 'totalPelayanan', 'totalDokter', 'totalPasien', 'antrianBerjalan', 'chartPendapatan', 'totalPasienRelasiDokter', 'totalPasienMenunggu', 'totalPasienDiperiksa', 'totalPasienSelesai', 'chartTotalPasien'));
    }
}
