<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\File;

class KlinikController extends Controller
{
    public function index(): Response
    {
        $data = Klinik::first();
        return Inertia::render('auth/admin/klinik/page', compact('data'));
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'nama_klinik' => 'required',
            'tentang_klinik' => 'required',
            'alamat' => 'required',
            'telepon' => 'required',
            'fax' => 'required',
            'email' => 'required',
            'website' => 'required',
            'instagram' => 'required',
        ]);

        $klinik = Klinik::first();

        $klinik->nama_klinik = $request->input('nama_klinik');
        $klinik->tentang_klinik = $request->input('tentang_klinik');
        $klinik->alamat = $request->input('alamat');
        $klinik->telepon = $request->input('telepon');
        $klinik->fax = $request->input('fax');
        $klinik->email = $request->input('email');
        $klinik->website = $request->input('website');
        $klinik->instagram = $request->input('instagram');

        if ($request->hasFile('logo')) {
            $request->validate([
                'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // delete foto jika sudah ada
            if ($klinik->logo) {
                File::delete(public_path('logo/' . basename($klinik->logo)));
            }

            $file = $request->file('logo');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('logo'), $fileName);
            $klinik->logo = $fileName;
        }

        $klinik->save();

        return redirect()->route('klinik.index')->with('success', 'Pengaturan Klinik Berhasil di setting');
    }
}
