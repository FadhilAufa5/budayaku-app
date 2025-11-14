import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    Share2,
    Heart,
    Sparkles,
    ChevronRight,
    Users,
    Ticket,
    PartyPopper,
} from 'lucide-react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Event {
    id: number;
    title: string;
    category: string;
    location: string;
    description: string;
    image: string;
    date: string;
    time: string;
    status: string;
    participants: number;
    max_participants: number | null;
    price: string;
    full_date: string;
}

interface RelatedEvent {
    id: number;
    title: string;
    category: string;
    location: string;
    image: string;
    date: string;
    participants: number;
}

interface EventShowProps {
    event: Event;
    relatedEvents: RelatedEvent[];
}

export default function EventShow({ event, relatedEvents }: EventShowProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: `Lihat event ${event.title} di ${event.location}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link disalin ke clipboard!');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <Badge className="bg-blue-500 text-white">Akan Datang</Badge>;
            case 'ongoing':
                return <Badge className="bg-green-500 text-white">Berlangsung</Badge>;
            case 'completed':
                return <Badge variant="outline">Selesai</Badge>;
            default:
                return null;
        }
    };

    const availableSeats = event.max_participants ? event.max_participants - event.participants : null;

    return (
        <>
            <Head title={`${event.title} - Event Budaya`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
                {/* Background Pattern */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="event-detail-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <path d="M 0,60 Q 15,45 30,60 T 60,60" stroke="currentColor" fill="none" strokeWidth="1"/>
                                <path d="M 60,60 Q 75,45 90,60 T 120,60" stroke="currentColor" fill="none" strokeWidth="1"/>
                                <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="90" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#event-detail-pattern)" className="text-blue-800 dark:text-blue-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation />

                {/* Content */}
                <div className="relative px-6 py-8 pt-24 lg:px-12">
                    <div className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Back Button */}
                        <Link
                            href="/event"
                            className="group mb-6 inline-flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 shadow-md backdrop-blur-sm transition-all hover:-translate-x-1 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg dark:border-blue-800 dark:bg-blue-950/80 dark:text-blue-100 dark:hover:bg-blue-900/50"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Kembali ke Daftar Event
                        </Link>

                        {/* Main Content */}
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Left Column - Image & Info */}
                            <div className="lg:col-span-2">
                                {/* Hero Card */}
                                <Card className="group overflow-hidden border-2 border-blue-200 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-blue-800 dark:bg-blue-950/80">
                                    {/* Image Container */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
                                        {event.image ? (
                                            <>
                                                <img
                                                    src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'}
                                                    alt={event.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="text-center">
                                                    <Calendar className="mx-auto h-24 w-24 text-blue-400 opacity-40" />
                                                    <p className="mt-3 text-base text-blue-600 dark:text-blue-400">Tidak ada gambar</p>
                                                </div>
                                            </div>
                                        )}
                                        {/* Status Badge on Image */}
                                        <div className="absolute left-4 top-4">
                                            {getStatusBadge(event.status)}
                                        </div>
                                        {/* Category Badge on Image */}
                                        <div className="absolute right-4 top-4">
                                            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                                                {event.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-6 lg:p-8">
                                        {/* Title */}
                                        <h1 className="mb-4 text-2xl font-bold text-blue-900 dark:text-blue-100 lg:text-3xl">
                                            {event.title}
                                        </h1>

                                        {/* Meta Info Grid */}
                                        <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-4 dark:border-blue-900 dark:from-blue-900/30 dark:to-indigo-900/30">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                                                    <Calendar className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-blue-600 dark:text-blue-400">Tanggal</div>
                                                    <div className="font-semibold text-blue-900 dark:text-blue-100">{event.date}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
                                                    <Clock className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-green-600 dark:text-green-400">Waktu</div>
                                                    <div className="font-semibold text-blue-900 dark:text-blue-100">{event.time} WIB</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
                                                    <MapPin className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-purple-600 dark:text-purple-400">Lokasi</div>
                                                    <div className="truncate font-semibold text-blue-900 dark:text-blue-100">{event.location}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md">
                                                    <Users className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-orange-600 dark:text-orange-400">Peserta</div>
                                                    <div className="font-semibold text-blue-900 dark:text-blue-100">
                                                        {event.participants} {event.max_participants ? `/ ${event.max_participants}` : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent dark:via-blue-800"></div>

                                        {/* Description */}
                                        <div>
                                            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
                                                <Sparkles className="h-5 w-5 text-blue-500" />
                                                Tentang Event Ini
                                            </h2>
                                            <p className="whitespace-pre-line text-base leading-relaxed text-blue-800 dark:text-blue-200">
                                                {event.description || 'Deskripsi event ini sedang dalam proses penulisan. Kembali lagi nanti untuk informasi lebih lengkap tentang acara budaya Indonesia yang menarik ini.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Actions & Related */}
                            <div className="space-y-6">
                                {/* Registration Card */}
                                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg backdrop-blur-sm dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-blue-600 dark:text-blue-400">Harga Tiket</p>
                                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                    {event.price || 'Gratis'}
                                                </p>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                                                <Ticket className="h-6 w-6" />
                                            </div>
                                        </div>

                                        {availableSeats !== null && (
                                            <div className="mb-4 rounded-lg border border-blue-200 bg-white/50 p-3 dark:border-blue-800 dark:bg-blue-900/30">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-blue-700 dark:text-blue-300">Sisa Kursi:</span>
                                                    <span className={`font-bold ${availableSeats > 10 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                                        {availableSeats} kursi
                                                    </span>
                                                </div>
                                                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900">
                                                    <div
                                                        className={`h-full transition-all ${availableSeats > 10 ? 'bg-green-500' : 'bg-orange-500'}`}
                                                        style={{ width: `${(availableSeats / event.max_participants!) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <Button 
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 hover:scale-105 transition-all"
                                            size="lg"
                                        >
                                            <PartyPopper className="mr-2 h-5 w-5" />
                                            {event.status === 'upcoming' ? 'Daftar Sekarang' : event.status === 'ongoing' ? 'Bergabung' : 'Event Selesai'}
                                        </Button>

                                        <p className="mt-3 text-center text-xs text-blue-600 dark:text-blue-400">
                                            {event.participants} orang telah mendaftar
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <Card className="border-2 border-blue-200 bg-white/80 shadow-md backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/80">
                                    <CardContent className="p-5">
                                        <h3 className="mb-3 text-sm font-semibold text-blue-900 dark:text-blue-100">
                                            Aksi
                                        </h3>
                                        <div className="space-y-2">
                                            <Button
                                                onClick={handleShare}
                                                className="w-full justify-start gap-2 border border-blue-200 bg-white text-blue-900 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100"
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Share2 className="h-4 w-4" />
                                                Bagikan Event
                                            </Button>
                                            <Button
                                                onClick={() => setIsFavorited(!isFavorited)}
                                                className={`w-full justify-start gap-2 border ${
                                                    isFavorited 
                                                        ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400' 
                                                        : 'border-blue-200 bg-white text-blue-900 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100'
                                                }`}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                                                {isFavorited ? 'Tersimpan' : 'Simpan Event'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Info Card */}
                                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
                                    <CardContent className="p-5">
                                        <div className="mb-2 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                                            <Sparkles className="h-4 w-4" />
                                            <h3 className="text-sm font-semibold">Perhatian</h3>
                                        </div>
                                        <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-200">
                                            Pastikan Anda datang tepat waktu dan membawa identitas diri. 
                                            Untuk event berbayar, harap melakukan pembayaran sebelum tanggal acara.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Related Events */}
                                {relatedEvents.length > 0 && (
                                    <Card className="border-2 border-blue-200 bg-white/80 shadow-md backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/80">
                                        <CardContent className="p-5">
                                            <h3 className="mb-3 text-sm font-semibold text-blue-900 dark:text-blue-100">
                                                Event Terkait
                                            </h3>
                                            <div className="space-y-2">
                                                {relatedEvents.map((related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={`/event/${related.id}`}
                                                        className="group flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-2 transition-all hover:border-blue-400 hover:shadow-sm dark:border-blue-800 dark:bg-blue-950"
                                                    >
                                                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
                                                            {related.image ? (
                                                                <img
                                                                    src={related.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200'}
                                                                    alt={related.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center">
                                                                    <Calendar className="h-6 w-6 text-blue-400 opacity-40" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="truncate text-sm font-semibold text-blue-900 dark:text-blue-100">
                                                                {related.title}
                                                            </h4>
                                                            <p className="truncate text-xs text-blue-600 dark:text-blue-400">
                                                                {related.location} • {related.date}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-blue-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                                    </Link>
                                                ))}
                                            </div>
                                            <Link
                                                href="/event"
                                                className="mt-3 flex items-center justify-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                            >
                                                Lihat Semua Event
                                                <ChevronRight className="h-3 w-3" />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative mt-12 border-t border-blue-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <Calendar className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                BudayaKu - Acara Budaya Indonesia
                            </span>
                        </div>
                        <div className="text-center text-sm text-blue-800/80 dark:text-blue-200/80">
                            © 2025 BudayaKu | Lestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
