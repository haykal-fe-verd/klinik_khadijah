import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Home, Mail, Phone, Printer, SyringeIcon } from "lucide-react";

function Footer() {
    const { klinik, pelayanan } = usePage().props;

    const navigation = [
        { name: "Beranda", href: "/" },
        { name: "Tentang Kami", href: "#about" },
        { name: "Pelayanan", href: "#services" },
        { name: "Fasilitas", href: "#fasility" },
        { name: "Pendaftaran Pasien", href: route("register") },
    ];

    return (
        <footer className="text-center border-t shadow-sm lg:text-left">
            <div className="py-10 mx-6 text-center md:text-left">
                <div className="grid gap-8 grid-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                        <h6 className="flex items-center justify-center mb-4 font-semibold uppercase md:justify-start">
                            <SyringeIcon className="w-5 h-5 mr-3" />
                            {klinik?.nama_klinik}
                        </h6>
                        <p className="text-justify">{klinik?.tentang_klinik}</p>
                    </div>
                    <div className="">
                        <h6 className="flex justify-center mb-4 font-semibold uppercase md:justify-start">
                            Pelayanan
                        </h6>
                        {pelayanan.map((item) => {
                            return (
                                <p className="mb-4" key={item.id}>
                                    <Link
                                        href="#"
                                        className="text-neutral-600 dark:text-neutral-200"
                                    >
                                        {item?.nama_pelayanan}
                                    </Link>
                                </p>
                            );
                        })}
                    </div>
                    <div className="">
                        <h6 className="flex justify-center mb-4 font-semibold uppercase md:justify-start">
                            Navigasi
                        </h6>
                        {navigation.map((item) => (
                            <p className="mb-4" key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-neutral-600 dark:text-neutral-200"
                                >
                                    {item.name}
                                </Link>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h6 className="flex justify-center mb-4 font-semibold uppercase md:justify-start">
                            Contact
                        </h6>
                        <p className="flex items-center justify-center mb-4 md:justify-start">
                            <Home className="w-5 h-5 mr-5" />
                            {klinik?.alamat}
                        </p>
                        <p className="flex items-center justify-center mb-4 md:justify-start">
                            <Mail className="w-5 h-5 mr-5" />
                            {klinik?.email}
                        </p>
                        <p className="flex items-center justify-center mb-4 md:justify-start">
                            <Phone className="w-5 h-5 mr-5" />
                            {klinik?.telepon}
                        </p>
                        <p className="flex items-center justify-center md:justify-start">
                            <Printer className="w-5 h-5 mr-5" />
                            {klinik?.fax}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 text-center bg-gray-100">
                <span>&copy; 2023 Copyright: </span>
                <a
                    className="font-semibold "
                    href="https://tailwind-elements.com/"
                >
                    Mursin
                </a>
            </div>
        </footer>
    );
}

export default Footer;
