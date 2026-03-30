import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({ href, children, className = "", onClick }: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-bold tracking-wide shadow-lg transition hover:bg-primary-light focus:outline-none focus:ring-2  ${className}`}
    >
      {children}
    </Link>
  );
}
