<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //admin
        $admin = User::create([
            'name' => fake()->name(),
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'admin',
            'image' => '1691120499.jpg',
        ]);

        Admin::create([
            'user_id' => $admin->id,
            'nik' => fake()->numerify('################'),
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['pria', 'wanita']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 40,
        ]);

        // dokter
        $dokter = User::create([
            'name' => fake()->name(),
            'email' => 'dokter@dokter.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'dokter',
            'image' => '1691120499.jpg',
        ]);

        Dokter::create([
            'user_id' => $dokter->id,
            'nik' => fake()->numerify('################'),
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['pria', 'wanita']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 40,
            'spesialis' => fake()->randomElement(['ahli bedah', 'ibu dan anak', 'gigi', 'gizi']),
        ]);

        // pasien
        $pasien = User::create([
            'name' => fake()->name(),
            'email' => 'pasien@pasien.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'pasien',
            'image' => '1691120499.jpg',
        ]);

        Pasien::create([
            'user_id' => $pasien->id,
            'nik' => fake()->numerify('################'),
            'no_bpjs' => fake()->numerify('################'),
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['pria', 'wanita']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 40,
            'riwayat_penyakit' => 'asam lambung',
        ]);
    }
}
