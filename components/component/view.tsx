"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
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
  EyeIcon,
} from "@heroicons/react/24/outline";
import { clone } from "chart.js/dist/helpers/helpers.core";
import { StateContext } from "../context/mainData";

export default function ViewSupplierTime({ componentId }: any) {
  const { components, setComponents } = useContext<any>(StateContext);
  const { supplierTime, setSupplierTime } = useContext<any>(StateContext);
  const [supplierTimeOfComponent, setSupplierTimeOfComponent] = useState<any>(
    []
  );
  const { inventorymovement, setInventoryMovement } =
    useContext<any>(StateContext);
  const { suppliers, setSuppliers } = useContext<any>(StateContext);
  const [selectedComponents, setSelectedComponents] = useState<any>([]);
  const [maxQuantity, setMaxQuantity] = useState<any>(0);
  const { stores, setStores } = useContext<any>(StateContext);
  const [activeStore, setActiveStore] = useState<any>([]);
  const [activeComponent, setActiveComponent] = useState<any>();
  const [defaultStore, setDefaultStore] = useState(true);
  const [defaultOption, setDefaultOption] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [componentsPerPage, setComponentsPerPage] = useState(3);

  // Obtener todos los supplierTime con el mismo id del componente
  useEffect(() => {
    const allSupTime = supplierTime.filter(
      (supTime: any) => supTime.componentId === componentId
    );
    setSupplierTimeOfComponent(allSupTime);
    console.log(supplierTimeOfComponent);
  }, []);

  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentSuppliers = supplierTimeOfComponent.slice(
    indexOfFirstComponent,
    indexOfLastComponent
  );
  const pageNumbers = Math.ceil(
    supplierTimeOfComponent.length / componentsPerPage
  );

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
                Suplidores del Componente
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Detalles de los suplidores de este componente.
              </p>

              {/* TABLA DE COMPONENTES SELECCIONADOS PARA DESPACHAR */}

              <div className="h-4/6 w-full flex flex-col justify-center items-center rounded-[10px]">
                <div className="overflow-x-auto w-full h-full mt-6">
                  <table className={`table table-fixed text-black`}>
                    {/* head */}
                    <thead>
                      <tr className="border-transparent">
                        <th className=" text-black font-bold text-lg ">
                          Suplidor
                        </th>
                        <th className="col-span-2 text-black font-bold text-lg ">
                          Tiempo de entrega
                          <p className="text-gray-500">(en días)</p>
                        </th>
                        <th className="col-span-4 text-black font-bold text-lg ">
                          Precio
                        </th>
                        <th className="col-span-4 text-black font-bold text-lg ">
                          Descuento
                        </th>
                        <th className="col-span-4 text-black font-bold text-lg ">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* body */}
                      {currentSuppliers.map((supplier: any, index: number) => (
                        <tr key={index} className="border-transparent ">
                          <td>
                            {
                              suppliers.find(
                                (sup: any) => sup._id === supplier.supplierId
                              )?.name
                            }
                          </td>
                          <td>{supplier.deliveryTimeInDays}</td>
                          <td>{supplier.price}</td>
                          <td>{supplier.discount}</td>
                          <td>{supplier.state}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-end">
                  {/* Agregar los botones de paginación aquí */}
                  {selectedComponents.length > componentsPerPage && (
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
                          indexOfLastComponent >= selectedComponents.length
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
                Cancel
              </button>
            </div>
          </div>
          <ToastContainer></ToastContainer>
        </>
      )}
    </Popup>
  );
}
