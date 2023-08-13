import React from "react";
import { Loader2 } from "lucide-react";

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

function Modal({ isEdit, onSubmit, setData, dataForm, errors, processing }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Pelayanan
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* nama pelayanan */}
                    <div>
                        <Label htmlFor="nama_pelayanan">
                            <span className="text-rose-500">*</span>
                            Nama Pelayanan
                        </Label>
                        <Input
                            type="text"
                            id="nama_pelayanan"
                            name="nama_pelayanan"
                            className="mt-2"
                            value={dataForm.nama_pelayanan}
                            onChange={(e) =>
                                setData("nama_pelayanan", e.target.value)
                            }
                        />
                        <InputError message={errors.nama_pelayanan} />
                    </div>

                    {/* harga */}
                    <div>
                        <Label htmlFor="harga">
                            <span className="text-rose-500">*</span>
                            Harga
                        </Label>
                        <div className="relative mt-2 ">
                            <Input
                                type="text"
                                id="harga"
                                name="harga"
                                className="pl-14"
                                value={dataForm.harga}
                                onChange={(e) =>
                                    setData("harga", e.target.value)
                                }
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center p-3 text-white rounded-tl-md rounded-bl-md bg-slate-900">
                                Rp.
                            </div>
                        </div>
                        <InputError message={errors.harga} />
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
