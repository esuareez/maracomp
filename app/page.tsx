"use client";
import Image from "next/image";
import RootLayout from "./layout";
import { metadata } from "./layout";
import "material-icons/iconfont/material-icons.css";
import Dona from "@/components/doughtnut";
import Linea from "@/components/linear";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CreateComponent from "@/components/createC";
import CreateStore from "@/components/store/create";
import CreateSupplier from "@/components/supplier/create";
import CreateDispach from "@/components/dispach/create";
import CreateOrderRequest from "@/components/orderRequest/create";

metadata.title = "MaraComp | Inicio";
export default function Home() {
  const [open, setOpen] = useState("hidden");

  return (
    <div className="relative bg-gray-700 w-full min-h-[90%] flex flex-grow items-center justify-center">
      <div className="grid grid-rows md:grid-cols-12 w-full h-[90%] gap-8 mx-12">
        {/* Cuadro de la izquierda con estadisticas y datos */}
        <div className="col-span-8 w-full h-full grid grid-rows gap-4">
          {/* Dos filas encima de las estadisticas */}
          <div className="row-span-2 grid grid-rows md:grid-cols-12 gap-4 ">
            <div className="col-span-4 w-full h-full bg-verde  rounded-2xl shadow container mx-auto">
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl text-white/80 font-semibold ">
                  Ordenes
                </h1>
                <div className="w-60 h-60">
                  <Dona></Dona>
                </div>
              </div>
            </div>
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-3 w-full h-full bg-gradient-to-tl from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Ordenes Completadas
                </h1>
                <h1 className="text-4xl text-white font-black">12</h1>
              </div>
              <div className="row-span-3 w-full h-full bg-gradient-to-bl from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Ordenes Pendientes
                </h1>
                <h1 className="text-4xl text-white font-black">12</h1>
              </div>
            </div>
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-3 w-full h-full bg-gradient-to-tr from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 shadow-2xl font-semibold">
                  Total Vendido
                </h1>
                <h1 className="text-4xl text-white font-black">12</h1>
              </div>
              <div className="row-span-3 w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Total Comprado
                </h1>
                <h1 className="text-4xl text-white font-black">12</h1>
              </div>
            </div>
          </div>
          {/* Cuadro de estadistica */}
          <div
            className="row-span-4 bg-white rounded-[20px]"
            onClick={() => {
              open === "block" ? setOpen("hidden") : open;
            }}
          >
            <div className="grid grid-cols-12 p-5 h-full">
              <div className="col-span-10 ">
                <h1 className="font-bold text-3xl text-black">Estadística</h1>
                <div className="w-full h-5/6">
                  <Linea></Linea>
                </div>
              </div>
              <div className="col-span-2">
                <h1 className="font-bold text-3xl text-black grid grid-rows gap-4">
                  Filtrar por:
                </h1>
                {/* DROPDOWN DE OPCIONES */}
                <div className="relative inline-block text-left w-full pt-8 col-row-4">
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
                {/* DROPDOWN DE OPCIONES */}
                <div className="relative inline-block text-left w-full pt-8">
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Acceso directo (desaparece responsive) */}
        <div className="col-span-4 hidden md:block w-full h-full bg-white rounded-[20px]">
          <div className="p-10">
            <div className="flex flex-col gap-8">
              <div className="flex justify-center font-bold text-4xl text-black">
                Acceso Directo
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <CreateComponent></CreateComponent>
              </div>

              <div className="flex flex-col items-center justify-center h-full">
                <CreateStore></CreateStore>
              </div>

              <div className="flex flex-col items-center justify-center h-full">
                <CreateSupplier></CreateSupplier>
              </div>

              <div className="flex flex-col items-center justify-center h-full">
                <CreateOrderRequest></CreateOrderRequest>
              </div>

              <div className="flex flex-col items-center justify-center h-full">
                <CreateDispach></CreateDispach>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
