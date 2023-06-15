"use client";

import React from 'react'
// Import para el useHover de https://usehooks.com/
import { useHover } from "@uidotdev/usehooks";
import { usePathname } from 'next/navigation'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/layout.module.css'

export default function Navbar() {
  const [ref, hovering] = useHover();
  const expanded = hovering ? 'block' : 'invisible';
  const [estado, setEstado] = useState('hidden');
  // Extraemos el pathname para saber en qué ventana estamos.
  
  return (
    <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    
                    {/* BOTÓN SUBMENÚ RESPONSIVE */}
                    <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
                    aria-controls="mobile-menu" aria-expanded="false" onClick={ () => {estado === 'hidden' ? setEstado('block') : setEstado('hidden')}}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <Link className="flex flex-shrink-0 items-center" href="/">
                        <img className="block h-8 w-auto " src="/icon/MaraComp Logo.png"></img>
                    </Link>
                    <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        
                        <Link href="/" className={`${usePathname() === "/" ? styles.current : styles.inactive} `}>Inicio</Link>
                        <Link href="/suplidores" className={`  ${usePathname() === "/suplidores" ? styles.current : styles.inactive} `}>Suplidores</Link>
                        <Link href="/inventario" className={`  ${usePathname() === "/inventario" ? styles.current : styles.inactive}`}>Inventario</Link>
                    </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 " >
                    <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    </button>

                   
                    <div className="relative ml-3" ref={ref} >
                    <div>
                        <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon className="h-6 w-6 text-gray-400 hover:text-white" />
                        </button>
                    </div>
                    <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                    ${expanded} duration-[85ms]`} 
                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"  id='submenu-logout'>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700"  role="menuitem"  id="user-menu-item-0">Your Profile</Link>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-1">Settings</Link>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-2">Sign out</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            
            <div className={`${estado}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                <Link href="/" className={`${usePathname() === "/" ? styles.currentMobile : styles.inactiveMobile}`} >Inicio</Link>
                <Link href="/suplidores" className={`${usePathname() === "/suplidores" ? styles.currentMobile : styles.inactiveMobile}`}>Suplidores</Link>
                <Link href="/inventario" className={`${usePathname() === "/inventario" ? styles.currentMobile : styles.inactiveMobile}`}>Inventario</Link>
                </div>
            </div>
            </nav>
  )
}
