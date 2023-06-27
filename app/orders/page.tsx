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

metadata.title = "MaraComp | Componentes";
export default function Page() {
  // Create pagination for components list 10 per page function
  const [currentPage, setCurrentPage] = useState(1);
  const [componentsPerPage, setComponentsPerPage] = useState(5);
  const { orders, setOrders } = useContext<any>(StateContext);
  const { suppliers, setSuppliers } = useContext<any>(StateContext);
  const [ordersInRange, setOrdersInRange] = useState<any>([]);
  const [dateMinIsSelected, setDateMinIsSelected] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [dateMin, setDateMin] = useState<any>(null);
  const [selectedDateMin, setSelectedDateMin] = useState<any>("");
  const [selectedDateMax, setSelectedDateMax] = useState<any>("");
  useEffect(() => {
    setDateMin(new Date());
  }, []);

  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentOrders =
    isFiltering != true
      ? orders.slice(indexOfFirstComponent, indexOfLastComponent)
      : ordersInRange.slice(indexOfFirstComponent, indexOfLastComponent);
  const pageNumbers = Math.ceil(ordersInRange.length / componentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    console.log(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  const handleResetDate = () => {
    setSelectedDateMin("");
    setSelectedDateMax("");
  };

  const handleMinDate = (event: any) => {
    const date = new Date(event.target.value);
    const dateISO = date.toISOString().split("T")[0];
    setDateMin(dateISO);
    setDateMinIsSelected(true);
  };

  const handleSortOrder = (event: any) => {
    const dateLimit = new Date(event.target.value);
    const dateLimil = dateLimit.toISOString().split("T")[0];

    // Filtrar las órdenes que se encuentren entre dateMin y dateLimil
    const _ordersInRange = orders.filter((order: any) => {
      const orderDate = new Date(order.date);
      const orderDateISO = orderDate.toISOString().split("T")[0];
      console.log(`${dateMin} entre ${orderDateISO} entre ${dateLimil}`);
      return orderDateISO >= dateMin && orderDateISO <= dateLimil;
    });
    console.log(_ordersInRange);
    setIsFiltering(true);
    setOrdersInRange(_ordersInRange);
  };

  const handleDelete = async (code: any, index: number) => {
    const res = await axios.delete(
      `https://api-maracomp-production-864a.up.railway.app/detailorder/${code}`
    );
    res.status < 300
      ? toast.success("Se ha eliminado la orden y sus detalles exitosamente")
      : toast.error("Ha ocurrido un error tratando de eliminar la orden");
    orders.splice(index, 1);
    setOrders([...orders]);
    setIsFiltering(false);
    handleResetDate();
  };

  return (
    <div className="relative bg-gray-700 w-full min-h-[90%] flex items-center justify-center">
      <div className={`w-10/12 sm:h-5/6 md:4/6 bg-white rounded-[10px]`}>
        <div className="flex flex-row w-full px-20 py-10 justify-between">
          <div>
            <h2 className="font-bold text-3xl text-black">Ordenes Generadas</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Ordenes generadas automátaticamente.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-end">
              <CreateOrderRequest></CreateOrderRequest>
            </div>
            <div className="mt-4 flex flex-row gap-x-3 items-center justify-center">
              <div>
                <button
                  onClick={() => {
                    setIsFiltering(false);
                    handleResetDate();
                  }}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Limpiar
                </button>
              </div>
              <div>
                <input
                  type="date"
                  value={selectedDateMin}
                  className="rounded-[10px] text-black"
                  onChange={(event) => {
                    handleMinDate(event);
                    setSelectedDateMin(event.target.value);
                  }}
                />
              </div>
              <p className="text-black">hasta</p>
              <div>
                <input
                  type="date"
                  disabled={dateMinIsSelected != true ? true : false}
                  className="rounded-[10px] text-black"
                  min={dateMin}
                  value={selectedDateMax}
                  onChange={(event) => {
                    handleSortOrder(event);
                    setSelectedDateMax(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-4/6 w-full flex flex-col justify-center items-center rounded-[10px]">
          <div className="overflow-x-auto w-full h-full px-20">
            <table className={`table table-fixed text-black w-full`}>
              {/* head */}
              <thead>
                <tr className="border-transparent">
                  <th className=" text-black font-bold text-lg ">Código</th>
                  <th className=" text-black font-bold text-lg ">Suplidor</th>
                  <th className=" text-black font-bold text-lg ">
                    Fecha Límite
                  </th>
                  <th className=" text-black font-bold text-lg ">Estado</th>
                  <th className=" text-black font-bold text-lg ">Total</th>
                  <th className=" text-black font-bold text-lg text-right">
                    Acción
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
                  currentOrders.map((order: any, index: any) => (
                    <tr key={index} className="border-transparent">
                      <td className="text-ellipsis">{order.code}</td>
                      <td className="text-ellipsis">
                        {
                          suppliers.find(
                            (supplier: any) => supplier._id === order.supplierId
                          )?.name
                        }
                      </td>
                      <td className="text-ellipsis">
                        {formatDate(order.date)}
                      </td>
                      <td className="text-ellipsis ">{order.status}</td>
                      <td className="text-ellipsis ">RD$ {order.total}</td>
                      <td className="flex flex-row  space-x-4 justify-end items-center">
                        <DetailOrder code={order.code} />
                        <button
                          className="bg-red-600 hover:bg-red-700 duration-300 p-3 rounded-md"
                          onClick={() => {
                            handleDelete(order.code, index);
                          }}
                        >
                          <TrashIcon
                            className="
                                  w-6
                                  text-white"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-end">
            {/* Agregar los botones de paginación aquí */}
            {orders.length > componentsPerPage && (
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
                  disabled={indexOfLastComponent >= orders.length}
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
