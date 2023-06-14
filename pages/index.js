import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout.jsx'


export default function Home() {
  return (
    <Layout 
    title = 'MaraComp | Inicio'
    index = "index">
      <h1  className='text-3xl font-mono font-black text-red-400'>
        Ventas
      </h1>
    </Layout>
  )
}
