import React from "react";
import { Menu } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileNavbar() {
    const { klinik } = usePage().props;

    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const navigation = [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "#about" },
        { name: "Pelayanan", href: "#services" },
        { name: "Fasilitas", href: "#fasility" },
        { name: "No. Antrian", href: route("no.antrian") },
        { name: "Pendaftaran Pasien", href: route("register") },
    ];

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="p-5 text-white bg-slate-900">
                <h1 className="text-2xl font-bold tracking-tighter text-center">
                    {klinik?.nama_klinik}
                </h1>
                <div className="flex flex-col mt-16 space-y-5">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm leading-6 "
                        >
                            {item.name}
                        </Link>
                    ))}

                    <Link
                        href={route("login")}
                        className="text-sm font-semibold leading-6"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNavbar;
