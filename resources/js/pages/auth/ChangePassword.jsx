import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { CameraIcon } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function ChangePassword() {
    const passwordInput = React.useRef();
    const currentPasswordInput = React.useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: (response) => {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: response?.props?.status,
                    showConfirmButton: true,
                });
            },
        });
    };
    return (
        <AuthLayout>
            <Head title="Ganti Password" />

            <div className="m-10 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Ganti Password
                    </h2>
                    <p className="text-sm font-light text-muted-foreground md:text-lg">
                        Halaman Ganti Password
                    </p>
                </div>
                <Separator />
                <div className="w-full">
                    <form onSubmit={updatePassword}>
                        <p className="mt-4">
                            Pastikan akun anda menggunakan kata sandi acak yang
                            panjang agar tetap aman, dan juga passwordnya
                            diingat.
                        </p>
                        <div className="mt-6 space-y-5">
                            <div>
                                <Label htmlFor="current_password">
                                    <span className="text-rose-500">*</span>
                                    Password Lama
                                </Label>
                                <Input
                                    className="mt-2"
                                    id="current_password"
                                    type="password"
                                    name="current_password"
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData(
                                            "current_password",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError message={errors.current_password} />
                            </div>

                            <div>
                                <Label htmlFor="password">
                                    <span className="text-rose-500">*</span>
                                    Password Baru
                                </Label>
                                <Input
                                    className="mt-2"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label htmlFor="password_confirmation">
                                    <span className="text-rose-500">*</span>
                                    Konfirmasi Password Baru
                                </Label>
                                <Input
                                    className="mt-2"
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <Button className="mt-5" disabled={processing}>
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}

export default ChangePassword;
