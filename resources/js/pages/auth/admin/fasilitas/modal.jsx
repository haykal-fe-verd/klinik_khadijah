import React from "react";
import { Info, Loader2 } from "lucide-react";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";

function Modal({ isEdit, onSubmit, setData, data, errors, processing }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Fasilitas
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* nama fasilitas */}
                    <div>
                        <Label htmlFor="nama_fasilitas">
                            <span className="text-rose-500">*</span>
                            Nama Fasilitas
                        </Label>
                        <Input
                            type="text"
                            id="nama_fasilitas"
                            name="nama_fasilitas"
                            className="mt-2"
                            value={data.nama_fasilitas}
                            onChange={(e) =>
                                setData("nama_fasilitas", e.target.value)
                            }
                        />
                        <InputError message={errors.nama_fasilitas} />
                    </div>

                    {/* icon */}
                    <div>
                        <Label
                            htmlFor="icon"
                            className="flex items-center justify-between"
                        >
                            <div>
                                <span className="text-rose-500">*</span>
                                Icon
                            </div>
                            <div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-5 h-5" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Silahkan kunjungi{" "}
                                                <span className="text-sky-500">
                                                    https://www.svgrepo.com/
                                                </span>{" "}
                                                lalu cari dan pilih icon yang
                                                digunakan, kemudian copy svg,
                                                pastekan pada inputan.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="icon"
                            name="icon"
                            value={data.icon}
                            onChange={(e) => setData("icon", e.target.value)}
                        />
                        <InputError message={errors.icon} />
                    </div>

                    <div>
                        <Label htmlFor="deskripsi">
                            <span className="text-rose-500">*</span>
                            Deskripsi
                        </Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="deskripsi"
                            name="deskripsi"
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                        />

                        <InputError message={errors.deskripsi} />
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
        </DialogContent>
    );
}

export default Modal;
