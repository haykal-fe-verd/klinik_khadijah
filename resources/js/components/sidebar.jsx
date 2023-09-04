import React from "react";
import { Link, usePage } from "@inertiajs/react";

import { cn } from "@/lib/utils";
import { navigations } from "@/data/navigations";

function Sidebar() {
    const { ziggy, klinik, auth } = usePage().props;

    const role = auth?.user?.role;

    const filteredNavigations = navigations.filter(
        (route) => !route.role || route.role.includes(role)
    );

    return (
        <div className="flex flex-col h-full py-4 space-y-4 text-white bg-slate-900">
            <div className="flex-1 px-3 py-2">
                <Link
                    href={route("dashboard")}
                    className="flex items-center pl-3 mb-14"
                >
                    <img
                        src={`/logo/${klinik?.logo}`}
                        className="relative w-10 h-10 mr-4 rounded-full"
                    />
                    <h1 className="text-2xl font-bold">
                        {klinik?.nama_klinik}
                    </h1>
                </Link>

                <div className="space-y-1">
                    {filteredNavigations.map((route) => (
                        <div key={route.href}>
                            {route.separator && (
                                <h1 className="my-5 font-bold underline decoration-wavy">
                                    {route.separator}
                                </h1>
                            )}

                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex justify-start w-full p-3 text-sm font-medium transition duration-100 rounded-lg cursor-pointer group hover:text-white hover:bg-white/10",
                                    ziggy.location === route.href
                                        ? "text-white bg-white/10"
                                        : "text-zinc-400"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon
                                        className={cn(
                                            "h-5 w-5 mr-3",
                                            route.color
                                        )}
                                    />
                                    {route.label}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
