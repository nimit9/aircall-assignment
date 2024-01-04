import { Link } from 'react-router-dom';
import { HeaderDropdown } from './HeaderDropdown';
import { HeaderLogo } from './HeaderLogo';

const Header = () => {
    return (
        <header className="w-full flex items-center justify-between p-4 shadow-md">
            <Link to="/">
                <HeaderLogo />
            </Link>
            <HeaderDropdown />
        </header>
    );
};

export default Header;
