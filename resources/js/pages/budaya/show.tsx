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
                    <div className="mx-auto max-w-6xl">
                        {/* Back Button */}
                        <Link
                            href="/budaya"
                            className="mb-6 inline-flex items-center gap-2 rounded-lg border-2 border-amber-200 bg-white/80 px-4 py-2 text-sm font-medium text-amber-900 backdrop-blur-sm transition-all hover:border-amber-400 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-100 dark:hover:bg-amber-900/50"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Daftar Budaya
                        </Link>

                        {/* Main Content */}
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Left Column - Image & Info */}
                            <div className="lg:col-span-2">
                                {/* Hero Image */}
                                <Card className="overflow-hidden border-2 border-amber-200 bg-white/80 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/80">
                                    <div className="relative h-96 overflow-hidden lg:h-[500px]">
                                        <img
                                            src={culture.image}
                                            alt={culture.name}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6">
                                            <Badge className="mb-3 bg-amber-500 text-white">
                                                {culture.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 lg:p-8">
                                        <h1 className="mb-4 text-3xl font-bold text-amber-900 dark:text-amber-100 lg:text-4xl">
                                            {culture.name}
                                        </h1>

                                        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-amber-700 dark:text-amber-300">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5" />
                                                <span className="font-medium">{culture.region}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Eye className="h-5 w-5" />
                                                <span>{culture.views.toLocaleString()} views</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5" />
                                                <span>{culture.created_at}</span>
                                            </div>
                                        </div>

                                        <div className="mb-6 h-px bg-amber-200 dark:bg-amber-800"></div>

                                        <div className="prose prose-amber max-w-none dark:prose-invert">
                                            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                                                Tentang Budaya Ini
                                            </h2>
                                            <p className="whitespace-pre-line text-amber-800 dark:text-amber-200">
                                                {culture.description || 'Deskripsi budaya ini sedang dalam proses penulisan. Kembali lagi nanti untuk informasi lebih lengkap tentang warisan budaya Indonesia yang menakjubkan ini.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Actions & Related */}
                            <div className="space-y-6">
                                {/* Action Buttons */}
                                <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/80">
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-bold text-amber-900 dark:text-amber-100">
                                            Aksi
                                        </h3>
                                        <div className="space-y-3">
                                            <Button
                                                onClick={handleShare}
                                                className="w-full justify-start gap-2 border-2 border-amber-200 bg-white text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100 dark:hover:bg-amber-900/50"
                                                variant="outline"
                                            >
                                                <Share2 className="h-4 w-4" />
                                                Bagikan Budaya Ini
                                            </Button>
                                            <Button
                                                className="w-full justify-start gap-2 border-2 border-amber-200 bg-white text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100 dark:hover:bg-amber-900/50"
                                                variant="outline"
                                            >
                                                <Heart className="h-4 w-4" />
                                                Simpan ke Favorit
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Info Card */}
                                <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-800 dark:from-amber-950 dark:to-orange-950">
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-center gap-2 text-amber-900 dark:text-amber-100">
                                            <Sparkles className="h-5 w-5" />
                                            <h3 className="font-bold">Tahukah Anda?</h3>
                                        </div>
                                        <p className="text-sm text-amber-800 dark:text-amber-200">
                                            Indonesia memiliki lebih dari 300 suku bangsa dengan budaya yang
                                            unik. Setiap daerah memiliki kekhasan yang memperkaya keragaman
                                            budaya nusantara.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Related Cultures */}
                                {relatedCultures.length > 0 && (
                                    <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/80">
                                        <CardContent className="p-6">
                                            <h3 className="mb-4 font-bold text-amber-900 dark:text-amber-100">
                                                Budaya Terkait
                                            </h3>
                                            <div className="space-y-3">
                                                {relatedCultures.map((related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={`/budaya/${related.id}`}
                                                        className="group flex items-center gap-3 rounded-lg border-2 border-amber-200 bg-white p-3 transition-all hover:border-amber-400 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950"
                                                    >
                                                        <img
                                                            src={related.image}
                                                            alt={related.name}
                                                            className="h-16 w-16 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="truncate text-sm font-bold text-amber-900 group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                                                {related.name}
                                                            </h4>
                                                            <p className="truncate text-xs text-amber-700 dark:text-amber-300">
                                                                {related.region}
                                                            </p>
                                                            <div className="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                                                                <Eye className="h-3 w-3" />
                                                                {related.views.toLocaleString()}
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="h-5 w-5 text-amber-400 transition-transform group-hover:translate-x-1" />
                                                    </Link>
                                                ))}
                                            </div>
                                            <Link
                                                href="/budaya"
                                                className="mt-4 block text-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                                            >
                                                Lihat Semua Budaya →
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
