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

function Profile() {
    const { auth, profile } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: profile?.name || "",
        email: profile?.email || "",
        image: profile?.image || "",
        nik: profile?.user_data?.nik || "",
        tanggal_lahir: profile?.user_data?.tanggal_lahir || "",
        tempat_lahir: profile?.user_data?.tempat_lahir || "",
        jenis_kelamin: profile?.user_data?.jenis_kelamin || "",
        no_hp: profile?.user_data?.no_hp || "",
        umur: profile?.user_data?.umur || "",
        alamat: profile?.user_data?.alamat || "",
        // dokter
        spesialis: profile?.user_data?.spesialis || "",
        // pasien
        riwayat_penyakit: profile?.user_data?.riwayat_penyakit || "",
    });

    const inputRef = React.useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        setData("image", e.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgPreview = document.getElementById("image");
                if (imgPreview) {
                    imgPreview.src = reader.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const browse = () => {
        inputRef.current.click();
    };

    return (
        <AuthLayout>
            <Head title="Profile" />

            <div className="m-10 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">Profile</h2>
                    <p className="text-sm font-light text-muted-foreground md:text-lg">
                        Halaman edit profile
                    </p>
                </div>
                <Separator />
                <div className="w-full">
                    <form onSubmit={onSubmit}>
                        <div className="relative inline-block w-full bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 h-60">
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={onChange}
                            />

                            <img
                                id="image"
                                src={`/avatars/${auth?.user?.image}`}
                                alt="User Profile"
                                className="absolute object-cover w-20 h-20 border-2 rounded-full -bottom-10 left-10"
                            />
                            <button
                                type="button"
                                onClick={browse}
                                className="absolute flex items-center justify-center w-20 h-20 text-white transition-opacity duration-300 bg-black rounded-full opacity-50 -bottom-10 left-10 hover:opacity-80"
                            >
                                <CameraIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-x-10">
                                <div>
                                    <Label htmlFor="name">
                                        <span className="text-rose-500">*</span>
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.name} />
                                </div>

                                <div className="mt-5 md:mt-0">
                                    <Label htmlFor="email">
                                        <span className="text-rose-500">*</span>
                                        Email
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.email} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                <div>
                                    <Label htmlFor="nik">
                                        <span className="text-rose-500">*</span>
                                        NIK
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="nik"
                                        type="text"
                                        name="nik"
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData("nik", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.nik} />
                                </div>

                                <div className="mt-5 md:mt-0">
                                    <Label htmlFor="tanggal_lahir">
                                        <span className="text-rose-500">*</span>
                                        Tanggal Lahir
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="tanggal_lahir"
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_lahir",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.tanggal_lahir}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                <div>
                                    <Label htmlFor="tempat_lahir">
                                        <span className="text-rose-500">*</span>
                                        Tempat Lahir
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="tempat_lahir"
                                        type="text"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                        onChange={(e) =>
                                            setData(
                                                "tempat_lahir",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError message={errors.tempat_lahir} />
                                </div>

                                <div className="mt-5 md:mt-0">
                                    <Label htmlFor="jenis_kelamin">
                                        <span className="text-rose-500">*</span>
                                        Jenis Kelamin
                                    </Label>
                                    <Select
                                        onValueChange={(e) =>
                                            setData("jenis_kelamin", e)
                                        }
                                        defaultValue={data.jenis_kelamin}
                                    >
                                        <SelectTrigger className="mt-2 bg-white">
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pria">
                                                Pria
                                            </SelectItem>
                                            <SelectItem value="wanita">
                                                Wanita
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        message={errors.jenis_kelamin}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                <div>
                                    <Label htmlFor="no_hp">
                                        <span className="text-rose-500">*</span>
                                        Nomor Hp
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="no_hp"
                                        type="text"
                                        name="no_hp"
                                        value={data.no_hp}
                                        onChange={(e) =>
                                            setData("no_hp", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.no_hp} />
                                </div>

                                <div className="mt-5 md:mt-0">
                                    <Label htmlFor="umur">
                                        <span className="text-rose-500">*</span>
                                        Umur
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="umur"
                                        type="number"
                                        name="umur"
                                        value={data.umur}
                                        onChange={(e) =>
                                            setData("umur", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.umur} />
                                </div>
                            </div>

                            {auth?.user?.role === "dokter" && (
                                <div className="grid grid-cols-1 gap-x-10">
                                    <div>
                                        <Label htmlFor="spesialis">
                                            Spesialis
                                        </Label>
                                        <Input
                                            className="mt-2"
                                            id="spesialis"
                                            type="text"
                                            name="spesialis"
                                            placeholder="Kandungan, gigi, dalam."
                                            value={data.spesialis}
                                            onChange={(e) =>
                                                setData(
                                                    "spesialis",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.spesialis}
                                        />
                                    </div>
                                </div>
                            )}

                            {auth?.user?.role === "pasien" && (
                                <div className="grid grid-cols-1 gap-x-10">
                                    <div>
                                        <Label htmlFor="riwayat_penyakit">
                                            Riwayat Penyakit
                                        </Label>
                                        <Input
                                            className="mt-2"
                                            id="riwayat_penyakit"
                                            type="text"
                                            name="riwayat_penyakit"
                                            placeholder="Asam Lambung, mag, ginjal."
                                            value={data.riwayat_penyakit}
                                            onChange={(e) =>
                                                setData(
                                                    "riwayat_penyakit",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.riwayat_penyakit}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-x-10">
                                <div>
                                    <Label htmlFor="alamat">
                                        <span className="text-rose-500">*</span>
                                        Alamat
                                    </Label>
                                    <Textarea
                                        className="mt-2 bg-white"
                                        id="alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.alamat} />
                                </div>
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

export default Profile;
