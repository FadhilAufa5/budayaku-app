import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarDays, MapPin, ShoppingBag, Sparkles, Globe2, Users, Languages, Heart, BookOpen, Music, Palette, UtensilsCrossed } from 'lucide-react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { LogoLoop } from '@/components/LogoLoop';
import { dashboard, login, register } from '@/routes';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';



// Alternative with image sources
const imageLogos = [
  { src: "/Kain-Batik.jpg", alt: "Company 1", href: "https://company1.com" },
  { src: "/batik2.jpg", alt: "Company 1", href: "https://company1.com" },
  { src: "/Kain-Batik.jpg", alt: "Company 1", href: "https://company1.com" },
   { src: "/batik2.jpg", alt: "Company 1", href: "https://company1.com" },
  { src: "/Kain-Batik.jpg", alt: "Company 1", href: "https://company1.com" },
   { src: "/batik2.jpg", alt: "Company 1", href: "https://company1.com" },
 
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
                {/* Enhanced Batik Pattern Background - Global */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="batik-indonesian-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                {/* Motif Batik Parang */}
                                <path d="M 0,60 Q 15,45 30,60 T 60,60" stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6"/>
                                <path d="M 60,60 Q 75,45 90,60 T 120,60" stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6"/>
                                
                                {/* Motif Kawung (Circles) */}
                                <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                                <circle cx="90" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                                <circle cx="30" cy="90" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                                <circle cx="90" cy="90" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                                
                                {/* Inner circles */}
                                <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                                <circle cx="90" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                                <circle cx="30" cy="90" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                                <circle cx="90" cy="90" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                                
                                {/* Motif Garis-garis Diagonal */}
                                <path d="M 15,0 L 15,20 M 45,0 L 45,20 M 75,0 L 75,20 M 105,0 L 105,20" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                                <path d="M 0,15 L 20,15 M 0,45 L 20,45 M 0,75 L 20,75 M 0,105 L 20,105" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                                
                                {/* Dots pattern */}
                                <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.3"/>
                                <circle cx="45" cy="45" r="2" fill="currentColor" opacity="0.3"/>
                                <circle cx="75" cy="75" r="2" fill="currentColor" opacity="0.3"/>
                                <circle cx="105" cy="105" r="2" fill="currentColor" opacity="0.3"/>
                                
                                {/* Wavy lines */}
                                <path d="M 0,30 Q 10,25 20,30 T 40,30 T 60,30 T 80,30 T 100,30 T 120,30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                                <path d="M 0,90 Q 10,85 20,90 T 40,90 T 60,90 T 80,90 T 100,90 T 120,90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#batik-indonesian-pattern)" className="text-amber-800 dark:text-amber-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation canRegister={canRegister} />

                

                {/* Hero Section with Video */}
                <div className="relative h-[90vh] min-h-[600px] overflow-hidden">
                    {/* Video Background */}
                    <div className="absolute inset-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        >
                            <source src="/bali.mp4" type="video/mp4" />
                            {/* Fallback untuk browser yang tidak support video */}
                            Your browser does not support the video tag.
                        </video>
                        
                       
                    </div>

                    {/* Hero Content - Bottom Left */}
                    <div className="relative z-10 flex h-full items-end">
                        <div className="container mx-auto px-6 pb-16 lg:px-12 lg:pb-24">
                            <div className="max-w-4xl">
                                {/* Badge */}
                                {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-200 backdrop-blur-sm ring-1 ring-amber-400/30">
                                    <Sparkles className="h-4 w-4" />
                                    <span>Jelajahi Kekayaan Budaya Indonesia</span>
                                </div> */}
                                
                                {/* Main Heading */}
                                <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                                    Warisan Budaya
                                    <br /> 
                                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                        Nusantara
                                    </span>
                                </h1>
                                
                                {/* Description */}
                                <p className="mb-8 max-w-2xl text-base text-gray-200 md:text-lg lg:text-xl ">
                                    Temukan keindahan batik, eksplorasi event budaya, dan belanja produk
                                    khas Indonesia. Satu platform untuk merayakan keberagaman budaya kita.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/50"
                                        >
                                            <span className="relative z-10">Mulai Jelajahi</span>
                                            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={register()}
                                                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3.5 text-base font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/50"
                                            >
                                                <span className="relative z-10">Mulai Sekarang</span>
                                                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                            </Link>
                                            <Link
                                                href={login()}
                                                className="rounded-xl border-2 border-white/50 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white"
                                            >
                                                Masuk
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    {/* <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
                        <div className="flex flex-col items-center gap-2 text-white/60">
                            <span className="text-sm font-medium">Scroll untuk lebih banyak</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div> */}
                </div>
                        
                {/* Logo Loop - Batik Patterns */}
                <div style={{ height: '100px', position: 'relative', overflow: 'hidden'}} >
                    <LogoLoop
                        logos={imageLogos}
                        speed={50}
                        direction="left"
                        logoHeight={60}
                        gap={0}
                        hoverSpeed={0}
                        ariaLabel="Indonesian Batik Patterns"
                    />
                </div>

                {/* About Indonesian Culture Section */}
                <div className="relative py-20 lg:py-32">
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
                        {/* Section Header */}
                        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-4 border-blue-600 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2 text-blue-900 dark:border-blue-400 dark:text-blue-100">
                                <Globe2 className="mr-2 h-4 w-4" />
                                Tentang Budaya Indonesia
                            </Badge>
                            <h2 className="mb-6 text-3xl font-bold tracking-tight text-amber-900 dark:text-amber-100 sm:text-4xl lg:text-5xl">
                                Kekayaan Warisan{' '}
                                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                                    Nusantara
                                </span>
                            </h2>
                            <p className="mx-auto max-w-3xl text-base leading-relaxed text-amber-800/90 dark:text-amber-200/90 lg:text-lg">
                                Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari <strong>17.000 pulau</strong>, 
                                menjadi rumah bagi <strong>1.300+ suku bangsa</strong> dan <strong>700+ bahasa daerah</strong>. 
                                Keberagaman ini menciptakan mozaik budaya yang kaya dan unik, dari seni tradisional hingga kuliner khas.
                            </p>
                        </div>

                        {/* Cultural Highlights Grid */}
                        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {/* Card 1 - Seni & Tradisi */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl dark:border-amber-800 dark:bg-amber-950/80">
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Palette className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Seni & Tradisi
                                    </h3>
                                    <p className="mb-4 text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                                        Batik, wayang kulit, tari tradisional, ukiran kayu, dan seni rupa yang diwariskan turun-temurun selama berabad-abad.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                                        <span>9 Warisan UNESCO</span>
                                        <Sparkles className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 - Bahasa & Sastra */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-2xl dark:border-blue-800 dark:bg-blue-950/80">
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Languages className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-blue-100">
                                        Bahasa & Sastra
                                    </h3>
                                    <p className="mb-4 text-sm leading-relaxed text-blue-800/90 dark:text-blue-200/90">
                                        Lebih dari 700 bahasa daerah masih digunakan, dengan aksara kuno seperti Jawa, Bali, dan Sunda yang tetap lestari.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        <span>700+ Bahasa Daerah</span>
                                        <BookOpen className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 - Musik & Tari */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-400 hover:shadow-2xl dark:border-purple-800 dark:bg-purple-950/80">
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Music className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-purple-900 dark:text-purple-100">
                                        Musik & Tari
                                    </h3>
                                    <p className="mb-4 text-sm leading-relaxed text-purple-800/90 dark:text-purple-200/90">
                                        Gamelan, angklung, tari Saman, tari Kecak, dan ratusan tarian tradisional yang memukau dunia.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                                        <span>300+ Tarian Tradisional</span>
                                        <Music className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 4 - Kuliner Nusantara */}
                            <div className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-2xl dark:border-emerald-800 dark:bg-emerald-950/80">
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-green-500/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <UtensilsCrossed className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-emerald-900 dark:text-emerald-100">
                                        Kuliner Nusantara
                                    </h3>
                                    <p className="mb-4 text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-200/90">
                                        Ribuan resep tradisional dengan rempah-rempah khas yang menjadikan Indonesia surganya kuliner.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                        <span>5000+ Resep Tradisional</span>
                                        <UtensilsCrossed className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Indonesia Map & Stats Section */}
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Left - Text Content */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="mb-4 text-2xl font-bold text-amber-900 dark:text-amber-100 lg:text-3xl">
                                        Dari Sabang Sampai Merauke
                                    </h3>
                                    <p className="mb-6 leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                                        Indonesia membentang dari <strong>95°BT sampai 141°BT</strong> dan dari <strong>6°LU sampai 11°LS</strong>, 
                                        melintasi 3 zona waktu. Kepulauan ini menjadi jembatan antara dua benua (Asia dan Australia) 
                                        dan dua samudra (Hindia dan Pasifik).
                                    </p>

                                    {/* Key Facts */}
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/50 p-4 dark:bg-amber-950/30">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                                                <Globe2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-bold text-amber-900 dark:text-amber-100">17.000+ Pulau</h4>
                                                <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                                    Negara kepulauan terbesar di dunia dengan nama resmi 13.466 pulau
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 rounded-xl border-l-4 border-blue-500 bg-blue-50/50 p-4 dark:bg-blue-950/30">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-bold text-blue-900 dark:text-blue-100">1.300+ Suku Bangsa</h4>
                                                <p className="text-sm text-blue-800/80 dark:text-blue-200/80">
                                                    Dari Aceh hingga Papua, setiap suku memiliki budaya dan tradisi unik
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 rounded-xl border-l-4 border-purple-500 bg-purple-50/50 p-4 dark:bg-purple-950/30">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                                <Heart className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-bold text-purple-900 dark:text-purple-100">6 Agama Resmi</h4>
                                                <p className="text-sm text-purple-800/80 dark:text-purple-200/80">
                                                    Toleransi dan kerukunan beragama dalam keberagaman kepercayaan
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Map Visualization */}
                            <div className="relative">
                                <div className="overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-2xl dark:border-amber-800 dark:from-amber-950 dark:to-orange-950">
                                    {/* Decorative Elements */}
                                    <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-amber-500/10 blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 h-40 w-40 translate-x-10 translate-y-10 rounded-full bg-orange-500/10 blur-3xl"></div>
                                    
                                    <div className="relative space-y-6">
                                        <div className="text-center">
                                            <h3 className="mb-2 text-2xl font-bold text-amber-900 dark:text-amber-100">
                                                🇮🇩 Peta Indonesia
                                            </h3>
                                            <p className="text-sm text-amber-700 dark:text-amber-300">
                                                Negara Maritim Terbesar di Dunia
                                            </p>
                                        </div>

                                        {/* Map Image */}
                                        <img 
                                            src="/peta.png" 
                                            alt="Peta Indonesia" 
                                            className="w-full rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
                                        />

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-amber-300/50 bg-gradient-to-r from-amber-100/50 to-orange-100/50 p-4 backdrop-blur-sm dark:border-amber-700/50 dark:from-amber-900/30 dark:to-orange-900/30">
                                            <div className="text-center">
                                                <div className="mb-1 text-2xl font-bold text-amber-900 dark:text-amber-100">38</div>
                                                <div className="text-xs text-amber-700 dark:text-amber-300">Provinsi</div>
                                            </div>
                                            <div className="border-x border-amber-300/50 text-center dark:border-amber-700/50">
                                                <div className="mb-1 text-2xl font-bold text-amber-900 dark:text-amber-100">514</div>
                                                <div className="text-xs text-amber-700 dark:text-amber-300">Kab/Kota</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="mb-1 text-2xl font-bold text-amber-900 dark:text-amber-100">280M+</div>
                                                <div className="text-xs text-amber-700 dark:text-amber-300">Penduduk</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                            
                        <div id="budaya" className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-16">
                            {/* Feature 1 - Budaya */}
                            <Link href="/budaya" className="group relative overflow-hidden rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-amber-900/20">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                                        <Sparkles className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Eksplorasi Budaya
                                    </h3>
                                    <p className="mb-4 text-amber-800/80 dark:text-amber-200/80">
                                        Jelajahi kekayaan budaya Indonesia dari Sabang sampai Merauke. Temukan batik, tarian, dan tradisi unik.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                                        <span>Pelajari lebih lanjut</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>

                            {/* Feature 2 - Event */}
                            <div id="event" className="group relative overflow-hidden rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-amber-900/20">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-orange-400/30 to-red-500/30 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                                        <CalendarDays className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Event Budaya
                                    </h3>
                                    <p className="mb-4 text-amber-800/80 dark:text-amber-200/80">
                                        Ikuti berbagai acara budaya, festival, dan workshop tradisional di seluruh Indonesia.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                                        <span>Lihat event</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 3 - Toko */}
                            <div id="toko" className="group relative overflow-hidden rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-amber-900/20 md:col-span-2 lg:col-span-1">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-red-400/30 to-amber-500/30 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-amber-600 text-white shadow-lg">
                                        <ShoppingBag className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Toko Produk Lokal
                                    </h3>
                                    <p className="mb-4 text-amber-800/80 dark:text-amber-200/80">
                                        Belanja produk khas Indonesia: batik, kerajinan tangan, makanan tradisional, dan souvenir.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
                                        <span>Mulai belanja</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                        {/* Stats/Quote Section */}
                        <div className="py-12 lg:py-16">
                            <div className="rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-center shadow-2xl lg:p-12">
                                <blockquote className="mx-auto max-w-3xl">
                                    <p className="mb-4 text-2xl font-medium italic text-white md:text-3xl">
                                        "Bhinneka Tunggal Ika"
                                    </p>
                                    <p className="text-lg text-amber-50 md:text-xl">
                                        Berbeda-beda tetapi tetap satu. Mari lestarikan keberagaman budaya Indonesia
                                        untuk generasi mendatang.
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
            

                {/* Footer */}
                <footer className="relative z-10 border-t border-amber-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Indonesia - Dari Sabang sampai Merauke
                            </span>
                        </div>
                        <div className="text-center text-sm text-amber-800/80 dark:text-amber-200/80">
                            © 2025 detouhuyy | All rights reserved
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}