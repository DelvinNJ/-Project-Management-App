import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center m-3">
            {links.map((link) => (
                <Link key={link.label}
                    preserveScroll
                    className={
                        "relative rounded px-3 py-1.5 text-sm transition-all duration-300 "
                        + (!link.url ? "pointer-events-none bg-transparent text-neutral-500 dark:text-neutral-400" : "")
                        + (link.active ? "bg-neutral-800 font-medium text-neutral-50 dark:bg-neutral-900" : "hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white")
                    }
                    href={link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }} />
            ))}
        </nav>
    );
}



