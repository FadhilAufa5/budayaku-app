import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Jadwal Event', href: '/events/schedule' },
];

const scheduleData = [
    {
        date: '2024-02-15',
        dayName: 'Kamis',
        events: [
            {
                id: 1,
                title: 'Festival Wayang Kulit',
                time: '19:00 - 22:00',
                location: 'Gedung Kesenian Jakarta',
                category: 'Festival',
                participants: 250,
                color: 'bg-blue-500',
            },
            {
                id: 2,
                title: 'Workshop Gamelan',
                time: '14:00 - 17:00',
                location: 'ISI Yogyakarta',
                category: 'Workshop',
                participants: 30,
                color: 'bg-green-500',
            },
        ],
    },
    {
        date: '2024-02-16',
        dayName: 'Jumat',
        events: [
            {
                id: 3,
                title: 'Pameran Batik Nusantara',
                time: '09:00 - 18:00',
                location: 'Museum Tekstil',
                category: 'Pameran',
                participants: 150,
                color: 'bg-purple-500',
            },
        ],
    },
    {
        date: '2024-02-20',
        dayName: 'Selasa',
        events: [
            {
                id: 4,
                title: 'Workshop Membatik',
                time: '14:00 - 16:00',
                location: 'Pekalongan, Jawa Tengah',
                category: 'Workshop',
                participants: 45,
                color: 'bg-green-500',
            },
            {
                id: 5,
                title: 'Lomba Tari Tradisional',
                time: '10:00 - 15:00',
                location: 'Balai Sarbini',
                category: 'Kompetisi',
                participants: 100,
                color: 'bg-orange-500',
            },
        ],
    },
    {
        date: '2024-02-28',
        dayName: 'Rabu',
        events: [
            {
                id: 6,
                title: 'Pertunjukan Tari Saman',
                time: '18:00 - 20:00',
                location: 'Aceh Cultural Center',
                category: 'Pertunjukan',
                participants: 180,
                color: 'bg-red-500',
            },
        ],
    },
];

const calendarDays = [
    { date: 11, isCurrentMonth: true, hasEvent: false },
    { date: 12, isCurrentMonth: true, hasEvent: false },
    { date: 13, isCurrentMonth: true, hasEvent: false },
    { date: 14, isCurrentMonth: true, hasEvent: false },
    { date: 15, isCurrentMonth: true, hasEvent: true },
    { date: 16, isCurrentMonth: true, hasEvent: true },
    { date: 17, isCurrentMonth: true, hasEvent: false },
    { date: 18, isCurrentMonth: true, hasEvent: false },
    { date: 19, isCurrentMonth: true, hasEvent: false },
    { date: 20, isCurrentMonth: true, hasEvent: true },
    { date: 21, isCurrentMonth: true, hasEvent: false },
    { date: 22, isCurrentMonth: true, hasEvent: false },
    { date: 23, isCurrentMonth: true, hasEvent: false },
    { date: 24, isCurrentMonth: true, hasEvent: false },
    { date: 25, isCurrentMonth: true, hasEvent: false },
    { date: 26, isCurrentMonth: true, hasEvent: false },
    { date: 27, isCurrentMonth: true, hasEvent: false },
    { date: 28, isCurrentMonth: true, hasEvent: true },
    { date: 29, isCurrentMonth: true, hasEvent: false },
    { date: 1, isCurrentMonth: false, hasEvent: false },
];

export default function EventSchedule() {
    const totalEvents = scheduleData.reduce((sum, day) => sum + day.events.length, 0);
    const totalParticipants = scheduleData.reduce(
        (sum, day) => sum + day.events.reduce((s, e) => s + e.participants, 0),
        0
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Event" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Jadwal Event</h1>
                        <p className="text-muted-foreground mt-1">
                            Lihat dan kelola jadwal event budaya
                        </p>
                    </div>
                    <Button className="w-fit">
                        <Calendar className="h-4 w-4" />
                        Export Jadwal
                    </Button>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Calendar View */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Februari 2024</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-2">
                                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                                    <div
                                        key={day}
                                        className="text-muted-foreground text-center text-xs font-medium"
                                    >
                                        {day}
                                    </div>
                                ))}
                                {calendarDays.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`relative aspect-square rounded-lg border p-2 text-center transition-colors hover:bg-accent ${
                                            !day.isCurrentMonth
                                                ? 'text-muted-foreground bg-muted/50'
                                                : day.hasEvent
                                                  ? 'border-primary bg-primary/5'
                                                  : ''
                                        }`}
                                    >
                                        <span className="text-sm">{day.date}</span>
                                        {day.hasEvent && (
                                            <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Event Bulan Ini</CardTitle>
                                <Calendar className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalEvents}</div>
                                <p className="text-muted-foreground text-xs">Event terjadwal</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
                                <Users className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalParticipants}</div>
                                <p className="text-muted-foreground text-xs">Peserta terdaftar</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                            <CardHeader>
                                <CardTitle className="text-sm">Kategori Terpopuler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Workshop</span>
                                    <Badge variant="secondary">3</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Festival</span>
                                    <Badge variant="secondary">1</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Pertunjukan</span>
                                    <Badge variant="secondary">1</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Timeline Schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle>Timeline Event</CardTitle>
                        <CardDescription>Jadwal event yang akan datang</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {scheduleData.map((day, dayIndex) => (
                                <div key={dayIndex} className="relative">
                                    {/* Date Header */}
                                    <div className="mb-4 flex items-center gap-4">
                                        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                                            <span className="text-2xl font-bold">
                                                {new Date(day.date).getDate()}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {day.dayName}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                {new Date(day.date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {day.events.length} event terjadwal
                                            </p>
                                        </div>
                                    </div>

                                    {/* Events */}
                                    <div className="ml-8 space-y-3 border-l-2 border-dashed pl-6">
                                        {day.events.map((event) => (
                                            <Card key={event.id} className="transition-all hover:shadow-md">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`h-2 w-2 rounded-full ${event.color}`} />
                                                                <h4 className="font-semibold">{event.title}</h4>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {event.category}
                                                                </Badge>
                                                            </div>
                                                            
                                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                                <div className="flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    {event.time}
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin className="h-3 w-3" />
                                                                    {event.location}
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Users className="h-3 w-3" />
                                                                    {event.participants} peserta
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" size="sm">
                                                            Detail
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
