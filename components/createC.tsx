"use client";
import Link from 'next/link';
import React, { use } from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function CreateComponent() {
  return (
    <Popup trigger={<button className='h-3/6 w-10/12 text-white bg-verde hover:bg-verdeOscuro rounded-[10px]'
    >Crear Componente</button>} 
    modal 
    nested
    >
        {close => (
            <form className='w-full'>
                <div className='w-11/12 h-5/6 m-10 '>
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="font-bold text-3xl text-black">Componente</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Agrega la información del componente.</p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                        <label htmlFor="component" className="block text-sm font-medium leading-6 text-gray-900">Componente</label>
                        <div className="mt-2">
                            <input type="text" name="component" id="component" autoComplete="component" 
                            className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="unit" className="block text-sm font-medium leading-6 text-gray-900">Unidad</label>
                        <div className="mt-2">
                            <input type="text" name="unit" id="unit" autoComplete="unit" 
                            className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>
        
                        <div className="sm:col-span-2">
                        <label htmlFor="store" className="block text-sm font-medium leading-6 text-gray-900">Almacén</label>
                        <div className="mt-2">
                            <input type="text" name="store" id="store" autoComplete="store-name" 
                            className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="balance" className="block text-sm font-medium leading-6 text-gray-900">Balance en Almacén</label>
                        <div className="mt-2">
                            <input id="balance" name="balance" type="Number" min={0} defaultValue={0} pattern={`[0-9]*`} autoComplete="balance" 
                            className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                            "/>
                        </div>
                        </div>
                        
                        <div className="sm:col-span-2">
                        <label htmlFor="supplier" className="block text-sm font-medium leading-6 text-gray-900">Suplidor</label>
                        <div className="mt-2">
                            <select id="supplier" name="supplier" autoComplete="supplier-name" className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                            </select>
                        </div>
                        </div>


                        <div className="sm:col-span-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Precio del Suplidor</label>
                        <div className="mt-2">
                            <input id="price" name="price" type="Number" min={0} defaultValue={0} pattern={`[0-9]*`} autoComplete="price" 
                            className="block w-5/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                            "/>
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">Descuento (si aplica)</label>
                        <div className="mt-2">
                            <input id="discount" name="discount" type="Number" min={0} max={100} defaultValue={0} autoComplete="email" className="block w-5/6  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="store" className="block text-sm font-medium leading-6 text-gray-900">Tiempo de Entrega <span className='text-sm  text-gray-600 font-thin'>(en días)</span></label>
                        <div className="mt-2">
                        <div className="mt-2">
                            <input id="discount" name="discount" type="Number" min={0} defaultValue={0} autoComplete="email" className="block w-5/6  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={
                                close
                            }>Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </div>
            </form>
        )}
    </Popup>
  )
}
