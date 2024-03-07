import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const GraphCard = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const canvas = document.getElementById("myChart");
    if (canvas) {
      const context = canvas.getContext("2d");
      let chartInstance;

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales Data Visualization'
          }
        }
      };

      if (activeTab === 1) {
        chartInstance = new Chart(context, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
              label: "Monthly Sales",
              data: [20, 30, 25, 35, 40, 45],
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            }],
          },
          options: chartOptions,
        });
      } else if (activeTab === 2) {
        chartInstance = new Chart(context, {
          type: "bar",
          data: {
            labels: ["Category 1", "Category 2", "Category 3", "Category 4"],
            datasets: [{
              label: "Monthly Sales",
              data: [50, 30, 45, 25],
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              barThickness: 50,
            }],
          },
          options: chartOptions,
        });
      } else if (activeTab === 3) {
        chartInstance = new Chart(context, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Monthly Sales 2023",
                data: [20, 30, 25, 35, 40, 45],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                pointStyle: 'rectRounded',
                pointRadius: 5,
                pointBorderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: '#fff',
              },
              {
                label: "Monthly Sales 2022",
                data: [25, 20, 30, 40, 35, 50],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
                borderWidth: 2,
                borderDash: [5, 5],
                pointStyle: 'triangle',
                pointRadius: 5,
                pointBorderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: '#fff',
              }
            ],
          },
          options: chartOptions,
        });
      }

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [activeTab]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div 
      style={{
        padding: '20px',
        maxWidth: '100%',
        margin: 'auto',
        boxSizing: 'border-box',
      }}
      className="bg-white border rounded-md shadow-lg"
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div
          onClick={() => handleTabClick(1)}
          style={{ cursor: 'pointer', padding: '10px', fontWeight: activeTab === 1 ? 'bold' : 'normal' }}
        >
          Daily Revenue
        </div>
        <div
          onClick={() => handleTabClick(2)}
          style={{ cursor: 'pointer', padding: '10px', fontWeight: activeTab === 2 ? 'bold' : 'normal' }}
        >
          Daily Orders
        </div>
        <div
          onClick={() => handleTabClick(3)}
          style={{ cursor: 'pointer', padding: '10px', fontWeight: activeTab === 3 ? 'bold' : 'normal' }}
        >
          New Customers
        </div>
      </div>
      <div style={{ height: '400px', position: 'relative' }}>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default GraphCard;
