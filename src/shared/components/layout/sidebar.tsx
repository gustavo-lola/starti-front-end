import { cn } from "@/lib/classnames";
import { PiGearFineFill, PiHouseFill, PiListDashesFill, PiSignOut, PiUsersFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

import type { AppUser } from "../../types/app-user";

function pillClass(isActive: boolean) {
    return [
        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors",
        isActive
            ? "bg-primary text-primary-foreground font-medium"
            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    ].join(" ");
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[10px] font-medium tracking-widest text-sidebar-foreground/40 uppercase px-2 mb-1.5">
            {children}
        </p>
    );
}

function Divider() {
    return <div className="border-t border-sidebar-border my-3" />;
}

function getInitials(name: string) {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

    return initials || "US";
}

interface SidebarProps {
    user: AppUser;
    className?: string;
    onNavigate?: () => void;
}

export function Sidebar({ user, className, onNavigate }: SidebarProps) {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-dvh w-56 shrink-0 border-r border-sidebar-border bg-sidebar shadow-sm transition-transform duration-300",
                "flex flex-col",
                className
            )}
        >
            <div className="px-4 pt-5 pb-4">
                <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-primary-foreground text-sm font-semibold">S</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-sidebar-foreground leading-none">Super Estoque</p>
                        <p className="text-[11px] text-sidebar-foreground/40 mt-0.5">Gestão de produtos</p>
                    </div>
                </div>

                <SectionLabel>Principal</SectionLabel>
                <nav className="flex flex-col gap-0.5">
                    <NavLink to="/" end className={({ isActive }) => pillClass(isActive)} onClick={onNavigate}>
                        <PiHouseFill size={16} />
                        <span>Produtos</span>
                    </NavLink>
                    <NavLink to="/novo-produto" className={({ isActive }) => pillClass(isActive)} onClick={onNavigate}>
                        <PiListDashesFill size={16} />
                        <span>Novo Produto</span>
                    </NavLink>
                </nav>
            </div>

            <div className="px-4">
                <Divider />
                <SectionLabel>Pessoas</SectionLabel>
                <nav className="flex flex-col gap-0.5">
                    <NavLink to="/clientes" className={({ isActive }) => pillClass(isActive)} onClick={onNavigate}>
                        <PiUsersFill size={16} />
                        <span>Clientes</span>
                    </NavLink>
                </nav>
            </div>

            <div className="px-4">
                <Divider />
                <SectionLabel>Loja</SectionLabel>
                <nav className="flex flex-col gap-0.5">
                    <NavLink to="/vitrine" className={({ isActive }) => pillClass(isActive)} onClick={onNavigate}>
                        <PiGearFineFill size={16} />
                        <span>Vitrine</span>
                    </NavLink>
                </nav>
            </div>

            <div className="mt-auto border-t border-sidebar-border px-4 py-3">
                <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-sidebar-accent mb-1">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[11px] font-medium text-primary shrink-0">
                        {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-sidebar-foreground truncate leading-none">{user.name}</p>
                        <p className="text-[10px] text-sidebar-foreground/40 mt-0.5">{user.role}</p>
                    </div>
                </div>

                <NavLink
                    to="/logout"
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-sidebar-foreground/60 transition-colors hover:bg-destructive/10 hover:text-destructive hover:cursor-pointer"
                >
                    <PiSignOut size={16} />
                    <span>Sair</span>
                </NavLink>
            </div>
        </aside>
    );
}
