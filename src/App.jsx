import { useState } from "react";
import { Network, GitBranch } from "lucide-react";
import Architecture from "./Architecture";
import Flow from "./Flow";

export default function App() {
  const [activeTab, setActiveTab] = useState("architecture");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg shadow-sm p-1 mb-6">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === "architecture"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Network className="w-5 h-5" />
            <span>Architecture</span>
          </button>
          
          <button
            onClick={() => setActiveTab("flow")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === "flow"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <GitBranch className="w-5 h-5" />
            <span>Flow</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "architecture" ? <Architecture /> : <Flow />}
        </div>
      </div>
    </div>
  );
}