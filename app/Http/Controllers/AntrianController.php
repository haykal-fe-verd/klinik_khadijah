<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class AntrianController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RekamMedis::with(['pasien.user', 'pelayanan'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->orWhereHas('pasien.user', function ($query) use ($search) {
                    $query->where('nik', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%");
                })
                    ->orWhereHas('pelayanan', function ($query) use ($search) {
                        $query->where('nama_pelayanan', 'LIKE', "%$search%")
                            ->orWhere('harga', 'LIKE', "%$search%");
                    })
                    ->orWhere('keluhan', 'LIKE', "%$search%")
                    ->orWhere('nomor_antrian', 'LIKE', "%$search%");
            });
        }

        $antrian = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('auth/admin/antrian/page', compact('antrian'));
    }

    public function noAntrian(Request $request): Response
    {
        $currentDate = Carbon::now()->format('Y-m-d');
        $currentYear = Carbon::now()->year;

        $antrian = RekamMedis::whereDate('created_at', $currentDate)
            ->where('status', 'diperiksa')
            ->first();

        return Inertia::render('home/NoAntrian', compact('antrian'));
    }
}
