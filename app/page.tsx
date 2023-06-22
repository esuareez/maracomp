import Image from 'next/image'
import RootLayout from './layout'
import { metadata } from './layout'
import Chart from '@/components/bar'


metadata.title = 'MaraComp | Inicio'
export default function Home() {
  return (
    
    <div className='relative bg-gray-700 w-full min-h-[90%] flex flex-grow items-center justify-center'>
      <div className='grid grid-rows md:grid-cols-12 w-full h-[90%] gap-8 mx-12'>
        {/* Cuadro de la izquierda con estadisticas y datos */}
        <div className='col-span-8 w-full h-full grid grid-rows gap-4'>
          {/* Dos filas encima de las estadisticas */}
          <div className='row-span-2 grid grid-rows md:grid-cols-12 gap-4'>
            <div className='col-span-4 w-full h-full bg-pink-400 rounded-[20px]'></div>
            <div className='col-span-4 w-full h-full bg-pink-400 rounded-[20px]'></div>
            <div className='col-span-4 w-full h-full bg-pink-400 rounded-[20px]'></div>
          </div>
          {/* Cuadro de estadistica */}
          <div className='row-span-4 bg-red-700 rounded-[20px]'>
            <Chart></Chart>
          </div>
          
        </div>
        {/* Acceso directo (desaparece responsive) */}
        <div className='col-span-4 hidden md:block w-full h-full bg-blue-500 rounded-[20px]'></div>
      </div>
    </div>
    
  )
  
}


