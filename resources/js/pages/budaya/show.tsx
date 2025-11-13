import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    MapPin,
    Eye,
    Calendar,
    Share2,
    Heart,
    Sparkles,
    ChevronRight,
} from 'lucide-react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Culture {
    id: number;
    name: string;
    category: string;
    region: string;
    description: string;
    image: string;
    views: number;
    created_at: string;
}

interface RelatedCulture {
    id: number;
    name: string;
    category: string;
    region: string;
    image: string;
    views: number;
}

interface BudayaShowProps {
    culture: Culture;
    relatedCultures: RelatedCulture[];
}

export default function BudayaShow({ culture, relatedCultures }: BudayaShowProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: culture.name,
                text: `Lihat budaya ${culture.name} dari ${culture.region}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link disalin ke clipboard!');
        }
    };

    return (
        <>
            <Head title={`${culture.name} - Budaya Indonesia`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
                {/* Background Pattern - Batik Indonesia */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="batik-detail" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <path d="M 0,60 Q 15,45 30,60 T 60,60" stroke="currentColor" fill="none" strokeWidth="1"/>
                                <path d="M 60,60 Q 75,45 90,60 T 120,60" stroke="currentColor" fill="none" strokeWidth="1"/>
                                <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="90" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="30" cy="90" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <circle cx="90" cy="90" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                                <path d="M 15,0 L 15,15 M 45,0 L 45,15 M 75,0 L 75,15 M 105,0 L 105,15" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 0,15 L 15,15 M 0,45 L 15,45 M 0,75 L 15,75 M 0,105 L 15,105" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#batik-detail)" className="text-amber-800 dark:text-amber-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation />

                {/* Content */}
                <div className="relative px-6 py-8 pt-24 lg:px-12">
                    <div className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Back Button */}
                        <Link
                            href="/budaya"
                            className="group mb-6 inline-flex items-center gap-2 rounded-lg border-2 border-amber-200 bg-white/80 px-4 py-2 text-sm font-medium text-amber-900 shadow-md backdrop-blur-sm transition-all hover:-translate-x-1 hover:border-amber-400 hover:bg-amber-50 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-100 dark:hover:bg-amber-900/50"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Kembali ke Daftar Budaya
                        </Link>

                        {/* Main Content */}
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Left Column - Image & Info */}
                            <div className="lg:col-span-2">
                                {/* Hero Card */}
                                <Card className="group overflow-hidden border-2 border-amber-200 bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-amber-800 dark:bg-amber-950/80">
                                    {/* Image Container - No padding/margin */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900">
                                        {culture.image ? (
                                            <>
                                                <img
                                                    src={`/storage/${culture.image}`}
                                                    alt={culture.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="text-center">
                                                    <MapPin className="mx-auto h-24 w-24 text-amber-400 opacity-40" />
                                                    <p className="mt-3 text-base text-amber-600 dark:text-amber-400">Tidak ada gambar</p>
                                                </div>
                                            </div>
                                        )}
                                        {/* Badge on Image */}
                                        <div className="absolute left-4 top-4">
                                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                                                {culture.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-6 lg:p-8">
                                        {/* Title */}
                                        <h1 className="mb-4 text-2xl font-bold text-amber-900 dark:text-amber-100 lg:text-3xl">
                                            {culture.name}
                                        </h1>

                                        {/* Meta Info */}
                                        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
                                            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                                                <MapPin className="h-4 w-4" />
                                                <span>{culture.region}</span>
                                            </div>
                                            <span className="text-amber-400">•</span>
                                            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                                                <Eye className="h-4 w-4" />
                                                <span>{culture.views.toLocaleString()} views</span>
                                            </div>
                                            <span className="text-amber-400">•</span>
                                            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                                                <Calendar className="h-4 w-4" />
                                                <span>{culture.created_at}</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent dark:via-amber-800"></div>

                                        {/* Description */}
                                        <div>
                                            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-900 dark:text-amber-100">
                                                <Sparkles className="h-5 w-5 text-amber-500" />
                                                Tentang Budaya Ini
                                            </h2>
                                            <p className="whitespace-pre-line text-base leading-relaxed text-amber-800 dark:text-amber-200">
                                                {culture.description || 'Deskripsi budaya ini sedang dalam proses penulisan. Kembali lagi nanti untuk informasi lebih lengkap tentang warisan budaya Indonesia yang menakjubkan ini.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Actions & Related */}
                            <div className="space-y-6">
                                {/* Action Buttons */}
                                <Card className="border-2 border-amber-200 bg-white/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950/80">
                                    <CardContent className="p-5">
                                        <h3 className="mb-3 text-sm font-semibold text-amber-900 dark:text-amber-100">
                                            Aksi
                                        </h3>
                                        <div className="space-y-2">
                                            <Button
                                                onClick={handleShare}
                                                className="w-full justify-start gap-2 border border-amber-200 bg-white text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Share2 className="h-4 w-4" />
                                                Bagikan
                                            </Button>
                                            <Button
                                                onClick={() => setIsFavorited(!isFavorited)}
                                                className={`w-full justify-start gap-2 border ${
                                                    isFavorited 
                                                        ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400' 
                                                        : 'border-amber-200 bg-white text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100'
                                                }`}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                                                {isFavorited ? 'Tersimpan' : 'Simpan'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Info Card */}
                                <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md dark:border-amber-800 dark:from-amber-950 dark:to-orange-950">
                                    <CardContent className="p-5">
                                        <div className="mb-2 flex items-center gap-2 text-amber-900 dark:text-amber-100">
                                            <Sparkles className="h-4 w-4" />
                                            <h3 className="text-sm font-semibold">Tahukah Anda?</h3>
                                        </div>
                                        <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                                            Indonesia memiliki lebih dari 300 suku bangsa dengan budaya yang unik. Setiap daerah memiliki kekhasan yang memperkaya keragaman budaya nusantara.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Related Cultures */}
                                {relatedCultures.length > 0 && (
                                    <Card className="border-2 border-amber-200 bg-white/80 shadow-md backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/80">
                                        <CardContent className="p-5">
                                            <h3 className="mb-3 text-sm font-semibold text-amber-900 dark:text-amber-100">
                                                Budaya Terkait
                                            </h3>
                                            <div className="space-y-2">
                                                {relatedCultures.map((related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={`/budaya/${related.id}`}
                                                        className="group flex items-center gap-3 rounded-lg border border-amber-200 bg-white p-2 transition-all hover:border-amber-400 hover:shadow-sm dark:border-amber-800 dark:bg-amber-950"
                                                    >
                                                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900">
                                                            {related.image ? (
                                                                <img
                                                                    src={`/storage/${related.image}`}
                                                                    alt={related.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center">
                                                                    <MapPin className="h-6 w-6 text-amber-400 opacity-40" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="truncate text-sm font-semibold text-amber-900 dark:text-amber-100">
                                                                {related.name}
                                                            </h4>
                                                            <p className="truncate text-xs text-amber-600 dark:text-amber-400">
                                                                {related.region}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-amber-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                                    </Link>
                                                ))}
                                            </div>
                                            <Link
                                                href="/budaya"
                                                className="mt-3 flex items-center justify-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
                                            >
                                                Lihat Semua
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
                <footer className="relative mt-12 border-t border-amber-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Indonesia - Dari Sabang sampai Merauke
                            </span>
                        </div>
                        <div className="text-center text-sm text-amber-800/80 dark:text-amber-200/80">
                            © 2025 BudayaKu | Lestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
