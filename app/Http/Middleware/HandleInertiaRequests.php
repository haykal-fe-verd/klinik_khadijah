<?php

namespace App\Http\Middleware;

use App\Models\Fasilitas;
use App\Models\Klinik;
use App\Models\Pelayanan;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => [
                    'name' => $request->user()?->name,
                    'email' => $request->user()?->email,
                    'role' => $request->user()?->role,
                    'image' => $request->user()?->image,
                ],
            ],
            'sessions' => [
                'message' => session('message'),
                'success' => session('success'),
                'error' => session('error'),
            ],
            'klinik' => Klinik::first() ?? [
                'nama_klinik' => "nama_klinik",
                'tentang_klinik' => "tentang_klinik",
                'alamat' => "alamat",
                'telepon' => "telepon",
                'fax' => "fax",
                'email' => "email",
                'website' => "website",
                'instagram' => "instagram",
                'logo' => "https://w1.pngwing.com/pngs/37/563/png-transparent-html-logo-html-element-computer-programming-tag-web-development-span-and-div-computer-software-web-browser.png",
            ],
            'pelayanan' => Pelayanan::all() ?? null,
            'fasilitas' => Fasilitas::all() ?? null,
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
