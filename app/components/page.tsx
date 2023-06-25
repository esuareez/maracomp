"use client";

import CreateComponent from '@/components/createC';
import Link from 'next/link';
import React, { use, useEffect } from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { metadata } from '../layout';
import axios from 'axios';


metadata.title = 'MaraComp | Componentes'
export default function page() {
    
    // Create pagination for components list 10 per page function
    const [currentPage, setCurrentPage] = useState(1);
    const [componentsPerPage] = useState(3);
    const [components, setComponents] = useState<any[]>([])

    useEffect(() => {
        const fetchComponents = async () => {
            const { data } = await axios.get('https://api-maracomp-production-864a.up.railway.app/component');
            data.map((component : any) => (
                console.log(`FROM DATA: ${component.description}`)
            ))
            setComponents(data);
        }
        fetchComponents();
    })
    

    const indexOfLastComponent = currentPage * componentsPerPage;
    const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
    const currentComponents = components.slice(indexOfFirstComponent, indexOfLastComponent);
    console.log(currentComponents)
    

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
                <div className="overflow-x-auto">
                <table className="table text-black font-bold">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Componente</th>
                        <th>Unidad</th>
                        <th>Acción</th>
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
                            <td>{component.description}</td>
                            <td>{component.unit}</td>
                            <td></td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>

        
    </div>
  )
}
