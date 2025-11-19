import { Head, Link } from '@inertiajs/react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Home, ArrowLeft, MapPin, Sparkles, Flame, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const iconicFoods = [
    {
        name: 'Rendang',
        region: 'Sumatra Barat',
        category: 'Masakan Utama',
        description: 'Masakan daging yang dimasak dengan santan dan rempah-rempah selama berjam-jam. Dinobatkan sebagai makanan terlezat di dunia versi CNN.',
        image: '/kuliner nusantara.png',
        worldRanking: '#1 CNN 2011',
        spiceLevel: 'Sedang',
    },
    {
        name: 'Nasi Goreng',
        region: 'Nasional',
        category: 'Masakan Utama',
        description: 'Nasi yang digoreng dengan bumbu khas Indonesia, telah menjadi ikon kuliner Indonesia di mata dunia.',
        image: '/kuliner nusantara.png',
        worldRanking: '#2 CNN 2011',
        spiceLevel: 'Sedang',
    },
    {
        name: 'Sate',
        region: 'Nasional',
        category: 'Masakan Utama',
        description: 'Daging tusuk yang dipanggang dengan bumbu kacang atau kecap, memiliki berbagai varian di setiap daerah.',
        image: '/kuliner nusantara.png',
        worldRanking: 'Top 50',
        spiceLevel: 'Bervariasi',
    },
    {
        name: 'Gado-Gado',
        region: 'Jakarta',
        category: 'Salad',
        description: 'Salad sayuran Indonesia dengan saus kacang yang gurih, mencerminkan keberagaman dalam satu piring.',
        image: '/kuliner nusantara.png',
        worldRanking: 'Top 50',
        spiceLevel: 'Ringan',
    },
    {
        name: 'Soto',
        region: 'Nasional',
        category: 'Sup',
        description: 'Sup dengan kuah bening atau kuning yang memiliki lebih dari 70 varian di seluruh Indonesia.',
        image: '/kuliner nusantara.png',
        worldRanking: '-',
        spiceLevel: 'Ringan-Sedang',
    },
    {
        name: 'Gudeg',
        region: 'Yogyakarta',
        category: 'Masakan Utama',
        description: 'Nangka muda yang dimasak dengan santan dan gula merah, menghasilkan rasa manis gurih yang khas.',
        image: '/kuliner nusantara.png',
        worldRanking: '-',
        spiceLevel: 'Ringan',
    },
];

const regionalCuisines = [
    {
        region: 'Sumatra',
        icon: '🌶️',
        characteristic: 'Pedas & Gurih',
        description: 'Masakan Sumatra terkenal dengan penggunaan cabai dan rempah yang melimpah, menghasilkan cita rasa yang kuat dan pedas.',
        signature: 'Rendang, Gulai, Pempek',
    },
    {
        region: 'Jawa',
        icon: '🍚',
        characteristic: 'Manis & Gurih',
        description: 'Masakan Jawa cenderung manis dengan penggunaan gula merah dan kecap manis yang menciptakan harmoni rasa.',
        signature: 'Gudeg, Rawon, Soto',
    },
    {
        region: 'Bali',
        icon: '🔥',
        characteristic: 'Pedas & Rempah',
        description: 'Masakan Bali kaya akan rempah dan bumbu base yang kompleks, menciptakan cita rasa yang kuat dan aromatik.',
        signature: 'Babi Guling, Ayam Betutu, Lawar',
    },
    {
        region: 'Sulawesi',
        icon: '🌊',
        characteristic: 'Seafood & Pedas',
        description: 'Masakan Sulawesi terkenal dengan olahan seafood dan penggunaan cabai rawit yang menciptakan sensasi pedas.',
        signature: 'Coto Makassar, Konro, Pallubasa',
    },
    {
        region: 'Papua',
        icon: '🌿',
        characteristic: 'Natural & Sederhana',
        description: 'Masakan Papua menggunakan bahan-bahan lokal seperti sagu dan ikan dengan pengolahan yang sederhana namun lezat.',
        signature: 'Papeda, Ikan Kuah Kuning',
    },
    {
        region: 'Kalimantan',
        icon: '🦐',
        characteristic: 'Sungai & Hutan',
        description: 'Masakan Kalimantan memanfaatkan hasil sungai dan hutan dengan pengolahan yang unik dan cita rasa khas.',
        signature: 'Soto Banjar, Amplang, Juhu Umbut',
    },
];

const traditionalSpices = [
    {
        name: 'Kunyit',
        use: 'Pewarna & Antioksidan',
        description: 'Rempah kuning yang memberikan warna dan aroma khas pada masakan Indonesia.',
    },
    {
        name: 'Jahe',
        use: 'Hangat & Aromatis',
        description: 'Memberikan sensasi hangat dan aroma khas, sering digunakan dalam masakan dan minuman.',
    },
    {
        name: 'Lengkuas',
        use: 'Aroma & Kesegaran',
        description: 'Memberikan aroma harum dan rasa segar pada berbagai masakan tradisional.',
    },
    {
        name: 'Serai',
        use: 'Aroma Segar',
        description: 'Memberikan aroma sitrus yang segar, sering digunakan dalam sup dan gulai.',
    },
    {
        name: 'Kemiri',
        use: 'Pengental & Gurih',
        description: 'Memberikan tekstur kental dan rasa gurih pada bumbu masakan.',
    },
    {
        name: 'Ketumbar',
        use: 'Aroma & Rasa',
        description: 'Memberikan aroma harum dan rasa yang khas pada berbagai masakan.',
    },
];

const culinaryStats = [
    {
        stat: '5000+',
        label: 'Resep Tradisional',
        description: 'Resep masakan yang tersebar di seluruh nusantara',
    },
    {
        stat: '70+',
        label: 'Varian Soto',
        description: 'Jenis soto yang berbeda di setiap daerah',
    },
    {
        stat: '30+',
        label: 'Jenis Sambal',
        description: 'Sambal khas dari berbagai daerah di Indonesia',
    },
    {
        stat: '100+',
        label: 'Jenis Rempah',
        description: 'Rempah-rempah yang digunakan dalam masakan Indonesia',
    },
];

const snackDesserts = [
    {
        name: 'Onde-Onde',
        type: 'Jajanan',
        description: 'Bola-bola ketan berisi kacang hijau yang dilapisi wijen, dengan isian yang meletus di mulut.',
    },
    {
        name: 'Klepon',
        type: 'Jajanan',
        description: 'Kue ketan hijau berisi gula merah cair yang dibalut kelapa parut.',
    },
    {
        name: 'Lemper',
        type: 'Jajanan',
        description: 'Ketan yang diisi abon atau ayam suwir, dibungkus daun pisang.',
    },
    {
        name: 'Es Cendol',
        type: 'Minuman',
        description: 'Minuman segar dari tepung beras hijau dengan santan dan gula merah.',
    },
    {
        name: 'Martabak',
        type: 'Jajanan',
        description: 'Kue tebal dengan berbagai topping manis atau gurih yang populer di seluruh Indonesia.',
    },
    {
        name: 'Kue Lapis',
        type: 'Kue',
        description: 'Kue berlapis-lapis dengan warna-warni yang cantik dan rasa yang lezat.',
    },
];

export default function KulinerNusantara({ canRegister = true }: { canRegister?: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Head title="Kuliner Nusantara" />
            
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950">
                {/* Background Pattern */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="food-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                                <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                                <path d="M 30,10 L 30,30 M 50,10 L 50,30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                                <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.2"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#food-pattern)" className="text-emerald-800 dark:text-emerald-200"/>
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
                            className="mb-8 inline-flex items-center gap-2 text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Kembali ke Beranda</span>
                        </Link>

                        {/* Hero Content */}
                        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-6 border-emerald-600 bg-gradient-to-r from-emerald-500/20 to-green-500/20 px-4 py-2 text-emerald-900 dark:border-emerald-400 dark:text-emerald-100">
                                <UtensilsCrossed className="mr-2 h-4 w-4" />
                                Kekayaan Nusantara
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100 sm:text-5xl lg:text-6xl">
                                Kuliner{' '}
                                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent">
                                    Nusantara
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-emerald-800/90 dark:text-emerald-200/90">
                                Indonesia adalah surga kuliner dengan lebih dari 5.000 resep tradisional yang tersebar di 34 provinsi. 
                                Dari Rendang yang dinobatkan sebagai makanan terlezat di dunia hingga jajanan pasar yang menggoyang lidah, 
                                setiap hidangan menceritakan sejarah dan kearifan lokal yang kaya akan rempah-rempah.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {culinaryStats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden rounded-2xl border-2 border-emerald-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-emerald-800/50 dark:bg-emerald-950/90"
                                >
                                    <div className="mb-2 text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                                        {stat.stat}
                                    </div>
                                    <div className="mb-2 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                                        {stat.label}
                                    </div>
                                    <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Iconic Foods */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    Makanan Ikonik Indonesia
                                </h2>
                                <p className="mx-auto max-w-2xl text-emerald-800/90 dark:text-emerald-200/90">
                                    Hidangan-hidangan yang telah mengharumkan nama Indonesia di kancah internasional 
                                    dan menjadi kebanggaan kuliner Nusantara.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {iconicFoods.map((food, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-emerald-800/50 dark:bg-emerald-950/90"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={food.image}
                                                alt={food.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                <Badge className="border-0 bg-white/90 text-emerald-900 shadow-lg backdrop-blur-md">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {food.region}
                                                </Badge>
                                                {food.worldRanking.includes('#') && (
                                                    <Badge className="border-0 bg-amber-500 text-white shadow-lg">
                                                        <Award className="mr-1 h-3 w-3" />
                                                        {food.worldRanking}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-3 flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                                                    {food.name}
                                                </h3>
                                                <Badge variant="outline" className="border-emerald-400 text-emerald-700 dark:text-emerald-300">
                                                    {food.category}
                                                </Badge>
                                            </div>
                                            <p className="mb-3 text-sm leading-relaxed text-emerald-800/80 dark:text-emerald-200/80">
                                                {food.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                                                <Flame className="h-3 w-3" />
                                                <span>Level Pedas: {food.spiceLevel}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Regional Cuisines */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    Karakteristik Masakan Daerah
                                </h2>
                                <p className="mx-auto max-w-2xl text-emerald-800/90 dark:text-emerald-200/90">
                                    Setiap wilayah di Indonesia memiliki ciri khas kuliner yang berbeda, 
                                    mencerminkan iklim, budaya, dan sumber daya lokal.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {regionalCuisines.map((cuisine, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-green-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-green-800/50 dark:bg-green-950/90"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-3xl shadow-lg">
                                                {cuisine.icon}
                                            </div>
                                            <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">
                                                {cuisine.characteristic}
                                            </Badge>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-green-900 dark:text-green-100">
                                            Masakan {cuisine.region}
                                        </h3>
                                        <p className="mb-3 text-sm leading-relaxed text-green-800/80 dark:text-green-200/80">
                                            {cuisine.description}
                                        </p>
                                        <div className="rounded-lg bg-green-50 px-3 py-2 dark:bg-green-900/30">
                                            <p className="text-xs font-medium text-green-900 dark:text-green-100">
                                                Signature: <span className="font-normal">{cuisine.signature}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Traditional Spices */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    Rempah-Rempah Nusantara
                                </h2>
                                <p className="mx-auto max-w-2xl text-emerald-800/90 dark:text-emerald-200/90">
                                    Rempah-rempah yang menjadikan Indonesia sebagai "Pulau Rempah" dan 
                                    menjadi incaran dunia sejak berabad-abad lalu.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {traditionalSpices.map((spice, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-white to-amber-50/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-amber-800/50 dark:from-amber-950/90 dark:to-orange-950/50"
                                    >
                                        <h3 className="mb-2 text-xl font-bold text-amber-900 dark:text-amber-100">
                                            {spice.name}
                                        </h3>
                                        <Badge className="mb-3 bg-amber-500/20 text-amber-700 dark:text-amber-300">
                                            {spice.use}
                                        </Badge>
                                        <p className="text-sm leading-relaxed text-amber-800/80 dark:text-amber-200/80">
                                            {spice.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Snacks & Desserts */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    Jajanan & Kue Tradisional
                                </h2>
                                <p className="mx-auto max-w-2xl text-emerald-800/90 dark:text-emerald-200/90">
                                    Jajanan pasar dan kue tradisional Indonesia yang manis, gurih, dan penuh kenangan.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {snackDesserts.map((snack, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden rounded-2xl border-2 border-lime-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-lime-800/50 dark:bg-lime-950/90"
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <h3 className="text-xl font-bold text-lime-900 dark:text-lime-100">
                                                {snack.name}
                                            </h3>
                                            <Badge className="bg-lime-500/20 text-lime-700 dark:text-lime-300">
                                                {snack.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm leading-relaxed text-lime-800/80 dark:text-lime-200/80">
                                            {snack.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quote Section */}
                        <div className="mb-20">
                            <div className="overflow-hidden rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-600 to-green-600 p-8 shadow-2xl lg:p-12">
                                <blockquote className="text-center">
                                    <div className="mb-6 text-6xl">
                                        🍛
                                    </div>
                                    <p className="mb-4 text-2xl font-medium italic text-white md:text-3xl">
                                        "Indonesia adalah surganya rempah-rempah"
                                    </p>
                                    <p className="mx-auto max-w-2xl text-lg text-emerald-50">
                                        Setiap hidangan Indonesia adalah perpaduan sempurna antara rempah, tradisi, dan cinta. 
                                        Mari lestarikan kekayaan kuliner Nusantara untuk generasi mendatang.
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <div className="mx-auto max-w-2xl rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-100 to-green-100 p-8 shadow-2xl dark:from-emerald-900/50 dark:to-green-900/50 lg:p-12">
                                <div className="mb-6 flex justify-center">
                                    <div className="rounded-full bg-emerald-600 p-4">
                                        <UtensilsCrossed className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    Lestarikan Kuliner Nusantara
                                </h2>
                                <p className="mb-8 text-lg text-emerald-800 dark:text-emerald-200">
                                    Mari bersama-sama menjaga resep-resep tradisional dan memperkenalkan kelezatan 
                                    kuliner Indonesia ke seluruh dunia.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/budaya">
                                        <Button
                                            size="lg"
                                            className="bg-emerald-600 text-white shadow-xl transition-all hover:bg-emerald-700"
                                        >
                                            Jelajahi Budaya
                                        </Button>
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-emerald-600 bg-transparent text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300"
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
                <footer className="relative border-t border-emerald-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-emerald-800 dark:bg-emerald-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center">
                        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                            <UtensilsCrossed className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Kuliner Nusantara - Kekayaan Rasa Indonesia
                            </span>
                        </div>
                        <div className="text-sm text-emerald-800/80 dark:text-emerald-200/80">
                            © 2025 Budayaku | Melestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
