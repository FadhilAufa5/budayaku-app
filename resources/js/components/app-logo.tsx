import AppLogoIcon from './app-logo-icon';
import { Sparkles } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-sm">
                <Sparkles className="size-4" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="truncate font-bold leading-tight">
                    BudayaKu
                </span>
                <span className="truncate text-xs text-muted-foreground">
                    Warisan Nusantara
                </span>
            </div>
        </>
    );
}
