import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import type { AppUser } from "../../types/app-user";
import Header from "./header";
import { Sidebar } from "./sidebar";

export function Layout() {
    const user: AppUser = { name: "Gustavo", role: "Admin" };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        function syncViewport() {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);

            if (desktop) {
                setIsSidebarOpen(false);
            }
        }

        syncViewport();

        function handleResize() {
            syncViewport();
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {isDesktop ? <Sidebar user={user} /> : null}

            {!isDesktop && isSidebarOpen ? (
                <button
                    type="button"
                    aria-label="Fechar menu"
                    className="fixed inset-0 z-30 bg-black/45"
                    onClick={() => setIsSidebarOpen(false)}
                />
            ) : null}

            {!isDesktop ? (
                <Sidebar
                    user={user}
                    onNavigate={() => setIsSidebarOpen(false)}
                    className={["z-40", isSidebarOpen ? "translate-x-0" : "-translate-x-full"].join(" ")}
                />
            ) : null}

            <div className="flex min-h-screen min-w-0 flex-col lg:ml-56">
                <Header
                    user={user}
                    isSidebarOpen={!isDesktop && isSidebarOpen}
                    onToggleSidebar={isDesktop ? undefined : () => setIsSidebarOpen((prev) => !prev)}
                />
                <main className="flex-1 min-w-0 overflow-x-hidden p-3 sm:p-4 lg:p-5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
