<?php

namespace App\Http\Controllers;

use App\Models\Pelayanan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PelayananController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pelayanan::latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_pelayanan', 'LIKE', "%$search%")
                    ->orWhere('harga', 'LIKE', "%$search%");
            });
        }

        $data = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/pelayanan/page', compact('data'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_pelayanan' => 'required',
            'harga' => 'required',
        ]);

        Pelayanan::create([
            'nama_pelayanan' => $request->nama_pelayanan,
            'harga' => $request->harga,
        ]);

        return redirect()->route('pelayanan.index')->with('success', 'Pelayanan berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_pelayanan' => 'required',
            'harga' => 'required',
        ]);

        $pelayanan = Pelayanan::findOrFail($id);
        $pelayanan->nama_pelayanan = $request->nama_pelayanan;
        $pelayanan->harga = $request->harga;
        $pelayanan->save();

        return redirect()->route('pelayanan.index')->with('success', 'Pelayanan berhasil diedit');
    }

    public function destroy(string $id): RedirectResponse
    {
        $pelayanan = Pelayanan::findOrFail($id);
        $pelayanan->delete();

        return redirect()->route('pelayanan.index')->with('success', 'Pelayanan berhasil dihapus');
    }
}
