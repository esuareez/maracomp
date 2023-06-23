"use client";
import {Chart,ArcElement, Legend, Title, CategoryScale, LinearScale, PointElement, Filler, Tooltip, LineElement} from 'chart.js';
import {Line} from 'react-chartjs-2'

export default function Linea() {
    Chart.register(ArcElement,Legend, Title, CategoryScale, LinearScale, PointElement, Filler, Tooltip, LineElement);
    const utils = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre','Octubre','Noviembre','Diciembre'] 
    const data = {
        labels: utils,
        datasets: [{
          label: 'Cantidad',
          data: [300, 50,400,600],
          backgroundColor: [
            'rgb(96, 169, 29)',
          ],
          hoverOffset: 4
        }, {
            label: 'Suplidores',
            data: [100, 200,1500,90, 100, 200,1500,90],
            backgroundColor: [
              'rgb(96, 169, 29)',
            ],
            hoverOffset: 4
          }]
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
      }


    return (
        <Line data={data} height={30} width={30} options={options}></Line>
    );
}


