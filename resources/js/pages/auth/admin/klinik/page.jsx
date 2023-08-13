import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";

function Klinik() {
    const { data: dataKlinik } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        nama_klinik: dataKlinik?.nama_klinik || "",
        tentang_klinik: dataKlinik?.tentang_klinik || "",
        alamat: dataKlinik?.alamat || "",
        telepon: dataKlinik?.telepon || "",
        fax: dataKlinik?.fax || "",
        email: dataKlinik?.email || "",
        website: dataKlinik?.website || "",
        instagram: dataKlinik?.instagram || "",
        logo: dataKlinik?.logo || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("klinik.store"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        setData("logo", e.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgPreview = document.getElementById("preview");
                if (imgPreview) {
                    imgPreview.src = reader.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthLayout>
            <Head title="Setting Klinik" />
            <div className="m-10 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Setting Klinik
                    </h2>
                </div>
                <Separator />
                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                        {/* nama klinik */}
                        <div>
                            <Label htmlFor="nama_klinik">
                                <span className="text-rose-500">*</span>
                                Nama Klinik
                            </Label>
                            <Input
                                type="text"
                                id="nama_klinik"
                                name="nama_klinik"
                                value={data.nama_klinik}
                                onChange={(e) =>
                                    setData("nama_klinik", e.target.value)
                                }
                            />

                            <InputError message={errors.nama_klinik} />
                        </div>

                        {/* telepon */}
                        <div className="mt-5 md:mt-0">
                            <Label htmlFor="telepon">
                                <span className="text-rose-500">*</span>
                                Telepon
                            </Label>
                            <Input
                                type="text"
                                id="telepon"
                                name="telepon"
                                value={data.telepon}
                                onChange={(e) =>
                                    setData("telepon", e.target.value)
                                }
                            />

                            <InputError message={errors.telepon} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-x-10">
                        {/* fax */}
                        <div>
                            <Label htmlFor="fax">
                                <span className="text-rose-500">*</span>
                                Faks
                            </Label>
                            <Input
                                type="text"
                                id="fax"
                                name="fax"
                                value={data.fax}
                                onChange={(e) => setData("fax", e.target.value)}
                            />

                            <InputError message={errors.fax} />
                        </div>

                        {/* email */}
                        <div className="mt-5 md:mt-0">
                            <Label htmlFor="email">
                                <span className="text-rose-500">*</span>
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError message={errors.email} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-x-10">
                        {/* website */}
                        <div>
                            <Label htmlFor="website">
                                <span className="text-rose-500">*</span>
                                Website
                            </Label>
                            <Input
                                type="text"
                                id="website"
                                name="website"
                                placeholder="www.example.com"
                                value={data.website}
                                onChange={(e) =>
                                    setData("website", e.target.value)
                                }
                            />

                            <InputError message={errors.website} />
                        </div>

                        {/* email */}
                        <div className="mt-5 md:mt-0">
                            <Label htmlFor="instagram">
                                <span className="text-rose-500">*</span>
                                Instagram
                            </Label>
                            <Input
                                type="text"
                                id="instagram"
                                name="instagram"
                                placeholder="https://instagram.com/..."
                                value={data.instagram}
                                onChange={(e) =>
                                    setData("instagram", e.target.value)
                                }
                            />

                            <InputError message={errors.instagram} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-x-10">
                        {/* alamat */}
                        <div>
                            <Label htmlFor="alamat">
                                <span className="text-rose-500">*</span>
                                Alamat
                            </Label>
                            <Textarea
                                className="bg-white "
                                id="alamat"
                                name="alamat"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                            />

                            <InputError message={errors.alamat} />
                        </div>

                        {/* tentang_klinik */}
                        <div className="mt-5 md:mt-0">
                            <Label htmlFor="tentang_klinik">
                                <span className="text-rose-500">*</span>
                                Tentang Klinik
                            </Label>
                            <Textarea
                                className="bg-white "
                                id="tentang_klinik"
                                name="tentang_klinik"
                                value={data.tentang_klinik}
                                onChange={(e) =>
                                    setData("tentang_klinik", e.target.value)
                                }
                            />

                            <InputError message={errors.tentang_klinik} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-x-10">
                        {/* logo */}
                        <div>
                            <Label htmlFor="logo">
                                <span className="text-rose-500">*</span>
                                Logo
                            </Label>
                            <Input
                                type="file"
                                id="logo"
                                name="logo"
                                onChange={onChange}
                            />

                            <InputError message={errors.logo} />
                        </div>

                        {/* preview */}
                        {data?.logo && (
                            <div className="flex items-center justify-center mt-5 md:mt-0">
                                <img
                                    id="preview"
                                    src={`/logo/${data?.logo}`}
                                    alt="Logo"
                                    className="object-cover rounded-full w-52 h-52"
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        className="flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Klinik;
