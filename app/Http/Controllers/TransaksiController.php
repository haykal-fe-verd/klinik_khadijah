<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class TransaksiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RekamMedis::with(['pasien.user', 'pelayanan'])->where('status', 'selesai')->latest();

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
                    ->orWhere('status_pembayaran', 'LIKE', "%$search%");
            });
        }

        $transaksi = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('auth/admin/transaksi/page', compact('transaksi'));
    }

    public function update(Request $request): RedirectResponse
    {
        $transaksi = RekamMedis::findOrFail($request->id);
        $transaksi->status_pembayaran = $request->status_pembayaran;
        $transaksi->save();

        return redirect()->route('transaksi.index')->with('success', 'Transaksi berhasil dibayar');
    }
}
