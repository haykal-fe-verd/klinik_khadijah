<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class DokterController extends Controller
{
    public function getDokter()
    {
        $dokter = Dokter::with('user')->get();

        return response()->json($dokter);
    }

    public function index(Request $request): Response
    {
        $query = Dokter::with('user', 'rekamMedis', 'rekamMedis.pelayanan')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->orWhereHas('user', function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%");
                })
                    ->orWhere('spesialis', 'LIKE', "%$search%")
                    ->orWhere('tanggal_lahir', 'LIKE', "%$search%")
                    ->orWhere('jenis_kelamin', 'LIKE', "%$search%")
                    ->orWhere('umur', 'LIKE', "%$search%")
                    ->orWhere('no_hp', 'LIKE', "%$search%");
            });
        }

        $dokter = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/dokter/page', compact('dokter'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users,email',
            'nik' => 'required|min:15|unique:tb_pasien,nik',
            'spesialis' => 'required',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'no_hp' => 'required',
            'umur' => 'required',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'dokter',
        ]);

        Dokter::create([
            'user_id' => $user->id,
            'nik' => $request->nik,
            'tanggal_lahir' => $request->tanggal_lahir,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'umur' => $request->umur,
            'spesialis' => $request->spesialis,
        ]);

        return redirect()->route('dokter.index')->with('success', 'Dokter berhasil ditambahkan');
    }

    public function update(Request $request, string $nik): RedirectResponse
    {

        $dokter = Dokter::where('nik', $nik)->firstOrFail();
        $user = User::findOrFail($dokter->user_id);

        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users,email,' . $user->id,
            'nik' => 'required|min:15|unique:tb_pasien,nik,' . $dokter->nik . ',nik',
            'tanggal_lahir' => 'required',
            'tempat_lahir' => 'required',
            'no_hp' => 'required',
            'umur' => 'required',
            'jenis_kelamin' => 'required',
            'spesialis' => 'required',
            'alamat' => 'required',
        ]);


        // update user
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        // update dokter
        $dokter->nik = $request->nik;
        $dokter->tanggal_lahir = $request->tanggal_lahir;
        $dokter->tempat_lahir = $request->tempat_lahir;
        $dokter->jenis_kelamin = $request->jenis_kelamin;
        $dokter->no_hp = $request->no_hp;
        $dokter->alamat = $request->alamat;
        $dokter->umur = $request->umur;
        $dokter->spesialis = $request->spesialis;
        $dokter->save();

        return redirect()->route('dokter.index')->with('success', 'Dokter berhasil diedit');
    }

    public function destroy(string $nik): RedirectResponse
    {
        $dokter = Dokter::findOrFail($nik);
        $user = User::findOrFail($dokter->user_id);
        $user->delete();
        $dokter->delete();

        return redirect()->route('dokter.index')->with('success', 'Dokter berhasil dihapus');
    }
}
