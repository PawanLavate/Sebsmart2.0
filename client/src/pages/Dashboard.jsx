import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  pestAlerts as pestAlertsData,
  yieldData as yieldDataAssets,
  growthData as growthDataAssets,
  farmInfo,
  monthlyPests,
  pesticideData,
  weatherData,
} from "../assets/assets";
import Weather from "../components/Weather";

const Dashboard = () => {
  const [pestAlerts, setPestAlerts] = useState([]);
  const [yieldData, setYieldData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [pesticides, setPesticides] = useState([]);
  const [pestsByMonth, setPestsByMonth] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    // Load static data into state
    setPestAlerts(pestAlertsData);
    setYieldData(yieldDataAssets);
    setGrowthData(growthDataAssets);
    setPesticides(pesticideData);
    setPestsByMonth(monthlyPests);
    setWeather(weatherData)
  }, []);

  return (
    <div className="p-6  overflow-y-scroll h-full">
      <h1 className="text-3xl font-bold mb-6">Apple Farm Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">Total Trees: 1200</div>
        <div className="bg-white shadow rounded-lg p-4">
          Estimated Yield: 10 Tons
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          Pest Alerts: {pestAlerts.length}
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          Growth Stage: Flowering
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold mb-2">Yield Trend</h2>
          <div className="h-48">
            <LineChart width={400} height={200} data={yieldData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="estimated" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
      <h2 className="font-semibold mb-2">Growth Tracking (GDD)</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData}>
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="gdd" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
      </div>

      <div>
        <Weather />
      </div>

      {/* Recent Activities / Tasks */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-semibold mb-2">Recent Activities</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Pruning scheduled for Zone 1</li>
          <li>Spraying completed for pest control</li>
          <li>Fertilizer applied in Zone 3</li>
        </ul>
      </div>
{/* Different Pests and Diseases on Apple */}
<div className="bg-white shadow rounded-lg p-4 mt-10">
  <h2 className="font-semibold mb-4">Pests in Different Months</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {monthlyPests.map(({ month, pests }) => (
      <div key={month} className="bg-white shadow rounded-lg p-3 h-40 overflow-auto">
        <h3 className="font-medium border-b mb-2">{month}</h3>
        {pests.length > 0 ? (
          <div className="flex flex-col gap-2">
            {pests.map((pest) => (
              <div key={pest.name} className="flex justify-between items-start">
                <span className="font-semibold text-gray-800">{pest.name}</span>
                <div className="flex flex-wrap gap-1">
                  {pest.diseases.map((disease) => (
                    <span
                      key={disease}
                      className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No pests detected</p>
        )}
      </div>
    ))}
  </div>
</div>

      {/* Pesticide data */}
      <div className="bg-white shadow rounded-lg p-4 mt-10">
        <h2 className="font-semibold mb-2">Pesticides recomended</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {pesticideData.map(({ month, pesticides }) => (
            <div key={month} className="bg-white shadow rounded-lg p-4">
              <h3 className="font-medium border-b mb-2">{month}</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {pesticides.map((pesticide) => (
                  <li key={pesticide}>{pesticide}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
