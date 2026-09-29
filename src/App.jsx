import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  History, 
  Building2, 
  Search, 
  SlidersHorizontal,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

// Mock Data for Land Parcels (Khasras)
const initialPlots = [
  {
    id: 1,
    khasraNo: "142/2",
    size: "2400 sq.ft",
    askingPrice: "₹45 Lakhs",
    roiScore: "8.5 / 10",
    status: "Clear Title",
    riskLevel: "Low",
    history: {
      2016: { use: "Agricultural / Farmland", owner: "Govt Records: Farmer Ramlal", color: "bg-green-100 text-green-800" },
      2020: { use: "Semi-Urban Conversion Zone", owner: "Real Estate Developer Inc.", color: "bg-yellow-100 text-yellow-800" },
      2026: { use: "Residential High-Density Zone", owner: "Private Owner", color: "bg-blue-100 text-blue-800" }
    },
    houseDetails: {
      exists: true,
      age: "4 Years",
      floors: 2,
      structure: "RCC Frame",
      color: "Beige & White"
    }
  },
  {
    id: 2,
    khasraNo: "143/1",
    size: "3200 sq.ft",
    askingPrice: "₹72 Lakhs",
    roiScore: "9.2 / 10",
    status: "Disputed / Litigation",
    riskLevel: "High",
    history: {
      2016: { use: "Reserved Forest Land", owner: "Government of MP", color: "bg-emerald-100 text-emerald-800" },
      2020: { use: "Commercial Mixed-Use Proposal", owner: "Disputed Claim (Builder vs Govt)", color: "bg-red-100 text-red-800" },
      2026: { use: "Commercial / Legal Dispute", owner: "Under Court Review", color: "bg-rose-100 text-rose-800" }
    },
    houseDetails: {
      exists: false,
      age: "N/A",
      floors: 0,
      structure: "Empty Plot",
      color: "N/A"
    }
  },
  {
    id: 3,
    khasraNo: "145/4",
    size: "1800 sq.ft",
    askingPrice: "₹38 Lakhs",
    roiScore: "7.8 / 10",
    status: "Clear Title",
    riskLevel: "Medium",
    history: {
      2016: { use: "Barren Land", owner: "Private Individual", color: "bg-stone-100 text-stone-800" },
      2020: { use: "Industrial Warehouse Shed", owner: "Logistics Corp", color: "bg-orange-100 text-orange-800" },
      2026: { use: "Residential Suburb", owner: "Individual Buyer", color: "bg-blue-100 text-blue-800" }
    },
    houseDetails: {
      exists: true,
      age: "12 Years",
      floors: 1,
      structure: "Load Bearing Brickwork",
      color: "Grey"
    }
  }
];

export default function App() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedPlot, setSelectedPlot] = useState(initialPlots[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlots = initialPlots.filter(plot => 
    plot.khasraNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">BhoomiAI — GIS PropTech Intelligence</h1>
            <p className="text-xs text-slate-400">Land Intelligence & Risk Assessment MVP</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-blue-900/50 text-blue-300 px-3 py-1.5 rounded-full border border-blue-700/50">
            Active Region: Indore Sector 4
          </span>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        
        {/* Left & Middle: Map & Grid Area (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          
          {/* Time Machine Controls */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold flex items-center gap-2 text-blue-400">
                <History className="w-4 h-4" /> Time-Machine Land Slider
              </span>
              <span className="text-lg font-bold text-white bg-slate-700 px-3 py-0.5 rounded">
                Year: {selectedYear}
              </span>
            </div>
            <input 
              type="range" 
              min="2016" 
              max="2026" 
              step="4"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
              <span>2016 (Past / Agri)</span>
              <span>2020 (Transition)</span>
              <span>2026 (Current Zone)</span>
            </div>
          </div>

          {/* Interactive Plot Grid / Map Simulation */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex-1 flex flex-col shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-semibold flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" /> Land Parcels (Khasra Map Grid)
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search Khasra..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Plot Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPlots.map((plot) => {
                const historyData = plot.history[selectedYear];
                const isSelected = selectedPlot.id === plot.id;

                return (
                  <div 
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-950/30 shadow-blue-900/20 shadow-lg' 
                        : 'border-slate-700 bg-slate-900/60 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-white">Khasra #{plot.khasraNo}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${historyData.color}`}>
                        {selectedYear}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{plot.size}</p>
                    <div className="text-xs bg-slate-800 p-2 rounded border border-slate-700/50 mb-3">
                      <span className="text-slate-400 block font-semibold mb-0.5">Land Use ({selectedYear}):</span>
                      <span className="text-slate-200 font-medium">{historyData.use}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-emerald-400">{plot.askingPrice}</span>
                      <span className={`px-2 py-0.5 rounded ${plot.riskLevel === 'High' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
                        {plot.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Property Intelligence Panel */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-md font-semibold mb-4 flex items-center gap-2 text-blue-400">
              <TrendingUp className="w-5 h-5" /> Intelligence & Risk Dashboard
            </h2>

            {/* Selected Plot Summary Header */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-bold text-white">Khasra #{selectedPlot.khasraNo}</span>
                <span className="text-sm font-extrabold text-blue-400">{selectedPlot.roiScore} ROI</span>
              </div>
              <p className="text-xs text-slate-400">Dimensions: {selectedPlot.size} | Asking: {selectedPlot.askingPrice}</p>
            </div>

            {/* Legal Risk Flagging */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Legal Risk Analysis</h3>
              <div className={`p-3 rounded-lg border flex items-start gap-3 ${
                selectedPlot.riskLevel === 'High' 
                  ? 'bg-red-950/40 border-red-800 text-red-200' 
                  : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
              }`}>
                {selectedPlot.riskLevel === 'High' ? (
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-bold">{selectedPlot.status}</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {selectedPlot.riskLevel === 'High' 
                      ? 'Warning: Active litigation found in revenue records. Verify title deed carefully.' 
                      : 'Verified: Title deed clear through historical transition tracking.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Existing Structure & House Details */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Building2 className="w-4 h-4" /> Structure & House Records
              </h3>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Building Exists:</span>
                  <span className="font-semibold text-white">{selectedPlot.houseDetails.exists ? 'Yes' : 'No'}</span>
                </div>
                {selectedPlot.houseDetails.exists && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Approx Age:</span>
                      <span className="font-semibold text-white">{selectedPlot.houseDetails.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Floors:</span>
                      <span className="font-semibold text-white">{selectedPlot.houseDetails.floors} Floors</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Structure Type:</span>
                      <span className="font-semibold text-white">{selectedPlot.houseDetails.structure}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Historical Ownership Timeline */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ownership Timeline ({selectedYear})</h3>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
                <p className="text-slate-300"><strong className="text-slate-400">Current Holder:</strong> {selectedPlot.history[selectedYear].owner}</p>
                <p className="text-slate-300"><strong className="text-slate-400">Zoning Category:</strong> {selectedPlot.history[selectedYear].use}</p>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-700 text-center">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-blue-600/20">
              Generate Comprehensive PDF Report
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}