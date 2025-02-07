import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import api from './Api';
// import India from "@react-map/india";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement);

const Analytics = () => {
  const [deviceStats, setDeviceStats] = useState({ totalClicks: 0, deviceTypeDistribution: {} });
  const [dailyClicks, setDailyClicks] = useState([]);
  const [locationStats, setLocationStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // const getStateColor = (stateName) => {
  //   const stateData = locationStats[stateName];
  //   if (!stateData) return "rgb(243, 244, 246)";
  //   const maxClicks = Math.max(...Object.values(locationStats).map(d => d.clicks || 0));
  //   const intensity = (stateData.clicks || 0) / maxClicks;
  //   return `rgba(116, 110, 168, ${intensity})`;
  // };

  // const handleStateHover = (event, stateName) => {
  //   const stateData = locationStats[stateName];
  //   if (stateData) {
  //     setTooltipContent(
  //       `${stateName}\nClicks + scans: ${stateData.clicks || 0}`
  //     );
  //     setTooltipPosition({
  //       x: event.clientX,
  //       y: event.clientY
  //     });
  //   }
  // };

  const fetchLocationData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/url/daily-clicks');
      if (response.status === 200) {
        setLocationStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviceData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/url/device-stats');
      if (response.status === 200) {
        setDeviceStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching device data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/url/daily-clicks');
      if (response.status === 200) {
        setDailyClicks(response.data);
      }
    } catch (error) {
      console.error('Error fetching daily data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceData();
    fetchDailyData();
    fetchLocationData();
  }, []);

  const deviceData = {
    labels: Object.keys(deviceStats.deviceTypeDistribution),
    datasets: [{
      data: Object.values(deviceStats.deviceTypeDistribution),
      backgroundColor: [
        'rgba(75, 117, 163)',
        'rgba(81, 197, 164)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgb(75, 117, 163)',
        'rgb(81, 197, 164)',
        'rgb(16, 185, 129)'
      ],
      borderWidth: 1,
      hoverOffset: 15
    }]
  };

  const timeData = {
    labels: dailyClicks.map(item => {
      const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
      });
      return formattedDate;
    }),
    datasets: [{
      label: 'Clicks+scans',
      data: dailyClicks.map(item => item.clickCount),
      borderColor: 'rgb(116, 110, 168)',
      tension: 0.3,
      fill: false
    }]
  };

  const processMonthlyData = () => {
    const monthlyAggregates = {};
    dailyClicks.forEach(({ date, clickCount }) => {
      const monthKey = new Date(date).toLocaleString('default', { month: 'short' });
      monthlyAggregates[monthKey] = (monthlyAggregates[monthKey] || 0) + clickCount;
    });
    return {
      labels: Object.keys(monthlyAggregates),
      datasets: [{
        label: 'Monthly Clicks',
        data: Object.values(monthlyAggregates),
        backgroundColor: 'rgba(116, 110, 168, 0.5)',
        borderColor: 'rgb(116, 110, 168)',
        borderWidth: 1,
        barPercentage: 0.1,
        categoryPercentage: 0.7,

      }]
    };
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (context) => {
            return `${context[0].label}`;
          },
          label: (context) => {
            return `Clicks+scans: ${context.raw}`;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Clicks'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Clicks'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Sidebar />
      <div className={`sm:ml-52 p-4 sm:p-6 md:p-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <Card className="lg:col-span-6 p-4 sm:p-6 md:p-7 mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5">
              Clicks + scans by device
            </h3>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-gray-700">
                    {deviceStats.totalClicks}
                  </p>
                  <p className="text-sm text-gray-500">Clicks+scans</p>
                </div>
                <div className="h-[300px] sm:h-[350px] md:h-[380px]">
                  <Doughnut data={deviceData} options={doughnutOptions} />
                </div>
              </>
            )}
          </Card>

          <Card className="lg:col-span-6 p-4 sm:p-6 mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4">
              Clicks + Scans Over Time
            </h3>
            <div className="h-[300px] sm:h-[350px] md:h-[380px]">
              {dailyClicks.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
              ) : (
                <Line
                  data={timeData}
                  options={lineOptions}
                />
              )}
            </div>
          </Card>



          <Card className="lg:col-span-12 p-4 sm:p-6 mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4">
              Monthly Clicks + scans
            </h3>
            <div className="h-[300px] sm:h-[350px] md:h-[380px]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
              ) : (
                <Bar data={processMonthlyData()} options={barOptions} />
              )}
            </div>
          </Card>

          {/* <Card className="lg:col-span-12 p-4 sm:p-6 mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4">
              Clicks + scans by location
            </h3>
            <div className="relative h-[400px] bg-gray-50 rounded-lg">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
              ) : (
                <>
                  <India
                    fill={(stateName) => getStateColor(stateName)}
                    stroke="#fff"
                    strokeWidth={1}
                    scale={0.8}
                    className="w-full h-full"
                    onMouseEnter={(event, stateName) => handleStateHover(event, stateName)}
                    onMouseLeave={() => setTooltipContent('')}
                  />
                  
                  {tooltipContent && (
                    <div 
                      className="absolute bg-white p-2 rounded shadow-lg text-sm z-10 whitespace-pre-line"
                      style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y + 10}px`
                      }}
                    >
                      {tooltipContent}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-sm">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4" style={{ backgroundColor: 'rgba(116, 110, 168, 0.8)' }} />
                      <span>High activity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4" style={{ backgroundColor: 'rgba(116, 110, 168, 0.2)' }} />
                      <span>Low activity</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Analytics;