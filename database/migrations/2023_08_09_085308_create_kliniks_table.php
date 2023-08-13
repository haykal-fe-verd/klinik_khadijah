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
        Schema::create('tb_klinik', function (Blueprint $table) {
            $table->id();
            $table->string('nama_klinik');
            $table->text('tentang_klinik');
            $table->text('alamat');
            $table->string('telepon');
            $table->string('fax');
            $table->string('email');
            $table->string('website');
            $table->string('instagram')->nullable();
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_klinik');
    }
};
