"use client";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateDispach() {

    const [components, setComponents] = useState<any[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<any>([]);
    const [store, setStore] = useState<any>([]);
    const [activeStore, setActiveStore] = useState<any>([]);

    // Obtener todos los componentes
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                "https://api-maracomp-production-864a.up.railway.app/component"
            );
            setComponents(data);
        };
        fetchData();
    }, [])

    // Obtener los almacenes de un componente
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                `https://api-maracomp-production-864a.up.railway.app/store`
            );
            setStore(data);
        };
        fetchData();
    })

    const handleGetComponent = (_store: Array<any>
    ) => {
         setActiveStore(store.find({ _store.store}))
    }

    const handleSubmit = async (e: any) => {}
  return (
    <Popup
        trigger={
            <button className="h-3/6 w-11/12 text-white bg-verde hover:bg-verdeOscuro rounded-[10px]">
                Despachar Componentes
            </button>
        }
        modal
        nested
    >
        {(close) => (
            <form method="POST" onSubmit={handleSubmit}>
            <div className="w-11/12 h-5/6 m-10 ">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="font-bold text-3xl text-black">Despachar Componentes</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Agrega los componentes y la cantidad que desea despachar.
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
                          <option key={component._id} value={component} onClick={() => {}}>
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
                      Cantidad a despachar
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
  )
}
