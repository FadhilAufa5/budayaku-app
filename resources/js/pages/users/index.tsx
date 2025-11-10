import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Mail, Shield, Users, UserCheck, UserX, Calendar } from 'lucide-react';
import { UserDialog } from '@/components/users/user-dialog';
import { DeleteUserDialog } from '@/components/users/delete-user-dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'User List', href: '/users' },
];

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: string;
    joinDate: string;
    lastActive: string;
}

interface Props {
    users: {
        data: User[];
        links: any;
        meta: any;
    };
    roles: string[];
    filters: {
        search?: string;
        role?: string;
    };
}

const sampleUserData = [
    {
        id: 1,
        name: 'Admin Budaya',
        email: 'admin@budayaku.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        role: 'admin',
        status: 'active',
        joinDate: '2023-01-15',
        lastActive: '2 menit yang lalu',
    },
    {
        id: 2,
        name: 'Budi Santoso',
        email: 'budi@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
        role: 'manager',
        status: 'active',
        joinDate: '2023-03-20',
        lastActive: '1 jam yang lalu',
    },
    {
        id: 3,
        name: 'Siti Nurhaliza',
        email: 'siti@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
        role: 'editor',
        status: 'active',
        joinDate: '2023-05-12',
        lastActive: '5 jam yang lalu',
    },
    {
        id: 4,
        name: 'Ahmad Yani',
        email: 'ahmad@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
        role: 'editor',
        status: 'active',
        joinDate: '2023-07-08',
        lastActive: '1 hari yang lalu',
    },
    {
        id: 5,
        name: 'Dewi Lestari',
        email: 'dewi@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi',
        role: 'user',
        status: 'active',
        joinDate: '2023-09-25',
        lastActive: '2 hari yang lalu',
    },
    {
        id: 6,
        name: 'Rudi Hermawan',
        email: 'rudi@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi',
        role: 'user',
        status: 'inactive',
        joinDate: '2023-11-10',
        lastActive: '2 minggu yang lalu',
    },
];

export default function UsersIndex({ users, roles, filters }: Props) {
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const userData = users?.data || sampleUserData;
    const totalUsers = users?.meta?.total || userData.length;
    const activeUsers = userData.filter(u => u.status === 'active').length;
    const adminCount = userData.filter(u => u.role === 'admin').length;
    const managerCount = userData.filter(u => u.role === 'manager').length;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', { search: searchQuery }, { preserveState: true });
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setUserDialogOpen(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setUserDialogOpen(true);
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
                return <Badge className="bg-red-500">Admin</Badge>;
            case 'manager':
                return <Badge className="bg-blue-500">Manager</Badge>;
            case 'editor':
                return <Badge className="bg-purple-500">Editor</Badge>;
            case 'user':
                return <Badge variant="outline">User</Badge>;
            default:
                return null;
        }
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge className="bg-green-500">
                <UserCheck className="h-3 w-3" /> Aktif
            </Badge>
        ) : (
            <Badge variant="outline">
                <UserX className="h-3 w-3" /> Nonaktif
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kelola Pengguna</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola akun pengguna dan akses sistem
                        </p>
                    </div>
                    <Button className="w-fit" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Tambah Pengguna
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalUsers}</div>
                            <p className="text-muted-foreground text-xs">Pengguna terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aktif</CardTitle>
                            <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activeUsers}</div>
                            <p className="text-muted-foreground text-xs">Pengguna aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Administrator</CardTitle>
                            <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{adminCount}</div>
                            <p className="text-muted-foreground text-xs">Admin aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Manager</CardTitle>
                            <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{managerCount}</div>
                            <p className="text-muted-foreground text-xs">Manager aktif</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari pengguna berdasarkan nama atau email..."
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" variant="outline">Search</Button>
                                {searchQuery && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery('');
                                            router.get('/users');
                                        }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Users List */}
                <div className="grid gap-4 md:grid-cols-2">
                    {userData.map((user) => (
                        <Card key={user.id} className="overflow-hidden transition-all hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14">
                                            <img src={user.avatar} alt={user.name} />
                                        </Avatar>
                                        <div className="space-y-1">
                                            <CardTitle className="text-base">{user.name}</CardTitle>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    {getRoleBadge(user.role)}
                                    {getStatusBadge(user.status)}
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Bergabung</span>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span className="font-medium">{user.joinDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Terakhir aktif</span>
                                        <span className="font-medium">{user.lastActive}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 border-t pt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <Edit className="h-3 w-3" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(user)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Dialogs */}
                <UserDialog
                    open={userDialogOpen}
                    onOpenChange={setUserDialogOpen}
                    user={selectedUser}
                    roles={roles || ['admin', 'manager', 'editor', 'user']}
                />

                <DeleteUserDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    user={selectedUser}
                />
            </div>
        </AppLayout>
    );
}
