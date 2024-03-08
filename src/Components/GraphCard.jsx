import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GraphCard = () => {
  const [selectedOption, setSelectedOption] = useState("averageOrderValue");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("myChart");
    if (canvas) {
      const context = canvas.getContext("2d");
      let chartInstance;

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
              text: "Sales",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Sales Data Visualization",
          },
        },
      };

      // Static data for demonstration purposes
      const staticData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "User 1",
            data: [20, 30, 25, 35, 40, 45],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "User 2",
            data: [25, 20, 30, 40, 35, 50],
            borderColor: "rgb(255, 99, 132)",
            borderDash: [5, 5], // Dotted line for User 2
            tension: 0.4,
          },
        ],
      };

      setChartData(staticData);

      chartInstance = new Chart(context, {
        type: "line",
        data: {
          labels: staticData.labels || [],
          datasets: staticData.datasets || [],
        },
        options: chartOptions,
      });

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [selectedOption, selectedDate]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      style={{
        padding: "20px",
        margin: "auto",
        boxSizing: "border-box",
      }}
      className="bg-gray-50 border rounded-md shadow-lg"
    >
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="averageOrderValue">Average Order Value</option>
          <option value="conversionRate">Conversion Rate</option>
          <option value="frowSales">Frow Sales</option>
          <option value="returnRate">Return Rate</option>
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
        <canvas
          id="myChart"
          style={{ width: "100%", height: "400px" }}
        ></canvas>
      </div>
    </div>
  );
};
export default GraphCard;
