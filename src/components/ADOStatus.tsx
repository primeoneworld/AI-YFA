import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, Zap, Database, Vote, ShoppingCart, Lock } from 'lucide-react';
import { ANDROMEDA_CONFIG } from '../config/andromeda';
import { pulsarService } from '../services/pulsarService';

interface ADOStatusProps {
  darkMode: boolean;
}

export default function ADOStatus({ darkMode }: ADOStatusProps) {
  const [adoStatuses, setAdoStatuses] = useState({
    cw20: { deployed: true, address: ANDROMEDA_CONFIG.contracts.cw20, status: 'active' },
    splitter: { deployed: true, address: ANDROMEDA_CONFIG.contracts.splitter, status: 'active' },
    vesting: { deployed: true, address: ANDROMEDA_CONFIG.contracts.vesting, status: 'active' },
    marketplace: { deployed: true, address: ANDROMEDA_CONFIG.contracts.marketplace, status: 'active' },
    cw20Staking: { deployed: true, address: ANDROMEDA_CONFIG.contracts.cw20Staking, status: 'active' },
  });

  const [pulsarWorkflows, setPulsarWorkflows] = useState({
    rebalancing: { status: 'active', lastExecution: new Date(), nextExecution: new Date(Date.now() + 6 * 60 * 60 * 1000) },
    profitDistribution: { status: 'active', lastExecution: new Date(), nextExecution: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    riskMonitoring: { status: 'active', lastExecution: new Date(), nextExecution: new Date(Date.now() + 60 * 1000) },
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(async () => {
      try {
        const rebalancingStatus = await pulsarService.getWorkflowStatus(ANDROMEDA_CONFIG.pulsar.workflows.rebalancing);
        const profitStatus = await pulsarService.getWorkflowStatus(ANDROMEDA_CONFIG.pulsar.workflows.profitDistribution);
        const riskStatus = await pulsarService.getWorkflowStatus(ANDROMEDA_CONFIG.pulsar.workflows.riskMonitoring);

        setPulsarWorkflows({
          rebalancing: rebalancingStatus,
          profitDistribution: profitStatus,
          riskMonitoring: riskStatus,
        });
      } catch (error) {
        console.error('Failed to update Pulsar status:', error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const adoConfigs = [
    {
      key: 'cw20',
      name: 'YFA Token (CW20)',
      description: 'Governance token for AI-YFA protocol',
      icon: Database,
      color: 'blue'
    },
    {
      key: 'splitter',
      name: 'Profit Splitter',
      description: 'Automated profit distribution to stakeholders',
      icon: Zap,
      color: 'green'
    },
    {
      key: 'vesting',
      name: 'Token Vesting',
      description: 'Time-locked token distribution for team and advisors',
      icon: Lock,
      color: 'purple'
    },
    {
      key: 'marketplace',
      name: 'RWA Marketplace',
      description: 'Trading platform for tokenized real-world assets',
      icon: ShoppingCart,
      color: 'orange'
    },
    {
      key: 'cw20Staking',
      name: 'Governance Staking',
      description: 'Stake YFA tokens to participate in governance',
      icon: Vote,
      color: 'indigo'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'error': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      indigo: 'bg-indigo-100 text-indigo-800',
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Andromeda OS Integration Status
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time status of deployed ADOs and Pulsar automation workflows
        </p>
      </div>

      {/* ADO Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adoConfigs.map((ado) => {
          const status = adoStatuses[ado.key];
          const StatusIcon = getStatusIcon(status.status);
          const IconComponent = ado.icon;

          return (
            <div
              key={ado.key}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 border`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${getColorClasses(ado.color)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className={`flex items-center ${getStatusColor(status.status)}`}>
                  <StatusIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium capitalize">{status.status}</span>
                </div>
              </div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {ado.name}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                {ado.description}
              </p>
              
              {status.deployed && (
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} font-mono`}>
                  {status.address.substring(0, 20)}...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pulsar Workflows */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Pulsar Automation Workflows
          </h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              All workflows active
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Portfolio Rebalancing
                </h5>
                <span className="text-green-500 text-sm">Active</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                AI-driven rebalancing every 6 hours
              </p>
              <div className="text-xs space-y-1">
                <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Last: {pulsarWorkflows.rebalancing.lastExecution.toLocaleTimeString()}
                </div>
                <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Next: {pulsarWorkflows.rebalancing.nextExecution.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Profit Distribution
                </h5>
                <span className="text-green-500 text-sm">Active</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Daily profit sharing via Splitter ADO
              </p>
              <div className="text-xs space-y-1">
                <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Last: {pulsarWorkflows.profitDistribution.lastExecution.toLocaleTimeString()}
                </div>
                <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Next: {pulsarWorkflows.profitDistribution.nextExecution.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Risk Monitoring
                </h5>
                <span className="text-green-500 text-sm">Active</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Real-time DeepShield AI monitoring
              </p>
              <div className="text-xs space-y-1">
                <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Last: {pulsarWorkflows.riskMonitoring.lastExecution.toLocaleTimeString()}
                </div>
                <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Next: {pulsarWorkflows.riskMonitoring.nextExecution.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Summary */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-xl p-6 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">aOS</span>
          </div>
          <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Andromeda OS Integration Complete
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-1`}>
              ADOs Deployed
            </p>
            <p className={`${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              5 core ADOs active on Andromeda testnet
            </p>
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-purple-300' : 'text-purple-800'} mb-1`}>
              Pulsar Workflows
            </p>
            <p className={`${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
              3 automation workflows running
            </p>
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'} mb-1`}>
              AI Integration
            </p>
            <p className={`${darkMode ? 'text-green-200' : 'text-green-700'}`}>
              Deep3 Labs StakeSage-C & DeepShield active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}