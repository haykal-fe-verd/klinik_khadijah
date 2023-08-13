<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'image',
        'password',
        'role',
        'email',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function userData(): ?object
    {
        switch ($this->role) {
            case 'admin':
                $userData = Admin::class;
                break;
            case 'dokter':
                $userData = Dokter::class;
                break;
            default:
                $userData = Pasien::class;
                break;
        }

        return $this->hasOne($userData)->first();
    }
}
