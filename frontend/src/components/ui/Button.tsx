import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'icon-edit' | 'icon-delete';
    icon?: LucideIcon;
    children?: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    icon: Icon,
    children,
    className = '',
    ...props
}: ButtonProps) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'primary':
                return 'btn btn-primary';
            case 'secondary':
                return 'btn btn-secondary';
            case 'icon-edit':
                return 'btn-icon edit';
            case 'icon-delete':
                return 'btn-icon delete';
            default:
                return 'btn';
        }
    };

    return (
        <button className={`${getVariantClass()} ${className}`} {...props}>
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    );
};
