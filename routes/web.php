<?php

use App\Http\Controllers\AntrianController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KlinikController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PelayananController;
use App\Http\Controllers\PeriksaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RekamMedisController;
use App\Http\Controllers\RekamMedisPasien;
use App\Http\Controllers\TransaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->group(function () {
    // home
    Route::get('/', HomeController::class)->name('home');

    // no.antrian
    Route::get('/no-antrian', [AntrianController::class, 'noAntrian'])->name('no.antrian');


    // register
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store'])->name('register.store');

    // login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.store');

    // forgot password
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

Route::middleware('auth')->group(function () {
    // logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // change-password
    Route::get('password', [ChangePasswordController::class, 'index'])->name('password.index');
    Route::put('password', [ChangePasswordController::class, 'update'])->name('password.update');

    // dashboard
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // admin
    Route::middleware('can:admin')->group(function () {
        // klinik
        Route::get('klinik', [KlinikController::class, 'index'])->name('klinik.index');
        Route::post('klinik', [KlinikController::class, 'store'])->name('klinik.store');

        // pelayanan
        Route::get('pelayanan', [PelayananController::class, 'index'])->name('pelayanan.index');
        Route::post('pelayanan', [PelayananController::class, 'store'])->name('pelayanan.store');
        Route::put('pelayanan/{id}', [PelayananController::class, 'update'])->name('pelayanan.update');
        Route::delete('pelayanan/{id}', [PelayananController::class, 'destroy'])->name('pelayanan.destroy');

        // fasilitas
        Route::get('fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');
        Route::post('fasilitas', [FasilitasController::class, 'store'])->name('fasilitas.store');
        Route::put('fasilitas/{id}', [FasilitasController::class, 'update'])->name('fasilitas.update');
        Route::delete('fasilitas/{id}', [FasilitasController::class, 'destroy'])->name('fasilitas.destroy');

        // pasien
        Route::get('pasien', [PasienController::class, 'index'])->name('pasien.index');
        Route::post('pasien', [PasienController::class, 'store'])->name('pasien.store');
        Route::put('pasien/{nik}', [PasienController::class, 'update'])->name('pasien.update');
        Route::delete('pasien/{nik}', [PasienController::class, 'destroy'])->name('pasien.destroy');

        // dokter
        Route::get('dokter', [DokterController::class, 'index'])->name('dokter.index');
        Route::post('dokter', [DokterController::class, 'store'])->name('dokter.store');
        Route::put('dokter/{nik}', [DokterController::class, 'update'])->name('dokter.update');
        Route::delete('dokter/{nik}', [DokterController::class, 'destroy'])->name('dokter.destroy');

        // rekam-medis
        Route::get('rekam-medis', [RekamMedisController::class, 'index'])->name('rekam-medis.index');
        Route::get('rekam-medis/{id}', [RekamMedisController::class, 'show'])->name('rekam-medis.show');
        Route::post('rekam-medis', [RekamMedisController::class, 'store'])->name('rekam-medis.store');
        Route::put('rekam-medis/{id}', [RekamMedisController::class, 'update'])->name('rekam-medis.update');
        Route::delete('rekam-medis/{id}', [RekamMedisController::class, 'destroy'])->name('rekam-medis.destroy');

        // transaksi
        Route::get('transaksi', [TransaksiController::class, 'index'])->name('transaksi.index');
        Route::post('transaksi', [TransaksiController::class, 'update'])->name('transaksi.update');

        // antrian
        Route::get('antrian', [AntrianController::class, 'index'])->name('antrian.index');
    });

    // dokter
    Route::middleware('can:dokter')->group(function () {
        // periksa
        Route::get('periksa-pasien', [PeriksaController::class, 'index'])->name('periksa.index');
        Route::put('periksa-pasien/{id}', [PeriksaController::class, 'update'])->name('periksa.update');
    });

    // pasien
    Route::middleware('can:pasien')->group(function () {
        // rekam-medis
        Route::get('rekam-medis-pasien', [RekamMedisPasien::class, 'index'])->name('rekam-medis-pasien.index');
        Route::post('rekam-medis-pasien', [RekamMedisPasien::class, 'store'])->name('rekam-medis-pasien.store');
        Route::put('rekam-medis-pasien/{id}', [RekamMedisPasien::class, 'update'])->name('rekam-medis-pasien.update');
        Route::get('rekam-medis-pasien/{id}', [RekamMedisPasien::class, 'show'])->name('rekam-medis-pasien.show');
    });
});

require __DIR__ . '/auth.php';
