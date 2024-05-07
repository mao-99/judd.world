import { useEffect } from 'react';
import style from './comparisons.module.css';
import { Bar } from "react-chartjs-2";
export default function CPlot({plotdata, options, showplot}){

    return (
        <>
            {
                showplot && 
                <Bar data={plotdata} options={options} />
            }
        </>
    ) 
}