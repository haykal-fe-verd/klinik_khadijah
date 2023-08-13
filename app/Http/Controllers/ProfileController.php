<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Dokter;
use App\Models\Pasien;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $user->user_data = $user->userData();

        return Inertia::render('auth/profile/page', [
            'profile' => $user
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $user->id,
        ]);

        // user
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // delete foto jika sudah ada
            if ($user->image) {
                File::delete(public_path('avatars/' . basename($user->image)));
            }

            $file = $request->file('image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('avatars'), $fileName);
            $user->image = $fileName;
        }

        $user->save();

        // admin
        if ($user->role === 'admin') {
            $admin = Admin::where('user_id', $user->id)->first();
            $request->validate([
                'nik' => 'required|string|unique:tb_admin,nik,' . $admin->nik . ',nik,user_id,' . $user->id,
                'tanggal_lahir' => 'required|date',
                'tempat_lahir' => 'required|string',
                'jenis_kelamin' => 'required|in:pria,wanita',
                'no_hp' => 'required|string',
                'umur' => 'required|integer',
                'alamat' => 'required|string',
            ]);
            $admin->nik = $request->input('nik');
            $admin->tanggal_lahir = $request->input('tanggal_lahir');
            $admin->tempat_lahir = $request->input('tempat_lahir');
            $admin->jenis_kelamin = $request->input('jenis_kelamin');
            $admin->no_hp = $request->input('no_hp');
            $admin->umur = $request->input('umur');
            $admin->alamat = $request->input('alamat');
            $admin->save();
        }

        // dokter
        if ($user->role === 'dokter') {
            $dokter = Dokter::where('user_id', $user->id)->first();
            $request->validate([
                'nik' => 'required|string|unique:tb_dokter,nik,' . $dokter->nik . ',nik,user_id,' . $user->id,
                'tanggal_lahir' => 'required|date',
                'tempat_lahir' => 'required|string',
                'jenis_kelamin' => 'required|in:pria,wanita',
                'no_hp' => 'required|string',
                'umur' => 'required|integer',
                'alamat' => 'required|string',
                'spesialis' => 'nullable|string',
            ]);
            $dokter->nik = $request->input('nik');
            $dokter->tanggal_lahir = $request->input('tanggal_lahir');
            $dokter->tempat_lahir = $request->input('tempat_lahir');
            $dokter->jenis_kelamin = $request->input('jenis_kelamin');
            $dokter->no_hp = $request->input('no_hp');
            $dokter->umur = $request->input('umur');
            $dokter->alamat = $request->input('alamat');
            $dokter->spesialis = $request->input('spesialis');
            $dokter->save();
        }

        // pasien
        if ($user->role === 'pasien') {
            $pasien = Pasien::where('user_id', $user->id)->first();
            $request->validate([
                'nik' => 'required|string|unique:tb_pasien,nik,' . $pasien->nik . ',nik,user_id,' . $user->id,
                'tanggal_lahir' => 'required|date',
                'tempat_lahir' => 'required|string',
                'jenis_kelamin' => 'required|in:pria,wanita',
                'no_hp' => 'required|string',
                'umur' => 'required|integer',
                'alamat' => 'required|string',
                'riwayat_penyakit' => 'nullable|string',
            ]);
            $pasien->nik = $request->input('nik');
            $pasien->tanggal_lahir = $request->input('tanggal_lahir');
            $pasien->tempat_lahir = $request->input('tempat_lahir');
            $pasien->jenis_kelamin = $request->input('jenis_kelamin');
            $pasien->no_hp = $request->input('no_hp');
            $pasien->umur = $request->input('umur');
            $pasien->alamat = $request->input('alamat');
            $pasien->riwayat_penyakit = $request->input('riwayat_penyakit');
            $pasien->save();
        }

        return redirect()->route('profile.edit')->with('success', 'Profil berhasil diupdate');
    }
}
