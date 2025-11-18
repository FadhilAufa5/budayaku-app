<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with('category');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('category', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('category')) {
            $query->where('event_category_id', $request->input('category'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $events = $query->latest()->paginate(12);

        $events->getCollection()->transform(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'category' => $event->category?->name,
                'category_id' => $event->event_category_id,
                'date' => $event->date->format('Y-m-d'),
                'time' => $event->time->format('H:i'),
                'location' => $event->location,
                'status' => $event->status,
                'image' => $event->image,
                'description' => $event->description,
                'participants' => $event->participants,
                'maxParticipants' => $event->max_participants,
                'price' => $event->price,
            ];
        });

        $stats = [
            'total' => Event::count(),
            'upcoming' => Event::where('status', 'upcoming')->count(),
            'completed' => Event::where('status', 'completed')->count(),
            'totalParticipants' => Event::sum('participants'),
        ];

        return Inertia::render('events/index', [
            'events' => $events,
            'categories' => EventCategory::all(['id', 'name']),
            'stats' => $stats,
            'filters' => $request->only(['search', 'category', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'event_category_id' => 'required|exists:event_categories,id',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
            'max_participants' => 'nullable|integer|min:1',
            'price' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('events', 'public');
        }

        Event::create($validated);

        return redirect()->route('events.index')->with('success', 'Event berhasil ditambahkan.');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'event_category_id' => 'required|exists:event_categories,id',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
            'max_participants' => 'nullable|integer|min:1',
            'price' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($event->image && \Storage::disk('public')->exists($event->image)) {
                \Storage::disk('public')->delete($event->image);
            }
            $validated['image'] = $request->file('image')->store('events', 'public');
        } else {
            // Keep the old image if no new image is uploaded
            unset($validated['image']);
        }

        $event->update($validated);

        return redirect()->route('events.index')->with('success', 'Event berhasil diupdate.');
    }

    public function destroy(Event $event)
    {
        // Delete image if exists
        if ($event->image && \Storage::disk('public')->exists($event->image)) {
            \Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return redirect()->route('events.index')->with('success', 'Event berhasil dihapus.');
    }
}
