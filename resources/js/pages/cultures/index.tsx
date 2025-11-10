import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Eye, Edit, Trash2, MapPin, Calendar, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Budaya', href: '/events/cultures' },
];

const cultureData = [
    {
        id: 1,
        name: 'Tari Kecak',
        category: 'Tarian',
        region: 'Bali',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1555400038-63f526b1c3b8?w=400',
        description: 'Tarian tradisional Bali yang menggambarkan kisah Ramayana',
        lastUpdated: '2024-01-15',
        views: 1234,
    },
    {
        id: 2,
        name: 'Batik',
        category: 'Kerajinan',
        region: 'Jawa Tengah',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
        description: 'Kain bergambar yang pembuatannya secara khusus dengan menuliskan atau menerakan malam',
        lastUpdated: '2024-01-14',
        views: 2456,
    },
    {
        id: 3,
        name: 'Wayang Kulit',
        category: 'Seni Pertunjukan',
        region: 'Jawa',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: 'Seni pertunjukan boneka kulit yang dimainkan oleh dalang',
        lastUpdated: '2024-01-13',
        views: 987,
    },
    {
        id: 4,
        name: 'Angklung',
        category: 'Alat Musik',
        region: 'Jawa Barat',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400',
        description: 'Alat musik multitonal (bernada ganda) yang secara tradisional berkembang',
        lastUpdated: '2024-01-12',
        views: 1567,
    },
];

export default function CulturesIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Budaya" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Daftar Budaya</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola dan eksplorasi kekayaan budaya Indonesia
                        </p>
                    </div>
                    <Button className="w-fit">
                        <Plus className="h-4 w-4" />
                        Tambah Budaya
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budaya</CardTitle>
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-muted-foreground text-xs">Dari berbagai daerah</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kategori</CardTitle>
                            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-muted-foreground text-xs">Beragam kategori</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6,244</div>
                            <p className="text-muted-foreground text-xs">Total kunjungan</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aktif</CardTitle>
                            <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-muted-foreground text-xs">Budaya aktif</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    placeholder="Cari budaya berdasarkan nama, daerah, atau kategori..."
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline">Filter</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Culture Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cultureData.map((culture) => (
                        <Card key={culture.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={culture.image}
                                    alt={culture.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                        {culture.category}
                                    </Badge>
                                </div>
                            </div>
                            
                            <CardHeader className="space-y-2">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">{culture.name}</CardTitle>
                                    <Badge 
                                        variant={culture.status === 'active' ? 'default' : 'outline'}
                                        className="text-xs"
                                    >
                                        {culture.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {culture.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {culture.region}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        {culture.views}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="h-3 w-3" />
                                        Detail
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
