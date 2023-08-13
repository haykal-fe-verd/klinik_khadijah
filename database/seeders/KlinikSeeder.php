<?php

namespace Database\Seeders;

use App\Models\Klinik;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KlinikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Klinik::create([
            'nama_klinik' => "Klinik Khadijah",
            'tentang_klinik' => "Klinik Khadijah adalah sebuah klinik yang bersiap dan beranggung jawab untuk kenyamanan dan pelayanan pasien sakit",
            'alamat' => "Jln. patimura No. 05 Banda Aceh",
            'telepon' => "(0651) 092312 12221",
            'fax' => "(0651) 092312 12221",
            'email' => "klinikkhadijah@gmail.com",
            'website' => "klinik-khadijah.com",
            'instagram' => "https://instagram.com/k/khadijah",
            'logo' => "1691555483.png"
        ]);
    }
}
