import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Jadwal Event', href: '/events/schedule' },
];

interface EventItem {
    id: number;
    title: string;
    time: string;
    location: string;
    category: string;
    participants: number;
    color: string;
}

interface ScheduleDay {
    date: string;
    dayName: string;
    events: EventItem[];
}

interface CalendarDay {
    date: number;
    fullDate: string;
    isCurrentMonth: boolean;
    hasEvent: boolean;
    isToday: boolean;
}

interface Stats {
    totalEvents: number;
    totalParticipants: number;
    categories: Record<string, number>;
}

interface CurrentMonth {
    month: number;
    year: number;
    name: string;
}

interface ScheduleProps {
    schedule: ScheduleDay[];
    calendar: CalendarDay[];
    stats: Stats;
    currentMonth: CurrentMonth;
}

export default function EventSchedule({ schedule, calendar, stats, currentMonth }: ScheduleProps) {
    const handlePrevMonth = () => {
        const month = currentMonth.month === 1 ? 12 : currentMonth.month - 1;
        const year = currentMonth.month === 1 ? currentMonth.year - 1 : currentMonth.year;
        router.get('/events/schedule', { month, year }, { preserveState: true });
    };

    const handleNextMonth = () => {
        const month = currentMonth.month === 12 ? 1 : currentMonth.month + 1;
        const year = currentMonth.month === 12 ? currentMonth.year + 1 : currentMonth.year;
        router.get('/events/schedule', { month, year }, { preserveState: true });
    };

    const topCategories = Object.entries(stats.categories || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Event" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Jadwal Event</h1>
                        <p className="text-muted-foreground mt-1">Lihat dan kelola jadwal event budaya</p>
                    </div>
                    <Button className="w-fit">
                        <Calendar className="h-4 w-4" />
                        Export Jadwal
                    </Button>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{currentMonth.name}</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleNextMonth}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-2">
                                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                                    <div key={day} className="text-muted-foreground text-center text-xs font-medium">
                                        {day}
                                    </div>
                                ))}
                                {calendar.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`relative aspect-square rounded-lg border p-2 text-center transition-colors hover:bg-accent ${
                                            !day.isCurrentMonth
                                                ? 'text-muted-foreground bg-muted/50'
                                                : day.hasEvent
                                                  ? 'border-primary bg-primary/5'
                                                  : ''
                                        } ${day.isToday ? 'ring-2 ring-primary' : ''}`}
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

                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Event Bulan Ini</CardTitle>
                                <Calendar className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                                <p className="text-muted-foreground text-xs">Event terjadwal</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
                                <Users className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalParticipants}</div>
                                <p className="text-muted-foreground text-xs">Peserta terdaftar</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                            <CardHeader>
                                <CardTitle className="text-sm">Kategori Terpopuler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {topCategories.length > 0 ? (
                                    topCategories.map(([category, count]) => (
                                        <div key={category} className="flex items-center justify-between text-sm">
                                            <span>{category}</span>
                                            <Badge variant="secondary">{count}</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">Tidak ada data</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Timeline Event</CardTitle>
                        <CardDescription>Jadwal event yang akan datang</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {schedule.length > 0 ? (
                            <div className="space-y-6">
                                {schedule.map((day, dayIndex) => (
                                    <div key={dayIndex} className="relative">
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
                                                            <Button variant="outline" size="sm" onClick={() => router.get('/events/list')}>
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
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Tidak ada event terjadwal bulan ini</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
