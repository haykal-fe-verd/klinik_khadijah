<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RekamMedisPasien extends Controller
{
    public function index(Request $request): Response
    {
        $query = RekamMedis::with(['pasien.user', 'dokter.user', 'pelayanan'])->where('pasien_id', $request->user()->userData()->nik)->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->orWhereHas('pasien.user', function ($query) use ($search) {
                    $query->where('nik', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%")
                        ->orWhere('umur', 'LIKE', "%$search%");
                })
                    ->orWhereHas('pasien', function ($query) use ($search) {
                        $query->where('no_bpjs', 'LIKE', "%$search%")
                            ->orWhere('jenis_kelamin', 'LIKE', "%$search%");
                    })
                    ->orWhereHas('pelayanan', function ($query) use ($search) {
                        $query->where('nama_pelayanan', 'LIKE', "%$search%");
                    })
                    ->orWhere('status', 'LIKE', "%$search%")
                    ->orWhere('nomor_antrian', 'LIKE', "%$search%");
            });
        }

        $rekamMedis = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('auth/pasien/rekam-medis/page', compact('rekamMedis'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'dokter_id' => 'required',
            'pelayanan_id' => 'required',
            'keluhan' => 'required',
        ]);

        // Generate nomor antrian
        $currentDate = Carbon::now()->format('Y-m-d');
        $existingCount = RekamMedis::whereDate('created_at', $currentDate)->count();
        $queueNumber = 'A-' . str_pad($existingCount + 1, 3, '0', STR_PAD_LEFT);

        RekamMedis::create([
            'dokter_id' => $request->dokter_id,
            'pelayanan_id' => $request->pelayanan_id,
            'keluhan' => $request->keluhan,
            'pasien_id' => $request->user()->userData()->nik,
            'nomor_antrian' => $queueNumber,
        ]);

        return redirect()->route('rekam-medis-pasien.index')->with('success', 'Data berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'dokter_id' => 'required',
            'pelayanan_id' => 'required',
            'keluhan' => 'required',
        ]);

        $rekamMedis = RekamMedis::findOrFail($id);

        $rekamMedis->dokter_id = $request->dokter_id;
        $rekamMedis->pelayanan_id = $request->pelayanan_id;
        $rekamMedis->keluhan = $request->keluhan;
        $rekamMedis->save();

        return redirect()->route('rekam-medis-pasien.index')->with('success', 'Rekam Medis berhasil diedit');
    }

    public function show(string $id): Response
    {
        $rekamMedis = RekamMedis::with(['pasien.user', 'dokter.user', 'pelayanan'])->findOrFail($id);
        return Inertia::render('auth/pasien/rekam-medis/detail', compact('rekamMedis'));
    }
}
