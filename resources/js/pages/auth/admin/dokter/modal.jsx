import React from "react";
import { Info, Loader2 } from "lucide-react";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

function Modal({ isEdit, onSubmit, setData, data, errors, processing }) {
    return (
        <DialogContent className="h-full max-w-lg lg:max-w-5xl lg:h-fit">
            <ScrollArea className="px-4">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit" : "Tambah"} Dokter
                        <Separator className="my-5" />
                    </DialogTitle>
                    <form onSubmit={onSubmit} className="px-2 space-y-5">
                        <div className="flex flex-col lg:flex-row lg:space-x-5">
                            {/* left */}
                            <div className="flex-grow space-y-5">
                                {/* nama */}
                                <div>
                                    <Label htmlFor="name">
                                        <span className="text-rose-500">*</span>
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="mt-2"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* nik */}
                                <div>
                                    <Label htmlFor="nik">
                                        <span className="text-rose-500">*</span>
                                        NIK
                                    </Label>
                                    <Input
                                        type="text"
                                        id="nik"
                                        name="nik"
                                        className="mt-2"
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
                                        <span className="text-rose-500">*</span>
                                        Tanggal Lahir
                                    </Label>
                                    <Input
                                        type="date"
                                        id="tanggal_lahir"
                                        name="tanggal_lahir"
                                        className="mt-2"
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

                                {/* jenis_kelamin */}
                                <div>
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

                                {/* no_hp */}
                                <div>
                                    <Label htmlFor="no_hp">
                                        <span className="text-rose-500">*</span>
                                        No Hp
                                    </Label>
                                    <Input
                                        type="text"
                                        id="no_hp"
                                        name="no_hp"
                                        className="mt-2"
                                        value={data.no_hp}
                                        onChange={(e) =>
                                            setData("no_hp", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.no_hp} />
                                </div>
                            </div>

                            {/* right */}
                            <div className="flex-grow space-y-5">
                                {/* email */}
                                <div>
                                    <Label htmlFor="email">
                                        <span className="text-rose-500">*</span>
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-2"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* no_bpjs */}
                                <div>
                                    <Label htmlFor="spesialis">
                                        <span className="text-rose-500">*</span>
                                        Spesialis
                                    </Label>
                                    <Input
                                        type="text"
                                        id="spesialis"
                                        name="spesialis"
                                        className="mt-2"
                                        value={data.spesialis}
                                        onChange={(e) =>
                                            setData("spesialis", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.spesialis} />
                                </div>

                                {/* tempat_lahir */}
                                <div>
                                    <Label htmlFor="tempat_lahir">
                                        <span className="text-rose-500">*</span>
                                        Tempat Lahir
                                    </Label>
                                    <Input
                                        type="text"
                                        id="tempat_lahir"
                                        name="tempat_lahir"
                                        className="mt-2"
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

                                {/* umur */}
                                <div>
                                    <Label htmlFor="umur">
                                        <span className="text-rose-500">*</span>
                                        Umur
                                    </Label>
                                    <Input
                                        type="number"
                                        id="umur"
                                        name="umur"
                                        className="mt-2"
                                        value={data.umur}
                                        onChange={(e) =>
                                            setData("umur", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.umur} />
                                </div>
                            </div>
                        </div>

                        {/* alamat */}
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

                        <Button
                            className="flex items-center justify-center gap-3"
                            disabled={processing}
                        >
                            {processing && <Loader2 className="animate-spin" />}
                            Simpan
                        </Button>
                    </form>
                </DialogHeader>
            </ScrollArea>
        </DialogContent>
    );
}

export default Modal;
