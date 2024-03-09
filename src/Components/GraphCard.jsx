import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "react-datepicker/dist/react-datepicker.css";

const GraphCard = () => {
  const [selectedOption, setSelectedOption] = useState("conversionRate");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedYearUser1, setSelectedYearUser1] = useState(2022);
  const [selectedYearUser2, setSelectedYearUser2] = useState(2022);
  const [chartData, setChartData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedOption, selectedMonth, selectedYearUser1, selectedYearUser2]);

  useEffect(() => {
    if (!isLoading && !error) {
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
                font: {
                  size: 20, 
                  weight: "bold", 
                },
              },
              ticks: {
                font: {
                  size: 16, 
                },
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Price",
                font: {
                  size: 20, 
                  weight: "bold", 
                },
              },
              ticks: {
                font: {
                  size: 16, 
                },
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
    }
  }, [chartData, selectedOption, selectedMonth, selectedYearUser1, selectedYearUser2, isLoading, error]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://apigenerator.dronahq.com/api/B36aIzE5/data");
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const apiData = await response.json();
      console.log("API Data:", apiData);

      if (Array.isArray(apiData) && apiData.length > 0) {
        const processedData = processAPIData(apiData[0]);
        setChartData(processedData);
        setError(null);
      } else {
        setError("Invalid API response structure");
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setIsLoading(false);
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

  const handleRetry = () => {
    fetchData();
  };

  return (
    <div  className="bg-gray-50 rounded-md shadow-lg p-5 m-auto">
      <div className="flex gap-5 flex-wrap">
        <select className="p-2" value={selectedOption} onChange={handleOptionChange}>
          <option  value="averageOrderValue">Average Order Value</option>
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
        {isLoading ? (
           <div className="p-20  mx-auto ">
           <div className="animate-pulse flex space-x-4">
             <div className="flex-1 space-y-6 py-1">
               <div className="h-2 bg-gray-300 rounded"></div>
               <div className="space-y-3">
                 <div className="grid grid-cols-3 gap-4">
                   <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                   <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                 </div>
                 <div className="h-2 bg-gray-300 rounded"></div>
               </div>
             </div>
           </div>
           <div className="animate-pulse mt-8 space-y-6">
             <div className="h-2 bg-gray-300 rounded"></div>
             <div className="grid grid-cols-3 gap-4">
               <div className="h-2 bg-gray-300 rounded col-span-2"></div>
               <div className="h-2 bg-gray-300 rounded col-span-1"></div>
             </div>
             <div className="h-2 bg-gray-300 rounded"></div>
           </div>
         </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button onClick={handleRetry} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
              Retry
            </button>
          </div>
        ) : (
          <canvas id="myChart" style={{ width: "100%" }}></canvas>
        )}
      </div>
    </div>
  );
};

export default GraphCard;
