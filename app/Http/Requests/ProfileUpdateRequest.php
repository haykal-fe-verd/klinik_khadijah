<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'image' => ['nullable', 'image', 'max:2048', 'mimes:png,jpg,jpeg'],
            'nik' => ['required', 'string', 'min:10', 'max:17'],
            'tanggal_lahir' => ['required', 'date'],
            'tempat_lahir' => ['required', 'string'],
            'jenis_kelamin' => ['required', 'in:pria,wanita'],
            'no_hp' => ['required'],
            'umur' => ['required'],
            'alamat' => ['required'],
        ];
    }
}
