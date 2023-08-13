import React from "react";
import { Info, Loader2 } from "lucide-react";
import Select from "react-select";

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
import { usePage } from "@inertiajs/react";

function Modal({ isEdit, onSubmit, setData, data, errors, processing }) {
    const { pelayanan } = usePage().props;
    const [pasien, setPasien] = React.useState([]);
    const [dokter, setDokter] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/v1/pasien")
            .then((response) => response.json())
            .then((data) => {
                const pasienOptions = data.map((pasien) => ({
                    value: pasien.nik,
                    label: pasien.user.name,
                }));
                setPasien(pasienOptions);
            });

        fetch("/api/v1/dokter")
            .then((response) => response.json())
            .then((data) => {
                const dokterOptions = data.map((dokter) => ({
                    value: dokter.nik,
                    label: dokter.user.name,
                }));
                setDokter(dokterOptions);
            });
    }, []);

    const PelayananOption = pelayanan.map((item) => ({
        value: item.id,
        label: item.nama_pelayanan,
    }));

    const StatusOptions = [
        { value: "menunggu", label: "menunggu" },
        { value: "diperiksa", label: "diperiksa" },
        { value: "selesai", label: "selesai" },
    ];

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Rekam Medis
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* pasien */}
                    <div>
                        <Label htmlFor="pasien_id">
                            <span className="text-rose-500">*</span>
                            Pasien
                        </Label>
                        <Select
                            id="pasien_id"
                            name="pasien_id"
                            options={pasien}
                            defaultValue={pasien.find(
                                (option) => option.value === data.pasien_id
                            )}
                            onChange={(selectedOption) =>
                                setData("pasien_id", selectedOption.value)
                            }
                        />
                        <InputError message={errors.pasien_id} />
                    </div>

                    {/* dokter */}
                    <div>
                        <Label htmlFor="dokter_id">
                            <span className="text-rose-500">*</span>
                            Dokter
                        </Label>
                        <Select
                            id="dokter_id"
                            name="dokter_id"
                            options={dokter}
                            defaultValue={dokter.find(
                                (option) => option.value === data.dokter_id
                            )}
                            onChange={(selectedOption) =>
                                setData("dokter_id", selectedOption.value)
                            }
                        />
                        <InputError message={errors.dokter_id} />
                    </div>

                    {/* pelayanan */}
                    <div>
                        <Label htmlFor="pelayanan_id">
                            <span className="text-rose-500">*</span>
                            Pelayanan
                        </Label>
                        <Select
                            id="pelayanan_id"
                            name="pelayanan_id"
                            options={PelayananOption}
                            defaultValue={PelayananOption.find(
                                (option) => option.value === data.pelayanan_id
                            )}
                            onChange={(selectedOption) =>
                                setData("pelayanan_id", selectedOption.value)
                            }
                        />
                        <InputError message={errors.pelayanan_id} />
                    </div>

                    {/* keluhan */}
                    <div>
                        <Label htmlFor="keluhan">
                            <span className="text-rose-500">*</span>
                            Keluhan
                        </Label>
                        <Input
                            type="text"
                            id="keluhan"
                            name="keluhan"
                            className="mt-2"
                            value={data.keluhan}
                            onChange={(e) => setData("keluhan", e.target.value)}
                        />
                        <InputError message={errors.keluhan} />
                    </div>

                    {/* status */}
                    {isEdit && (
                        <div>
                            <Label htmlFor="status">
                                <span className="text-rose-500">*</span>
                                Status
                            </Label>
                            <Select
                                id="status"
                                name="status"
                                options={StatusOptions}
                                defaultValue={StatusOptions.find(
                                    (option) => option.value === data.status
                                )}
                                onChange={(selectedOption) =>
                                    setData("status", selectedOption.value)
                                }
                            />
                            <InputError message={errors.status} />
                        </div>
                    )}
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
