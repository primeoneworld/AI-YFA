import React, { useState } from 'react';
import { Search, Filter, Star, TrendingUp, AlertTriangle, Zap, Globe } from 'lucide-react';
import { useAndromeda } from '../hooks/useAndromeda';

interface YieldPoolsProps {
  darkMode: boolean;
}

export default function YieldPools({ darkMode }: YieldPoolsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChain, setSelectedChain] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  
  const { isConnected, executeYieldStrategy, isLoading } = useAndromeda();

  const pools = [
    {
      id: 1,
      name: 'ATOM/OSMO',
      protocol: 'Osmosis',
      chain: 'Osmosis',
      apy: '28.5%',
      tvl: '$2.4M',
      risk: 'Medium',
      aiScore: 9.2,
      volume24h: '$156K',
      fees: '0.3%',
      featured: true,
      impermanentLoss: '2.3%'
    },
    {
      id: 2,
      name: 'JUNO/USDC',
      protocol: 'JunoSwap',
      chain: 'Juno',
      apy: '22.1%',
      tvl: '$1.8M',
      risk: 'Low',
      aiScore: 8.8,
      volume24h: '$89K',
      fees: '0.25%',
      featured: true,
      impermanentLoss: '0.8%'
    },
    {
      id: 3,
      name: 'STARS/ATOM',
      protocol: 'Stargaze DEX',
      chain: 'Stargaze',
      apy: '31.2%',
      tvl: '$890K',
      risk: 'High',
      aiScore: 7.9,
      volume24h: '$67K',
      fees: '0.3%',
      featured: false,
      impermanentLoss: '5.2%'
    },
    {
      id: 4,
      name: 'SCRT/USDT',
      protocol: 'SecretSwap',
      chain: 'Secret Network',
      apy: '19.8%',
      tvl: '$3.1M',
      risk: 'Medium',
      aiScore: 8.4,
      volume24h: '$234K',
      fees: '0.3%',
      featured: false,
      impermanentLoss: '1.9%'
    },
    {
      id: 5,
      name: 'CMDX/ATOM',
      protocol: 'Comdex DEX',
      chain: 'Comdex',
      apy: '24.7%',
      tvl: '$1.2M',
      risk: 'High',
      aiScore: 7.2,
      volume24h: '$45K',
      fees: '0.35%',
      featured: false,
      impermanentLoss: '4.1%'
    },
    {
      id: 6,
      name: 'HUAHUA/ATOM',
      protocol: 'Osmosis',
      chain: 'Osmosis',
      apy: '45.6%',
      tvl: '$450K',
      risk: 'Very High',
      aiScore: 6.1,
      volume24h: '$23K',
      fees: '0.3%',
      featured: false,
      impermanentLoss: '8.7%'
    }
  ];

  const chains = ['all', 'Osmosis', 'Juno', 'Stargaze', 'Secret Network', 'Comdex'];
  const riskLevels = ['all', 'Low', 'Medium', 'High', 'Very High'];

  const filteredPools = pools.filter(pool => {
    return (
      pool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedChain === 'all' || pool.chain === selectedChain) &&
      (riskFilter === 'all' || pool.risk === riskFilter)
    );
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-orange-500';
      case 'High': return 'text-red-500';
      case 'Very High': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-500';
    if (score >= 7.5) return 'text-orange-500';
    return 'text-red-500';
  };
  const handleInvest = async (pool: any) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const amount = prompt('Enter investment amount (in USD):');
      if (amount && parseFloat(amount) > 0) {
        await executeYieldStrategy(amount, pool.id.toString());
        alert(`Successfully invested $${amount} in ${pool.name} via Andromeda ADOs!`);
      }
    } catch (error) {
      alert('Investment failed: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Yield Pools</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            AI-optimized pools across the Cosmos ecosystem
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <Zap className="w-4 h-4 text-blue-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>AI Engine: Active</span>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
            Auto-Optimize
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
          <input
            type="text"
            placeholder="Search pools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        >
          {chains.map(chain => (
            <option key={chain} value={chain}>{chain === 'all' ? 'All Chains' : chain}</option>
          ))}
        </select>

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        >
          {riskLevels.map(risk => (
            <option key={risk} value={risk}>{risk === 'all' ? 'All Risk Levels' : `${risk} Risk`}</option>
          ))}
        </select>
      </div>

      {/* Featured Pools */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Featured Pools</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPools.filter(pool => pool.featured).map((pool) => (
            <div key={pool.id} className={`p-4 rounded-lg border-2 border-blue-200 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pool.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pool.protocol} • {pool.chain}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-bold text-lg">{pool.apy}</p>
                  <div className={`text-sm ${getAIScoreColor(pool.aiScore)}`}>AI Score: {pool.aiScore}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TVL:</span>
                  <span className={`ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pool.tvl}</span>
                </div>
                <div>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Risk:</span>
                  <span className={`ml-1 ${getRiskColor(pool.risk)}`}>{pool.risk}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Pools Table */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border overflow-hidden`}>
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>All Pools</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pool</th>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Chain</th>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>APY</th>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>TVL</th>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Risk</th>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>AI Score</th>
                <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPools.map((pool) => (
                <tr key={pool.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {pool.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pool.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pool.protocol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Globe className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pool.chain}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-green-500 font-semibold">{pool.apy}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pool.tvl}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getRiskColor(pool.risk)}>{pool.risk}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={getAIScoreColor(pool.aiScore)}>{pool.aiScore}</span>
                      {pool.aiScore >= 8.5 && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {pool.aiScore < 7 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => handleInvest(pool)}
                      disabled={!isConnected || isLoading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
                    >
                      Invest
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}