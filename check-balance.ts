import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
const isValidPublicKey = suppliedPublicKey.length === 44 && /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(suppliedPublicKey);
if (!suppliedPublicKey || !isValidPublicKey) {
  console.log("Please provide a valid public key");
}

else {
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

    const publicKey = new PublicKey(suppliedPublicKey);
    
    const balanceInLamports = await connection.getBalance(publicKey);
    
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    
    console.log(
      `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
    );
}
