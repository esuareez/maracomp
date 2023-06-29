"use client";
import React, { useState, useEffect, useContext } from "react";
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
  PencilSquareIcon,
  TrashIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { StateContext } from "../context/mainData";
import { AnyARecord } from "dns";

export default function CreateSupplierTime({ componentId }: any) {
  const { suppliers, setSuppliers } = useContext<any>(StateContext);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      const data = {
        supplierId: event.target.supplier.value,
        componentId: componentId,
        price: Number(event.target.price.value),
        deliveryTimeInDays: Number(event.target.deliveryTimeInDays.value),
        discount: Number(event.target.discount.value),
      };
      const res = await axios.post(
        "https://api-maracomp-production-864a.up.railway.app/supplierTime",
        data
      );

      event.target.supplier.value = "";
      event.target.price.value = "";
      event.target.deliveryTimeInDays.value = "";
      event.target.discount.value = "";
      toast.success("¡El tiempo del suplidor ha sido agregado con éxito!");
    } catch (error) {
      toast.error("¡Ha ocurrido un error al agregar el tiempo del suplidor!");
    }
  };

  return (
    <Popup
      trigger={
        <button className="bg-verde hover:bg-verdeOscuro duration-300 p-3 rounded-md">
          <BriefcaseIcon
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
        <form method="POST" onSubmit={handleSubmit}>
          <div className="w-11/12 h-5/6 m-10 ">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-bold text-3xl text-black">
                Suplidor para el componente: {componentId}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Agrega la información del suplidor de este componente.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="supplier"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Suplidor
                  </label>
                  <div className="mt-2">
                    <select
                      id="supplier"
                      name="supplier"
                      autoComplete="supplier-name"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {suppliers.map((supplier: any) => (
                        <option key={supplier._id} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Precio del Suplidor
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="price"
                      type="Number"
                      min={0}
                      defaultValue={0}
                      pattern={`[0-9]*`}
                      autoComplete="price"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Descuento (si aplica)
                  </label>
                  <div className="mt-2">
                    <input
                      id="discount"
                      name="discount"
                      type="Number"
                      min={0}
                      max={100}
                      defaultValue={0}
                      autoComplete="email"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="deliveryTimeInDays"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tiempo de Entrega{" "}
                    <span className="text-sm  text-gray-600 font-thin">
                      (en días)
                    </span>
                  </label>
                  <div className="mt-2">
                    <div className="mt-2">
                      <input
                        id="deliveryTimeInDays"
                        name="deliveryTimeInDays"
                        type="Number"
                        min={0}
                        defaultValue={0}
                        autoComplete="deliveryTimeInDays"
                        className="block w-5/6  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Guardar
              </button>
            </div>
          </div>
          <ToastContainer></ToastContainer>
        </form>
      )}
    </Popup>
  );
}
