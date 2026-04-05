import { Apple, Image } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../configs/api';
import ReactMarkdown from 'react-markdown';

const AppleYieldEstimator = () => {
  const [district, setDistrict] = useState('');
  const [species, setSpecies] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [soil, setSoil] = useState('');
  const [weather, setWeather] = useState('');
  const [pesticides, setPesticides] = useState('');
  const [treeCount, setTreeCount] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !district ||
      !species ||
      !growthStage ||
      !soil ||
      !weather ||
      !pesticides ||
      !treeCount
    ) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = {
      District_name: district,
      species,
      growth_stage: growthStage,
      soil,
      weather,
      pesticides,
      tree_count: treeCount,
    };

    try {
      const { data } = await api.post('/api/yield/estimation', formData);

      if (data.success) {
        setResult(data.result); // Save raw result object
        toast.success('Prediction received!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* LEFT FORM COLUMN */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-300"
      >
        <div className="flex items-center gap-3">
          <Apple className="w-6 text-green-600" />
          <h1 className="text-xl font-semibold">Apple Yield Estimator</h1>
        </div>

        {/* District */}
        <p className="mt-6 text-sm font-medium">District Name</p>
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
          placeholder="Sopore"
        />

        {/* Species */}
        <p className="mt-6 text-sm font-medium">Apple Species</p>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
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

        {/* Growth Stage */}
        <p className="mt-4 text-sm font-medium">Growth Stage</p>
        <select
          value={growthStage}
          onChange={(e) => setGrowthStage(e.target.value)}
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select Growth Stage</option>
          <option value="Flowering">Flowering</option>
          <option value="Fruit Set">Fruit Set</option>
          <option value="Maturation">Maturation</option>
          <option value="Harvest">Harvest</option>
        </select>

        {/* Soil + Weather */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm font-medium">Soil Type</p>
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
          </div>

          <div>
            <p className="text-sm font-medium">Weather</p>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select Weather</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Cool">Cool</option>
              <option value="Foggy">Foggy</option>
              <option value="Humid">Humid</option>
              <option value="Rainy">Rainy</option>
              <option value="Sunny">Sunny</option>
            </select>
          </div>
        </div>

        {/* Pesticides + Tree Count */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm font-medium">Pesticides Used</p>
            <select
              value={pesticides}
              onChange={(e) => setPesticides(e.target.value)}
              className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select Pesticide</option>
              <option value="Antracol">Antracol</option>
              <option value="Bavistin">Bavistin</option>
              <option value="Copper Oxychloride">Copper Oxychloride</option>
              <option value="Indofil M-45">Indofil M-45</option>
              <option value="Malathion">Malathion</option>
              <option value="Metasystox">Metasystox</option>
              <option value="Rogor">Rogor</option>
              <option value="Score">Score</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium">Tree Count</p>
            <input
              type="number"
              value={treeCount}
              onChange={(e) => setTreeCount(e.target.value)}
              className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md text-sm"
              placeholder="120"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"></span>
          ) : (
            <Image className="w-5" />
          )}
          Estimate Yield
        </button>
      </form>

      {/* RIGHT COLUMN — RAW JSON RESULT */}
      <div className={`${result ? "flex-1" : "w-full max-w-lg"} p-4 bg-white rounded-lg border border-gray-300 flex flex-col min-h-96`}>
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-green-600" />
          <h1 className="text-xl font-semibold">Predicted Output</h1>
        </div>

        {!result ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-9 h-9" />
              <p>Fill details and click "Estimate Yield"</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 text-sm">
            <pre className="text-base bg-gray-100 p-3 rounded-md w-full overflow-x-auto whitespace-pre-wrap break-words">
              <ReactMarkdown>{result}</ReactMarkdown>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleYieldEstimator;