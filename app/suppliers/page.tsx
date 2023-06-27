"use client";

import CreateComponent from "@/components/createC";
import Link from "next/link";
import { use } from "react";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { metadata } from "../layout";
import axios from "axios";
import { UserCircleIcon, Bars3Icon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import CreateStore from "@/components/store/create";
import CreateSupplier from "@/components/supplier/create";

metadata.title = "MaraComp | Componentes";
export default function Page() {
  // Create pagination for components list 10 per page function
  const [currentPage, setCurrentPage] = useState(1);
  const [componentsPerPage, setComponentsPerPage] = useState(6);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/supplier"
      );
      setSuppliers(data);
    };
    fetchComponents();
  }, []);
  
  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentComponents = suppliers.slice(
    indexOfFirstComponent,
    indexOfLastComponent
  );
  const pageNumbers = suppliers.length / componentsPerPage;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="relative bg-gray-700 w-full min-h-[90%] flex items-center justify-center">
      <div className={`w-10/12 sm:h-5/6 md:4/6 bg-white rounded-[10px]`}>
        <div className="">
          <div className="grid grid-cols-12">
            <div className="col-span-8 p-10">
              <h2 className="font-bold text-3xl text-black">Suplidores</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Suplidores registrado en la empresa.
              </p>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col items-end justify-center h-5/6 w-10/12 pt-10 gap-y-2">
                <CreateSupplier></CreateSupplier>
              </div>
            </div>
          </div>
        </div>
      
        <div className="h-4/6 w-full flex flex-col justify-center items-center rounded-[10px]">
          <div className="overflow-x-auto w-10/12 h-full">
            <table className={`table text-black`}>
              {/* head */}
              <thead>
                <tr>
                  <th className="col-span-4 text-black font-bold text-lg ">Nombre</th>
                                  <th className="col-span-2 text-black font-bold text-lg ">RNC</th>
                                  <th className="col-span-2 text-black font-bold text-lg ">Ciudad</th>
                                  <th className="col-span-2 text-black font-bold text-lg ">Direccion</th>
                  <th className="col-span-2 text-black font-bold text-lg ">Acción</th>
                </tr>
              </thead>
              <tbody>
                {/* Renderizar los componentes de la página actual tomando en cuenta que los atributos de component son solamente
                    description y unit*/}
                {currentComponents.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Sin datos</td>
                  </tr>
                ) : (
                  currentComponents.map((component, index) => (
                    <tr key={index}>
                        <td className="text-ellipsis col-span-4 w-6/12">{component.name}</td>
                          <td className="text-ellipsis col-span-2 w-6/12">{component.rnc}</td>
                          <td className="text-ellipsis col-span-2 w-6/12">{component.ciudad}</td>
                          <td className="text-ellipsis col-span-2 w-6/12">{component.direccion}</td>
                        <td className="col-span-2 w-6/12"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-end">
                {/* Agregar los botones de paginación aquí */}
                {suppliers.length > componentsPerPage && (
                  <div className="flex flex-row">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronDoubleLeftIcon className="h-6 w-6 text-black hover:text-gray-500" />
                    </button>
                    <p className="text-black font-medium">{currentPage}/{pageNumbers}</p>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={indexOfLastComponent >= suppliers.length}
                    >
                      <ChevronDoubleRightIcon className="h-6 w-6 text-black hover:text-gray-500" />
                    </button>
                  </div>
                )}
              </div>
        </div>
        
      </div>
    </div>
  );
}
