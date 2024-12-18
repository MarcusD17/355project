'use client';

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Recipes', href: '/recipes/recipe-search', icon: DocumentDuplicateIcon },
    { name: 'Add Recipe', href: '/recipes/new-recipe', icon: DocumentDuplicateIcon },
    { name: 'About Us', href: '/about', icon: UserGroupIcon },
];


export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] items-center justify-center gap-1 rounded-md bg-blue-500 p-3 text-white text-sm font-medium ' +
                            'transition duration-200 hover:bg-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-blue-600': pathname === link.href, // Active link styling
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
