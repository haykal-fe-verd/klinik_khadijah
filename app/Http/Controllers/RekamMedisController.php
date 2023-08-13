<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RekamMedisController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RekamMedis::with(['pasien.user', 'dokter.user', 'pelayanan'])->latest();

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

        return Inertia::render('auth/admin/rekam-medis/page', compact('rekamMedis'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'pasien_id' => 'required',
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
            'pasien_id' => $request->pasien_id,
            'pelayanan_id' => $request->pelayanan_id,
            'keluhan' => $request->keluhan,
            'nomor_antrian' => $queueNumber,
        ]);

        return redirect()->route('rekam-medis.index')->with('success', 'Rekam Medis berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'pasien_id' => 'required',
            'dokter_id' => 'required',
            'pelayanan_id' => 'required',
            'keluhan' => 'required',
            'status' => 'required',
        ]);

        $rekamMedis = RekamMedis::findOrFail($id);

        $rekamMedis->pasien_id = $request->pasien_id;
        $rekamMedis->dokter_id = $request->dokter_id;
        $rekamMedis->pelayanan_id = $request->pelayanan_id;
        $rekamMedis->keluhan = $request->keluhan;
        $rekamMedis->status = $request->status;
        $rekamMedis->save();

        return redirect()->route('rekam-medis.index')->with('success', 'Rekam Medis berhasil diedit');
    }

    public function destroy(string $id): RedirectResponse
    {
        $rekamMedis = RekamMedis::findOrFail($id);
        $rekamMedis->delete();

        return redirect()->route('rekam-medis.index')->with('success', 'Rekam Medis berhasil dihapus');
    }

    public function show(string $id): Response
    {
        $rekamMedis = RekamMedis::with(['pasien.user', 'dokter.user', 'pelayanan'])->findOrFail($id);
        return Inertia::render('auth/admin/rekam-medis/detail', compact('rekamMedis'));
    }
}
