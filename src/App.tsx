import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import YieldPools from './components/YieldPools';
import Governance from './components/Governance';
import Analytics from './components/Analytics';
import { BarChart3, Home, Vote, Coins } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, component: Dashboard },
    { id: 'pools', name: 'Yield Pools', icon: Coins, component: YieldPools },
    { id: 'governance', name: 'Governance', icon: Vote, component: Governance },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, component: Analytics },
  ];

  const ActiveComponent = navigation.find(nav => nav.id === activeTab)?.component || Dashboard;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 border sticky top-8`}>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Quick Stats */}
              <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  Quick Stats
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Portfolio APY
                    </span>
                    <span className="text-sm text-green-500 font-medium">24.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active Pools
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      YFA Balance
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>1,245</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ActiveComponent darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI-YFA
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                The future of DeFi yield farming powered by AI optimization and cross-chain interoperability.
              </p>
            </div>
            
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                Protocol
              </h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Audit Reports</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Bug Bounty</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                Community
              </h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                Ecosystem
              </h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Andromeda OS</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Deep3 Labs</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Cosmos Hub</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">IBC Protocol</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 AI-YFA. Built for the Andromeda OS Global Buildathon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;