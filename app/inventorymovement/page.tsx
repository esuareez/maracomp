"use client";

import CreateComponent from "@/components/createC";
import Link from "next/link";
import { use, useContext } from "react";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { metadata } from "../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  UserCircleIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import CreateStore from "@/components/store/create";
import CreateSupplier from "@/components/supplier/create";
import CreateOrderRequest from "@/components/orderRequest/create";
import DetailOrder from "@/components/detailOrder/show";
import { StateContext } from "@/components/context/mainData";
import CreateDispach from "@/components/dispach/create";

metadata.title = "MaraComp | Componentes";
export default function Page() {
  // Create pagination for components list 10 per page function
  const [currentPage, setCurrentPage] = useState(1);
  const [componentsPerPage, setComponentsPerPage] = useState(5);
  const { inventorymovement, setInventoryMovement } =
    useContext<any>(StateContext);
  const { suppliers, setSuppliers } = useContext<any>(StateContext);
  const { stores, setStores } = useContext<any>(StateContext);
  const { components, setComponents } = useContext<any>(StateContext);

  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentOrders = inventorymovement.slice(
    indexOfFirstComponent,
    indexOfLastComponent
  );
  const pageNumbers = Math.ceil(inventorymovement.length / componentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  return (
    <div className="relative bg-gray-700 w-full min-h-[90%] flex items-center justify-center">
      <div className={`w-10/12 sm:h-5/6 md:4/6 bg-white rounded-[10px]`}>
        <div className="flex flex-row w-full px-20 py-10 justify-between">
          <div>
            <h2 className="font-bold text-3xl text-black">
              Movimientos del Inventario
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Entrada y salida de los componentes del inventario.
            </p>
          </div>
          <div>
            <div>
              <CreateDispach></CreateDispach>
            </div>
          </div>
        </div>

        <div className="h-4/6 w-full flex flex-col justify-center items-center rounded-[10px]">
          <div className="overflow-x-auto w-full h-full px-20">
            <table className={`table table-fixed text-black w-full`}>
              {/* head */}
              <thead>
                <tr className="border-transparent">
                  <th className=" text-black font-bold text-lg text-center">
                    Componente
                  </th>
                  <th className=" text-black font-bold text-lg text-center">
                    Almacén
                  </th>
                  <th className=" text-black font-bold text-lg text-center">
                    Unidad
                  </th>
                  <th className=" text-black font-bold text-lg text-center">
                    Fecha
                  </th>
                  <th className=" text-black font-bold text-lg text-center">
                    Tipo
                  </th>
                  <th className=" text-black font-bold text-lg text-center">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Renderizar los componentes de la página actual tomando en cuenta que los atributos de component son solamente
                    description y unit*/}
                {currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Sin datos</td>
                  </tr>
                ) : (
                  currentOrders.map((movement: any, index: any) => (
                    <tr key={index} className="border-transparent text-center">
                      <td className="text-ellipsis">
                        {
                          components.find(
                            (comp: any) =>
                              comp._id === movement.detail[0].idComponent
                          )?.description
                        }
                      </td>
                      <td className="text-ellipsis text-center">
                        {
                          stores.find(
                            (store: any) => store._id === movement.idStore
                          )?.description
                        }
                      </td>
                      <td className="text-ellipsis text-center">
                        {
                          components.find(
                            (comp: any) =>
                              comp._id === movement.detail[0].idComponent
                          )?.unit
                        }
                      </td>
                      <td className="text-ellipsis text-center">
                        {formatDate(movement.date)}
                      </td>
                      <td className="text-ellipsis text-center">
                        {movement.type}
                      </td>
                      <td className="text-ellipsis text-center">
                        {movement.detail[0].quantity}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-end">
            {/* Agregar los botones de paginación aquí */}
            {inventorymovement.length > componentsPerPage && (
              <div className="flex flex-row">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronDoubleLeftIcon className="h-6 w-6 text-black hover:text-gray-500" />
                </button>
                <p className="text-black font-medium">
                  {currentPage}/{pageNumbers}
                </p>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={indexOfLastComponent >= inventorymovement.length}
                >
                  <ChevronDoubleRightIcon className="h-6 w-6 text-black hover:text-gray-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
