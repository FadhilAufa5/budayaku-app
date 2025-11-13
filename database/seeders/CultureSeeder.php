<?php

namespace Database\Seeders;

use App\Models\Culture;
use App\Models\CultureCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CultureSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Tarian Tradisional',
                'slug' => 'tarian-tradisional',
                'description' => 'Berbagai jenis tarian tradisional dari seluruh Indonesia',
                'icon' => '💃',
                'color' => 'bg-pink-500',
            ],
            [
                'name' => 'Kerajinan',
                'slug' => 'kerajinan',
                'description' => 'Kerajinan tangan dan seni kriya tradisional',
                'icon' => '🎨',
                'color' => 'bg-purple-500',
            ],
            [
                'name' => 'Seni Pertunjukan',
                'slug' => 'seni-pertunjukan',
                'description' => 'Pertunjukan seni tradisional seperti wayang, teater, dll',
                'icon' => '🎭',
                'color' => 'bg-blue-500',
            ],
            [
                'name' => 'Alat Musik',
                'slug' => 'alat-musik',
                'description' => 'Instrumen musik tradisional Indonesia',
                'icon' => '🎵',
                'color' => 'bg-green-500',
            ],
            [
                'name' => 'Kuliner',
                'slug' => 'kuliner',
                'description' => 'Makanan dan minuman tradisional khas daerah',
                'icon' => '🍜',
                'color' => 'bg-orange-500',
            ],
            [
                'name' => 'Pakaian Adat',
                'slug' => 'pakaian-adat',
                'description' => 'Busana tradisional dari berbagai suku',
                'icon' => '👘',
                'color' => 'bg-red-500',
            ],
        ];

        foreach ($categories as $category) {
            CultureCategory::create($category);
        }

        $cultures = [
            [
                'culture_category_id' => 1,
                'name' => 'Tari Kecak',
                'region' => 'Bali',
                'description' => 'Tarian tradisional Bali yang menggambarkan kisah Ramayana',
                'image' => null,
                'status' => 'active',
                'views' => 1234,
            ],
            [
                'culture_category_id' => 2,
                'name' => 'Batik',
                'region' => 'Jawa Tengah',
                'description' => 'Kain bergambar yang pembuatannya secara khusus dengan menuliskan atau menerakan malam',
                'image' => null,
                'status' => 'active',
                'views' => 2456,
            ],
            [
                'culture_category_id' => 3,
                'name' => 'Wayang Kulit',
                'region' => 'Jawa',
                'description' => 'Seni pertunjukan boneka kulit yang dimainkan oleh dalang',
                'image' => null,
                'status' => 'active',
                'views' => 987,
            ],
            [
                'culture_category_id' => 4,
                'name' => 'Angklung',
                'region' => 'Jawa Barat',
                'description' => 'Alat musik multitonal (bernada ganda) yang secara tradisional berkembang',
                'image' => null,
                'status' => 'active',
                'views' => 1567,
            ],
            [
                'culture_category_id' => 1,
                'name' => 'Tari Saman',
                'region' => 'Aceh',
                'description' => 'Tarian yang menampilkan gerakan tepuk tangan dan badan',
                'image' => null,
                'status' => 'active',
                'views' => 1876,
            ],
            [
                'culture_category_id' => 5,
                'name' => 'Rendang',
                'region' => 'Sumatera Barat',
                'description' => 'Masakan daging dengan bumbu rempah-rempah yang kaya',
                'image' => null,
                'status' => 'active',
                'views' => 3421,
            ],
        ];

        foreach ($cultures as $culture) {
            Culture::create($culture);
        }
    }
}
