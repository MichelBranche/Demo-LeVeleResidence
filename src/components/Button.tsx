import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  to?: string;
  variant?: 'primary' | 'light';
  className?: string;
};

export function Button({ children, href, to, variant = 'primary', className = '' }: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls}>
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" className={cls}>
      <span>{children}</span>
    </button>
  );
}
