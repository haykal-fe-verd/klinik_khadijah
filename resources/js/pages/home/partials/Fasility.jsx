import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePage } from "@inertiajs/react";

function Fasility() {
    const { pelayanan } = usePage().props;
    return (
        <section id="services">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
                <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
                        Pelayanan
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl">
                        Berikut adalah daftar pelayanan yang kami sediakan untuk
                        menunjang kebutuhan kesehatan anda.
                    </p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {pelayanan.map((item) => (
                        <div className="relative flex flex-col max-w-lg p-6 mx-auto text-center text-black border rounded-lg shadow-lg xl:p-8 bg-gradient-to-r from-sky-300 to-indigo-300">
                            <div className="flex flex-col items-start justify-start w-full h-full" />
                            <h3 className="mb-4 text-2xl font-semibold text-start ">
                                {item.nama_pelayanan}
                            </h3>
                            <h4 className="text-3xl font-semibold text-white text-start">
                                Rp. {item.harga} ,-
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Fasility;
