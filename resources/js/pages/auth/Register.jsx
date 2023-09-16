import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import GuestLayout from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function Register() {
    const { klinik } = usePage().props;
    const [showPassword, setShowPassword] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        nik: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        no_hp: "",
        alamat: "",
        umur: "",
        riwayat_penyakit: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("register.store"));
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    React.useEffect(() => {
        const age = calculateAge(data.tanggal_lahir);
        setData("umur", age.toString());
    }, [data.tanggal_lahir]);

    return (
        <GuestLayout>
            <Head title="Register" />
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <Card className="w-full rounded-lg shadow-2xl sm:max-w-md">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center justify-center">
                            <Link href={route("home")}>
                                <img
                                    src={`/logo/${klinik?.logo}`}
                                    alt="Logo"
                                    className="w-32 h-32 rounded-full"
                                />
                            </Link>

                            <span className="mt-3">Pendaftaran Pasien</span>
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={onSubmit}>
                        <CardContent className="space-y-4 md:space-y-6">
                            {/* nama */}
                            <div>
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="Masukkan nama lengkap anda"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError message={errors.name} />
                            </div>

                            {/* email */}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError message={errors.email} />
                            </div>

                            {/* password */}
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        id="showPassword"
                                        name="showPassword"
                                        aria-label="showPassword"
                                        className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* nik */}
                            <div>
                                <Label htmlFor="nik">NIK</Label>
                                <Input
                                    id="nik"
                                    type="text"
                                    name="nik"
                                    autoComplete="nik"
                                    placeholder="Masukkan NIK anda"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData("nik", e.target.value)
                                    }
                                />

                                <InputError message={errors.nik} />
                            </div>

                            {/* tanggal_lahir */}
                            <div>
                                <Label htmlFor="tanggal_lahir">
                                    Tanggal Lahir
                                </Label>
                                <Input
                                    id="tanggal_lahir"
                                    type="date"
                                    name="tanggal_lahir"
                                    autoComplete="tanggal_lahir"
                                    placeholder="Example"
                                    value={data.tanggal_lahir}
                                    onChange={(e) =>
                                        setData("tanggal_lahir", e.target.value)
                                    }
                                />

                                <InputError message={errors.tanggal_lahir} />
                            </div>

                            {/* tempat_lahir */}
                            <div>
                                <Label htmlFor="tempat_lahir">
                                    Tempat Lahir
                                </Label>
                                <Input
                                    id="tempat_lahir"
                                    type="text"
                                    name="tempat_lahir"
                                    autoComplete="tempat_lahir"
                                    placeholder="Masukkan tempat lahir anda"
                                    value={data.tempat_lahir}
                                    onChange={(e) =>
                                        setData("tempat_lahir", e.target.value)
                                    }
                                />

                                <InputError message={errors.tempat_lahir} />
                            </div>

                            {/* no_hp */}
                            <div>
                                <Label htmlFor="no_hp">No HP</Label>
                                <Input
                                    id="no_hp"
                                    type="number"
                                    name="no_hp"
                                    autoComplete="no_hp"
                                    placeholder="Masukkan dengan format 08..."
                                    value={data.no_hp}
                                    onChange={(e) =>
                                        setData("no_hp", e.target.value)
                                    }
                                />

                                <InputError message={errors.no_hp} />
                            </div>

                            {/* umur */}
                            <div>
                                <Label htmlFor="umur">Umur</Label>
                                <div className="relative">
                                    <Input
                                        id="umur"
                                        type="text"
                                        name="umur"
                                        autoComplete="umur"
                                        placeholder="Example"
                                        value={data.umur}
                                        disabled
                                        onChange={(e) =>
                                            setData("umur", e.target.value)
                                        }
                                    />
                                    <span className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary">
                                        Tahun
                                    </span>
                                </div>

                                <InputError message={errors.umur} />
                            </div>

                            {/* jenis_kelamin */}
                            <div>
                                <Label htmlFor="jenis_kelamin">
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

                                <InputError message={errors.jenis_kelamin} />
                            </div>

                            {/* alamat */}
                            <div>
                                <Label htmlFor="alamat">Alamat</Label>
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
                        </CardContent>
                        <CardFooter>
                            {/* button */}
                            <Button
                                className="flex items-center justify-center w-full gap-3"
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader2 className="animate-spin" />
                                )}
                                Register
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-10">
                    <span>Sudah punya akun? </span>
                    <Link
                        href={route("login")}
                        className="text-blue-500 hover:underline"
                    >
                        login disini
                    </Link>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Register;
