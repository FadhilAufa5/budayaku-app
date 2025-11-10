import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Calendar, BarChart3 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori Event', href: '/events/categories' },
];

const categoryData = [
    {
        id: 1,
        name: 'Festival',
        slug: 'festival',
        description: 'Festival budaya berskala besar dengan berbagai pertunjukan',
        count: 12,
        icon: '🎪',
        color: 'bg-red-500',
        trending: true,
    },
    {
        id: 2,
        name: 'Workshop',
        slug: 'workshop',
        description: 'Pelatihan dan workshop pembelajaran budaya',
        count: 24,
        icon: '🎨',
        color: 'bg-blue-500',
        trending: false,
    },
    {
        id: 3,
        name: 'Pameran',
        slug: 'pameran',
        description: 'Pameran seni dan budaya',
        count: 8,
        icon: '🖼️',
        color: 'bg-purple-500',
        trending: false,
    },
    {
        id: 4,
        name: 'Pertunjukan',
        slug: 'pertunjukan',
        description: 'Pertunjukan seni dan budaya tradisional',
        count: 18,
        icon: '🎭',
        color: 'bg-green-500',
        trending: true,
    },
    {
        id: 5,
        name: 'Seminar',
        slug: 'seminar',
        description: 'Seminar dan diskusi tentang kebudayaan',
        count: 6,
        icon: '🎓',
        color: 'bg-yellow-500',
        trending: false,
    },
    {
        id: 6,
        name: 'Kompetisi',
        slug: 'kompetisi',
        description: 'Lomba dan kompetisi budaya',
        count: 15,
        icon: '🏆',
        color: 'bg-orange-500',
        trending: true,
    },
];

export default function EventCategories() {
    const totalEvents = categoryData.reduce((sum, cat) => sum + cat.count, 0);
    const trendingCount = categoryData.filter(c => c.trending).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Event" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kategori Event</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola kategori untuk mengorganisir event budaya
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
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{categoryData.length}</div>
                            <p className="text-muted-foreground text-xs">Kategori aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Event</CardTitle>
                            <BarChart3 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEvents}</div>
                            <p className="text-muted-foreground text-xs">Event terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Trending</CardTitle>
                            <BarChart3 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{trendingCount}</div>
                            <p className="text-muted-foreground text-xs">Kategori populer</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari kategori event..."
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Category Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryData.map((category) => (
                        <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className={`h-2 ${category.color}`} />
                            
                            <CardHeader className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-3xl dark:from-gray-800 dark:to-gray-700">
                                            {category.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-base">{category.name}</CardTitle>
                                                {category.trending && (
                                                    <Badge variant="destructive" className="text-xs">
                                                        🔥 Hot
                                                    </Badge>
                                                )}
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {category.count} event
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
                                        /{category.slug}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Calendar className="h-3 w-3" />
                                        Lihat Event
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
