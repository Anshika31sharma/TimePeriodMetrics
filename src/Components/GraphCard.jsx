import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GraphCard = () => {
  const [selectedOption, setSelectedOption] = useState("averageOrderValue");
  const [selectedYearUser1, setSelectedYearUser1] = useState(2022);
  const [selectedYearUser2, setSelectedYearUser2] = useState(2022);
  const [chartData, setChartData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedOption, selectedYearUser1, selectedYearUser2]);

  useEffect(() => {
    const canvas = document.getElementById("myChart");
    if (canvas && chartData.labels) {
      const context = canvas.getContext("2d");
      let newChartInstance;

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Price",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Price Data Visualization",
          },
        },
      };

      newChartInstance = new Chart(context, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });

      setChartInstance(newChartInstance);

      return () => {
        if (newChartInstance) {
          newChartInstance.destroy();
        }
      };
    }
  }, [chartData, selectedOption, selectedYearUser1, selectedYearUser2]);

  const fetchData = () => {
    const mockData = {
      data: [
        {
          "month": "Jan",
          "user1": {
            "2022": 1500,
            "2023": 1800
          },
          "user2": {
            "2022": 1200,
            "2023": 1600
          }
        },
        {
          "month": "Feb",
          "user1": {
            "2022": 1600,
            "2023": 1900
          },
          "user2": {
            "2022": 1300,
            "2023": 1700
          }
        },
        {
          "month": "Mar",
          "user1": {
            "2022": 1700,
            "2023": 2000
          },
          "user2": {
            "2022": 1400,
            "2023": 1800
          }
        },
        {
          "month": "Apr",
          "user1": {
            "2022": 1800,
            "2023": 2100
          },
          "user2": {
            "2022": 1500,
            "2023": 1900
          }
        },
        {
          "month": "May",
          "user1": {
            "2022": 1900,
            "2023": 2200
          },
          "user2": {
            "2022": 1600,
            "2023": 2000
          }
        },
        {
          "month": "Jun",
          "user1": {
            "2022": 2000,
            "2023": 2300
          },
          "user2": {
            "2022": 1700,
            "2023": 2100
          }
        },
        {
          "month": "Jul",
          "user1": {
            "2022": 2100,
            "2023": 2400
          },
          "user2": {
            "2022": 1800,
            "2023": 2200
          }
        },
        {
          "month": "Aug",
          "user1": {
            "2022": 2200,
            "2023": 2500
          },
          "user2": {
            "2022": 1900,
            "2023": 2300
          }
        },
        {
          "month": "Sep",
          "user1": {
            "2022": 2300,
            "2023": 2600
          },
          "user2": {
            "2022": 2000,
            "2023": 2400
          }
        },
        {
          "month": "Oct",
          "user1": {
            "2022": 2400,
            "2023": 2700
          },
          "user2": {
            "2022": 2100,
            "2023": 2500
          }
        },
        {
          "month": "Nov",
          "user1": {
            "2022": 2500,
            "2023": 2800
          },
          "user2": {
            "2022": 2200,
            "2023": 2600
          }
        },
        {
          "month": "Dec",
          "user1": {
            "2022": 2600,
            "2023": 2900
          },
          "user2": {
            "2022": 2300,
            "2023": 2700
          }
        }
      ]
    };

    const processedData = processAPIData(mockData);
    setChartData(processedData);
  };

  const processAPIData = (apiData) => {
    if (apiData && apiData.data) {
      const labels = apiData.data.map((item) => item.month);
      const datasets = [
        {
          label: "User 1",
          data: apiData.data.map((item) => item.user1[selectedYearUser1] || 0),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "User 2",
          data: apiData.data.map((item) => item.user2[selectedYearUser2] || 0),
          borderColor: "rgb(255, 99, 132)",
          borderDash: [5, 5],
          tension: 0.4,
        },
      ];

      return { labels, datasets };
    }

    return { labels: [], datasets: [] };
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleYearUser1Change = (event) => {
    setSelectedYearUser1(parseInt(event.target.value));
  };

  const handleYearUser2Change = (event) => {
    setSelectedYearUser2(parseInt(event.target.value));
  };

  return (
    <div style={{ padding: "20px", margin: "auto" }} className="bg-gray-50 border rounded-md shadow-lg">
      <div className=" flex gap-5 flex-wrap">
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="averageOrderValue">Average Order Value</option>
          <option value="conversionRate">Conversion Rate</option>
          <option value="growSales">Grow Sales</option>
          <option value="returnRate">Return Rate</option>
        </select>
        <select value={selectedYearUser1} onChange={handleYearUser1Change}>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
        <select value={selectedYearUser2} onChange={handleYearUser2Change}>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
      </div>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <canvas id="myChart" style={{ width: "100%" }}></canvas>
      </div>
    </div>
  );
};

export default GraphCard;
