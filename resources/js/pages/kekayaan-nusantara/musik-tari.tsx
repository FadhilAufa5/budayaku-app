import { Head, Link } from '@inertiajs/react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Music, Home, ArrowLeft, Users, MapPin, Sparkles, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const traditionalDances = [
    {
        name: 'Tari Saman',
        region: 'Aceh',
        type: 'Tari Massal',
        description: 'Tari seribu tangan yang spektakuler, menampilkan koordinasi dan keselarasan gerakan dari puluhan penari. Diakui UNESCO pada 2011.',
        image: '/musik dan tari.png',
        unescoYear: '2011',
        dancers: '10-20 orang',
    },
    {
        name: 'Tari Kecak',
        region: 'Bali',
        type: 'Tari Drama',
        description: 'Tari ritual yang menggabungkan nyanyian "cak" dari puluhan pria dengan kisah Ramayana, menciptakan pertunjukan yang hipnotis.',
        image: '/musik dan tari.png',
        unescoYear: 'Kandidat',
        dancers: '50-100 orang',
    },
    {
        name: 'Tari Pendet',
        region: 'Bali',
        type: 'Tari Penyambutan',
        description: 'Tari sakral yang menggambarkan penyambutan turunnya para dewa ke dunia, kini juga digunakan untuk menyambut tamu kehormatan.',
        image: '/musik dan tari.png',
        unescoYear: '-',
        dancers: '4-8 orang',
    },
    {
        name: 'Tari Jaipong',
        region: 'Jawa Barat',
        type: 'Tari Pergaulan',
        description: 'Tari modern yang menggabungkan unsur tari tradisional Sunda dengan gerakan yang energik dan dinamis.',
        image: '/musik dan tari.png',
        unescoYear: '-',
        dancers: '1-4 orang',
    },
    {
        name: 'Tari Serimpi',
        region: 'Yogyakarta',
        type: 'Tari Keraton',
        description: 'Tari klasik keraton yang menggambarkan keanggunan dan kehalusan budi pekerti putri-putri keraton.',
        image: '/musik dan tari.png',
        unescoYear: '-',
        dancers: '4 orang',
    },
    {
        name: 'Tari Tor-Tor',
        region: 'Sumatra Utara',
        type: 'Tari Ritual',
        description: 'Tari sakral suku Batak yang dilakukan dalam upacara adat untuk mengusir roh jahat dan memanggil kebaikan.',
        image: '/musik dan tari.png',
        unescoYear: '-',
        dancers: 'Bervariasi',
    },
];

const traditionalMusic = [
    {
        name: 'Gamelan',
        region: 'Jawa & Bali',
        instruments: '20-30 alat musik',
        description: 'Ensemble musik tradisional yang terdiri dari gong, kendang, saron, dan berbagai instrumen perkusi perunggu. Menciptakan harmoni yang kompleks dan mistis.',
        icon: '🎵',
        unescoStatus: true,
    },
    {
        name: 'Angklung',
        region: 'Jawa Barat',
        instruments: 'Bambu berlapis',
        description: 'Alat musik dari bambu yang dimainkan dengan cara digoyangkan. Diakui UNESCO sebagai Warisan Budaya Takbenda pada 2010.',
        icon: '🎋',
        unescoStatus: true,
    },
    {
        name: 'Sasando',
        region: 'Nusa Tenggara Timur',
        instruments: 'Alat musik petik',
        description: 'Alat musik khas Rote yang terbuat dari daun lontar dengan suara yang lembut dan merdu.',
        icon: '🪕',
        unescoStatus: false,
    },
    {
        name: 'Kolintang',
        region: 'Sulawesi Utara',
        instruments: 'Kayu bernada',
        description: 'Alat musik perkusi kayu dari Minahasa yang menghasilkan nada-nada merdu dan sering dimainkan secara ensemble.',
        icon: '🥁',
        unescoStatus: false,
    },
    {
        name: 'Talempong',
        region: 'Sumatra Barat',
        instruments: 'Gong kecil',
        description: 'Instrumen perkusi khas Minangkabau yang dimainkan dalam upacara adat dan pertunjukan randai.',
        icon: '🔔',
        unescoStatus: false,
    },
    {
        name: 'Tifa',
        region: 'Papua & Maluku',
        instruments: 'Gendang tradisional',
        description: 'Alat musik perkusi yang dimainkan dalam tarian perang dan upacara adat masyarakat Papua dan Maluku.',
        icon: '🪘',
        unescoStatus: false,
    },
];

const danceTypes = [
    {
        type: 'Tari Ritual',
        count: '100+',
        description: 'Tarian sakral untuk upacara keagamaan dan adat',
        examples: 'Tari Sanghyang, Tari Barong, Tari Reog',
    },
    {
        type: 'Tari Istana',
        count: '50+',
        description: 'Tarian klasik dari keraton dan kerajaan',
        examples: 'Tari Bedhaya, Tari Serimpi, Tari Golek',
    },
    {
        type: 'Tari Pergaulan',
        count: '80+',
        description: 'Tarian untuk hiburan dan acara sosial',
        examples: 'Tari Jaipong, Tari Zapin, Tari Poco-Poco',
    },
    {
        type: 'Tari Penyambutan',
        count: '60+',
        description: 'Tarian untuk menyambut tamu kehormatan',
        examples: 'Tari Pendet, Tari Piring, Tari Gong',
    },
];

const musicStats = [
    {
        stat: '300+',
        label: 'Jenis Tarian',
        description: 'Tarian tradisional dari berbagai daerah di Indonesia',
    },
    {
        stat: '150+',
        label: 'Alat Musik',
        description: 'Instrumen musik tradisional yang masih lestari',
    },
    {
        stat: '2',
        label: 'Warisan UNESCO',
        description: 'Gamelan dan Angklung diakui sebagai warisan dunia',
    },
    {
        stat: '34',
        label: 'Provinsi',
        description: 'Setiap provinsi memiliki tarian dan musik khasnya',
    },
];

export default function MusikTari({ canRegister = true }: { canRegister?: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Head title="Musik & Tari Indonesia" />
            
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-purple-950 dark:via-pink-950 dark:to-red-950">
                {/* Background Pattern */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="music-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                                <circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                                <path d="M 10,50 Q 30,30 50,50 T 90,50" stroke="currentColor" fill="none" strokeWidth="1" opacity="0.5"/>
                                <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.3"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#music-pattern)" className="text-purple-800 dark:text-purple-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation canRegister={canRegister} />

                {/* Hero Section */}
                <div className="relative px-6 py-20 lg:px-12 lg:py-32">
                    <div className="mx-auto max-w-7xl">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center gap-2 text-purple-700 transition-colors hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Kembali ke Beranda</span>
                        </Link>

                        {/* Hero Content */}
                        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-6 border-purple-600 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 text-purple-900 dark:border-purple-400 dark:text-purple-100">
                                <Music className="mr-2 h-4 w-4" />
                                Kekayaan Nusantara
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-purple-900 dark:text-purple-100 sm:text-5xl lg:text-6xl">
                                Musik & Tari{' '}
                                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                                    Indonesia
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-purple-800/90 dark:text-purple-200/90">
                                Dari gamelan yang mistis hingga tari Saman yang spektakuler, Indonesia memiliki lebih dari 300 jenis 
                                tarian tradisional dan 150 alat musik yang mencerminkan keberagaman budaya dan kreativitas Nusantara. 
                                Setiap gerakan tari dan nada musik menyimpan cerita, filosofi, dan nilai-nilai luhur bangsa.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {musicStats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden rounded-2xl border-2 border-purple-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-purple-800/50 dark:bg-purple-950/90"
                                >
                                    <div className="mb-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                                        {stat.stat}
                                    </div>
                                    <div className="mb-2 text-lg font-semibold text-purple-900 dark:text-purple-100">
                                        {stat.label}
                                    </div>
                                    <p className="text-sm text-purple-800/80 dark:text-purple-200/80">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Traditional Dances */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    Tarian Tradisional Nusantara
                                </h2>
                                <p className="mx-auto max-w-2xl text-purple-800/90 dark:text-purple-200/90">
                                    Tarian-tarian yang menjadi ikon budaya Indonesia dan telah memukau dunia dengan 
                                    keindahan gerakan dan makna filosofisnya.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {traditionalDances.map((dance, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-3xl border-2 border-purple-200/50 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-purple-800/50 dark:bg-purple-950/90"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={dance.image}
                                                alt={dance.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                <Badge className="border-0 bg-white/90 text-purple-900 shadow-lg backdrop-blur-md">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {dance.region}
                                                </Badge>
                                                {dance.unescoYear !== '-' && (
                                                    <Badge className="border-0 bg-amber-500 text-white shadow-lg">
                                                        <Award className="mr-1 h-3 w-3" />
                                                        UNESCO
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-3 flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">
                                                    {dance.name}
                                                </h3>
                                                <Badge variant="outline" className="border-purple-400 text-purple-700 dark:text-purple-300">
                                                    {dance.type}
                                                </Badge>
                                            </div>
                                            <p className="mb-3 text-sm leading-relaxed text-purple-800/80 dark:text-purple-200/80">
                                                {dance.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-purple-700 dark:text-purple-300">
                                                <Users className="h-3 w-3" />
                                                <span>{dance.dancers}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dance Types */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    Jenis-Jenis Tarian
                                </h2>
                                <p className="mx-auto max-w-2xl text-purple-800/90 dark:text-purple-200/90">
                                    Tarian Indonesia dikategorikan berdasarkan fungsi dan konteks pertunjukannya.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {danceTypes.map((type, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden rounded-2xl border-2 border-pink-200/50 bg-gradient-to-br from-white to-pink-50/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-pink-800/50 dark:from-pink-950/90 dark:to-purple-950/50"
                                    >
                                        <div className="mb-3 text-3xl font-bold text-pink-600 dark:text-pink-400">
                                            {type.count}
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-pink-900 dark:text-pink-100">
                                            {type.type}
                                        </h3>
                                        <p className="mb-3 text-sm text-pink-800/80 dark:text-pink-200/80">
                                            {type.description}
                                        </p>
                                        <p className="text-xs italic text-pink-700 dark:text-pink-300">
                                            Contoh: {type.examples}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Traditional Music */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    Musik Tradisional Nusantara
                                </h2>
                                <p className="mx-auto max-w-2xl text-purple-800/90 dark:text-purple-200/90">
                                    Alat musik tradisional Indonesia yang menghasilkan harmoni unik dan telah 
                                    memikat pendengar di seluruh dunia.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {traditionalMusic.map((music, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-indigo-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-800/50 dark:bg-indigo-950/90"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl shadow-lg">
                                                {music.icon}
                                            </div>
                                            {music.unescoStatus && (
                                                <Badge className="bg-amber-500 text-white">
                                                    <Sparkles className="mr-1 h-3 w-3" />
                                                    UNESCO
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-indigo-900 dark:text-indigo-100">
                                            {music.name}
                                        </h3>
                                        <div className="mb-3 flex items-center gap-2 text-sm text-indigo-700 dark:text-indigo-300">
                                            <MapPin className="h-4 w-4" />
                                            <span>{music.region}</span>
                                        </div>
                                        <div className="mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-center text-sm font-medium text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">
                                            {music.instruments}
                                        </div>
                                        <p className="text-sm leading-relaxed text-indigo-800/80 dark:text-indigo-200/80">
                                            {music.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quote Section */}
                        <div className="mb-20">
                            <div className="overflow-hidden rounded-3xl border-2 border-purple-300 bg-gradient-to-r from-purple-600 to-pink-600 p-8 shadow-2xl lg:p-12">
                                <blockquote className="text-center">
                                    <div className="mb-6 text-6xl">
                                        🎭
                                    </div>
                                    <p className="mb-4 text-2xl font-medium italic text-white md:text-3xl">
                                        "Tari adalah doa yang bergerak"
                                    </p>
                                    <p className="mx-auto max-w-2xl text-lg text-purple-50">
                                        Setiap gerakan tarian dan nada musik tradisional Indonesia mengandung doa, harapan, 
                                        dan kebijaksanaan yang diwariskan leluhur untuk kehidupan yang harmonis.
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <div className="mx-auto max-w-2xl rounded-3xl border-2 border-purple-300 bg-gradient-to-br from-purple-100 to-pink-100 p-8 shadow-2xl dark:from-purple-900/50 dark:to-pink-900/50 lg:p-12">
                                <div className="mb-6 flex justify-center">
                                    <div className="rounded-full bg-purple-600 p-4">
                                        <Music className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-purple-900 dark:text-purple-100">
                                    Lestarikan Musik & Tari Tradisional
                                </h2>
                                <p className="mb-8 text-lg text-purple-800 dark:text-purple-200">
                                    Mari bersama-sama menjaga dan mempelajari seni musik dan tari tradisional Indonesia 
                                    agar tetap hidup dan berkembang di era modern.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/budaya">
                                        <Button
                                            size="lg"
                                            className="bg-purple-600 text-white shadow-xl transition-all hover:bg-purple-700"
                                        >
                                            Jelajahi Budaya
                                        </Button>
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-purple-600 bg-transparent text-purple-700 hover:bg-purple-50 dark:text-purple-300"
                                        >
                                            <Home className="mr-2 h-5 w-5" />
                                            Kembali ke Beranda
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative border-t border-purple-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-purple-800 dark:bg-purple-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center">
                        <div className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                            <Music className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Musik & Tari Indonesia - Harmoni Nusantara
                            </span>
                        </div>
                        <div className="text-sm text-purple-800/80 dark:text-purple-200/80">
                            © 2025 Budayaku | Melestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
