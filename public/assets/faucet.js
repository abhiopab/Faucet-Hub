function getProvider() {
  if (typeof window.ethereum === "undefined") {
    alert("No Ethereum wallet detected. Please install MetaMask or another wallet.");
    return null;
  }

  if (window.ethereum.providers) {
    const metamaskProvider = window.ethereum.providers.find(p => p.isMetaMask);
    if (metamaskProvider) return metamaskProvider;
    return window.ethereum.providers[0];
  }

  return window.ethereum;
}

async function connectWallet() {
  const provider = getProvider();
  if (!provider) return;

  try {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    const walletAddress = accounts[0];
    console.log("Wallet connected:", walletAddress);
    document.getElementById("connectX").disabled = false;
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const walletBtn = document.getElementById("connectWallet");
  if (walletBtn) {
    walletBtn.addEventListener("click", connectWallet);
  }
});