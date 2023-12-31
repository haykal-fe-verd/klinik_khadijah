import {
    ActivitySquareIcon,
    BedIcon,
    Bitcoin,
    Clapperboard,
    Cog,
    LayoutDashboard,
    Scale3d,
    ShieldCheck,
    Siren,
    Stethoscope,
} from "lucide-react";

export const navigations = [
    {
        label: "Dashboard",
        href: route("dashboard"),
        icon: LayoutDashboard,
        color: "text-sky-500",
        role: ["admin", "dokter", "pasien"],
    },
    // admin
    {
        label: "Rekam Medis",
        href: route("rekam-medis.index"),
        icon: Clapperboard,
        color: "text-pink-500",
        role: ["admin"],
    },
    {
        label: "Antrian",
        href: route("antrian.index"),
        icon: Siren,
        color: "text-cyan-500",
        role: ["admin"],
    },
    {
        label: "Transaksi",
        href: route("transaksi.index"),
        icon: Bitcoin,
        color: "text-indigo-500",
        role: ["admin"],
    },
    {
        label: "Pelayanan",
        href: route("pelayanan.index"),
        icon: ActivitySquareIcon,
        color: "text-yellow-500",
        role: ["admin"],
    },
    {
        label: "Data Pasien",
        href: route("pasien.index"),
        icon: Scale3d,
        color: "text-rose-500",
        role: ["admin"],
    },
    {
        label: "Data Dokter",
        href: route("dokter.index"),
        icon: Stethoscope,
        color: "text-violet-500",
        role: ["admin"],
    },
    {
        label: "Setting Fasilitas",
        href: route("fasilitas.index"),
        icon: BedIcon,
        color: "text-lime-500",
        role: ["admin"],
    },
    {
        label: "Setting Klinik",
        href: route("klinik.index"),
        icon: Cog,
        color: "text-red-500",
        role: ["admin"],
    },

    // dokter
    {
        label: "Periksa Pasien",
        href: route("periksa.index"),
        icon: ShieldCheck,
        color: "text-amber-500",
        role: ["dokter"],
    },
    {
        label: "Rekam Medis",
        href: route("rekam-medis-pasien.index"),
        icon: Clapperboard,
        color: "text-yellow-500",
        role: ["pasien"],
    },
];
