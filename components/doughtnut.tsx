"use client";
import {Chart,ArcElement, Legend, Title, CategoryScale, LinearScale, PointElement, Filler, Tooltip} from 'chart.js';
import {Doughnut} from 'react-chartjs-2'

export default function Dona() {
    Chart.register(ArcElement,Legend, Title, CategoryScale, LinearScale, PointElement, Filler, Tooltip);
    const data = {
        labels: [
          'Red',
          'Blue',
        ],
        datasets: [{
          label: 'Cantidad',
          data: [300, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      };

      const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    boxWidth: 40,
                    padding: 20
                },
            },
        },
        animation: {
            duration: 2000,
            
            loop: false,
            animateScale: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: 40,
        radius: 80,
        

      }


    return (
        <Doughnut data={data} height={30} width={30} options={options}></Doughnut>
    );
}


