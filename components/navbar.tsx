"use client";

import React from "react";
// Import para el useHover de https://usehooks.com/
import { useHover } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/layout.module.css";

export default function Navbar() {
  const [ref, hovering] = useHover();
  const expanded = hovering ? "block" : "invisible";
  const [estado, setEstado] = useState("hidden");
  // Extraemos el pathname para saber en qué ventana estamos.
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="bg-gray-800 relative min-h">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* BOTÓN SUBMENÚ RESPONSIVE */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                estado === "hidden" ? setEstado("block") : setEstado("hidden");
              }}
            >
              <Bars3Icon className="h-6 w-6 text-gray-400 hover:text-white"></Bars3Icon>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link className="flex flex-shrink-0 items-center " href="/">
              <img
                className="block h-8 w-auto "
                src="/icon/MaraComp Logo.png"
              ></img>
            </Link>
          </div>
          <div className="hidden sm:justify-end sm:block sm:ml-6">
            <div className="flex space-x-4 ">
              <Link
                href="/"
                className={`${
                  usePathname() === "/" ? styles.current : styles.inactive
                } `}
              >
                Inicio
              </Link>
              <Link
                href="/components"
                className={`  ${
                  usePathname() === "/components"
                    ? styles.current
                    : styles.inactive
                } `}
              >
                Componentes
              </Link>
              <Link
                href="/suppliers"
                className={`  ${
                  usePathname() === "/suppliers"
                    ? styles.current
                    : styles.inactive
                } `}
              >
                Suplidores
              </Link>
              <Link
                href="/orders"
                className={`  ${
                  usePathname() === "/orders" ? styles.current : styles.inactive
                }`}
              >
                Ordenes
              </Link>
              <Link
                href="/inventorymovement"
                className={`  ${
                  usePathname() === "/inventorymovement"
                    ? styles.current
                    : styles.inactive
                }`}
              >
                Movimientos
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            <div className="relative ml-3" ref={ref}>
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-6 w-6 text-gray-400 hover:text-white" />
                </button>
              </div>
              <div
                className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                ${expanded} duration-[85ms]`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                id="submenu-logout"
              >
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-0"
                >
                  Your Profile
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-1"
                >
                  Settings
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-2"
                >
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${estado}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/"
            className={`${
              usePathname() === "/"
                ? styles.currentMobile
                : styles.inactiveMobile
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/suplidores"
            className={`${
              usePathname() === "/suplidores"
                ? styles.currentMobile
                : styles.inactiveMobile
            }`}
          >
            Suplidores
          </Link>
          <Link
            href="/inventario"
            className={`${
              usePathname() === "/inventario"
                ? styles.currentMobile
                : styles.inactiveMobile
            }`}
          >
            Inventario
          </Link>
        </div>
      </div>
    </nav>
  );
}
