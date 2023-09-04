import React from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

function AuthLayout({ children }) {
    const { sessions } = usePage().props;

    React.useEffect(() => {
        if (sessions?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: sessions.success,
                showConfirmButton: true,
                confirmButtonColor: "#0f172a",
            });
        }

        if (sessions?.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: sessions.error,
                showConfirmButton: true,
                confirmButtonColor: "#0f172a",
            });
        }
    }, [sessions]);

    return (
        <div className="relative h-full">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 -z-[80]">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default AuthLayout;
