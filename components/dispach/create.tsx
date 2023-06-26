"use client";
import React, { useState, useEffect } from "react";
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
} from "@heroicons/react/24/outline";
import { clone } from "chart.js/dist/helpers/helpers.core";

export default function CreateDispach() {
  const [components, setComponents] = useState<any[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<any>([]);
  const [maxQuantity, setMaxQuantity] = useState<any>(0);
  const [_store, setStore] = useState<any>([]);
  const [activeStore, setActiveStore] = useState<any>([]);
  const [activeComponent, setActiveComponent] = useState<any>();
  const [defaultOption, setDefaultOption] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [componentsPerPage, setComponentsPerPage] = useState(3);

  // Obtener todos los componentes
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

  const getStores = (event: any) => {
    setDefaultOption(true);
    const selectedComponents = components.find(
      (component: any) => component._id === event.target.value
    );
    setActiveComponent(selectedComponents);
    const activeSt = _store.filter((store: any) => {
      return selectedComponents.store.some(
        (item: any) => item.store === store._id && item.balance > 0
      );
    });
    setActiveStore(activeSt);
  };

  const setSelectedStore = (event: any) => {
    setDefaultOption(false);
    const storeId = event.target.value;
    const store = activeComponent.store.find(
      (store: any) => store.store === storeId
    );
    setMaxQuantity(store.balance);
  };

  const handleSubmitComponent = (e: any) => {
    e.preventDefault();
    const { component, store, balance } = e.target.elements;
    const data = {
      componentId: component.value,
      storeId: store.value,
      quantity: Number(balance.value),
    };
    const existingComponent = selectedComponents.find(
      (item: any) =>
        item.componentId === data.componentId && item.storeId === data.storeId
    );
    if (existingComponent) {
      const updatedSelectedComponent = selectedComponents.map((item: any) =>
        item.componentId === data.componentId && item.storeId === data.storeId
          ? { ...item, quantity: item.quantity + data.quantity }
          : item
      );
      setSelectedComponents(updatedSelectedComponent);
    } else {
      setSelectedComponents([data, ...selectedComponents]);
    }
  };

  const postSelectedComponents = async () => {
    const data = {
      detail: selectedComponents,
    };
    const res = await axios.post(
      `https://api-maracomp-production-864a.up.railway.app/dispach`,
      data
    );
    res.status === 201
      ? toast.success("Se han despachado los componentes!")
      : toast.error("Ha ocurrido un error");
  };

  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentComponents = selectedComponents.slice(
    indexOfFirstComponent,
    indexOfLastComponent
  );
  const pageNumbers = Math.ceil(selectedComponents.length / componentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Popup
      trigger={
        <button className="h-3/6 w-full p-4 text-white bg-verde hover:bg-verdeOscuro rounded-[10px]">
          Despachar Componentes
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
                Despachar Componentes
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Agrega los componentes y la cantidad que desea despachar.
              </p>
              <form method="" onSubmit={handleSubmitComponent}>
                <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="component"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Componente
                    </label>
                    <div className="mt-2">
                      <select
                        id="component"
                        name="component"
                        autoComplete="component"
                        className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={getStores}
                      >
                        <option disabled selected value="">
                          SELECCIONA COMPONENTE
                        </option>
                        {components.map((component) => (
                          <option
                            key={component._id}
                            value={component._id}
                            className="text-ellipsis"
                          >
                            {`${component.description} - ${component.unit}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="store"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Almacén
                    </label>
                    <div className="mt-2">
                      <select
                        id="store"
                        name="store"
                        autoComplete="store"
                        className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={setSelectedStore}
                      >
                        <option
                          disabled
                          selected={defaultOption != true ? false : true}
                          value=""
                        >
                          SELECCIONA ALMACEN
                        </option>
                        {activeStore.map((store: any) => (
                          <option key={store._id} value={store._id}>
                            {`${store.description}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="balance"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cantidad a despachar
                    </label>
                    <div className="mt-2">
                      <input
                        id="balance"
                        name="balance"
                        type="Number"
                        min={1}
                        max={maxQuantity}
                        defaultValue={1}
                        pattern={`[0-9]*`}
                        autoComplete="balance"
                        className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white 
                      shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                      flex items-end"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </form>

              {/* TABLA DE COMPONENTES SELECCIONADOS PARA DESPACHAR */}

              <div className="h-4/6 w-full flex flex-col justify-center items-center rounded-[10px]">
                <div className="overflow-x-auto w-full h-full mt-6">
                  <table className={`table table-fixed text-black`}>
                    {/* head */}
                    <thead>
                      <tr className="border-transparent">
                        <th className="col-span-6 text-black font-bold text-lg ">
                          Componente
                        </th>
                        <th className="col-span-2 text-black font-bold text-lg ">
                          Almacén
                        </th>
                        <th className="col-span-4 text-black font-bold text-lg ">
                          Cantidad
                        </th>
                        <th className="col-span-4 text-black font-bold text-lg ">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* body */}
                      {currentComponents.map(
                        (component: any, index: number) => (
                          <tr key={index} className="border-transparent ">
                            <td>
                              {
                                components.find(
                                  (comp) => comp._id === component.componentId
                                )?.description
                              }
                            </td>
                            <td>
                              {
                                activeStore.find(
                                  (store: any) =>
                                    store._id === component.storeId
                                )?.description
                              }
                            </td>
                            <td>{component.quantity}</td>
                            <td>
                              <button className="bg-red-600 hover:bg-red-700 duration-300 p-3 rounded-md">
                                <TrashIcon
                                  className="
                                  w-6
                                  text-white"
                                />
                              </button>
                            </td>
                          </tr>
                        )
                      )}
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
                  setSelectedComponents([]);
                  close();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={postSelectedComponents}
              >
                Guardar
              </button>
            </div>
          </div>
          <ToastContainer></ToastContainer>
        </>
      )}
    </Popup>
  );
}
