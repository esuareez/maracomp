"use client";

import React from "react";

import { usePathname, useRouter } from "next/navigation";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/layout.module.css";

export default function Navbar() {
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
                  usePathname() === "/orders"
                    ? styles.current
                    : styles.inactive
                }`}
              >
                Ordenes
              </Link>
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
