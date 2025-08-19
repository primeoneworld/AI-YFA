import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Zap, Shield, Globe, ArrowUpRight, ArrowDownRight, Bot } from 'lucide-react';

interface DashboardProps {
  darkMode: boolean;
}

export default function Dashboard({ darkMode }: DashboardProps) {
  const [totalValue, setTotalValue] = useState(12450.67);
  const [dailyChange, setDailyChange] = useState(156.23);

  // Simulate real-time updates
  useEffect(() => range => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 20;
      setTotalValue(prev => Math.max(0, prev + change));
      setDailyChange(prev => prev + (Math.random() - 0.5) * 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Portfolio Value', value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: `+${dailyChange.toFixed(2)}`, isPositive: dailyChange > 0, icon: DollarSign },
    { label: 'Average APY', value: '24.7%', change: '+2.1%', isPositive: true, icon: TrendingUp },
    { label: 'Active Positions', value: '8', change: '+1', isPositive: true, icon: Zap },
    { label: 'Risk Score', value: '6.2/10', change: '-0.3', isPositive: false, icon: Shield },
  ];

  const recentActivities = [
    { action: 'AI Optimization', pool: 'Osmosis ATOM/OSMO', amount: '+$234.56', time: '2 min ago', type: 'optimization' },
    { action: 'Yield Claimed', pool: 'Juno JUNO/USDC', amount: '+$89.12', time: '15 min ago', type: 'claim' },
    { action: 'Rebalancing', pool: 'Stargaze STARS/ATOM', amount: '~$1,200', time: '1 hour ago', type: 'rebalance' },
    { action: 'Risk Alert', pool: 'Secret SCRT/USDT', amount: 'High volatility', time: '2 hours ago', type: 'alert' },
  ];

  const topPools = [
    { name: 'Osmosis ATOM/OSMO', apy: '28.5%', tvl: '$2.4M', risk: 'Medium', allocation: 25, chain: 'Osmosis' },
    { name: 'Juno JUNO/USDC', apy: '22.1%', tvl: '$1.8M', risk: 'Low', allocation: 20, chain: 'Juno' },
    { name: 'Stargaze STARS/ATOM', apy: '31.2%', tvl: '$890K', risk: 'High', allocation: 15, chain: 'Stargaze' },
    { name: 'Secret SCRT/USDT', apy: '19.8%', tvl: '$3.1M', risk: 'Medium', allocation: 18, chain: 'Secret Network' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border backdrop-blur-sm transition-all hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <div className={`flex items-center mt-2 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span className="text-sm ml-1">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <stat.icon className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Recommendations</h3>
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-blue-500">StakeSage-C Active</span>
            </div>
          </div>
          <div className="space-y-4">
            {topPools.slice(0, 3).map((pool, index) => (
              <div key={index} className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pool.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pool.chain}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-semibold">{pool.apy}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TVL: {pool.tvl}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all">
            View All Recommendations
          </button>
        </div>

        {/* Recent Activity */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
            <Globe className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.pool}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${activity.type === 'alert' ? 'text-orange-500' : 'text-green-500'}`}>
                    {activity.amount}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Allocation */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Portfolio Allocation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {topPools.map((pool, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pool.name}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pool.allocation}%</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pool.allocation * 4}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-green-500">{pool.apy} APY</span>
                  <span className={`${pool.risk === 'Low' ? 'text-green-500' : pool.risk === 'Medium' ? 'text-orange-500' : 'text-red-500'}`}>
                    {pool.risk} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full border-8 border-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                <div>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>78%</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Allocated</p>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                22% available for optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}