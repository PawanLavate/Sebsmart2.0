import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import Dashboard from "./pages/Dashboard";
import PestControl from "./pages/PestControl";
import TimeSeriesGrowth from "./pages/TimeSeriesGrowth";
import YieldEstimation from "./pages/YieldEstimation";
import Community from "./pages/Community";
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pest-control" element={<PestControl />} />
          <Route path="growth-tracking" element={<TimeSeriesGrowth />} />
          <Route path="yield-estimation" element={<YieldEstimation />} />
          <Route path="community" element={<Community />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
