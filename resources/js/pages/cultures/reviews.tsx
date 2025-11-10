import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search, Star, ThumbsUp, MessageSquare, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Review Budaya', href: '/events/culture-reviews' },
];

const reviewData = [
    {
        id: 1,
        userName: 'Budi Santoso',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
        cultureName: 'Tari Kecak',
        rating: 5,
        comment: 'Pertunjukan yang sangat memukau! Sinkronisasi penarinya luar biasa dan cerita Ramayana-nya sangat menarik.',
        date: '2024-01-15',
        status: 'approved',
        likes: 24,
        helpful: 18,
    },
    {
        id: 2,
        userName: 'Siti Nurhaliza',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
        cultureName: 'Batik Tulis',
        rating: 5,
        comment: 'Batik tulisnya detail sekali. Proses pembuatannya memang memerlukan kesabaran tinggi tapi hasilnya sangat cantik.',
        date: '2024-01-14',
        status: 'approved',
        likes: 31,
        helpful: 27,
    },
    {
        id: 3,
        userName: 'Ahmad Yani',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
        cultureName: 'Wayang Kulit',
        rating: 4,
        comment: 'Cerita yang disampaikan dalang sangat menarik, tapi suaranya kurang keras di bagian belakang.',
        date: '2024-01-14',
        status: 'pending',
        likes: 12,
        helpful: 8,
    },
    {
        id: 4,
        userName: 'Dewi Lestari',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi',
        cultureName: 'Angklung',
        rating: 5,
        comment: 'Suaranya merdu dan harmonis. Senang bisa ikut workshop bermain angklung!',
        date: '2024-01-13',
        status: 'approved',
        likes: 19,
        helpful: 15,
    },
    {
        id: 5,
        userName: 'Rudi Hermawan',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi',
        cultureName: 'Reog Ponorogo',
        rating: 3,
        comment: 'Performanya kurang energik dibanding yang pernah saya lihat sebelumnya.',
        date: '2024-01-12',
        status: 'rejected',
        likes: 5,
        helpful: 3,
    },
];

export default function CultureReviews() {
    const approvedCount = reviewData.filter(r => r.status === 'approved').length;
    const pendingCount = reviewData.filter(r => r.status === 'pending').length;
    const rejectedCount = reviewData.filter(r => r.status === 'rejected').length;
    const avgRating = (reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length).toFixed(1);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3" /> Disetujui</Badge>;
            case 'pending':
                return <Badge variant="outline"><Clock className="h-3 w-3" /> Pending</Badge>;
            case 'rejected':
                return <Badge variant="destructive"><XCircle className="h-3 w-3" /> Ditolak</Badge>;
            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Review Budaya" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Review Budaya</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola review dan feedback dari pengunjung
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Review</CardTitle>
                            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{reviewData.length}</div>
                            <p className="text-muted-foreground text-xs">Semua review</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{approvedCount}</div>
                            <p className="text-muted-foreground text-xs">Review aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingCount}</div>
                            <p className="text-muted-foreground text-xs">Perlu direview</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata Rating</CardTitle>
                            <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{avgRating}</div>
                            <p className="text-muted-foreground text-xs">Dari 5.0</p>
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
                                    placeholder="Cari review berdasarkan nama budaya atau reviewer..."
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">Semua</Button>
                                <Button variant="outline">Pending</Button>
                                <Button variant="outline">Disetujui</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviewData.map((review) => (
                        <Card key={review.id} className="overflow-hidden transition-all hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-12 w-12">
                                            <img src={review.userAvatar} alt={review.userName} />
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-base">{review.userName}</CardTitle>
                                                {getStatusBadge(review.status)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < review.rating
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-muted-foreground text-sm">•</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {review.cultureName}
                                                </Badge>
                                                <span className="text-muted-foreground text-sm">•</span>
                                                <span className="text-muted-foreground text-xs">{review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <p className="text-sm leading-relaxed">{review.comment}</p>
                                
                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-4 w-4" />
                                            {review.likes} suka
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CheckCircle className="h-4 w-4" />
                                            {review.helpful} terbantu
                                        </div>
                                    </div>

                                    {review.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="text-green-600">
                                                <CheckCircle className="h-3 w-3" />
                                                Setujui
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-red-600">
                                                <XCircle className="h-3 w-3" />
                                                Tolak
                                            </Button>
                                        </div>
                                    )}

                                    {review.status !== 'pending' && (
                                        <Button size="sm" variant="outline">
                                            <Eye className="h-3 w-3" />
                                            Detail
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
