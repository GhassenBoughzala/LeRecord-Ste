import React, { useState, useEffect } from "react";
import { Line,Bar , Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";

const Stats = () => {
  const [chartData, setChartData] = useState({});
  const [name , setname] = useState([]);
  const [quantity, setquantity] = useState([]);

  const chart = () => {
    let name = [];
    let quantity = [];
    axios.get('http://localhost:5500/api/products/search')
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
            name.push((dataObj.name));
            console.log(dataObj.name);
            quantity.push(parseInt(dataObj.quantity));
        }
        setChartData({
          labels: name ,
          datasets: [
            {
              label: "Quantity",
              data: quantity,
              backgroundColor: ["rgb(61, 105, 175)"],
              borderWidth: 3
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(name, quantity);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
      <>


      <div>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>


    </>
  );
};

export default Stats;