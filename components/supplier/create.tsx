"use client";
import React, { use, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "../context/mainData";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function CreateSupplier() {
  const { suppliers, setSuppliers } = useContext<any>(StateContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { name, rnc, ciudad, direccion } = e.target.elements;

    const data = {
      name: name.value,
      rnc: rnc.value,
      ciudad: ciudad.value,
      direccion: direccion.value,
    };

    let res = null;

    res = await axios.post(
      `https://api-maracomp-production-864a.up.railway.app/supplier`,
      data
    );

    name.value = "";
    rnc.value = "";
    ciudad.value = "";
    direccion.value = "";

    if (res.status < 300) {
      toast.success("¡El suplidor ha sido agregado con éxito!");

      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/supplier"
      );
      setSuppliers(data.reverse());
      return;
    }

    toast.error("Ha ocurrido un error tratando de agregar el suplidor");
  };

  return (
    <Popup
      trigger={
        <button className="h-3/6 w-full p-4 text-white font-semibold bg-verde hover:bg-verdeOscuro hover:text-white/80 hover:font-bold rounded-[10px]">
          Agregar Suplidor
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
              <h2 className="font-bold text-3xl text-black">Suplidor</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Agrega la información del suplidor.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="component"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="supplier-name"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="store"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    RNC
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="rnc"
                      id="rnc"
                      autoComplete="rnc"
                      maxLength={9}
                      minLength={0}
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="balance"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ciudad
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="ciudad"
                      name="ciudad"
                      type="text"
                      autoComplete="ciudad"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="balance"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dirección
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="direccion"
                      name="direccion"
                      type="text"
                      autoComplete="direccion"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
