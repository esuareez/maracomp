"use client";

import CreateComponent from '@/components/createC';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default function page() {

    const [openForm, setOpenForm] = useState('hidden');
    const [index, setIndex] = useState('block');
    return (
    <div className='relative bg-gray-700 w-full min-h-[90%] flex flex-grow items-center justify-center'>
        <div className={`${index} w-11/12 h-5/6 bg-white rounded-[10px] grid grid-rows`}>
            <div className='row-span-1'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-10 p-10'>
                        <h2 className='font-bold text-3xl text-black'>Componentes</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Componentes registrados en el almacén.</p>
                    </div>
                    <div className="col-span-2">
                        <div className='flex flex-col items-center justify-center h-full'>
                            <CreateComponent></CreateComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row-span-5 bg-pink-300 h-full w-full'>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Componente 1</td>
                            <td>Descripción 1</td>
                            <td>
                                <button className='text-white bg-verde hover:bg-verdeOscuro rounded-[10px]'>Editar</button>
                                <button className='text-white bg-rojo hover:bg-rojoOscuro rounded-[10px]'>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Componente 2</td>
                            <td>Descripción 2</td>
                            <td>
                                <button className='text-white bg-verde hover:bg-verdeOscuro rounded-[10px]'>Editar</button>
                                <button className='text-white bg-rojo hover:bg-rojoOscuro rounded-[10px]'>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Componente 3</td>
                            <td>Descripción 3</td>
                            <td>
                                <button className='text-white bg-verde hover:bg-verdeOscuro rounded-[10px]'>Editar</button>
                                <button className='text-white bg-rojo hover:bg-rojoOscuro rounded-[10px]'>Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        
    </div>
  )
}
