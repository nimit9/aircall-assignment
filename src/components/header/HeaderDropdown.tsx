import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

export const HeaderDropdown = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger>
                {<MoreVertical size={32} />}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-1 ">
                {location.pathname.includes('archive') ? (
                    <Link to="/">
                        <DropdownMenuItem
                            className="text-base"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Activity
                        </DropdownMenuItem>
                    </Link>
                ) : (
                    <Link to="/archive">
                        <DropdownMenuItem
                            className="text-base"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Archive
                        </DropdownMenuItem>
                    </Link>
                )}

                <DropdownMenuSeparator />
                <ThemeSwitcher />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
