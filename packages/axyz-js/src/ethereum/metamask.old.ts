const a = 'a';
export default a;
// import * as ethUtil from 'ethereumjs-util';
// import canUseDOM from '../utils/canUseDOM';
//
// export const getEthereum = (): Window['ethereum'] => {
//   if (!canUseDOM) {
//     return undefined;
//   }
//   // Have to check the ethereum binding on the window object to see if it's installed
//   const { ethereum } = window;
//   return ethereum;
// };
//
// // Created check function to see if the MetaMask extension is installed
// export const isMetaMaskInstalled = () => {
//   const ethereum = getEthereum();
//   return Boolean(ethereum?.isMetaMask);
// };
//
// export class MetaMaskConnector {
//   isConnected: boolean = false;
//
//   name: string = 'MetaMask';
//
//   ethereum: Window['ethereum'] = getEthereum();
//
//   connect = async () => {
//     try {
//       if (this.ethereum) {
//         await this.ethereum.request({ method: 'eth_requestAccounts' });
//       } else {
//         return { error: 'MetaMask not detected', connected: false };
//       }
//     } catch (error) {
//       return { error: (error as Error).message, connected: false };
//     }
//
//     this.isConnected = true;
//     return { connected: true };
//   };
//
//   getAddress = () => {
//     if (this.ethereum && this.isConnected) {
//       return this.ethereum.selectedAddress;
//     }
//     return null;
//   };
//
//   signMessage = async (message: string) => {
//     if (this.ethereum && this.isConnected) {
//       const from = this.getAddress()!;
//       const msg = ethUtil.bufferToHex(Buffer.from(message));
//       const params = [msg, from];
//
//       try {
//         const signature = await this.ethereum.request({ method: 'personal_sign', params });
//         return { signature: signature?.toString() };
//       } catch (error) {
//         return { error: (error as Error).message };
//       }
//     }
//     return { error: 'MetaMask not detected' };
//   };
// }
