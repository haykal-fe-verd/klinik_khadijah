<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FasilitasController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Fasilitas::latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_fasilitas', 'LIKE', "%$search%")
                    ->orWhere('deskripsi', 'LIKE', "%$search%")
                    ->orWhere('icon', 'LIKE', "%$search%");
            });
        }

        $fasilitas = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/fasilitas/page', compact('fasilitas'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_fasilitas' => 'required',
            'icon' => 'required',
            'deskripsi' => 'required',
        ]);

        Fasilitas::create([
            'nama_fasilitas' => $request->nama_fasilitas,
            'icon' => $request->icon,
            'deskripsi' => $request->deskripsi,
        ]);

        return redirect()->route('fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_fasilitas' => 'required',
            'icon' => 'required',
            'deskripsi' => 'required',
        ]);

        $fasilitas = Fasilitas::findOrFail($id);
        $fasilitas->nama_fasilitas = $request->nama_fasilitas;
        $fasilitas->icon = $request->icon;
        $fasilitas->deskripsi = $request->deskripsi;
        $fasilitas->save();

        return redirect()->route('fasilitas.index')->with('success', 'Fasilitas berhasil diedit');
    }

    public function destroy(string $id): RedirectResponse
    {
        $fasilitas = Fasilitas::findOrFail($id);
        $fasilitas->delete();

        return redirect()->route('fasilitas.index')->with('success', 'Fasilitas berhasil dihapus');
    }
}
