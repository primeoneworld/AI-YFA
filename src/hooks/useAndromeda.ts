import { useState, useEffect, useCallback } from 'react';
import { andromedaService } from '../services/andromedaService';
import { pulsarService } from '../services/pulsarService';
import { aiService } from '../services/aiService';

export interface AndromedaState {
  isConnected: boolean;
  address: string;
  yfaBalance: string;
  stakingInfo: any;
  isLoading: boolean;
  error: string | null;
}

export function useAndromeda() {
  const [state, setState] = useState<AndromedaState>({
    isConnected: false,
    address: '',
    yfaBalance: '0',
    stakingInfo: null,
    isLoading: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const address = await andromedaService.connectWallet();
      const balance = await andromedaService.getYFABalance(address);
      const stakingInfo = await andromedaService.getStakingInfo(address);
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        address,
        yfaBalance: balance,
        stakingInfo,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Connection failed',
        isLoading: false,
      }));
    }
  }, []);

  const deployADOs = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Deploy all required ADOs
      const tokenAddress = await andromedaService.deployYFAToken();
      const splitterAddress = await andromedaService.deploySplitterADO();
      const vestingAddress = await andromedaService.deployVestingADO();
      const marketplaceAddress = await andromedaService.deployMarketplaceADO();
      const stakingAddress = await andromedaService.deployStakingADO();

      console.log('ADOs deployed:', {
        token: tokenAddress,
        splitter: splitterAddress,
        vesting: vestingAddress,
        marketplace: marketplaceAddress,
        staking: stakingAddress,
      });

      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'ADO deployment failed',
        isLoading: false,
      }));
    }
  }, []);

  const executeYieldStrategy = useCallback(async (amount: string, poolAddress: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Get AI recommendations first
      const recommendations = await aiService.getYieldRecommendations(
        parseFloat(amount),
        'medium'
      );

      // Execute strategy using ADOs
      const txHash = await andromedaService.executeYieldStrategy(amount, poolAddress);
      
      console.log('Yield strategy executed:', txHash);
      setState(prev => ({ ...prev, isLoading: false }));
      
      return txHash;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Strategy execution failed',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const createGovernanceProposal = useCallback(async (title: string, description: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const txHash = await andromedaService.createProposal(title, description);
      console.log('Proposal created:', txHash);
      
      setState(prev => ({ ...prev, isLoading: false }));
      return txHash;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Proposal creation failed',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const voteOnProposal = useCallback(async (proposalId: number, vote: 'yes' | 'no' | 'abstain') => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const txHash = await andromedaService.voteOnProposal(proposalId, vote);
      console.log('Vote submitted:', txHash);
      
      setState(prev => ({ ...prev, isLoading: false }));
      return txHash;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Voting failed',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  const setupPulsarWorkflows = useCallback(async () => {
    try {
      await pulsarService.createRebalancingWorkflow();
      await pulsarService.createProfitDistributionWorkflow();
      await pulsarService.createRiskMonitoringWorkflow();
      
      console.log('Pulsar workflows configured successfully');
    } catch (error) {
      console.error('Pulsar workflow setup failed:', error);
    }
  }, []);

  // Initialize Pulsar workflows on connection
  useEffect(() => {
    if (state.isConnected) {
      setupPulsarWorkflows();
    }
  }, [state.isConnected, setupPulsarWorkflows]);

  return {
    ...state,
    connectWallet,
    deployADOs,
    executeYieldStrategy,
    createGovernanceProposal,
    voteOnProposal,
    setupPulsarWorkflows,
  };
}