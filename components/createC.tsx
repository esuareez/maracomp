"use client";
import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "./context/mainData";

export default function CreateComponent() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const { components, setComponents } = useContext<any>(StateContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/supplier"
      );
      setSuppliers(data);
    };
    fetchData();
  }, []);

  let status: any = 0;
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      formComponent: {
        description: event.target.component.value,
        unit: event.target.unit.value,
        balance: Number(event.target.balance.value),
        storeDesc: event.target.store.value,
      },
      supplierTime: {
        supplierId: event.target.supplier.value,
        price: Number(event.target.price.value),
        deliveryTimeInDays: Number(event.target.deliveryTimeInDays.value),
        discount: Number(event.target.discount.value),
      },
    };
    const res = await axios.post(
      "https://api-maracomp-production-864a.up.railway.app/store",
      data
    );

    event.target.component.value = "";
    event.target.unit.value = "";
    event.target.balance.value = "";
    event.target.store.value = "";
    event.target.supplier.value = "";
    event.target.price.value = "";
    event.target.deliveryTimeInDays.value = "";
    event.target.discount.value = "";

    if (res.status < 300) {
      toast.success("¡El componente ha sido agregado con éxito!");
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/component"
      );
      setComponents(
        data.sort((a: any, b: any) => {
          const aCode = Number(a.code.replace("C-", ""));
          const bCode = Number(b.code.replace("C-", ""));
          return bCode - aCode;
        })
      );
      return;
    }
    toast.error("Ha ocurrido un error tratando de agregar el componente");
  };

  return (
    <Popup
      trigger={
        <button className="h-3/6 w-full p-4 text-white font-semibold bg-verde hover:bg-verdeOscuro hover:text-white/80 hover:font-bold rounded-[10px]">
          Crear Componente
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
              <h2 className="font-bold text-3xl text-black">Componente</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Agrega la información del componente.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="component"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Componente
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="component"
                      id="component"
                      autoComplete="component"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Unidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="unit"
                      id="unit"
                      autoComplete="unit"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                    <input
                      type="text"
                      name="store"
                      id="store"
                      autoComplete="store-name"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="balance"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Balance en Almacén
                  </label>
                  <div className="mt-2">
                    <input
                      id="balance"
                      name="balance"
                      type="Number"
                      min={0}
                      defaultValue={0}
                      pattern={`[0-9]*`}
                      autoComplete="balance"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
                      {suppliers.map((supplier) => (
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
