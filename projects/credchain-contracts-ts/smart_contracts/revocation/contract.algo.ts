import { BoxMap, Contract, uint64, clone } from '@algorandfoundation/algorand-typescript'

/**
 * Revocation Contract
 * 
 * Manages revocation status for credential NFTs (ASAs).
 * Uses BoxMap to store revocation flags without requiring opt-in.
 */
export class RevocationContract extends Contract {
  // BoxMap to store revocation flags: key is assetId (uint64), value is boolean (true = revoked)
  revokedAssets = BoxMap<uint64, boolean>({ keyPrefix: 'revoked_' })

  /**
   * Revoke an asset (credential NFT)
   * @param assetId - The asset ID to revoke
   */
  public revoke(assetId: uint64): void {
    // Set the revocation flag to true
    this.revokedAssets(assetId).value = clone(true)
  }

  /**
   * Check if an asset is revoked
   * @param assetId - The asset ID to check
   * @returns true if the asset is revoked, false otherwise
   */
  public isRevoked(assetId: uint64): boolean {
    // Check if the box exists and return its value, default to false
    if (this.revokedAssets(assetId).exists) {
      return clone(this.revokedAssets(assetId).value)
    }
    return false
  }

  /**
   * Unrevoke an asset (remove revocation flag)
   * @param assetId - The asset ID to unrevoke
   */
  public unrevoke(assetId: uint64): void {
    // Set revocation flag to false instead of deleting
    // Note: Box deletion may not be directly supported in TypeScript
    // Setting to false effectively unrevokes while keeping the box
    if (this.revokedAssets(assetId).exists) {
      this.revokedAssets(assetId).value = clone(false)
    }
  }
}
