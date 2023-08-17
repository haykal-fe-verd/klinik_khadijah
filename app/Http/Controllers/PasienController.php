<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PasienController extends Controller
{
    public function getPasien()
    {
        $pasien = Pasien::with('user')->get();

        return response()->json($pasien);
    }

    public function index(Request $request): Response
    {
        $query = Pasien::with('user', 'rekamMedis', 'rekamMedis.pelayanan')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->orWhereHas('user', function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%");
                })
                    ->orWhere('no_bpjs', 'LIKE', "%$search%")
                    ->orWhere('tanggal_lahir', 'LIKE', "%$search%")
                    ->orWhere('jenis_kelamin', 'LIKE', "%$search%")
                    ->orWhere('umur', 'LIKE', "%$search%")
                    ->orWhere('no_hp', 'LIKE', "%$search%");
            });
        }

        $pasien = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/pasien/page', compact('pasien'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users,email',
            'nik' => 'required|min:15|unique:tb_pasien,nik',
            'no_bpjs' => 'required|min:10',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'no_hp' => 'required',
            'umur' => 'required',
            'jenis_kelamin' => 'required',
            'riwayat_penyakit' => 'required',
            'alamat' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'pasien',
        ]);

        Pasien::create([
            'user_id' => $user->id,
            'nik' => $request->nik,
            'tanggal_lahir' => $request->tanggal_lahir,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'umur' => $request->umur,
            'riwayat_penyakit' => $request->riwayat_penyakit,
        ]);

        return redirect()->route('pasien.index')->with('success', 'Pasien berhasil ditambahkan');
    }

    public function update(Request $request, string $nik): RedirectResponse
    {

        $pasien = Pasien::where('nik', $nik)->firstOrFail();
        $user = User::findOrFail($pasien->user_id);

        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users,email,' . $user->id,
            'nik' => 'required|min:15|unique:tb_pasien,nik,' . $pasien->nik . ',nik',
            'no_bpjs' => 'required|min:10',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'no_hp' => 'required',
            'umur' => 'required',
            'jenis_kelamin' => 'required',
            'riwayat_penyakit' => 'required',
            'alamat' => 'required',
        ]);


        // update user
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        // update pasien
        $pasien->nik = $request->nik;
        $pasien->no_bpjs = $request->no_bpjs;
        $pasien->tanggal_lahir = $request->tanggal_lahir;
        $pasien->tempat_lahir = $request->tempat_lahir;
        $pasien->jenis_kelamin = $request->jenis_kelamin;
        $pasien->no_hp = $request->no_hp;
        $pasien->alamat = $request->alamat;
        $pasien->umur = $request->umur;
        $pasien->riwayat_penyakit = $request->riwayat_penyakit;
        $pasien->save();

        return redirect()->route('pasien.index')->with('success', 'Pasien berhasil diedit');
    }

    public function destroy(string $nik): RedirectResponse
    {
        $pasien = Pasien::findOrFail($nik);
        $user = User::findOrFail($pasien->user_id);
        $user->delete();
        $pasien->delete();

        return redirect()->route('pasien.index')->with('success', 'Pasien berhasil dihapus');
    }
}
