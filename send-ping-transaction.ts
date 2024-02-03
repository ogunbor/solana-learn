// Import necessary modules and libraries
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as dotenv from 'dotenv';
import { getKeypairFromEnvironment, requestAndConfirmAirdropIfRequired } from "@solana-developers/helpers";

// Load environment variables from .env file
dotenv.config();

// Define program and data addresses
const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');

// Create a new Solana transaction
const transaction = new web3.Transaction();

// Initialize program and data PubKeys
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

// Retrieve payer keypair from environment
const payer = getKeypairFromEnvironment('SECRET_KEY');

// Connect to the Solana Devnet
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

// Request and confirm airdrop if required
const newBalance = await requestAndConfirmAirdropIfRequired(
  connection,
  payer.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL,
);

// Create a new instruction for the transaction
const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true
    },
  ],
  programId
});

// Add the instruction to the transaction
transaction.add(instruction);

// Send and confirm the Solana transaction
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
);

// Output success message with transaction details
console.log(`✅ Transaction completed! Signature is ${signature} and new balance is ${newBalance}`);
