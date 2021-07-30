import React from 'react';
import {Bar} from "react-chartjs-2";

interface Props {
    events: string[]
    userNums: number[]
}

export function BarChart(props: Props) {

    const state = {
        labels: props.events,
        datasets: [
            {
                label: 'Events',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: props.userNums
            }
        ]
    }

    return(
        <div>
            <Bar
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Number of Users Enrolled',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            />
        </div>
    );
}