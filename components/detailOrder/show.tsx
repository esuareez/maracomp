"use client";
import React, { useState, useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
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
  EyeIcon
} from "@heroicons/react/24/outline";
import { clone } from "chart.js/dist/helpers/helpers.core";

export default function DetailOrder({ code }: { code: any }) {
    const _code = Number(code)
    const [components, setComponents] = useState<any[]>([]);
    const [_store, setStore] = useState<any>([]);
    const[orderDetails, setOrderDetails] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [componentsPerPage, setComponentsPerPage] = useState(3);

  // Obtener todos los detalles de la orden
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/component"
      );
      setComponents(data);
    };
    fetchData();
  }, []);

  // Obtener los almacenes de un componente
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api-maracomp-production-864a.up.railway.app/store`
      );
      setStore(data);
    };
    fetchData();
  });
    
    // Obtener todos los detalles de la orden
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api-maracomp-production-864a.up.railway.app/detailorder/${_code}`
      );
        setOrderDetails(data);
        console.log(data)
    };
    fetchData();
  }, []);

  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentOrderDetails = orderDetails.slice(
    indexOfFirstComponent,
    indexOfLastComponent
  );
  const pageNumbers = Math.ceil(orderDetails.length / componentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <Popup
      trigger={
        <button className="bg-verde hover:bg-verdeOscuro duration-300 p-3 rounded-md">
                          <EyeIcon
                            className="
                                  w-6
                                  text-white"
                          />
                        </button>
      }
      modal
      nested
    >
      {/* @ts-ignore */}
      {(close) => (
        <>
          <div className="w-11/12 h-5/6 m-10 ">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-bold text-3xl text-black">
                Detalle de la orden: {code}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Componentes de la orden {code}
              </p>

              {/* TABLA DE COMPONENTES SELECCIONADOS PARA DESPACHAR */}

              <div className="h-4/6 w-full flex flex-col justify-center items-center rounded-[10px]">
                <div className="overflow-x-auto w-full h-full mt-6">
                  <table className={`table table-fixed text-black`}>
                    {/* head */}
                    <thead>
                      <tr className="border-transparent">
                        <th className=" text-black font-bold text-lg ">
                          Componente
                                              </th>
                                              <th className=" text-black font-bold text-lg ">
                          Unidad
                        </th>
                        <th className=" text-black font-bold text-lg ">
                          Almacén
                        </th>
                        <th className=" text-black font-bold text-lg ">
                          Cantidad
                        </th>
                        <th className=" text-black font-bold text-lg ">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* body */}
                      {currentOrderDetails.map(
                        (orderDetail: any, index: number) => (
                          <tr key={index} className="border-transparent ">
                            <td>
                              {
                                components.find(
                                  (comp) => comp._id === orderDetail.componentId
                                )?.description
                              }
                                  </td>
                                  <td>
                              {
                                components.find(
                                  (comp) => comp._id === orderDetail.componentId
                                )?.unit
                              }
                            </td>
                            <td>
                              {
                                _store.find(
                                  (store: any) =>
                                    store._id === orderDetail.storeId
                                )?.description
                              }
                            </td>
                                  <td>{orderDetail.quantity}</td>
                                  <td>RD$ {orderDetail.total}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-end">
                  {/* Agregar los botones de paginación aquí */}
                  {orderDetails.length > componentsPerPage && (
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
                        disabled={
                          indexOfLastComponent >= orderDetails.length
                        }
                      >
                        <ChevronDoubleRightIcon className="h-6 w-6 text-black hover:text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  close();
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
          <ToastContainer></ToastContainer>
        </>
      )}
    </Popup>
  );
}
