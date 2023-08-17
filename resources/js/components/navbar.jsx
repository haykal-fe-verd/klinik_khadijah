import React from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Link, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileSidebar from "@/components/mobile-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
    const { auth } = usePage().props;
    const { post } = useForm();

    const handleLogout = () => {
        Swal.fire({
            title: "Apakah anda ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#0f172a",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("logout"));
            }
        });
    };

    return (
        <div className="flex items-center p-4 shadow-md">
            <MobileSidebar />
            <div className="flex justify-end w-full space-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="border border-slate-900">
                            <AvatarImage
                                src={`/avatars/${auth?.user?.image}`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center gap-x-3"
                            >
                                <User className="w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("password.index")}
                                className="flex items-center gap-x-3"
                            >
                                <Settings className="w-4 h-4" />
                                <span>Ganti Password</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="flex items-center cursor-pointer gap-x-3"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default Navbar;
