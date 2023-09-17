import React from "react";
import { Link, usePage } from "@inertiajs/react";

import MobileNavbar from "@/pages/home/partials/mobile-navbar";

function Header() {
    const { klinik } = usePage().props;
    const navigation = [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "#about" },
        { name: "Pelayanan", href: "#services" },
        { name: "Fasilitas", href: "#fasility" },
        { name: "No. Antrian", href: route("no.antrian") },
        { name: "Pendaftaran Pasien", href: route("register") },
        { name: "Login", href: route("login") },
    ];

    return (
        <header className="sticky inset-x-0 top-0 z-50 bg-white shadow-md">
            <nav
                className="flex items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <h1 className="text-2xl font-bold tracking-tighter">
                            {klinik?.nama_klinik}
                        </h1>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <MobileNavbar />
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Header;
