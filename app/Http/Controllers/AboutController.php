<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('about/index', [
            'stats' => [
                'cultures' => 156,
                'events' => 24,
                'products' => 342,
                'users' => 1240,
            ],
            'team' => [
                [
                    'name' => 'Dr. Siti Nurhaliza',
                    'role' => 'Founder & CEO',
                    'bio' => 'Ahli budaya dengan pengalaman 20+ tahun dalam pelestarian warisan Indonesia.',
                    'avatar' => 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=f59e0b&color=fff',
                ],
                [
                    'name' => 'Budi Santoso',
                    'role' => 'Cultural Director',
                    'bio' => 'Pakar batik dan kerajinan tradisional dari Yogyakarta.',
                    'avatar' => 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f59e0b&color=fff',
                ],
                [
                    'name' => 'Ahmad Dahlan',
                    'role' => 'Event Manager',
                    'bio' => 'Spesialis penyelenggaraan festival dan acara budaya skala nasional.',
                    'avatar' => 'https://ui-avatars.com/api/?name=Ahmad+Dahlan&background=f59e0b&color=fff',
                ],
                [
                    'name' => 'Kartini Dewi',
                    'role' => 'Community Lead',
                    'bio' => 'Menghubungkan komunitas budaya di seluruh nusantara.',
                    'avatar' => 'https://ui-avatars.com/api/?name=Kartini+Dewi&background=f59e0b&color=fff',
                ],
            ],
        ]);
    }
}
