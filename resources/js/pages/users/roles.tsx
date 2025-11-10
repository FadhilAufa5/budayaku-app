import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Shield, Users, Key, Lock } from 'lucide-react';
import { RoleDialog } from '@/components/users/role-dialog';
import { DeleteRoleDialog } from '@/components/users/delete-role-dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Roles & Permissions', href: '/roles' },
];

interface Permission {
    module: string;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
}

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string;
    userCount: number;
    color: string;
    icon: string;
    permissions: Permission[];
}

interface Props {
    roles: Role[];
    allPermissions: Record<string, string[]>;
}

const sampleRolesData = [
    {
        id: 1,
        name: 'Administrator',
        slug: 'admin',
        description: 'Akses penuh ke semua fitur sistem',
        userCount: 2,
        color: 'bg-red-500',
        icon: '🔴',
        permissions: [
            { module: 'Budaya', read: true, create: true, update: true, delete: true },
            { module: 'Event', read: true, create: true, update: true, delete: true },
            { module: 'Toko', read: true, create: true, update: true, delete: true },
            { module: 'Users', read: true, create: true, update: true, delete: true },
            { module: 'Settings', read: true, create: true, update: true, delete: true },
        ],
    },
    {
        id: 2,
        name: 'Manager',
        slug: 'manager',
        description: 'Kelola konten dan moderasi',
        userCount: 5,
        color: 'bg-blue-500',
        icon: '🔵',
        permissions: [
            { module: 'Budaya', read: true, create: true, update: true, delete: true },
            { module: 'Event', read: true, create: true, update: true, delete: true },
            { module: 'Toko', read: true, create: true, update: true, delete: false },
            { module: 'Users', read: true, create: false, update: false, delete: false },
            { module: 'Settings', read: true, create: false, update: false, delete: false },
        ],
    },
    {
        id: 3,
        name: 'Editor',
        slug: 'editor',
        description: 'Buat dan edit konten',
        userCount: 12,
        color: 'bg-purple-500',
        icon: '🟣',
        permissions: [
            { module: 'Budaya', read: true, create: true, update: true, delete: false },
            { module: 'Event', read: true, create: true, update: true, delete: false },
            { module: 'Toko', read: true, create: true, update: false, delete: false },
            { module: 'Users', read: true, create: false, update: false, delete: false },
            { module: 'Settings', read: false, create: false, update: false, delete: false },
        ],
    },
    {
        id: 4,
        name: 'User',
        slug: 'user',
        description: 'Akses dasar pengguna',
        userCount: 45,
        color: 'bg-gray-500',
        icon: '⚪',
        permissions: [
            { module: 'Budaya', read: true, create: false, update: false, delete: false },
            { module: 'Event', read: true, create: false, update: false, delete: false },
            { module: 'Toko', read: true, create: false, update: false, delete: false },
            { module: 'Users', read: false, create: false, update: false, delete: false },
            { module: 'Settings', read: false, create: false, update: false, delete: false },
        ],
    },
];

export default function RolesPermissions({ roles, allPermissions }: Props) {
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const rolesData = roles || sampleRolesData;
    const totalRoles = rolesData.length;
    const totalUsers = rolesData.reduce((sum, role) => sum + role.userCount, 0);
    const totalPermissions = rolesData.reduce(
        (sum, role) => sum + role.permissions.filter(p => p.read || p.create || p.update || p.delete).length,
        0
    );

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setRoleDialogOpen(true);
    };

    const handleDelete = (role: Role) => {
        setSelectedRole(role);
        setDeleteDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedRole(null);
        setRoleDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles & Permissions" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
                        <p className="text-muted-foreground mt-1">
                            Kelola hak akses dan izin pengguna
                        </p>
                    </div>
                    <Button className="w-fit" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Tambah Role
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                            <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalRoles}</div>
                            <p className="text-muted-foreground text-xs">Role terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalUsers}</div>
                            <p className="text-muted-foreground text-xs">Pengguna aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
                            <Key className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalPermissions}</div>
                            <p className="text-muted-foreground text-xs">Izin dikonfigurasi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari role..."
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Roles List */}
                <div className="space-y-4">
                    {rolesData.map((role) => (
                        <Card key={role.id} className="overflow-hidden transition-all hover:shadow-md">
                            <div className={`h-2 ${role.color}`} />
                            
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-2xl dark:from-gray-800 dark:to-gray-700">
                                            {role.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-lg">{role.name}</CardTitle>
                                                <Badge variant="outline">
                                                    <Users className="h-3 w-3" />
                                                    {role.userCount} users
                                                </Badge>
                                            </div>
                                            <CardDescription>{role.description}</CardDescription>
                                            <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                                <span className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                                    {role.slug}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(role)}
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(role)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="rounded-lg border">
                                    <table className="w-full">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="text-left p-3 text-sm font-medium">Module</th>
                                                <th className="text-center p-3 text-sm font-medium">Read</th>
                                                <th className="text-center p-3 text-sm font-medium">Create</th>
                                                <th className="text-center p-3 text-sm font-medium">Update</th>
                                                <th className="text-center p-3 text-sm font-medium">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {role.permissions.map((perm, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="p-3 text-sm font-medium">{perm.module}</td>
                                                    <td className="p-3 text-center">
                                                        <div className="flex justify-center">
                                                            <Checkbox checked={perm.read} disabled />
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <div className="flex justify-center">
                                                            <Checkbox checked={perm.create} disabled />
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <div className="flex justify-center">
                                                            <Checkbox checked={perm.update} disabled />
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <div className="flex justify-center">
                                                            <Checkbox checked={perm.delete} disabled />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Dialogs */}
                <RoleDialog
                    open={roleDialogOpen}
                    onOpenChange={setRoleDialogOpen}
                    role={selectedRole}
                    allPermissions={allPermissions || {}}
                />

                <DeleteRoleDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    role={selectedRole}
                />
            </div>
        </AppLayout>
    );
}
