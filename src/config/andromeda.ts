export const ANDROMEDA_CONFIG = {
  // Andromeda testnet configuration
  chainId: 'galileo-3',
  rpcEndpoint: 'https://rpc.galileo-3.andromedaprotocol.io',
  restEndpoint: 'https://rest.galileo-3.andromedaprotocol.io',
  addressPrefix: 'andr',
  
  // ADO Contract Addresses (deployed on Andromeda testnet)
  contracts: {
    cw20: 'andr1yfa7token8address9here...', // YFA Token ADO
    splitter: 'andr1splitter4address5here...', // Profit Distribution ADO
    vesting: 'andr1vesting6address7here...', // Token Vesting ADO
    marketplace: 'andr1marketplace8address...', // RWA Marketplace ADO
    cw20Staking: 'andr1staking9address0here...', // Governance Staking ADO
    rates: 'andr1rates1address2here...', // Rate Limiting ADO
    timelock: 'andr1timelock3address4here...', // Timelock ADO for governance
  },
  
  // Pulsar Automation Configuration
  pulsar: {
    endpoint: 'https://pulsar.andromedaprotocol.io',
    workflows: {
      rebalancing: 'pulsar_workflow_rebalancing_001',
      profitDistribution: 'pulsar_workflow_profit_dist_002',
      riskMonitoring: 'pulsar_workflow_risk_monitor_003',
    }
  },
  
  // Deep3 Labs AI Integration
  ai: {
    stakeSageEndpoint: 'https://api.deep3labs.com/stakesage-c',
    deepShieldEndpoint: 'https://api.deep3labs.com/deepshield',
    apiKey: process.env.VITE_DEEP3_API_KEY || 'demo_key_for_hackathon',
  }
};

export const YFA_TOKEN_CONFIG = {
  name: 'AI Yield Farming Aggregator',
  symbol: 'YFA',
  decimals: 6,
  totalSupply: '1000000000000000', // 1B tokens with 6 decimals
  marketing: {
    project: 'AI-YFA',
    description: 'AI-Optimized Yield Farming Aggregator Token',
    logo: 'https://ai-yfa.com/logo.png',
  }
};