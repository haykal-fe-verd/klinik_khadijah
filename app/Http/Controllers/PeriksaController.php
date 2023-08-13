<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PeriksaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RekamMedis::with(['pasien.user', 'dokter.user', 'pelayanan'])->where('dokter_id', $request->user()->userData()->nik)->latest();

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

        $periksa = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('auth/dokter/periksa-pasien/page', compact('periksa'));
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'status' => 'required',
        ]);

        $periksa = RekamMedis::findOrFail($id);

        $periksa->diagnosa = $request->diagnosa;
        $periksa->resep_obat = $request->resep_obat;
        $periksa->status = $request->status;
        $periksa->save();

        return redirect()->route('periksa.index')->with('success', 'Data berhasil diedit');
    }
}
