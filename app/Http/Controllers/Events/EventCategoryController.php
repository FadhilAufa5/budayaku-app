<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = EventCategory::withCount('events');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $categories = $query->latest()->paginate(12);

        $categories->getCollection()->transform(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'icon' => $category->icon,
                'color' => $category->color,
                'trending' => $category->is_trending,
                'count' => $category->events_count,
            ];
        });

        $stats = [
            'total' => EventCategory::count(),
            'totalEvents' => EventCategory::withCount('events')->get()->sum('events_count'),
            'trending' => EventCategory::where('is_trending', true)->count(),
        ];

        return Inertia::render('events/categories', [
            'categories' => $categories,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:event_categories,slug',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'is_trending' => 'boolean',
        ]);

        EventCategory::create($validated);

        return redirect()->route('event-categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, EventCategory $eventCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:event_categories,slug,' . $eventCategory->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'is_trending' => 'boolean',
        ]);

        $eventCategory->update($validated);

        return redirect()->route('event-categories.index')->with('success', 'Kategori berhasil diupdate.');
    }

    public function destroy(EventCategory $eventCategory)
    {
        if ($eventCategory->events()->count() > 0) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki event terkait.');
        }

        $eventCategory->delete();

        return redirect()->route('event-categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
