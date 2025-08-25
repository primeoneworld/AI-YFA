declare global {
  interface Window {
    keplr?: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => any;
      experimentalSuggestChain: (chainInfo: any) => Promise<void>;
    };
  }
}

export {};