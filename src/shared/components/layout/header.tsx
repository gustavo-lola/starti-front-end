import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useTheme } from "../../hooks/use-theme";
import type { AppUser } from "../../types/app-user";
import { BellIcon } from "../ui/bell";
import { Input } from "../ui/input";
import { MoonIcon } from "../ui/moon";
import { SearchIcon } from "../ui/search";
import { SunIcon } from "../ui/sun";

interface HeaderProps {
    user: AppUser;
    isSidebarOpen?: boolean;
    onToggleSidebar?: () => void;
}

export default function Header({ user, isSidebarOpen = false, onToggleSidebar }: HeaderProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const notificationRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Estoque baixo",
            description: "O produto 'Mouse Gamer' está com 3 unidades.",
            createdAt: "Agora",
            read: false,
        },
        {
            id: 2,
            title: "Novo cliente",
            description: "Mariana Alves foi adicionada na base.",
            createdAt: "10 min",
            read: false,
        },
        {
            id: 3,
            title: "Sincronização concluída",
            description: "Dados da vitrine atualizados com sucesso.",
            createdAt: "1 h",
            read: true,
        },
    ]);

    const unreadCount = useMemo(
        () => notifications.filter((notification) => !notification.read).length,
        [notifications]
    );

    const subtitleByPath = useMemo<Record<string, string>>(
        () => ({
            "/": "Acompanhe os principais itens do seu negócio.",
            "/novo-produto": "Cadastre e organize novos itens no estoque.",
            "/clientes": "Visualize e gerencie sua base de clientes.",
            "/vitrine": "Gerencie os produtos exibidos na sua vitrine.",
        }),
        []
    );

    const currentSubtitle = subtitleByPath[location.pathname] ?? "Gerencie sua operação com agilidade.";

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const value = searchTerm.trim();
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
            nextParams.set("q", value);
        } else {
            nextParams.delete("q");
        }

        const nextSearch = nextParams.toString();
        navigate({
            pathname: location.pathname,
            search: nextSearch ? `?${nextSearch}` : "",
        });
    }

    function markAllNotificationsAsRead() {
        setNotifications((previous) => previous.map((notification) => ({ ...notification, read: true })));
    }

    function markNotificationAsRead(id: number) {
        setNotifications((previous) =>
            previous.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
        );
    }

    return (
        <header className="border-b border-border bg-background px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="mt-0.5 rounded-md border border-border p-2 text-muted-foreground hover:cursor-pointer hover:bg-muted hover:text-foreground lg:hidden"
                        aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    <div className="flex min-w-0 flex-col">
                        <h1 className="truncate text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                            Ola, {user.name}
                        </h1>
                        <p className="line-clamp-1 text-[11px] font-medium tracking-wide text-muted-foreground sm:text-sm">
                            {currentSubtitle}
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-4 lg:gap-6">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="group relative order-2 flex min-w-0 basis-full items-center sm:order-1 sm:w-72 sm:basis-auto sm:flex-none lg:w-80"
                    >
                        <div
                            className="absolute left-4 text-muted-foreground group-focus-within:text-foreground transition-colors"
                            aria-label="Pesquisar"
                        >
                            <SearchIcon size={18} />
                        </div>

                        <Input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Pesquisar produtos..."
                            className="h-10 w-full rounded-sm border-none bg-secondary text-foreground pl-11 pr-20 text-sm placeholder:text-muted-foreground focus-visible:ring-2 transition-all"
                        />
                        <div className="absolute right-4 flex items-center gap-3 text-muted-foreground">
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm("");
                                        navigate({ pathname: location.pathname, search: "" });
                                    }}
                                    className="text-[11px] uppercase tracking-wide hover:text-foreground"
                                >
                                    Limpar
                                </button>
                            )}
                        </div>
                    </form>

                    <div ref={notificationRef} className="relative order-1 sm:order-2">
                        <button
                            onClick={() => setIsNotificationsOpen((previous) => !previous)}
                            className="relative rounded-full p-2.5 text-muted-foreground transition-all hover:cursor-pointer hover:bg-muted hover:text-foreground"
                            aria-label="Abrir notificacoes"
                        >
                            <BellIcon size={20} />

                            {unreadCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {isNotificationsOpen && (
                            <div className="absolute right-0 z-20 mt-2 w-[calc(100vw-2rem)] max-w-80 rounded-lg border border-border bg-card p-3 shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-card-foreground">Notificacoes</p>
                                    <button
                                        onClick={markAllNotificationsAsRead}
                                        className="text-xs text-primary hover:cursor-pointer hover:opacity-80"
                                    >
                                        Marcar todas como lidas
                                    </button>
                                </div>

                                <div className="max-h-72 overflow-auto">
                                    {notifications.map((notification) => (
                                        <button
                                            key={notification.id}
                                            type="button"
                                            onClick={() => markNotificationAsRead(notification.id)}
                                            className="w-full rounded-md px-2 py-2 text-left hover:cursor-pointer hover:bg-muted"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-xs font-medium  text-card-foreground">
                                                    {notification.title}
                                                </p>
                                                {!notification.read && (
                                                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-red-500" />
                                                )}
                                            </div>
                                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                                                {notification.description}
                                            </p>
                                            <p className="mt-1 text-[10px] text-muted-foreground">
                                                {notification.createdAt}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="order-1 rounded-sm border border-border bg-card p-2 text-muted-foreground shadow-lg transition-colors hover:cursor-pointer hover:bg-muted hover:text-foreground sm:order-3"
                        aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
                        title={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
                    >
                        <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait" initial={false}>
                                {theme === "dark" ? (
                                    <motion.span
                                        key="moon"
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0, rotate: -90, scale: 0.75, y: 4 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, rotate: 90, scale: 0.75, y: -4 }}
                                        transition={{ duration: 0.22, ease: "easeOut" }}
                                    >
                                        <MoonIcon size={18} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="sun"
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0, rotate: 90, scale: 0.75, y: -4 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, rotate: -90, scale: 0.75, y: 4 }}
                                        transition={{ duration: 0.22, ease: "easeOut" }}
                                    >
                                        <SunIcon size={18} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
