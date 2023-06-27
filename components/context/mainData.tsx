"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Crea el contexto
export const StateContext = createContext({});

// Crea el proveedor del contexto
export const StateProvider = ({ children }: any) => {
  const [state, setState] = useState(); // Define tu estado inicial aquí
  const [components, setComponents] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [inventorymovement, setInventoryMovement] = useState<any[]>([]);

  {
    /* Buscar todos los componentes */
  }
  useEffect(() => {
    const fetchComponents = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/component"
      );
      // Ordenamos components por su codigo, de menor a mayor, pero para poder ordenar el codigo debemos quitarle
      // el prefijo "C-" y convertirlo a numero
      setComponents(
        data.sort((a: any, b: any) => {
          const aCode = Number(a.code.replace("C-", ""));
          const bCode = Number(b.code.replace("C-", ""));
          return bCode - aCode;
        })
      );
    };
    fetchComponents();
  }, []);

  {
    /* Buscar todos los suplidores */
  }
  useEffect(() => {
    const fetchComponents = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/supplier"
      );
      //Ordenamos los suplidores por su codigo, de mayor a menor
      setSuppliers(data.reverse());
    };
    fetchComponents();
  }, []);

  {
    /* Buscar todos los almacenes */
  }
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api-maracomp-production-864a.up.railway.app/store`
      );
      setStores(data);
    };
    fetchData();
  }, []);
  {
    /* Buscar todas las ordenes */
  }
  useEffect(() => {
    const fetchComponents = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/order"
      );
      setOrders(data.reverse());
    };
    fetchComponents();
  }, []);
  {
    /* Buscar todas los dispach */
  }
  useEffect(() => {
    const fetchComponents = async () => {
      const { data } = await axios.get(
        "https://api-maracomp-production-864a.up.railway.app/inventorymovement"
      );
      setInventoryMovement(data.reverse());
    };
    fetchComponents();
  }, []);

  // Pasa el estado y la función de actualización

  return (
    <StateContext.Provider
      value={{
        state,
        setState,
        components,
        setComponents,
        suppliers,
        setSuppliers,
        stores,
        setStores,
        orders,
        setOrders,
        inventorymovement,
        setInventoryMovement,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
