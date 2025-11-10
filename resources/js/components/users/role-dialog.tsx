import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

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
    permissions: Permission[];
}

interface RoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    role?: Role | null;
    allPermissions: Record<string, string[]>;
}

export function RoleDialog({ open, onOpenChange, role, allPermissions }: RoleDialogProps) {
    const isEdit = !!role;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: role?.slug || '',
        permissions: [] as string[],
    });

    useEffect(() => {
        if (role) {
            // Extract permission names from role
            const permissions: string[] = [];
            role.permissions.forEach((perm) => {
                const modulePerms = allPermissions[perm.module] || [];
                if (perm.read && modulePerms[0]) permissions.push(modulePerms[0]);
                if (perm.create && modulePerms[1]) permissions.push(modulePerms[1]);
                if (perm.update && modulePerms[2]) permissions.push(modulePerms[2]);
                if (perm.delete && modulePerms[3]) permissions.push(modulePerms[3]);
            });

            setData({
                name: role.slug,
                permissions: permissions,
            });
        } else {
            reset();
        }
    }, [role]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/roles/${role.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        } else {
            post('/roles', {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        }
    };

    const togglePermission = (permission: string) => {
        setData(
            'permissions',
            data.permissions.includes(permission)
                ? data.permissions.filter((p) => p !== permission)
                : [...data.permissions, permission]
        );
    };

    const toggleAllModulePermissions = (modulePermissions: string[]) => {
        const allSelected = modulePermissions.every((p) => data.permissions.includes(p));

        if (allSelected) {
            setData(
                'permissions',
                data.permissions.filter((p) => !modulePermissions.includes(p))
            );
        } else {
            const newPermissions = [...data.permissions];
            modulePermissions.forEach((p) => {
                if (!newPermissions.includes(p)) {
                    newPermissions.push(p);
                }
            });
            setData('permissions', newPermissions);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Edit Role' : 'Create New Role'}</DialogTitle>
                        <DialogDescription>
                            {isEdit
                                ? 'Update role name and permissions.'
                                : 'Add a new role with specific permissions.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Role Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value.toLowerCase())}
                                placeholder="moderator"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            <p className="text-muted-foreground text-xs">
                                Use lowercase, no spaces (e.g., 'content-manager')
                            </p>
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="grid gap-4">
                            <Label>
                                Permissions <span className="text-red-500">*</span>
                            </Label>

                            <div className="rounded-lg border">
                                <table className="w-full">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="text-left p-3 text-sm font-medium">
                                                Module
                                            </th>
                                            <th className="text-center p-3 text-sm font-medium">
                                                View
                                            </th>
                                            <th className="text-center p-3 text-sm font-medium">
                                                Create
                                            </th>
                                            <th className="text-center p-3 text-sm font-medium">
                                                Edit
                                            </th>
                                            <th className="text-center p-3 text-sm font-medium">
                                                Delete
                                            </th>
                                            <th className="text-center p-3 text-sm font-medium">
                                                All
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(allPermissions).map(
                                            ([module, permissions]) => (
                                                <tr key={module} className="border-t">
                                                    <td className="p-3 text-sm font-medium">
                                                        {module}
                                                    </td>
                                                    {permissions.slice(0, 4).map((perm, idx) => (
                                                        <td key={perm} className="p-3 text-center">
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={data.permissions.includes(
                                                                        perm
                                                                    )}
                                                                    onCheckedChange={() =>
                                                                        togglePermission(perm)
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    ))}
                                                    {permissions.length < 4 &&
                                                        Array.from({
                                                            length: 4 - permissions.length,
                                                        }).map((_, idx) => (
                                                            <td
                                                                key={`empty-${idx}`}
                                                                className="p-3 text-center"
                                                            >
                                                                -
                                                            </td>
                                                        ))}
                                                    <td className="p-3 text-center">
                                                        <div className="flex justify-center">
                                                            <Checkbox
                                                                checked={permissions
                                                                    .slice(0, 4)
                                                                    .every((p) =>
                                                                        data.permissions.includes(p)
                                                                    )}
                                                                onCheckedChange={() =>
                                                                    toggleAllModulePermissions(
                                                                        permissions.slice(0, 4)
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {errors.permissions && (
                                <p className="text-sm text-red-500">{errors.permissions}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                onOpenChange(false);
                                reset();
                            }}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Role' : 'Create Role'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
