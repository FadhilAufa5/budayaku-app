import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavEvent } from '@/components/nav-event';
import { NavUsers } from '@/components/nav-users';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, ShoppingBag, Key, Calendar,PartyPopper, Activity } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const eventNavItems: NavItem[] = [
    {
        title: 'Eksplorasi Budaya',
        icon: PartyPopper,
        children: [
            {
                title: 'Daftar Budaya',
                href: '/events/cultures',
            },
            {
                title: 'Kategori Budaya',
                href: '/events/culture-categories',
            },
            {
                title: 'Review Budaya',
                href: '/events/culture-reviews',
            }
        ]
    },
    {
        title: 'Agenda & Event',
        icon: Calendar,
        children: [
            {
                title: 'Daftar Event',
                href: '/events/list',
            },
            {
                title: 'Kategori Event',
                href: '/events/categories',
            },
            {
                title: 'Jadwal Event',
                href: '/events/schedule',
            }
        ]
    },
    {
        title: 'Toko Budaya',
        icon: ShoppingBag,
        children: [
            {
                title: 'Produk',
                href: '/store/products',
            },
            {
                title: 'Kategori Produk',
                href: '/store/categories',
            },
            {
                title: 'Pesanan',
                href: '/store/orders',
            },
            {
                title: 'Laporan Penjualan',
                href: '/store/reports',
            }
        ]
    },
];

 const usersNavItems: NavItem[] = [
    {
        title: 'User List',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Roles & Permissions',
        href: '/roles',
        icon: Key,
    },
    {
        title: 'Log Activities',
        href: '/',
        icon: Activity,
    },
];
// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavEvent items={eventNavItems} />
                <NavUsers items={usersNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
