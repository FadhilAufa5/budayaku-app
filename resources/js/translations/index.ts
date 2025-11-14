import { getLanguage, type Language } from '@/utils/language';

export const translations = {
    id: {
        // Navigation
        home: 'Home',
        culture: 'Budaya',
        event: 'Event',
        shop: 'Toko Lokal',
        about: 'Tentang',
        search: 'Cari...',
        dashboard: 'Dashboard',
        login: 'Masuk',
        register: 'Daftar',
        logout: 'Keluar',
        
        // Welcome Page
        welcomeTitle: 'Jelajahi Kekayaan Budaya Indonesia',
        welcomeSubtitle: 'Temukan keindahan warisan budaya nusantara, dari tradisi hingga kuliner',
        exploreNow: 'Jelajahi Sekarang',
        learnMore: 'Pelajari Lebih Lanjut',
        watchVideo: 'Tonton Video',
        discoverCulture: 'Temukan Budaya',
        upcomingEvents: 'Event Mendatang',
        localProducts: 'Produk Lokal',
        viewAll: 'Lihat Semua',
        readMore: 'Baca Selengkapnya',
        
        // About Page
        aboutUs: 'Tentang Kami',
        ourMission: 'Misi Kami',
        ourVision: 'Visi Kami',
        ourTeam: 'Tim Kami',
        ourValues: 'Nilai-Nilai Kami',
        whyChooseUs: 'Mengapa Memilih Kami',
        getStarted: 'Mulai Sekarang',
        contactUs: 'Hubungi Kami',
        
        // Culture Page
        indonesianCulture: 'Budaya Indonesia',
        exploreRegions: 'Jelajahi Wilayah',
        traditionalArts: 'Seni Tradisional',
        culturalHeritage: 'Warisan Budaya',
        localWisdom: 'Kearifan Lokal',
        
        // Events Page
        culturalEvents: 'Event Budaya',
        festivalCalendar: 'Kalender Festival',
        joinEvent: 'Ikuti Event',
        eventDetails: 'Detail Event',
        eventDate: 'Tanggal',
        eventLocation: 'Lokasi',
        eventPrice: 'Harga',
        freeEntry: 'Gratis',
        registerNow: 'Daftar Sekarang',
        registering: 'Mendaftar...',
        registrationOpen: 'Pendaftaran Dibuka',
        registrationFull: 'Pendaftaran Penuh',
        eventCompleted: 'Event Selesai',
        almostFull: 'Hampir Penuh',
        spotsLeft: 'Kuota Tersisa',
        participants: 'Peserta',
        capacity: 'Kapasitas',
        organizer: 'Penyelenggara',
        contactInfo: 'Informasi Kontak',
        requirements: 'Persyaratan',
        eventSchedule: 'Jadwal Acara',
        aboutEvent: 'Tentang Event',
        relatedEvents: 'Event Serupa',
        searchEvents: 'Cari event...',
        filterEvents: 'Filter Event',
        allEvents: 'Semua Event',
        upcomingEvent: 'Akan Datang',
        ongoingEvent: 'Sedang Berlangsung',
        completedEvent: 'Selesai',
        eventsFound: 'event ditemukan',
        noEventsFound: 'Event Tidak Ditemukan',
        backToEvents: 'Kembali ke Daftar Event',
        
        // Products/Store
        featuredProducts: 'Produk Unggulan',
        handicrafts: 'Kerajinan Tangan',
        traditionalClothing: 'Pakaian Tradisional',
        addToCart: 'Tambah ke Keranjang',
        buyNow: 'Beli Sekarang',
        outOfStock: 'Stok Habis',
        
        // Common
        loading: 'Memuat...',
        error: 'Terjadi kesalahan',
        success: 'Berhasil',
        cancel: 'Batal',
        save: 'Simpan',
        delete: 'Hapus',
        edit: 'Edit',
        close: 'Tutup',
        back: 'Kembali',
        next: 'Selanjutnya',
        previous: 'Sebelumnya',
        submit: 'Kirim',
        
        // Search
        searchPlaceholder: 'Cari budaya, event, produk...',
        searchResults: 'Hasil Pencarian',
        noResults: 'Tidak ada hasil ditemukan',
        searchComingSoon: 'Fitur pencarian akan segera hadir',
        searching: 'Mencari',
        
        // Footer
        followUs: 'Ikuti Kami',
        copyright: 'Hak Cipta',
        allRightsReserved: 'Semua Hak Dilindungi',
        privacyPolicy: 'Kebijakan Privasi',
        termsOfService: 'Syarat Layanan',
        
        // Stats
        cultures: 'Budaya',
        events: 'Event',
        products: 'Produk',
        users: 'Pengguna',
        visitors: 'Pengunjung',
        
        // Categories
        categories: 'Kategori',
        allCategories: 'Semua Kategori',
        music: 'Musik',
        dance: 'Tari',
        art: 'Seni',
        culinary: 'Kuliner',
        traditional: 'Tradisional',
        modern: 'Modern',
    },
    en: {
        // Navigation
        home: 'Home',
        culture: 'Culture',
        event: 'Event',
        shop: 'Local Shop',
        about: 'About',
        search: 'Search...',
        dashboard: 'Dashboard',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        
        // Welcome Page
        welcomeTitle: 'Explore Indonesian Cultural Richness',
        welcomeSubtitle: 'Discover the beauty of archipelago cultural heritage, from traditions to culinary',
        exploreNow: 'Explore Now',
        learnMore: 'Learn More',
        watchVideo: 'Watch Video',
        discoverCulture: 'Discover Culture',
        upcomingEvents: 'Upcoming Events',
        localProducts: 'Local Products',
        viewAll: 'View All',
        readMore: 'Read More',
        
        // About Page
        aboutUs: 'About Us',
        ourMission: 'Our Mission',
        ourVision: 'Our Vision',
        ourTeam: 'Our Team',
        ourValues: 'Our Values',
        whyChooseUs: 'Why Choose Us',
        getStarted: 'Get Started',
        contactUs: 'Contact Us',
        
        // Culture Page
        indonesianCulture: 'Indonesian Culture',
        exploreRegions: 'Explore Regions',
        traditionalArts: 'Traditional Arts',
        culturalHeritage: 'Cultural Heritage',
        localWisdom: 'Local Wisdom',
        
        // Events Page
        culturalEvents: 'Cultural Events',
        festivalCalendar: 'Festival Calendar',
        joinEvent: 'Join Event',
        eventDetails: 'Event Details',
        eventDate: 'Date',
        eventLocation: 'Location',
        eventPrice: 'Price',
        freeEntry: 'Free',
        registerNow: 'Register Now',
        registering: 'Registering...',
        registrationOpen: 'Registration Open',
        registrationFull: 'Registration Full',
        eventCompleted: 'Event Completed',
        almostFull: 'Almost Full',
        spotsLeft: 'Spots Left',
        participants: 'Participants',
        capacity: 'Capacity',
        organizer: 'Organizer',
        contactInfo: 'Contact Information',
        requirements: 'Requirements',
        eventSchedule: 'Event Schedule',
        aboutEvent: 'About Event',
        relatedEvents: 'Related Events',
        searchEvents: 'Search events...',
        filterEvents: 'Filter Events',
        allEvents: 'All Events',
        upcomingEvent: 'Upcoming',
        ongoingEvent: 'Ongoing',
        completedEvent: 'Completed',
        eventsFound: 'events found',
        noEventsFound: 'No Events Found',
        backToEvents: 'Back to Events',
        
        // Products/Store
        featuredProducts: 'Featured Products',
        handicrafts: 'Handicrafts',
        traditionalClothing: 'Traditional Clothing',
        addToCart: 'Add to Cart',
        buyNow: 'Buy Now',
        outOfStock: 'Out of Stock',
        
        // Common
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        
        // Search
        searchPlaceholder: 'Search culture, events, products...',
        searchResults: 'Search Results',
        noResults: 'No results found',
        searchComingSoon: 'Search feature coming soon',
        searching: 'Searching',
        
        // Footer
        followUs: 'Follow Us',
        copyright: 'Copyright',
        allRightsReserved: 'All Rights Reserved',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        
        // Stats
        cultures: 'Cultures',
        events: 'Events',
        products: 'Products',
        users: 'Users',
        visitors: 'Visitors',
        
        // Categories
        categories: 'Categories',
        allCategories: 'All Categories',
        music: 'Music',
        dance: 'Dance',
        art: 'Art',
        culinary: 'Culinary',
        traditional: 'Traditional',
        modern: 'Modern',
    },
};

export type TranslationKey = keyof typeof translations.id;

export const t = (key: TranslationKey): string => {
    const lang = getLanguage();
    return translations[lang][key] || translations.id[key] || key;
};

export const useTranslation = () => {
    const lang = getLanguage();
    return {
        t: (key: TranslationKey) => translations[lang][key] || translations.id[key] || key,
        lang,
    };
};
