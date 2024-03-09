import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "react-datepicker/dist/react-datepicker.css";

const GraphCard = () => {
  const [selectedOption, setSelectedOption] = useState("averageOrderValue");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedYearUser1, setSelectedYearUser1] = useState(2022);
  const [selectedYearUser2, setSelectedYearUser2] = useState(2022);
  const [chartData, setChartData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedOption, selectedMonth, selectedYearUser1, selectedYearUser2]);

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
            text: `${selectedOption} Data Visualization`,
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
  }, [chartData, selectedOption, selectedMonth, selectedYearUser1, selectedYearUser2]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://apigenerator.dronahq.com/api/B36aIzE5/data");
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const apiData = await response.json();
      console.log("API Data:", apiData); // Log the API response
  
      if (Array.isArray(apiData) && apiData.length > 0) {
        const processedData = processAPIData(apiData[0]);
        setChartData(processedData);
      } else {
        console.error("Invalid API response structure");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  
  const processAPIData = (apiData) => {
    const labels = Object.keys(apiData[selectedOption]?.user1[selectedYearUser1]);
    const datasets = [
      {
        label: "User 1",
        data: labels.map(
          (month) =>
            apiData[selectedOption]?.user1[selectedYearUser1]?.[month] || 0
        ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "User 2",
        data: labels.map(
          (month) =>
            apiData[selectedOption]?.user2[selectedYearUser2]?.[month] || 0
        ),
        borderColor: "rgb(255, 99, 132)",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ];
  
    return { labels, datasets };
  };


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearUser1Change = (event) => {
    setSelectedYearUser1(parseInt(event.target.value));
  };

  const handleYearUser2Change = (event) => {
    setSelectedYearUser2(parseInt(event.target.value));
  };

  return (
    <div
      style={{ padding: "20px", margin: "auto" }}
      className="bg-gray-50  rounded-md shadow-lg "
    >
      <div className="flex gap-5 flex-wrap">
        <select className=" p-2" value={selectedOption} onChange={handleOptionChange}>
          <option value="averageOrderValue">Average Order Value</option>
          <option value="conversionRate">Conversion Rate</option>
          <option value="growSales">Grow Sales</option>
          <option value="returnRate">Return Rate</option>
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
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
