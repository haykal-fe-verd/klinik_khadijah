import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Instagram,
    Mail,
    Phone,
    Printer,
    SyringeIcon,
} from "lucide-react";

function Footer() {
    const { klinik, pelayanan } = usePage().props;
    console.log("🚀  klinik:", klinik);

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
                        <p className="flex items-center justify-center mb-4 md:justify-start">
                            <Printer className="w-5 h-5 mr-5" />
                            {klinik?.fax}
                        </p>
                        <a
                            href="https://www.instagram.com/klinikkhadijah/"
                            className="flex items-center justify-center md:justify-start"
                            target="_blank"
                        >
                            <Instagram className="w-5 h-5 mr-5" />
                            @klinikkhadijah
                        </a>
                    </div>
                </div>
            </div>

            <div id="maps">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0571127286507!2d95.32639357576737!3d5.558553533622387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3040377645b7a3b1%3A0xfe38e8c0cd282579!2sKlinik%20Khadijah!5e0!3m2!1sen!2sid!4v1694017009128!5m2!1sen!2sid"
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
