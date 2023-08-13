import React from "react";
import { Link } from "@inertiajs/react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment/moment";

function Detail({ isShowDetail, setIsShowDetail, detailData, setDetailData }) {
    return (
        <Dialog
            open={isShowDetail}
            onOpenChange={(isOpen) => {
                setIsShowDetail(isOpen);
                if (!isOpen) {
                    setDetailData(null);
                    setIsShowDetail(false);
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Detail Dokter
                        <Separator className="my-5" />
                    </DialogTitle>
                    <div>
                        {/* photo */}
                        <div className="relative flex justify-center w-full h-32 mt-1 bg-cover bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-xl">
                            <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-slate-900 bg-slate-900">
                                <img
                                    className="w-full h-full rounded-full"
                                    src={`/avatars/${detailData.user.image}`}
                                    alt="Photo Profile"
                                />
                            </div>
                        </div>
                        {/* header */}
                        <div className="flex flex-col items-center mt-16">
                            <h4 className="text-xl font-bold ">
                                {detailData.user.name}
                            </h4>
                            <p className="text-base font-normal text-center">
                                {detailData.umur} Tahun <br />
                                {detailData.spesialis}
                            </p>
                        </div>

                        {/* body */}
                        <div className="mt-5">
                            <Tabs
                                defaultValue="Data Pribadi"
                                className="w-full "
                            >
                                <TabsList className="w-full">
                                    <TabsTrigger value="Data Pribadi">
                                        Data Pribadi
                                    </TabsTrigger>
                                    <TabsTrigger value="Data Rekam Medis">
                                        Data Rekam Medis
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="Data Pribadi">
                                    <ScrollArea className="h-[300px] rounded-md border p-4">
                                        <div className="mt-3">
                                            <Label htmlFor="nik">NIK</Label>
                                            <Input
                                                id="nik"
                                                type="text"
                                                value={detailData.nik}
                                                disabled
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Label htmlFor="no_hp">No Hp</Label>
                                            <Input
                                                id="no_hp"
                                                type="text"
                                                value={detailData.no_hp}
                                                disabled
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Label htmlFor="tanggal_lahir">
                                                Tanggal Lahir
                                            </Label>
                                            <Input
                                                id="tanggal_lahir"
                                                type="text"
                                                value={detailData.tanggal_lahir}
                                                disabled
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Label htmlFor="tempat_lahir">
                                                Tempat lahir
                                            </Label>
                                            <Input
                                                id="tempat_lahir"
                                                type="text"
                                                value={detailData.tempat_lahir}
                                                disabled
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Label htmlFor="jenis_kelamin">
                                                Jenis Kelamin
                                            </Label>
                                            <Input
                                                id="jenis_kelamin"
                                                type="text"
                                                value={detailData.jenis_kelamin}
                                                disabled
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <Label htmlFor="alamat">
                                                Alamat
                                            </Label>
                                            <Input
                                                id="alamat"
                                                type="text"
                                                value={detailData.alamat}
                                                disabled
                                            />
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent value="Data Rekam Medis">
                                    <ScrollArea className="h-[300px] rounded-md border p-4">
                                        {detailData?.rekam_medis.length > 0
                                            ? detailData?.rekam_medis.map(
                                                  (item) => (
                                                      <Link
                                                          href={route(
                                                              "rekam-medis.show",
                                                              item.id
                                                          )}
                                                          key={item.id}
                                                      >
                                                          <div className="w-full p-4 text-white border border-gray-100 rounded-md shadow-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                                                              <div className="flex items-center justify-between gap-x-3">
                                                                  <div>
                                                                      {moment(
                                                                          item.created_at
                                                                      ).format(
                                                                          "DD-MM-YYYY"
                                                                      )}
                                                                  </div>
                                                                  <div>
                                                                      {
                                                                          item
                                                                              .pelayanan
                                                                              .nama_pelayanan
                                                                      }
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </Link>
                                                  )
                                              )
                                            : "Belum ada data"}
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default Detail;
