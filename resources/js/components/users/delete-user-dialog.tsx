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

interface DeleteUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
}

export function DeleteUserDialog({ open, onOpenChange, user }: DeleteUserDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (!user) return;

        destroy(`/users/${user.id}`, {
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
                        <DialogTitle>Delete User</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-foreground">{user?.name}</span>? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                    <p className="text-sm text-red-800 dark:text-red-200">
                        <strong>Warning:</strong> Deleting this user will remove all their data and
                        access to the system.
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? 'Deleting...' : 'Delete User'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
