"use client";
import Image from "next/image";
import RootLayout from "./layout";
import { metadata } from "./layout";
import "material-icons/iconfont/material-icons.css";
import Dona from "@/components/doughtnut";
import Linea from "@/components/linear";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CreateComponent from "@/components/createC";
import CreateStore from "@/components/store/create";
import CreateSupplier from "@/components/supplier/create";
import CreateDispach from "@/components/dispach/create";
import CreateOrderRequest from "@/components/orderRequest/create";
import { StateContext, StateProvider } from "@/components/context/mainData";

metadata.title = "MaraComp | Inicio";
export default function Home() {
  const [open, setOpen] = useState("hidden");
  const { orderTotal, setOrderTotal } = useContext<any>(StateContext);
  const { estimatedOrder, setEstimatedOrder } = useContext<any>(StateContext);
  const { topStorages, setTopStorages } = useContext<any>(StateContext);
  const { bestSellers, setBestSellers } = useContext<any>(StateContext);

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
                  <Dona total={orderTotal} />
                </div>
              </div>
            </div>
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-3 w-full h-full bg-gradient-to-tl from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Ordenes Completadas
                </h1>
                <h1 className="text-4xl text-white font-black">{orderTotal[2]}</h1>
              </div>
              <div className="row-span-3 w-full h-full bg-gradient-to-bl from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Ordenes Pendientes
                </h1>
                <h1 className="text-4xl text-white font-black">{orderTotal[1] }</h1>
              </div>
            </div>
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-3 w-full h-full bg-gradient-to-tr from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 shadow-2xl font-semibold">
                  Estimado en Órdenes
                </h1>
                <h1 className="text-4xl text-white font-black ">RD$ { estimatedOrder}</h1>
              </div>
              <div className="row-span-3 w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Total Comprado
                </h1>
                <h1 className="text-4xl text-white font-black">-</h1>
              </div>
            </div>
          </div>
          {/* Cuadro de estadistica */}
          <div className="row-span-2 grid grid-rows md:grid-cols-12 gap-4 ">
            
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-6 w-full h-full bg-gradient-to-tl from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  TOP 5 Almacenes
                </h1>
                <ul>
                {topStorages.map((storage: any) => (
                  <li className="text-md text-white font-black">{ storage.description}</li>
                ))}
                </ul>
              </div>
            </div>
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-6 w-full h-full bg-gradient-to-tl from-yellow-400 to-amber-500 from-50% rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-lg text-white/80 drop-shadow font-semibold">
                  Componente más Vendido
                </h1>
                <h1 className="text-2xl text-white font-black">{ bestSellers.description}</h1>
              </div>
            </div>
            <div className="col-span-4 gap-4 shadow grid grid-rows-6">
              <div className="row-span-6 w-full h-full bg-verde rounded-[10px] shadow flex flex-col items-center justify-center">
                <h1 className=" text-2xl text-white/80 drop-shadow font-semibold">
                  Integrantes
                </h1>
                <h1 className="text-lg text-white font-black">Eliam Pimentel</h1>
                <h1 className="text-lg text-white font-black">Luis Mota</h1>
                <h1 className="text-lg text-white font-black">Diana Monegro</h1>
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
