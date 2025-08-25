import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import { ANDROMEDA_CONFIG, YFA_TOKEN_CONFIG } from '../config/andromeda';

export class AndromedaService {
  private client: SigningCosmWasmClient | null = null;
  private wallet: DirectSecp256k1HdWallet | null = null;
  private address: string = '';

  async connectWallet(): Promise<string> {
    try {
      if (window.keplr) {
        await window.keplr.enable(ANDROMEDA_CONFIG.chainId);
        const offlineSigner = window.keplr.getOfflineSigner(ANDROMEDA_CONFIG.chainId);
        
        this.client = await SigningCosmWasmClient.connectWithSigner(
          ANDROMEDA_CONFIG.rpcEndpoint,
          offlineSigner,
          {
            gasPrice: GasPrice.fromString('0.025uandr'),
          }
        );

        const accounts = await offlineSigner.getAccounts();
        this.address = accounts[0].address;
        return this.address;
      }
      throw new Error('Keplr wallet not found');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  }

  // Deploy YFA Token using CW20 ADO
  async deployYFAToken(): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const instantiateMsg = {
      name: YFA_TOKEN_CONFIG.name,
      symbol: YFA_TOKEN_CONFIG.symbol,
      decimals: YFA_TOKEN_CONFIG.decimals,
      initial_balances: [
        {
          address: this.address,
          amount: YFA_TOKEN_CONFIG.totalSupply,
        }
      ],
      mint: {
        minter: this.address,
        cap: YFA_TOKEN_CONFIG.totalSupply,
      },
      marketing: YFA_TOKEN_CONFIG.marketing,
    };

    const result = await this.client.instantiate(
      this.address,
      parseInt(process.env.VITE_CW20_CODE_ID || '1'), // CW20 ADO code ID
      instantiateMsg,
      'YFA Token ADO',
      'auto'
    );

    return result.contractAddress;
  }

  // Deploy Splitter ADO for profit distribution
  async deploySplitterADO(): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const instantiateMsg = {
      recipients: [
        {
          recipient: {
            address: this.address, // Treasury
          },
          percent: '0.5', // 50% to treasury
        },
        {
          recipient: {
            address: 'andr1community...', // Community rewards
          },
          percent: '0.3', // 30% to community
        },
        {
          recipient: {
            address: 'andr1team...', // Team allocation
          },
          percent: '0.2', // 20% to team
        }
      ],
      lock_time: null,
    };

    const result = await this.client.instantiate(
      this.address,
      parseInt(process.env.VITE_SPLITTER_CODE_ID || '2'), // Splitter ADO code ID
      instantiateMsg,
      'YFA Profit Splitter ADO',
      'auto'
    );

    return result.contractAddress;
  }

  // Deploy Vesting ADO for token distribution
  async deployVestingADO(): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const instantiateMsg = {
      recipient: this.address,
      unvesting_schedule: {
        linear: {
          start_time: Math.floor(Date.now() / 1000),
          end_time: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year
          amount: {
            native: {
              denom: 'uandr',
              amount: '1000000000', // 1000 ANDR
            }
          }
        }
      }
    };

    const result = await this.client.instantiate(
      this.address,
      parseInt(process.env.VITE_VESTING_CODE_ID || '3'), // Vesting ADO code ID
      instantiateMsg,
      'YFA Vesting ADO',
      'auto'
    );

    return result.contractAddress;
  }

  // Deploy Marketplace ADO for RWA trading
  async deployMarketplaceADO(): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const instantiateMsg = {
      authorized_cw20_address: ANDROMEDA_CONFIG.contracts.cw20,
      fee: {
        flat_fee: {
          amount: {
            native: {
              denom: 'uandr',
              amount: '1000000', // 1 ANDR fee
            }
          }
        }
      },
      authorized_token_addresses: [ANDROMEDA_CONFIG.contracts.cw20],
    };

    const result = await this.client.instantiate(
      this.address,
      parseInt(process.env.VITE_MARKETPLACE_CODE_ID || '4'), // Marketplace ADO code ID
      instantiateMsg,
      'YFA RWA Marketplace ADO',
      'auto'
    );

    return result.contractAddress;
  }

  // Deploy CW20 Staking ADO for governance
  async deployStakingADO(): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const instantiateMsg = {
      staking_token: {
        cw20: ANDROMEDA_CONFIG.contracts.cw20,
      },
      unstaking_duration: {
        time: 1209600, // 14 days in seconds
      },
      additional_rewards: [],
    };

    const result = await this.client.instantiate(
      this.address,
      parseInt(process.env.VITE_CW20_STAKING_CODE_ID || '5'), // CW20 Staking ADO code ID
      instantiateMsg,
      'YFA Governance Staking ADO',
      'auto'
    );

    return result.contractAddress;
  }

  // Execute yield farming strategy using ADOs
  async executeYieldStrategy(amount: string, poolAddress: string): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    // First, transfer tokens to splitter for profit distribution setup
    const transferMsg = {
      transfer: {
        recipient: ANDROMEDA_CONFIG.contracts.splitter,
        amount: amount,
      }
    };

    const result = await this.client.execute(
      this.address,
      ANDROMEDA_CONFIG.contracts.cw20,
      transferMsg,
      'auto'
    );

    return result.transactionHash;
  }

  // Query YFA token balance
  async getYFABalance(address: string): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const balanceQuery = {
      balance: { address }
    };

    const result = await this.client.queryContractSmart(
      ANDROMEDA_CONFIG.contracts.cw20,
      balanceQuery
    );

    return result.balance;
  }

  // Query staking information
  async getStakingInfo(address: string): Promise<any> {
    if (!this.client) throw new Error('Client not connected');

    const stakingQuery = {
      staker: { address }
    };

    const result = await this.client.queryContractSmart(
      ANDROMEDA_CONFIG.contracts.cw20Staking,
      stakingQuery
    );

    return result;
  }

  // Execute profit distribution via Splitter ADO
  async distributeProfits(): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const distributeMsg = {
      send: {}
    };

    const result = await this.client.execute(
      this.address,
      ANDROMEDA_CONFIG.contracts.splitter,
      distributeMsg,
      'auto'
    );

    return result.transactionHash;
  }

  // Create governance proposal
  async createProposal(title: string, description: string): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const proposalMsg = {
      propose: {
        title,
        description,
        msgs: [],
        latest: null,
      }
    };

    const result = await this.client.execute(
      this.address,
      ANDROMEDA_CONFIG.contracts.cw20Staking,
      proposalMsg,
      'auto'
    );

    return result.transactionHash;
  }

  // Vote on governance proposal
  async voteOnProposal(proposalId: number, vote: 'yes' | 'no' | 'abstain'): Promise<string> {
    if (!this.client) throw new Error('Client not connected');

    const voteMsg = {
      vote: {
        proposal_id: proposalId,
        vote: vote,
      }
    };

    const result = await this.client.execute(
      this.address,
      ANDROMEDA_CONFIG.contracts.cw20Staking,
      voteMsg,
      'auto'
    );

    return result.transactionHash;
  }
}

export const andromedaService = new AndromedaService();