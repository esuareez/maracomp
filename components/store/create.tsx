"use client";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateStore() {
  const [components, setComponents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/component"
      );
      setComponents(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { component, store, balance } = e.target.elements;

    const data = {
      description: store.value,
      balance: Number(balance.value),
    };

    console.log(data);
    console.log(component.value);

    const res = await axios.post(
      `https://api-maracomp-production-864a.up.railway.app/store/${component.value}`,
      data
    );
    console.log(res);
  };

  return (
    <Popup
      trigger={
        <button className="h-3/6 w-full p-4 text-white font-semibold bg-verde hover:bg-verdeOscuro hover:text-white/80 hover:font-bold rounded-[10px]">
          Agregar Almacén
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
              <h2 className="font-bold text-3xl text-black">Almacén</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Agrega el componente a un nuevo almacén.
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
                    <select
                      id="component"
                      name="component"
                      autoComplete="componentn"
                      className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {components.map((component) => (
                        <option key={component._id} value={component._id}>
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
        </form>
      )}
    </Popup>
  );
}
