import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, FolderOpen, Image } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori Budaya', href: '/events/culture-categories' },
];

const categoryData = [
    {
        id: 1,
        name: 'Tarian Tradisional',
        slug: 'tarian-tradisional',
        description: 'Berbagai jenis tarian tradisional dari seluruh Indonesia',
        count: 45,
        icon: '💃',
        color: 'bg-pink-500',
    },
    {
        id: 2,
        name: 'Kerajinan',
        slug: 'kerajinan',
        description: 'Kerajinan tangan dan seni kriya tradisional',
        count: 67,
        icon: '🎨',
        color: 'bg-purple-500',
    },
    {
        id: 3,
        name: 'Seni Pertunjukan',
        slug: 'seni-pertunjukan',
        description: 'Pertunjukan seni tradisional seperti wayang, teater, dll',
        count: 34,
        icon: '🎭',
        color: 'bg-blue-500',
    },
    {
        id: 4,
        name: 'Alat Musik',
        slug: 'alat-musik',
        description: 'Instrumen musik tradisional Indonesia',
        count: 28,
        icon: '🎵',
        color: 'bg-green-500',
    },
    {
        id: 5,
        name: 'Kuliner',
        slug: 'kuliner',
        description: 'Makanan dan minuman tradisional khas daerah',
        count: 89,
        icon: '🍜',
        color: 'bg-orange-500',
    },
    {
        id: 6,
        name: 'Pakaian Adat',
        slug: 'pakaian-adat',
        description: 'Busana tradisional dari berbagai suku',
        count: 52,
        icon: '👘',
        color: 'bg-red-500',
    },
    {
        id: 7,
        name: 'Arsitektur',
        slug: 'arsitektur',
        description: 'Bangunan dan rumah adat tradisional',
        count: 23,
        icon: '🏛️',
        color: 'bg-yellow-500',
    },
    {
        id: 8,
        name: 'Upacara Adat',
        slug: 'upacara-adat',
        description: 'Ritual dan upacara tradisional',
        count: 41,
        icon: '🕯️',
        color: 'bg-indigo-500',
    },
];

export default function CultureCategories() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Budaya" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kategori Budaya</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola kategori untuk mengorganisir budaya Indonesia
                        </p>
                    </div>
                    <Button className="w-fit">
                        <Plus className="h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
                            <FolderOpen className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{categoryData.length}</div>
                            <p className="text-muted-foreground text-xs">Kategori aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budaya</CardTitle>
                            <Image className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {categoryData.reduce((sum, cat) => sum + cat.count, 0)}
                            </div>
                            <p className="text-muted-foreground text-xs">Dalam semua kategori</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata</CardTitle>
                            <FolderOpen className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round(categoryData.reduce((sum, cat) => sum + cat.count, 0) / categoryData.length)}
                            </div>
                            <p className="text-muted-foreground text-xs">Budaya per kategori</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari kategori..."
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Category Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryData.map((category) => (
                        <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className={`h-2 ${category.color}`} />
                            
                            <CardHeader className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-2xl dark:from-gray-800 dark:to-gray-700">
                                            {category.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{category.name}</CardTitle>
                                            <Badge variant="outline" className="mt-1 text-xs">
                                                {category.count} budaya
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                
                                <CardDescription className="line-clamp-2">
                                    {category.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                    <span className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                        {category.slug}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <FolderOpen className="h-3 w-3" />
                                        Lihat
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
