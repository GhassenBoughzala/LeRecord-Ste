import React, { useState, useEffect } from "react";
import { Line,Bar , Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";
import { URLDevelopment } from '../../helpers/url';

const UsersStats = () => {
  const [chartData, setChartData] = useState({});
  const [nameP , setnameP] = useState([]);
  const [qnt, setqnt] = useState([]);

  const chart = () => {
    let nameP = [];
    let qnt = [];
    axios.get(`${URLDevelopment}/api/products/search`)
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
            nameP.push((dataObj.nameP));
            qnt.push(parseInt(dataObj.qnt));
        }
        setChartData({
          labels: nameP ,
          datasets: [
            {
              label: "Quantity",
              data: qnt,
              backgroundColor: ["rgb(61, 105, 175)"],
              borderWidth: 3
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(nameP, qnt);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
      <>


      <div>
        <Bar
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

export default UsersStats;