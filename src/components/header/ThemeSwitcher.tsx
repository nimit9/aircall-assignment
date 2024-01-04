import { Switch } from '@/components/ui/switch';
import { useAppContext } from '@/context/context';
const ThemeSwitcher = () => {
    const { toggleDarkMode, darkMode } = useAppContext();
    return (
        <div className="flex items-center gap-3 p-2">
            <span>Dark Mode</span>
            <Switch onCheckedChange={toggleDarkMode} checked={darkMode} />
        </div>
    );
};

export default ThemeSwitcher;
