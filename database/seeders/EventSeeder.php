<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Festival', 'slug' => 'festival', 'description' => 'Festival budaya berbagai pertunjukan', 'icon' => '🎪', 'color' => 'bg-red-500', 'is_trending' => true],
            ['name' => 'Workshop', 'slug' => 'workshop', 'description' => 'Pelatihan dan workshop pembelajaran budaya', 'icon' => '🎨', 'color' => 'bg-blue-500', 'is_trending' => false],
            ['name' => 'Pameran', 'slug' => 'pameran', 'description' => 'Pameran seni dan budaya', 'icon' => '🖼️', 'color' => 'bg-purple-500', 'is_trending' => false],
            ['name' => 'Pertunjukan', 'slug' => 'pertunjukan', 'description' => 'Pertunjukan seni dan budaya tradisional', 'icon' => '🎭', 'color' => 'bg-green-500', 'is_trending' => true],
            ['name' => 'Seminar', 'slug' => 'seminar', 'description' => 'Seminar dan diskusi tentang kebudayaan', 'icon' => '🎓', 'color' => 'bg-yellow-500', 'is_trending' => false],
            ['name' => 'Kompetisi', 'slug' => 'kompetisi', 'description' => 'Lomba dan kompetisi budaya', 'icon' => '🏆', 'color' => 'bg-orange-500', 'is_trending' => true],
        ];

        foreach ($categories as $category) {
            EventCategory::create($category);
        }

        $events = [
            ['event_category_id' => 1, 'title' => 'Festival Wayang Kulit', 'description' => 'Festival wayang kulit dengan berbagai dalang terkenal', 'date' => '2024-02-15', 'time' => '19:00', 'location' => 'Gedung Kesenian Jakarta', 'image' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', 'status' => 'upcoming', 'participants' => 250, 'max_participants' => 500, 'price' => 'Rp 50.000'],
            ['event_category_id' => 2, 'title' => 'Workshop Membatik', 'description' => 'Belajar teknik membatik tradisional', 'date' => '2024-02-20', 'time' => '14:00', 'location' => 'Pekalongan, Jawa Tengah', 'image' => 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', 'status' => 'upcoming', 'participants' => 45, 'max_participants' => 50, 'price' => 'Rp 150.000'],
            ['event_category_id' => 3, 'title' => 'Pameran Seni Rupa Kontemporer', 'description' => 'Pameran karya seni rupa kontemporer', 'date' => '2024-01-10', 'time' => '10:00', 'location' => 'Museum Nasional', 'image' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'status' => 'completed', 'participants' => 1240, 'max_participants' => 2000, 'price' => 'Gratis'],
            ['event_category_id' => 4, 'title' => 'Pertunjukan Tari Saman', 'description' => 'Pertunjukan tari saman dari Aceh', 'date' => '2024-02-28', 'time' => '18:00', 'location' => 'Aceh Cultural Center', 'image' => 'https://images.unsplash.com/photo-1555400038-63f526b1c3b8?w=400', 'status' => 'upcoming', 'participants' => 180, 'max_participants' => 300, 'price' => 'Rp 75.000'],
            ['event_category_id' => 2, 'title' => 'Workshop Gamelan', 'description' => 'Belajar memainkan gamelan', 'date' => '2024-02-15', 'time' => '14:00', 'location' => 'ISI Yogyakarta', 'image' => 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400', 'status' => 'upcoming', 'participants' => 30, 'max_participants' => 40, 'price' => 'Rp 100.000'],
            ['event_category_id' => 6, 'title' => 'Lomba Tari Tradisional', 'description' => 'Kompetisi tari tradisional se-Indonesia', 'date' => '2024-02-20', 'time' => '10:00', 'location' => 'Balai Sarbini', 'image' => 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400', 'status' => 'upcoming', 'participants' => 100, 'max_participants' => 150, 'price' => 'Rp 200.000'],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
