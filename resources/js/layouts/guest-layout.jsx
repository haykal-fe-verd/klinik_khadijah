import React from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

import Header from "@/pages/home/partials/Header";

function GuestLayout({ children }) {
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
        <main>
            <Header />
            <div>{children}</div>
        </main>
    );
}

export default GuestLayout;
