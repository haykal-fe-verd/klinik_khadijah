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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Modal({ onSubmit, setData, data, errors, processing }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit Periksa Pasien
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* status */}
                    <div>
                        <Label htmlFor="status">
                            <span className="text-rose-500">*</span>
                            Status
                        </Label>
                        <Select
                            onValueChange={(e) => setData("status", e)}
                            defaultValue={data.status}
                        >
                            <SelectTrigger className="mt-2 bg-white">
                                <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="menunggu">
                                    Menunggu
                                </SelectItem>
                                <SelectItem value="diperiksa">
                                    Sedang Diperiksa
                                </SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>

                    {/* diagnosa */}
                    <div>
                        <Label htmlFor="diagnosa">Diagnosa</Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="diagnosa"
                            name="diagnosa"
                            value={data.diagnosa}
                            onChange={(e) =>
                                setData("diagnosa", e.target.value)
                            }
                        />

                        <InputError message={errors.diagnosa} />
                    </div>

                    {/* resep_obat */}
                    <div>
                        <Label htmlFor="resep_obat">Resep Obat</Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="resep_obat"
                            name="resep_obat"
                            value={data.resep_obat}
                            onChange={(e) =>
                                setData("resep_obat", e.target.value)
                            }
                        />

                        <InputError message={errors.resep_obat} />
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
