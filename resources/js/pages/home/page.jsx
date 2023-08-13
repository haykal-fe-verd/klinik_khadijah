import React from "react";
import { Menu } from "lucide-react";
import { Head, Link } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";
import Hero from "@/pages/home/partials/Hero";
import About from "@/pages/home/partials/About";
import Services from "@/pages/home/partials/Services";
import Fasility from "@/pages/home/partials/Fasility";
import Footer from "@/pages/home/partials/Footer";

function Home() {
    return (
        <GuestLayout>
            <Head title="Home" />
            <Hero />
            <About />
            <Fasility />
            <Services />
            <Footer />
        </GuestLayout>
    );
}

export default Home;
