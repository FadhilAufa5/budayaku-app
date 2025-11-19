import { Head, Link } from '@inertiajs/react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Languages, Home, ArrowLeft, Globe2, Users, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const regionalLanguages = [
    {
        name: 'Bahasa Jawa',
        speakers: '84 juta',
        region: 'Jawa Tengah & Jawa Timur',
        script: 'Aksara Jawa (Hanacaraka)',
        description: 'Bahasa dengan penutur terbanyak kedua di Indonesia setelah Bahasa Indonesia, memiliki tingkat tutur yang kompleks (ngoko, madya, krama).',
    },
    {
        name: 'Bahasa Sunda',
        speakers: '42 juta',
        region: 'Jawa Barat & Banten',
        script: 'Aksara Sunda',
        description: 'Bahasa yang halus dan sopan dengan sistem tingkat tutur yang mencerminkan budaya kesantunan masyarakat Sunda.',
    },
    {
        name: 'Bahasa Batak',
        speakers: '8,5 juta',
        region: 'Sumatra Utara',
        script: 'Aksara Batak',
        description: 'Sekelompok bahasa dengan variasi dialek yang kaya, mencerminkan keberagaman suku Batak di Sumatra Utara.',
    },
    {
        name: 'Bahasa Bali',
        speakers: '3,3 juta',
        region: 'Bali',
        script: 'Aksara Bali',
        description: 'Bahasa yang kaya akan istilah religius dan budaya, masih aktif digunakan dalam upacara adat dan kehidupan sehari-hari.',
    },
    {
        name: 'Bahasa Minangkabau',
        speakers: '5,5 juta',
        region: 'Sumatra Barat',
        script: 'Aksara Latin',
        description: 'Bahasa yang erat dengan budaya matrilineal Minangkabau, kaya akan pepatah-petitih dan ungkapan tradisional.',
    },
    {
        name: 'Bahasa Bugis',
        speakers: '5 juta',
        region: 'Sulawesi Selatan',
        script: 'Aksara Lontara',
        description: 'Bahasa maritim yang mencerminkan sejarah pelayaran dan perdagangan masyarakat Bugis di Nusantara.',
    },
];

const ancientScripts = [
    {
        name: 'Aksara Jawa',
        icon: 'ꦲꦏ꧀ꦱꦫ',
        origin: 'Abad ke-8',
        description: 'Aksara turunan dari Pallava yang masih dipelajari dan digunakan di Jawa Tengah dan Yogyakarta.',
    },
    {
        name: 'Aksara Bali',
        icon: 'ᬅᬓ᭄ᬱᬭ',
        origin: 'Abad ke-8',
        description: 'Aksara yang masih aktif digunakan untuk keperluan religius dan pembelajaran di Bali.',
    },
    {
        name: 'Aksara Sunda',
        icon: 'ᮃᮊ᮪ᮞᮛ',
        origin: 'Abad ke-14',
        description: 'Aksara kuno Sunda yang kini mengalami revitalisasi dalam pendidikan dan teknologi.',
    },
    {
        name: 'Aksara Batak',
        icon: 'ᯀᯂ᯲ᯘᯒ',
        origin: 'Abad ke-13',
        description: 'Aksara yang digunakan untuk menulis naskah-naskah pustaha (buku tradisional Batak).',
    },
    {
        name: 'Aksara Lontara',
        icon: 'ᨒᨚᨈᨑ',
        origin: 'Abad ke-14',
        description: 'Aksara Bugis-Makassar yang digunakan untuk menulis naskah-naskah kuno di Sulawesi Selatan.',
    },
    {
        name: 'Aksara Rejang',
        icon: 'ꤰꥁꤽꥍ',
        origin: 'Abad ke-13',
        description: 'Aksara dari Bengkulu yang masih digunakan oleh masyarakat Rejang untuk upacara adat.',
    },
];

const literaryWorks = [
    {
        title: 'Kakawin Ramayana',
        period: 'Abad ke-9',
        type: 'Epik',
        description: 'Adaptasi kisah Ramayana dalam bahasa Jawa Kuna dengan gaya kakawin, menandai puncak sastra klasik Jawa.',
    },
    {
        title: 'Sutasoma',
        period: 'Abad ke-14',
        type: 'Epik',
        description: 'Karya Mpu Tantular yang mengandung semboyan Bhinneka Tunggal Ika, dasar filosofi keberagaman Indonesia.',
    },
    {
        title: 'Serat Centhini',
        period: 'Abad ke-19',
        type: 'Ensiklopedia',
        description: 'Ensiklopedia budaya Jawa dalam bentuk tembang yang mencakup berbagai aspek kehidupan masyarakat Jawa.',
    },
    {
        title: 'Hikayat Hang Tuah',
        period: 'Abad ke-17',
        type: 'Hikayat',
        description: 'Karya sastra Melayu klasik yang menceritakan kisah pahlawan legendaris Kesultanan Malaka.',
    },
    {
        title: 'I La Galigo',
        period: 'Abad ke-13-14',
        type: 'Epik',
        description: 'Epik terpanjang di dunia dengan 300.000 baris, menceritakan mitologi dan sejarah masyarakat Bugis.',
    },
    {
        title: 'Babad Tanah Jawi',
        period: 'Abad ke-18',
        type: 'Sejarah',
        description: 'Kronik sejarah kerajaan-kerajaan di Jawa yang ditulis dalam bentuk tembang macapat.',
    },
];

const languageFacts = [
    {
        stat: '700+',
        label: 'Bahasa Daerah',
        description: 'Indonesia memiliki lebih dari 700 bahasa daerah yang masih aktif digunakan',
    },
    {
        stat: '280M+',
        label: 'Penutur Bahasa Indonesia',
        description: 'Bahasa Indonesia digunakan oleh lebih dari 280 juta orang di seluruh nusantara',
    },
    {
        stat: '13',
        label: 'Aksara Tradisional',
        description: 'Terdapat 13 aksara tradisional yang tercatat dalam sistem penulisan Nusantara',
    },
    {
        stat: '1.300+',
        label: 'Suku Bangsa',
        description: 'Setiap suku memiliki bahasa atau dialek unik yang memperkaya khazanah linguistik',
    },
];

export default function BahasaSastra({ canRegister = true }: { canRegister?: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Head title="Bahasa & Sastra Indonesia" />
            
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
                {/* Background Pattern */}
                <div className="fixed inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="text-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <text x="10" y="30" fill="currentColor" fontSize="40" opacity="0.3" fontFamily="serif">ꦲ</text>
                                <text x="50" y="70" fill="currentColor" fontSize="40" opacity="0.3" fontFamily="serif">ᬅ</text>
                                <circle cx="30" cy="70" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#text-pattern)" className="text-blue-800 dark:text-blue-200"/>
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
                            className="mb-8 inline-flex items-center gap-2 text-blue-700 transition-colors hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Kembali ke Beranda</span>
                        </Link>

                        {/* Hero Content */}
                        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Badge className="mb-6 border-blue-600 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2 text-blue-900 dark:border-blue-400 dark:text-blue-100">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Kekayaan Nusantara
                            </Badge>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-blue-900 dark:text-blue-100 sm:text-5xl lg:text-6xl">
                                Bahasa & Sastra{' '}
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Indonesia
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-blue-800/90 dark:text-blue-200/90">
                                Dengan lebih dari 700 bahasa daerah dan 13 aksara tradisional, Indonesia adalah salah satu negara 
                                dengan keberagaman linguistik tertinggi di dunia. Setiap bahasa membawa warisan budaya, filosofi, 
                                dan kearifan lokal yang unik dari masyarakat penuturnya.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {languageFacts.map((fact, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden rounded-2xl border-2 border-blue-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-blue-800/50 dark:bg-blue-950/90"
                                >
                                    <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                                        {fact.stat}
                                    </div>
                                    <div className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
                                        {fact.label}
                                    </div>
                                    <p className="text-sm text-blue-800/80 dark:text-blue-200/80">
                                        {fact.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Regional Languages */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-blue-900 dark:text-blue-100">
                                    Bahasa Daerah Utama
                                </h2>
                                <p className="mx-auto max-w-2xl text-blue-800/90 dark:text-blue-200/90">
                                    Bahasa-bahasa daerah dengan jumlah penutur terbanyak yang masih aktif digunakan 
                                    dalam kehidupan sehari-hari dan upacara adat.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {regionalLanguages.map((lang, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-blue-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-blue-800/50 dark:bg-blue-950/90"
                                    >
                                        <div className="mb-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                                                    {lang.name}
                                                </h3>
                                                <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                                                    <Users className="mr-1 h-3 w-3" />
                                                    {lang.speakers}
                                                </Badge>
                                            </div>
                                            <div className="mb-2 flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                                                <Globe2 className="h-4 w-4" />
                                                <span>{lang.region}</span>
                                            </div>
                                            <div className="mb-3 rounded-lg bg-blue-50 px-3 py-2 text-center text-sm font-medium text-blue-900 dark:bg-blue-900/30 dark:text-blue-100">
                                                {lang.script}
                                            </div>
                                        </div>
                                        <p className="text-sm leading-relaxed text-blue-800/80 dark:text-blue-200/80">
                                            {lang.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ancient Scripts */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-blue-900 dark:text-blue-100">
                                    Aksara Tradisional Nusantara
                                </h2>
                                <p className="mx-auto max-w-2xl text-blue-800/90 dark:text-blue-200/90">
                                    Aksara-aksara kuno yang telah digunakan selama berabad-abad untuk menulis naskah-naskah 
                                    penting dan melestarikan pengetahuan leluhur.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {ancientScripts.map((script, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-indigo-200/50 bg-gradient-to-br from-white to-indigo-50/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-800/50 dark:from-indigo-950/90 dark:to-purple-950/50"
                                    >
                                        <div className="mb-4 text-center">
                                            <div className="mb-3 text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                                                {script.icon}
                                            </div>
                                            <h3 className="mb-1 text-xl font-bold text-indigo-900 dark:text-indigo-100">
                                                {script.name}
                                            </h3>
                                            <Badge variant="outline" className="border-indigo-400 text-indigo-700 dark:text-indigo-300">
                                                {script.origin}
                                            </Badge>
                                        </div>
                                        <p className="text-center text-sm leading-relaxed text-indigo-800/80 dark:text-indigo-200/80">
                                            {script.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Literary Works */}
                        <div className="mb-20">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-blue-900 dark:text-blue-100">
                                    Karya Sastra Klasik
                                </h2>
                                <p className="mx-auto max-w-2xl text-blue-800/90 dark:text-blue-200/90">
                                    Karya-karya sastra klasik Nusantara yang menjadi warisan intelektual dan budaya bangsa Indonesia.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {literaryWorks.map((work, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-2xl border-2 border-purple-200/50 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-purple-800/50 dark:bg-purple-950/90"
                                    >
                                        <div className="mb-4">
                                            <Badge className="mb-3 bg-purple-500/20 text-purple-700 dark:text-purple-300">
                                                {work.type}
                                            </Badge>
                                            <h3 className="mb-2 text-xl font-bold text-purple-900 dark:text-purple-100">
                                                {work.title}
                                            </h3>
                                            <div className="text-sm text-purple-700 dark:text-purple-300">
                                                {work.period}
                                            </div>
                                        </div>
                                        <p className="text-sm leading-relaxed text-purple-800/80 dark:text-purple-200/80">
                                            {work.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quote Section */}
                        <div className="mb-20">
                            <div className="overflow-hidden rounded-3xl border-2 border-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-2xl lg:p-12">
                                <blockquote className="text-center">
                                    <div className="mb-6 text-6xl text-blue-200">
                                        ꦲꦏ꧀ꦱꦫ
                                    </div>
                                    <p className="mb-4 text-2xl font-medium italic text-white md:text-3xl">
                                        "Bahasa menunjukkan bangsa"
                                    </p>
                                    <p className="mx-auto max-w-2xl text-lg text-blue-50">
                                        Setiap bahasa daerah di Indonesia adalah jendela menuju kearifan lokal, sejarah, 
                                        dan identitas budaya yang harus kita lestarikan untuk generasi mendatang.
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center">
                            <div className="mx-auto max-w-2xl rounded-3xl border-2 border-blue-300 bg-gradient-to-br from-blue-100 to-indigo-100 p-8 shadow-2xl dark:from-blue-900/50 dark:to-indigo-900/50 lg:p-12">
                                <div className="mb-6 flex justify-center">
                                    <div className="rounded-full bg-blue-600 p-4">
                                        <Languages className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-blue-900 dark:text-blue-100">
                                    Lestarikan Bahasa Daerah
                                </h2>
                                <p className="mb-8 text-lg text-blue-800 dark:text-blue-200">
                                    Mari bersama-sama menjaga dan menggunakan bahasa daerah kita agar tidak punah 
                                    dan tetap menjadi warisan budaya yang hidup.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/budaya">
                                        <Button
                                            size="lg"
                                            className="bg-blue-600 text-white shadow-xl transition-all hover:bg-blue-700"
                                        >
                                            Jelajahi Budaya
                                        </Button>
                                    </Link>
                                    <Link href="/">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-blue-600 bg-transparent text-blue-700 hover:bg-blue-50 dark:text-blue-300"
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
                <footer className="relative border-t border-blue-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center">
                        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <Languages className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Bahasa & Sastra Indonesia - Warisan Linguistik Nusantara
                            </span>
                        </div>
                        <div className="text-sm text-blue-800/80 dark:text-blue-200/80">
                            © 2025 Budayaku | Melestarikan Budaya Indonesia
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
