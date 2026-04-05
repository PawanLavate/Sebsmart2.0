import { Bug, Leaf } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../configs/api'; // your custom axios instance
import ReactMarkdown from 'react-markdown';

const PestControl = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [cropStage, setCropStage] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error('Please upload an image');

    setLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('location', location);
      formData.append('cropStage', cropStage);

      const { data } = await api.post('/api/pest/detectpest', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        setPrediction(data.result); // your backend should return {success:true, result:{...}}
        toast.success('Prediction received!');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error while predicting pest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column — Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-300"
      >
        <div className="flex items-center gap-3">
          <Leaf className="w-6 text-green-600" />
          <h1 className="text-xl font-semibold">Apple Pest Prediction</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md"
          required
        />

        <p className="mt-4 text-sm font-medium">Location</p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md"
          placeholder="e.g., Sopore, Jammu and Kashmir"
        />

        <p className="mt-4 text-sm font-medium">Crop Stage</p>
        <select
          value={cropStage}
          onChange={(e) => setCropStage(e.target.value)}
          className="w-full p-2 px-3 mt-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Growth Stage</option>
          <option value="Bud Break">Bud Break</option>
          <option value="Flowering">Flowering</option>
          <option value="Fruit Set">Fruit Set</option>
          <option value="Fruit Development">Fruit Development</option>
          <option value="Maturation">Maturation</option>
          <option value="Harvest">Harvest</option>
        </select>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 mt-6 rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"></span>
          ) : (
            <Bug className="w-5" />
          )}
          Predict Pest
        </button>
      </form>

      {/* Right Column — Result */}
      <div className={`${prediction ? "flex-1" : "w-full max-w-lg"} p-4 bg-white rounded-lg border border-gray-300 flex flex-col min-h-96 `}>
        <div className="flex items-center gap-3">
          <Bug className="w-5 h-5 text-red-500" />
          <h1 className="text-xl font-semibold">Prediction Result</h1>
        </div>

        {!prediction ? (
          <div className="flex-1 flex justify-center items-center text-gray-400 text-sm">
            <Leaf className="w-10 h-10 mb-2" />
            <p>No prediction yet. Upload an image and click Predict.</p>
          </div>
        ) : (
          <pre className="mt-4 text-base bg-gray-100 p-3 rounded-md whitespace-pre-wrap break-words">
            <ReactMarkdown>{prediction}</ReactMarkdown>
          </pre>
        )}
      </div>
    </div>
  );
};

export default PestControl;