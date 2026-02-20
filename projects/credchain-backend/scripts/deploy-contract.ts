/**
 * Helper script to deploy revocation contract
 * 
 * Usage:
 *   tsx scripts/deploy-contract.ts
 * 
 * Make sure DEPLOYER_MNEMONIC is set in .env
 */
import { deploy } from '../credchain-contracts-ts/smart_contracts/revocation/deploy-config.js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
  try {
    console.log('Deploying RevocationContract...')
    const result = await deploy()
    
    console.log('\n✅ Deployment successful!')
    console.log(`App ID: ${result.appId}`)
    console.log(`App Address: ${result.appAddress}`)
    
    // Update .env file with the app ID
    const envPath = path.join(process.cwd(), '.env')
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : ''
    
    // Add or update REVOCATION_APP_ID
    if (envContent.includes('REVOCATION_APP_ID=')) {
      envContent = envContent.replace(/REVOCATION_APP_ID=.*/g, `REVOCATION_APP_ID=${result.appId}`)
    } else {
      envContent += `\n# Revocation Contract App ID (set after deployment)\nREVOCATION_APP_ID=${result.appId}\n`
    }
    
    fs.writeFileSync(envPath, envContent)
    console.log(`\n✅ Updated .env file with REVOCATION_APP_ID=${result.appId}`)
    
  } catch (error: any) {
    console.error('❌ Deployment failed:', error.message)
    process.exit(1)
  }
}

main()
