<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dokter extends Model
{
    use HasFactory;

    protected $table = "tb_dokter";
    protected $primaryKey = 'nik';
    public $incrementing = false;
    protected $guarded = [];
    protected $dates = ['tanggal_lahir'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rekamMedis(): HasMany
    {
        return $this->hasMany(RekamMedis::class, 'dokter_id', 'nik');
    }
}
