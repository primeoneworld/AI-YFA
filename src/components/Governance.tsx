import React, { useState } from 'react';
import { Vote, Users, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useAndromeda } from '../hooks/useAndromeda';

interface GovernanceProps {
  darkMode: boolean;
}

export default function Governance({ darkMode }: GovernanceProps) {
  const [userYFABalance] = useState(1245.67);
  const [votingPower] = useState(0.034); // 3.4% of total voting power
  
  const { isConnected, yfaBalance, voteOnProposal, createGovernanceProposal, isLoading } = useAndromeda();

  const proposals = [
    {
      id: 1,
      title: 'Increase AI Optimization Frequency',
      description: 'Propose to increase the frequency of AI portfolio rebalancing from daily to every 6 hours to maximize yield opportunities.',
      status: 'active',
      timeLeft: '5 days, 14 hours',
      totalVotes: 2456789,
      yesVotes: 1847592,
      noVotes: 456123,
      abstainVotes: 153074,
      quorum: 85.2,
      creator: 'cosmos1ab...xy9z',
      createdAt: '2025-01-08',
      userVoted: false,
      category: 'Protocol Enhancement'
    },
    {
      id: 2,
      title: 'Add Support for Terra Luna Classic',
      description: 'Integrate Terra Luna Classic pools into the AI-YFA ecosystem to expand yield farming opportunities.',
      status: 'active',
      timeLeft: '2 days, 8 hours',
      totalVotes: 1893456,
      yesVotes: 967234,
      noVotes: 734521,
      abstainVotes: 191701,
      quorum: 67.8,
      creator: 'cosmos1cd...mn8p',
      createdAt: '2025-01-05',
      userVoted: true,
      userVote: 'yes',
      category: 'Chain Integration'
    },
    {
      id: 3,
      title: 'Implement Emergency Pause Mechanism',
      description: 'Add a community-controlled emergency pause feature for AI trading during extreme market volatility.',
      status: 'passed',
      timeLeft: 'Ended',
      totalVotes: 3245678,
      yesVotes: 2456789,
      noVotes: 567432,
      abstainVotes: 221457,
      quorum: 92.1,
      creator: 'cosmos1ef...qr3t',
      createdAt: '2024-12-28',
      userVoted: true,
      userVote: 'yes',
      category: 'Security'
    },
    {
      id: 4,
      title: 'Reduce Platform Fees',
      description: 'Lower the platform fee from 2% to 1.5% to attract more users and increase TVL.',
      status: 'rejected',
      timeLeft: 'Ended',
      totalVotes: 1567890,
      yesVotes: 634567,
      noVotes: 789456,
      abstainVotes: 143867,
      quorum: 56.3,
      creator: 'cosmos1gh...uv7w',
      createdAt: '2024-12-20',
      userVoted: false,
      category: 'Economics'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-500 bg-blue-100';
      case 'passed': return 'text-green-500 bg-green-100';
      case 'rejected': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Clock;
      case 'passed': return CheckCircle;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Protocol Enhancement': 'bg-purple-100 text-purple-800',
      'Chain Integration': 'bg-blue-100 text-blue-800',
      'Security': 'bg-red-100 text-red-800',
      'Economics': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleVote = async (proposalId: number, vote: 'yes' | 'no' | 'abstain') => {
    if (!isConnected) {
      alert('Please connect your wallet to vote');
      return;
    }

    try {
      await voteOnProposal(proposalId, vote);
      alert(`Vote submitted successfully via CW20 Staking ADO!`);
    } catch (error) {
      alert('Voting failed: ' + error.message);
    }
  };

  const handleCreateProposal = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to create proposals');
      return;
    }

    const title = prompt('Enter proposal title:');
    const description = prompt('Enter proposal description:');
    
    if (title && description) {
      try {
        await createGovernanceProposal(title, description);
        alert('Proposal created successfully!');
      } catch (error) {
        alert('Proposal creation failed: ' + error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Governance</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Shape the future of AI-YFA with your $YFA tokens
          </p>
        </div>
        
        <button 
          onClick={handleCreateProposal}
          disabled={!isConnected || isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          Create Proposal
        </button>
      </div>

      {/* Voting Power Card */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Vote className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'} mr-2`} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Voting Power</h3>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{(votingPower * 100).toFixed(3)}%</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isConnected ? parseFloat(yfaBalance || '0').toLocaleString() : userYFABalance.toLocaleString()} YFA tokens
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-500'} mr-2`} />
              <h3 className={`text-lg font-semibold ${darkMode ?