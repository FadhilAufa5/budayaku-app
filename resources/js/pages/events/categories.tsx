import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Calendar, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { EventCategoryDialog } from '@/components/events/event-category-dialog';
import { DeleteEventCategoryDialog } from '@/components/events/delete-event-category-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori Event', href: '/events/categories' },
];

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    trending: boolean;
    count: number;
}

interface Stats {
    total: number;
    totalEvents: number;
    trending: number;
}

interface CategoriesProps {
    categories: {
        data: Category[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    stats: Stats;
    filters: {
        search?: string;
    };
}

export default function EventCategories({ categories, stats, filters }: CategoriesProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/events/categories', { search: searchQuery }, { preserveState: true });
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteDialogOpen(true);
    };

    const handleAddNew = () => {
        setSelectedCategory(null);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedCategory(null);
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
        setSelectedCategory(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Event" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kategori Event</h1>
                        <p className="text-muted-foreground mt-1">Kelola kategori untuk mengorganisir event budaya</p>
                    </div>
                    <Button className="w-fit" onClick={handleAddNew}>
                        <Plus className="h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-muted-foreground text-xs">Kategori aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Event</CardTitle>
                            <BarChart3 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalEvents}</div>
                            <p className="text-muted-foreground text-xs">Event terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Trending</CardTitle>
                            <BarChart3 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.trending}</div>
                            <p className="text-muted-foreground text-xs">Kategori populer</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari kategori event..."
                                    className="pl-10"
                                />
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {categories.data.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {categories.data.map((category) => (
                            <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-lg">
                                <div className={`h-2 ${category.color || 'bg-gray-500'}`} />
                                
                                <CardHeader className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-3xl dark:from-gray-800 dark:to-gray-700">
                                                {category.icon || '📁'}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <CardTitle className="text-base">{category.name}</CardTitle>
                                                    {category.trending && (
                                                        <Badge variant="destructive" className="text-xs">🔥 Hot</Badge>
                                                    )}
                                                </div>
                                                <Badge variant="outline" className="text-xs">{category.count} event</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <CardDescription className="line-clamp-2">
                                        {category.description || 'Tidak ada deskripsi'}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                        <span className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                            /{category.slug}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1" onClick={() => router.get('/events/list', { category: category.id })}>
                                            <Calendar className="h-3 w-3" />
                                            Lihat Event
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(category)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground text-lg">Tidak ada kategori ditemukan</p>
                            <Button className="mt-4" onClick={handleAddNew}>
                                <Plus className="h-4 w-4" />
                                Tambah Kategori Pertama
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            <EventCategoryDialog
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
                category={selectedCategory}
            />

            <DeleteEventCategoryDialog
                open={isDeleteDialogOpen}
                onOpenChange={handleDeleteDialogClose}
                category={selectedCategory}
            />
        </AppLayout>
    );
}
