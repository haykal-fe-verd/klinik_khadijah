<?php

namespace Database\Seeders;

use App\Models\Pelayanan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PelayananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pelayanan::create([
            'nama_pelayanan' => 'USG Abdomen',
            'harga' => '350000'
        ]);
        Pelayanan::create([
            'nama_pelayanan' => 'Anemia',
            'harga' => '200000'
        ]);
        Pelayanan::create([
            'nama_pelayanan' => 'Rontgen Tangan',
            'harga' => '250000'
        ]);
    }
}
