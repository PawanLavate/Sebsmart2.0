import React, { useState } from 'react';
import { Leaf, Activity, PlusCircle } from 'lucide-react';
import api from '../configs/api';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

const TimeSeriesGrowth = () => {
  const [variety, setVariety] = useState('');
  const [soil, setSoil] = useState('');
  const [gdd, setGdd] = useState('');

  const [weatherRows, setWeatherRows] = useState([
    { date: '', tmin: '', tmax: '' },
  ]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Handle row input
  const updateWeatherRow = (index, field, value) => {
    const updated = [...weatherRows];
    updated[index][field] = value;
    setWeatherRows(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!variety || !soil) {
      toast.error('Variety & Soil Type are required!');
      return;
    }

    for (let row of weatherRows) {
      if (!row.date || !row.tmin || !row.tmax) {
        toast.error('Fill all daily weather fields');
        return;
      }
    }
    if (!gdd) {
  toast.error("Accumulated GDD is required!");
  return;
}


    const payload = {
      variety,
      soil,
      accumulated_gdd: Number(gdd),
      daily_weather: weatherRows,
    };

    setLoading(true);

    try {
      const { data } = await api.post('/api/growth/gdd', payload);

      if (data.success) {
        setResult(data.result);
        toast.success('Prediction received!');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* LEFT FORM COLUMN */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-300"
      >
        <div className="flex items-center gap-3">
          <Leaf className="w-6 text-green-600" />
          <h1 className="text-xl font-semibold">
            Apple Time-Series Growth Input
          </h1>
        </div>

        {/* Variety */}
        <p className="mt-6 text-sm font-medium">Apple Variety</p>
        <select
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select Species</option>
          <option value="Ambri">Ambri</option>
          <option value="Anna">Anna</option>
          <option value="Fuji">Fuji</option>
          <option value="Gala">Gala</option>
          <option value="Golden Delicious">Golden Delicious</option>
          <option value="Granny Smith">Granny Smith</option>
          <option value="Maharaji">Maharaji</option>
          <option value="Red Delicious">Red Delicious</option>
          <option value="Royal Delicious">Royal Delicious</option>
          <option value="Tydeman's Early">Tydeman's Early</option>
        </select>

        {/* Soil */}
        <p className="mt-4 text-sm font-medium">Soil Type</p>
        <select
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select Soil Type</option>
          <option value="Clay Loam">Clay Loam</option>
          <option value="Loamy">Loamy</option>
          <option value="Mountain Soil">Mountain Soil</option>
          <option value="Sandy Loam">Sandy Loam</option>
          <option value="Silty">Silty</option>
        </select>

        {/* Accumulated GDD */}
        <p className="mt-4 text-sm font-medium">
          Accumulated GDD (Growing Degree Days)
        </p>
        <input
          type="number"
          value={gdd}
          onChange={(e) => setGdd(e.target.value)}
          placeholder="Enter accumulated GDD"
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
        />

        {/* WEATHER ROWS */}
        <p className="mt-6 text-sm font-medium">Daily Weather Data</p>

        {weatherRows.map((row, index) => (
          <div key={index} className="grid grid-cols-3 gap-3 mt-3">
            <input
              type="date"
              value={row.date}
              onChange={(e) => updateWeatherRow(index, 'date', e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Min °C"
              value={row.tmin}
              onChange={(e) => updateWeatherRow(index, 'tmin', e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Max °C"
              value={row.tmax}
              onChange={(e) => updateWeatherRow(index, 'tmax', e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        ))}

        {/* <button
          type="button"
          onClick={addWeatherRow}
          className="flex items-center gap-2 text-green-600 text-sm mt-3 cursor-pointer"
        >
          <PlusCircle className="w-4" /> Add Day
        </button> */}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-green-500 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"></span>
          ) : (
            <Activity className="w-5" />
          )}
          Submit
        </button>
      </form>

      {/* RIGHT COLUMN — RAW RESPONSE */}
      <div
        className={`${result ? 'flex-1' : 'w-full max-w-lg'} p-4 bg-white rounded-lg border border-gray-300 flex flex-col min-h-96`}
      >
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-semibold">Model Output</h1>
        </div>

        {!result ? (
          <div className="flex-1 flex justify-center items-center text-gray-400 text-sm">
            Submit weather data to get prediction.
          </div>
        ) : (
          <pre className="bg-gray-100 p-3 text-base rounded-md mt-4 overflow-x-auto whitespace-pre-wrap break-words">
            <ReactMarkdown>{result}</ReactMarkdown>
          </pre>
        )}
      </div>
    </div>
  );
};

export default TimeSeriesGrowth;
