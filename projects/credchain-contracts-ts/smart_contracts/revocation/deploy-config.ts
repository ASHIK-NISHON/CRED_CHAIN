import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { RevocationContractFactory } from '../artifacts/revocation/RevocationContractClient'

/**
 * Deploy Revocation Contract to Algorand network
 * 
 * This contract manages revocation status for credential NFTs.
 * It uses BoxMap storage which requires MBR funding.
 */
export async function deploy() {
  console.log('=== Deploying RevocationContract ===')

  const algorand = AlgorandClient.fromEnvironment()
  const deployer = await algorand.account.fromEnvironment('DEPLOYER')

  const factory = algorand.client.getTypedAppFactory(RevocationContractFactory, {
    defaultSender: deployer.addr,
  })

  const { appClient, result } = await factory.deploy({ 
    onUpdate: 'append', 
    onSchemaBreak: 'append' 
  })

  // Fund the app account for BoxMap MBR
  // BoxMap MBR formula: (2500 per box) + (400 * (box size + key size)) microAlgos
  // For a boolean value (~1 byte) + uint64 key (8 bytes): ~2500 + (400 * 9) = ~6100 microAlgos
  // Fund with extra buffer for multiple revocations
  if (['create', 'replace'].includes(result.operationPerformed)) {
    // Fund with 0.1 ALGO to cover MBR for many revocation entries
    await algorand.send.payment({
      amount: (0.1).algo(),
      sender: deployer.addr,
      receiver: appClient.appAddress,
    })
    console.log(`Funded app account ${appClient.appAddress} with 0.1 ALGO for BoxMap MBR`)
  }

  console.log(`RevocationContract deployed at app ID: ${appClient.appClient.appId}`)
  console.log(`App address: ${appClient.appAddress}`)
  
  return {
    appId: appClient.appClient.appId,
    appAddress: appClient.appAddress,
    appClient,
  }
}
