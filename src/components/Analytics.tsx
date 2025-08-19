import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, DollarSign, Zap, Globe, Users } from 'lucide-react';

interface AnalyticsProps {
  darkMode: boolean;
}

export default function Analytics({ darkMode }: AnalyticsProps) {
  const [timeframe, setTimeframe] = useState('7d');
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 12450.67,
    change24h: 2.34,
    totalYield: 2847.23,
    apy: 24.7
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioData(prev => ({
        ...prev,
        totalValue: prev.totalValue + (Math.random() - 0.5) * 50,
        change24h: (Math.random() - 0.5) * 10,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const performanceData = [
    { period: 'Last 24h', value: '+$156.23', percentage: '+1.26%', positive: true },
    { period: 'Last 7d', value: '+$847.91', percentage: '+7.31%', positive: true },
    { period: 'Last 30d', value: '+$2,341.67', percentage: '+23.12%', positive: true },
    { period: 'All time', value: '+$4,892.34', percentage: '+64.8%', positive: true }
  ];

  const chainMetrics = [
    { chain: 'Osmosis', tvl: '$4.2M', pools: 12, apy: '26.8%', volume24h: '$892K', allocation: 35 },
    { chain: 'Juno', tvl: '$2.1M', pools: 8, apy: '21.4%', volume24h: '$456K', allocation: 25 },
    { chain: 'Stargaze', tvl: '$1.8M', pools: 6, apy: '29.1%', volume24h: '$234K', allocation: 20 },
    { chain: 'Secret Network', tvl: '$3.4M', pools: 10, apy: '18.9%', volume24h: '$567K', allocation: 15 },
    { chain: 'Comdex', tvl: '$890K', pools: 4, apy: '24.7%', volume24h: '$123K', allocation: 5 }
  ];

  const aiMetrics = [
    { metric: 'Optimization Success Rate', value: '94.2%', change: '+1.8%', positive: true },
    { metric: 'Risk Prediction Accuracy', value: '87.6%', change: '+2.3%', positive: true },
    { metric: 'Rebalancing Frequency', value: '6.4/day', change: '-0.2', positive: false },
    { metric: 'Pool Discovery Rate', value: '12/week', change: '+3', positive: true }
  ];

  const mockChartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 10000 + Math.random() * 5000 + i * 100,
    volume: 100000 + Math.random() * 50000
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Comprehensive performance insights and AI metrics
          </p>
        </div>
        
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d', '1y'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-blue-500 text-white'
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((item, index) => (
          <div key={index} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.period}
              </h3>
              {item.positive ? 
                <TrendingUp className="w-4 h-4 text-green-500" /> : 
                <TrendingDown className="w-4 h-4 text-red-500" />
              }
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {item.value}
            </p>
            <p className={`text-sm ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
              {item.percentage}
            </p>
          </div>
        ))}
      </div>

      {/* Portfolio Chart */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Portfolio Performance
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Portfolio Value</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily Volume</span>
            </div>
          </div>
        </div>
        
        {/* Simple chart visualization */}
        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 800 200">
            {/* Portfolio line */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              points={mockChartData.map((point, index) => 
                `${(index / (mockChartData.length - 1)) * 800},${200 - ((point.value - 10000) / 5000) * 150}`
              ).join(' ')}
            />
            
            {/* Volume bars */}
            {mockChartData.map((point, index) => (
              <rect
                key={index}
                x={(index / mockChartData.length) * 800}
                y={200 - ((point.volume - 100000) / 50000) * 50}
                width="10"
                height={((point.volume - 100000) / 50000) * 50}
                fill="#8B5CF6"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Value</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>24h Change</p>
            <p className={`text-xl font-bold ${portfolioData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioData.change24h >= 0 ? '+' : ''}${portfolioData.change24h.toFixed(2)}
            </p>
          </div>
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average APY</p>
            <p className={`text-xl font-bold text-green-500`}>
              {portfolioData.apy}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chain Analytics */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Chain Performance
            </h3>
            <Globe className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="space-y-4">
            {chainMetrics.map((chain, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {chain.chain}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {chain.pools} active pools
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-semibold">{chain.apy}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      TVL: {chain.tvl}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    24h Volume: {chain.volume24h}
                  </span>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Allocation: {chain.allocation}%
                  </span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${chain.allocation * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Performance
            </h3>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-blue-500">StakeSage-C & DeepShield</span>
            </div>
          </div>
          <div className="space-y-4">
            {aiMetrics.map((metric, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {metric.metric}
                    </p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-1`}>
                      {metric.value}
                    </p>
                  </div>
                  <div className={`flex items-center text-sm ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="ml-1">{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-50'} border border-blue-200`}>
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                AI Insights
              </span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              AI models detected 3 new high-yield opportunities in the last 24h. Risk assessment 
              shows optimal rebalancing window in 2-4 hours based on market volatility predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <DollarSign className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-500'} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${portfolioData.totalYield.toLocaleString()}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Yield</p>
          </div>
          
          <div className="text-center">
            <Users className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>8,247</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</p>
          </div>
          
          <div className="text-center">
            <BarChart3 className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-500'} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>$47.2M</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total TVL</p>
          </div>
          
          <div className="text-center">
            <Activity className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-500'} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>156</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI Optimizations</p>
          </div>
          
          <div className="text-center">
            <Globe className={`w-8 h-8 ${darkMode ? 'text-teal-400' : 'text-teal-500'} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>12</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Supported Chains</p>
          </div>
          
          <div className="text-center">
            <Zap className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>99.8%</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
}