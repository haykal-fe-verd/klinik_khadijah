import React from "react";
import { usePage } from "@inertiajs/react";
import { Fingerprint, Lock, RefreshCcw, UploadCloud } from "lucide-react";

function Services() {
    const { fasilitas } = usePage().props;

    return (
        <section id="fasility">
            <div className="py-24 sm:py-32">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Kami menyediakan Fasilitas yang memudahkan anda
                            untuk berobat
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {fasilitas.map((item) => (
                                <div
                                    key={item.nama_fasilitas}
                                    className="relative pl-16"
                                >
                                    <dt className="flex items-center text-base font-semibold leading-7 text-gray-900 gap-x-2">
                                        <div
                                            className="w-10 h-10 p-2 rounded-lg bg-gradient-to-r from-sky-300 to-indigo-300"
                                            dangerouslySetInnerHTML={{
                                                __html: item.icon,
                                            }}
                                        />
                                        {item.nama_fasilitas}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        {item.deskripsi}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
