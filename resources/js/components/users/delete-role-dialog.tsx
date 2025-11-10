import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

interface DeleteRoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    role: {
        id: number;
        name: string;
        userCount: number;
    } | null;
}

export function DeleteRoleDialog({ open, onOpenChange, role }: DeleteRoleDialogProps) {
    const { delete: destroy, processing } = useForm();

    const canDelete = role && !['Admin', 'User'].includes(role.name) && role.userCount === 0;

    const handleDelete = () => {
        if (!role || !canDelete) return;

        destroy(`/roles/${role.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <DialogTitle>Delete Role</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        {canDelete ? (
                            <>
                                Are you sure you want to delete the{' '}
                                <span className="font-semibold text-foreground">{role?.name}</span>{' '}
                                role? This action cannot be undone.
                            </>
                        ) : (
                            <>Cannot delete this role.</>
                        )}
                    </DialogDescription>
                </DialogHeader>

                {canDelete ? (
                    <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                        <p className="text-sm text-red-800 dark:text-red-200">
                            <strong>Warning:</strong> Deleting this role will permanently remove it
                            from the system.
                        </p>
                    </div>
                ) : (
                    <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            {role?.name === 'Admin' || role?.name === 'User' ? (
                                <>
                                    <strong>Protected Role:</strong> The {role?.name} role is a
                                    system default and cannot be deleted.
                                </>
                            ) : role && role.userCount > 0 ? (
                                <>
                                    <strong>Role in Use:</strong> This role has {role.userCount}{' '}
                                    assigned user(s). Remove all users from this role before
                                    deleting.
                                </>
                            ) : (
                                <>
                                    <strong>Cannot Delete:</strong> This role cannot be deleted.
                                </>
                            )}
                        </p>
                    </div>
                )}

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={processing}
                    >
                        {canDelete ? 'Cancel' : 'Close'}
                    </Button>
                    {canDelete && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : 'Delete Role'}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
