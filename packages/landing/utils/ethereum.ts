declare global {
  interface Window {
    ethereum?: any;
  }
}

export const isEthereumAvailable = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.ethereum);
};

export const getEthereumProvider = () => {
  if (!isEthereumAvailable()) return null;
  return window.ethereum;
}; 