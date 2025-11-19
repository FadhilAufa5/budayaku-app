import { Head, Link } from '@inertiajs/react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Home, ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const batikTypes = [
    {
        name: 'Batik Tulis',
        region: 'Jawa',
        description: 'Batik yang dibuat dengan tangan menggunakan canting, prosesnya memakan waktu berbulan-bulan dan menghasilkan karya seni yang sangat bernilai.',
        image: '/Kain-Batik.jpg',
    },
    {
        name: 'Batik Cap',
        region: 'Jawa',
        description: 'Batik yang dibuat dengan stempel tembaga (cap), lebih cepat dibuat namun tetap mempertahankan keindahan motif tradisional.',
        image: '/batik2.jpg',
    },
    {
        name: 'Batik Kombinasi',
        region: 'Jawa',
        description: 'Perpaduan antara teknik tulis dan cap yang menghasilkan batik dengan detail halus dan produksi yang lebih efisien.',
        image: '/batik 3.webp',
    },
];

const traditionalArts = [
    {
        title: 'Wayang Kulit',
        description: 'Seni pertunjukan bayangan yang menggunakan boneka kulit dan telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi.',
        icon: '🎭',
        region: 'Jawa',
        established: 'Abad ke-10',
    },
    {
        title: 'Ukiran Kayu',
        description: 'Keahlian mengukir kayu dengan motif rumit yang diturunkan dari generasi ke generasi, terutama dari Jepara dan Bali.',
        icon: '🪵',
        region: 'Jawa & Bali',
        established: 'Abad ke-15',
    },
    {
        title: 'Tenun Ikat',
        description: 'Teknik menenun dengan benang yang telah diikat dan diwarnai terlebih dahulu, menghasilkan motif yang unik dan beragam.',
        icon: '🧵',
        region: 'NTT, Sumba',
        established: 'Abad ke-13',
    },
    {
        title: 'Anyaman Tradisional',
        description: 'Seni menganyam dari berbagai bahan alami seperti bambu, rotan, dan pandan untuk membuat berbagai kerajinan fungsional.',
        icon: '🧺',
        region: 'Seluruh Indonesia',
        established: 'Prasejarah',
    },
    {
        title: 'Kain Songket',
        description: 'Kain tenun mewah dengan benang emas atau perak yang digunakan dalam upacara adat dan acara-acara penting.',
        icon: '✨',
        region: 'Sumatra, Kalimantan',
        established: 'Abad ke-16',
    },
    {
        title: 'Keramik Tradisional',
        description: 'Seni membuat gerabah dan keramik dengan teknik pembakaran tradisional yang menghasilkan keunikan warna dan tekstur.',
        icon: '🏺',
        region: 'Kasongan, Bali',
        established: 'Abad ke-18',
    },
];

const unescoHeritage = [
    'Batik Indonesia (2009)',
    'Wayang (2003)',
    'Keris (2005)',
    'Angklung (2010)',
    'Tari Saman (2011)',
    'Noken Papua (2012)',
    'Tiga Genre Tari Bali (2015)',
    'Pencak Silat (2019)',
    'Pantun (2020)',
];

export default function SeniTradisi({ canRegister = true }: { canRegister?: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Head title="Seni & Tradisi Indonesia" />
            
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
                {/* Batik Pattern Background */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="batik-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <path d="M 0,60 Q 15,45 30,60 T 60,60" stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6"/>
                                <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                                <circle cx="90" cy="90" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#batik-pattern)" className="text-amber-800 dark:text-amber-200"/>
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
                            className="mb-8 inline-flex items-center gap-2 text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Kembali ke Beranda</span>
                        </Link>

                        {/* Hero Content */}
                        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-6 border-amber-600 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 text-amber-900 dark:border-amber-400 dark:text-amber-100">
                                <Palette className="mr-2 h-4 w-4" />
                                Kekayaan Nusantara
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-5xl lg:text-6xl">
                                Seni & Tradisi{' '}
                                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                                    Indonesia
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                                Indonesia memiliki kekayaan seni dan tradisi yang tak ternilai, diwariskan dari generasi ke generasi 
                                selama berabad-abad. Dari batik yang memesona hingga wayang kulit yang filosofis, setiap karya 
                                seni tradisional Indonesia mengandung makna mendalam dan nilai budaya yang luhur.
                            </p>
                        </div>

                        {/* Batik Section */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-amber-900 dark:text-amber-100">
                                    Batik Indonesia
                                </h2>
                                <p className="mx-auto max-w-2xl text-amber-800/90 dark:text-amber-200/90">
                                    Batik Indonesia telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan 
                                    Nonbendawi pada 2 Oktober 2009, yang kini diperingati sebagai Hari Batik Nasional.
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {batikTypes.map((batik, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-3xl border-2 border-amber-200/50 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-amber-800/50 dark:bg-amber-950/90"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={batik.image}
                                                alt={batik.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <Badge className="border-0 bg-white/90 text-amber-900 shadow-lg backdrop-blur-md">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {batik.region}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                                {batik.name}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                                                {batik.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Traditional Arts Grid */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-amber-900 dark:text-amber-100">
                                    Seni Tradisional Nusantara
                                </h2>
                                <p className="mx-auto max-w-2xl text-amber-800/90 dark:text-amber-200/90">
                                    Kerajinan dan seni tradisional Indonesia mencerminkan kearifan lokal dan keahlian yang 
                                    telah diasah selama berabad-abad oleh para pengrajin Nusantara.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {traditionalArts.map((art, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-amber-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-amber-800/50 dark:bg-amber-950/90"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-3xl shadow-lg">
                                                {art.icon}
                                            </div>
                                            <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">
                                                {art.established}
                                            </Badge>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-amber-900 dark:text-amber-100">
                                            {art.title}
                                        </h3>
                                        <p className="mb-3 text-sm text-amber-800/80 dark:text-amber-200/80">
                                            {art.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
                                            <MapPin className="h-3 w-3" />
                                            <span>{art.region}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* UNESCO Heritage */}
                        <div className="mb-20">
                            <div className="overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-100 to-orange-100 p-8 shadow-2xl dark:border-amber-700 dark:from-amber-900/50 dark:to-orange-900/50 lg:p-12">
                                <div className="mb-8 text-center">
                                    <Badge className="mb-4 border-amber-600 bg-white/50 px-4 py-2 text-amber-900 backdrop-blur-sm dark:bg-amber-950/50 dark:text-amber-100">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        UNESCO World Heritage
                                    </Badge>
                                    <h2 className="mb-4 text-3xl font-bold text-amber-900 dark:text-amber-100">
                                        Warisan Budaya UNESCO dari Indonesia
                                    </h2>
                                    <p className="mx-auto max-w-2xl text-amber-800 dark:text-amber-200">
                                        Indonesia bangga memiliki 9 warisan budaya tak benda yang telah diakui oleh UNESCO, 
                                        menandakan pentingnya pelestarian budaya Indonesia di mata dunia.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {unescoHeritage.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-xl border border-amber-300/50 bg-white/80 p-4 backdrop-blur-sm transition-all hover:bg-white dark:border-amber-700/50 dark:bg-amber-950/80 dark:hover:bg-amber-950"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                                            <span className="font-medium text-amber-900 dark:text-amber-100">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <div className="mx-auto max-w-2xl rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-600 to-orange-600 p-8 shadow-2xl lg:p-12">
                                <h2 className="mb-4 text-3xl font-bold text-white">
                                    Lestarikan Seni Tradisi Indonesia
                                </h2>
                                <p className="mb-8 text-lg text-amber-50">
                                    Mari bersama-sama menjaga dan melestarikan kekayaan seni dan tradisi Nusantara 
                                    untuk generasi mendatang.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/budaya">
                                        <Button
                                            size="lg"
                                            className="border-2 border-white bg-white text-amber-700 shadow-xl transition-all hover:bg-amber-50"
                                        >
                                            Jelajahi Budaya
                                        </Button>
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-white bg-transparent text-white hover:bg-white/20"
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
                <footer className="relative border-t border-amber-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Seni & Tradisi Indonesia - Warisan Tak Ternilai
                            </span>
                        </div>
                        <div className="text-sm text-amber-800/80 dark:text-amber-200/80">
                            © 2025 Budayaku | Melestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
