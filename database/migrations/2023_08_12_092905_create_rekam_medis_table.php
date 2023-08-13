<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_rekam_medis', function (Blueprint $table) {
            $table->id();
            $table->string('keluhan');
            $table->text('diagnosa')->nullable();
            $table->text('resep_obat')->nullable();
            $table->text('nomor_antrian');
            $table->enum('status', ['menunggu', 'diperiksa', 'selesai']);
            $table->boolean('status_pembayaran')->default(false);

            $table->string('pasien_id');
            $table->foreign('pasien_id')->references('nik')->on('tb_pasien')->onDelete('cascade');
            $table->string('dokter_id');
            $table->foreign('dokter_id')->references('nik')->on('tb_dokter')->onDelete('cascade');
            $table->unsignedBigInteger('pelayanan_id');
            $table->foreign('pelayanan_id')->references('id')->on('tb_pelayanan')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_rekam_medis');
    }
};
