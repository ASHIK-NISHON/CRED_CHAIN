import { getArc56ReturnValue } from '@algorandfoundation/algokit-utils/types/app-arc56';
import { AppClient as _AppClient, } from '@algorandfoundation/algokit-utils/types/app-client';
import { AppFactory as _AppFactory } from '@algorandfoundation/algokit-utils/types/app-factory';
export const APP_SPEC = { "name": "RevocationContract", "structs": {}, "methods": [{ "name": "revoke", "args": [{ "type": "uint64", "name": "assetId", "desc": "- The asset ID to revoke" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Revoke an asset (credential NFT)", "events": [], "recommendations": {} }, { "name": "isRevoked", "args": [{ "type": "uint64", "name": "assetId", "desc": "- The asset ID to check" }], "returns": { "type": "bool", "desc": "true if the asset is revoked, false otherwise" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Check if an asset is revoked", "events": [], "recommendations": {} }, { "name": "unrevoke", "args": [{ "type": "uint64", "name": "assetId", "desc": "- The asset ID to unrevoke" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Unrevoke an asset (remove revocation flag)", "events": [], "recommendations": {} }], "arcs": [22, 28], "desc": "Revocation Contract\r\n\r\nManages revocation status for credential NFTs (ASAs).\r\nUses BoxMap to store revocation flags without requiring opt-in.", "networks": {}, "state": { "schema": { "global": { "ints": 0, "bytes": 0 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": {}, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "revokedAssets": { "keyType": "uint64", "valueType": "uint64", "prefix": "cmV2b2tlZF8=" } } } }, "bareActions": { "create": ["NoOp"], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [108], "errorMessage": "Box must have value" }, { "pc": [25], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [65], "errorMessage": "OnCompletion must be NoOp && can only call when creating" }, { "pc": [75, 93, 139], "errorMessage": "invalid number of bytes for arc4.uint64" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMSA4IDAKICAgIGJ5dGVjYmxvY2sgInJldm9rZWRfIgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czo5CiAgICAvLyBleHBvcnQgY2xhc3MgUmV2b2NhdGlvbkNvbnRyYWN0IGV4dGVuZHMgQ29udHJhY3QgewogICAgdHhuIE51bUFwcEFyZ3MKICAgIGJ6IG1haW5fX19hbGdvdHNfXy5kZWZhdWx0Q3JlYXRlQDEwCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIG11c3QgYmUgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydAogICAgcHVzaGJ5dGVzcyAweGM2NmRlZTQxIDB4ZjE5M2JhN2QgMHgyZDdmZTNlNyAvLyBtZXRob2QgInJldm9rZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAiaXNSZXZva2VkKHVpbnQ2NClib29sIiwgbWV0aG9kICJ1bnJldm9rZSh1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIHJldm9rZSBpc1Jldm9rZWQgdW5yZXZva2UKICAgIGVycgoKbWFpbl9fX2FsZ290c19fLmRlZmF1bHRDcmVhdGVAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjkKICAgIC8vIGV4cG9ydCBjbGFzcyBSZXZvY2F0aW9uQ29udHJhY3QgZXh0ZW5kcyBDb250cmFjdCB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgIQogICAgJiYKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBOb09wICYmIGNhbiBvbmx5IGNhbGwgd2hlbiBjcmVhdGluZwogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6OlJldm9jYXRpb25Db250cmFjdC5yZXZva2Vbcm91dGluZ10oKSAtPiB2b2lkOgpyZXZva2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3CiAgICAvLyBwdWJsaWMgcmV2b2tlKGFzc2V0SWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czoxOQogICAgLy8gdGhpcy5yZXZva2VkQXNzZXRzKGFzc2V0SWQpLnZhbHVlID0gY2xvbmUodHJ1ZSkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEKICAgIC8vIHJldm9rZWRBc3NldHMgPSBCb3hNYXA8dWludDY0LCBib29sZWFuPih7IGtleVByZWZpeDogJ3Jldm9rZWRfJyB9KQogICAgYnl0ZWNfMCAvLyAicmV2b2tlZF8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTkKICAgIC8vIHRoaXMucmV2b2tlZEFzc2V0cyhhc3NldElkKS52YWx1ZSA9IGNsb25lKHRydWUpCiAgICBpbnRjXzAgLy8gMQogICAgaXRvYgogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czoxNwogICAgLy8gcHVibGljIHJldm9rZShhc3NldElkOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjpSZXZvY2F0aW9uQ29udHJhY3QuaXNSZXZva2VkW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNSZXZva2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czoyNwogICAgLy8gcHVibGljIGlzUmV2b2tlZChhc3NldElkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjkKICAgIC8vIGlmICh0aGlzLnJldm9rZWRBc3NldHMoYXNzZXRJZCkuZXhpc3RzKSB7CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjExCiAgICAvLyByZXZva2VkQXNzZXRzID0gQm94TWFwPHVpbnQ2NCwgYm9vbGVhbj4oeyBrZXlQcmVmaXg6ICdyZXZva2VkXycgfSkKICAgIGJ5dGVjXzAgLy8gInJldm9rZWRfIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjkKICAgIC8vIGlmICh0aGlzLnJldm9rZWRBc3NldHMoYXNzZXRJZCkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGlzUmV2b2tlZF9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzAKICAgIC8vIHJldHVybiBjbG9uZSh0aGlzLnJldm9rZWRBc3NldHMoYXNzZXRJZCkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgppc1Jldm9rZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjpSZXZvY2F0aW9uQ29udHJhY3QuaXNSZXZva2VkQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjI3CiAgICAvLyBwdWJsaWMgaXNSZXZva2VkKGFzc2V0SWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHVzaGJ5dGVzIDB4MDAKICAgIGludGNfMiAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgppc1Jldm9rZWRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czozMgogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzIgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czoyNwogICAgLy8gcHVibGljIGlzUmV2b2tlZChhc3NldElkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIGIgaXNSZXZva2VkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czo6UmV2b2NhdGlvbkNvbnRyYWN0LmlzUmV2b2tlZEA0CgoKLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czo6UmV2b2NhdGlvbkNvbnRyYWN0LnVucmV2b2tlW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5yZXZva2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBwdWJsaWMgdW5yZXZva2UoYXNzZXRJZDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBpZiAodGhpcy5yZXZva2VkQXNzZXRzKGFzc2V0SWQpLmV4aXN0cykgewogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3Jldm9jYXRpb24vY29udHJhY3QuYWxnby50czoxMQogICAgLy8gcmV2b2tlZEFzc2V0cyA9IEJveE1hcDx1aW50NjQsIGJvb2xlYW4+KHsga2V5UHJlZml4OiAncmV2b2tlZF8nIH0pCiAgICBieXRlY18wIC8vICJyZXZva2VkXyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBpZiAodGhpcy5yZXZva2VkQXNzZXRzKGFzc2V0SWQpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB1bnJldm9rZV9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yZXZvY2F0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQKICAgIC8vIHRoaXMucmV2b2tlZEFzc2V0cyhhc3NldElkKS52YWx1ZSA9IGNsb25lKGZhbHNlKQogICAgaW50Y18yIC8vIDAKICAgIGl0b2IKICAgIGRpZyAxCiAgICBzd2FwCiAgICBib3hfcHV0Cgp1bnJldm9rZV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmV2b2NhdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBwdWJsaWMgdW5yZXZva2UoYXNzZXRJZDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyADAQgAJgEIcmV2b2tlZF8xG0EAJDEZFEQxGESCAwTGbe5BBPGTun0ELX/j5zYaAI4DAAsAHQBLADEZFDEYFBBEIkM2GgFJFSMSRBcWKExQIha/IkM2GgFJFSMSRBcWKExQSb1FAUEAFkm+RBeAAQAkTwJUgAQVH3x1TFCwIkMkQv/qNhoBSRUjEkQXFihMUEm9RQFBAAYkFksBTL8iQw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
class BinaryStateValue {
    value;
    constructor(value) {
        this.value = value;
    }
    asByteArray() {
        return this.value;
    }
    asString() {
        return this.value !== undefined ? Buffer.from(this.value).toString('utf-8') : undefined;
    }
}
/**
 * Exposes methods for constructing `AppClient` params objects for ABI calls to the RevocationContract smart contract
 */
export class RevocationContractParamsFactory {
    /**
     * Constructs a no op call for the revoke(uint64)void ABI method
     *
     * Revoke an asset (credential NFT)
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static revoke(params) {
        return {
            ...params,
            method: 'revoke(uint64)void',
            args: Array.isArray(params.args) ? params.args : [params.args.assetId],
        };
    }
    /**
     * Constructs a no op call for the isRevoked(uint64)bool ABI method
     *
     * Check if an asset is revoked
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static isRevoked(params) {
        return {
            ...params,
            method: 'isRevoked(uint64)bool',
            args: Array.isArray(params.args) ? params.args : [params.args.assetId],
        };
    }
    /**
     * Constructs a no op call for the unrevoke(uint64)void ABI method
     *
     * Unrevoke an asset (remove revocation flag)
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
    static unrevoke(params) {
        return {
            ...params,
            method: 'unrevoke(uint64)void',
            args: Array.isArray(params.args) ? params.args : [params.args.assetId],
        };
    }
}
/**
 * A factory to create and deploy one or more instance of the RevocationContract smart contract and to create one or more app clients to interact with those (or other) app instances
 */
export class RevocationContractFactory {
    /**
     * The underlying `AppFactory` for when you want to have more flexibility
     */
    appFactory;
    /**
     * Creates a new instance of `RevocationContractFactory`
     *
     * @param params The parameters to initialise the app factory with
     */
    constructor(params) {
        this.appFactory = new _AppFactory({
            ...params,
            appSpec: APP_SPEC,
        });
    }
    /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
    get appName() {
        return this.appFactory.appName;
    }
    /** The ARC-56 app spec being used */
    get appSpec() {
        return APP_SPEC;
    }
    /** A reference to the underlying `AlgorandClient` this app factory is using. */
    get algorand() {
        return this.appFactory.algorand;
    }
    /**
     * Returns a new `AppClient` client for an app instance of the given ID.
     *
     * Automatically populates appName, defaultSender and source maps from the factory
     * if not specified in the params.
     * @param params The parameters to create the app client
     * @returns The `AppClient`
     */
    getAppClientById(params) {
        return new RevocationContractClient(this.appFactory.getAppClientById(params));
    }
    /**
     * Returns a new `AppClient` client, resolving the app by creator address and name
     * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
     *
     * Automatically populates appName, defaultSender and source maps from the factory
     * if not specified in the params.
     * @param params The parameters to create the app client
     * @returns The `AppClient`
     */
    async getAppClientByCreatorAndName(params) {
        return new RevocationContractClient(await this.appFactory.getAppClientByCreatorAndName(params));
    }
    /**
     * Idempotently deploys the RevocationContract smart contract.
     *
     * @param params The arguments for the contract calls and any additional parameters for the call
     * @returns The deployment result
     */
    async deploy(params = {}) {
        const result = await this.appFactory.deploy({
            ...params,
        });
        return { result: result.result, appClient: new RevocationContractClient(result.appClient) };
    }
    /**
     * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
     */
    params = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the RevocationContract smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The params for a create call
             */
            bare: (params) => {
                return this.appFactory.params.bare.create(params);
            },
        },
    };
    /**
     * Create transactions for the current app
     */
    createTransaction = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the RevocationContract smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The transaction for a create call
             */
            bare: (params) => {
                return this.appFactory.createTransaction.bare.create(params);
            },
        },
    };
    /**
     * Send calls to the current app
     */
    send = {
        /**
         * Gets available create methods
         */
        create: {
            /**
             * Creates a new instance of the RevocationContract smart contract using a bare call.
             *
             * @param params The params for the bare (raw) call
             * @returns The create result
             */
            bare: async (params) => {
                const result = await this.appFactory.send.bare.create(params);
                return { result: result.result, appClient: new RevocationContractClient(result.appClient) };
            },
        },
    };
}
/**
 * A client to make calls to the RevocationContract smart contract
 */
export class RevocationContractClient {
    /**
     * The underlying `AppClient` for when you want to have more flexibility
     */
    appClient;
    constructor(appClientOrParams) {
        this.appClient = appClientOrParams instanceof _AppClient ? appClientOrParams : new _AppClient({
            ...appClientOrParams,
            appSpec: APP_SPEC,
        });
    }
    /**
     * Checks for decode errors on the given return value and maps the return value to the return type for the given method
     * @returns The typed return value or undefined if there was no value
     */
    decodeReturnValue(method, returnValue) {
        return returnValue !== undefined ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : undefined;
    }
    /**
     * Returns a new `RevocationContractClient` client, resolving the app by creator address and name
     * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
     * @param params The parameters to create the app client
     */
    static async fromCreatorAndName(params) {
        return new RevocationContractClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
    }
    /**
     * Returns an `RevocationContractClient` instance for the current network based on
     * pre-determined network-specific app IDs specified in the ARC-56 app spec.
     *
     * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
     * @param params The parameters to create the app client
     */
    static async fromNetwork(params) {
        return new RevocationContractClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
    }
    /** The ID of the app instance this client is linked to. */
    get appId() {
        return this.appClient.appId;
    }
    /** The app address of the app instance this client is linked to. */
    get appAddress() {
        return this.appClient.appAddress;
    }
    /** The name of the app. */
    get appName() {
        return this.appClient.appName;
    }
    /** The ARC-56 app spec being used */
    get appSpec() {
        return this.appClient.appSpec;
    }
    /** A reference to the underlying `AlgorandClient` this app client is using. */
    get algorand() {
        return this.appClient.algorand;
    }
    /**
     * Get parameters to create transactions for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
     */
    params = {
        /**
         * Makes a clear_state call to an existing instance of the RevocationContract smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.params.bare.clearState(params);
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `revoke(uint64)void` ABI method.
         *
         * Revoke an asset (credential NFT)
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        revoke: (params) => {
            return this.appClient.params.call(RevocationContractParamsFactory.revoke(params));
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `isRevoked(uint64)bool` ABI method.
         *
         * Check if an asset is revoked
         *
         * @param params The params for the smart contract call
         * @returns The call params: true if the asset is revoked, false otherwise
         */
        isRevoked: (params) => {
            return this.appClient.params.call(RevocationContractParamsFactory.isRevoked(params));
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `unrevoke(uint64)void` ABI method.
         *
         * Unrevoke an asset (remove revocation flag)
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
        unrevoke: (params) => {
            return this.appClient.params.call(RevocationContractParamsFactory.unrevoke(params));
        },
    };
    /**
     * Create transactions for the current app
     */
    createTransaction = {
        /**
         * Makes a clear_state call to an existing instance of the RevocationContract smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.createTransaction.bare.clearState(params);
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `revoke(uint64)void` ABI method.
         *
         * Revoke an asset (credential NFT)
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        revoke: (params) => {
            return this.appClient.createTransaction.call(RevocationContractParamsFactory.revoke(params));
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `isRevoked(uint64)bool` ABI method.
         *
         * Check if an asset is revoked
         *
         * @param params The params for the smart contract call
         * @returns The call transaction: true if the asset is revoked, false otherwise
         */
        isRevoked: (params) => {
            return this.appClient.createTransaction.call(RevocationContractParamsFactory.isRevoked(params));
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `unrevoke(uint64)void` ABI method.
         *
         * Unrevoke an asset (remove revocation flag)
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
        unrevoke: (params) => {
            return this.appClient.createTransaction.call(RevocationContractParamsFactory.unrevoke(params));
        },
    };
    /**
     * Send calls to the current app
     */
    send = {
        /**
         * Makes a clear_state call to an existing instance of the RevocationContract smart contract.
         *
         * @param params The params for the bare (raw) call
         * @returns The clearState result
         */
        clearState: (params) => {
            return this.appClient.send.bare.clearState(params);
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `revoke(uint64)void` ABI method.
         *
         * Revoke an asset (credential NFT)
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        revoke: async (params) => {
            const result = await this.appClient.send.call(RevocationContractParamsFactory.revoke(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `isRevoked(uint64)bool` ABI method.
         *
         * Check if an asset is revoked
         *
         * @param params The params for the smart contract call
         * @returns The call result: true if the asset is revoked, false otherwise
         */
        isRevoked: async (params) => {
            const result = await this.appClient.send.call(RevocationContractParamsFactory.isRevoked(params));
            return { ...result, return: result.return };
        },
        /**
         * Makes a call to the RevocationContract smart contract using the `unrevoke(uint64)void` ABI method.
         *
         * Unrevoke an asset (remove revocation flag)
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
        unrevoke: async (params) => {
            const result = await this.appClient.send.call(RevocationContractParamsFactory.unrevoke(params));
            return { ...result, return: result.return };
        },
    };
    /**
     * Clone this app client with different params
     *
     * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
     * @returns A new app client with the altered params
     */
    clone(params) {
        return new RevocationContractClient(this.appClient.clone(params));
    }
    /**
     * Methods to access state for the current RevocationContract app
     */
    state = {
        /**
         * Methods to access box state for the current RevocationContract app
         */
        box: {
            /**
             * Get all current keyed values from box state
             */
            getAll: async () => {
                const result = await this.appClient.state.box.getAll();
                return {};
            },
            /**
             * Get values from the revokedAssets map in box state
             */
            revokedAssets: {
                /**
                 * Get all current values of the revokedAssets map in box state
                 */
                getMap: async () => { return (await this.appClient.state.box.getMap("revokedAssets")); },
                /**
                 * Get a current value of the revokedAssets map by key from box state
                 */
                value: async (key) => { return await this.appClient.state.box.getMapValue("revokedAssets", key); },
            },
        },
    };
    newGroup() {
        const client = this;
        const composer = this.algorand.newGroup();
        let promiseChain = Promise.resolve();
        const resultMappers = [];
        return {
            /**
             * Add a revoke(uint64)void method call against the RevocationContract contract
             */
            revoke(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.revoke(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a isRevoked(uint64)bool method call against the RevocationContract contract
             */
            isRevoked(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isRevoked(params)));
                resultMappers.push((v) => client.decodeReturnValue('isRevoked(uint64)bool', v));
                return this;
            },
            /**
             * Add a unrevoke(uint64)void method call against the RevocationContract contract
             */
            unrevoke(params) {
                promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unrevoke(params)));
                resultMappers.push(undefined);
                return this;
            },
            /**
             * Add a clear state call to the RevocationContract contract
             */
            clearState(params) {
                promiseChain = promiseChain.then(() => composer.addAppCall(client.params.clearState(params)));
                return this;
            },
            addTransaction(txn, signer) {
                promiseChain = promiseChain.then(() => composer.addTransaction(txn, signer));
                return this;
            },
            async composer() {
                await promiseChain;
                return composer;
            },
            async simulate(options) {
                await promiseChain;
                const result = await (!options ? composer.simulate() : composer.simulate(options));
                return {
                    ...result,
                    returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i](val) : val.returnValue)
                };
            },
            async send(params) {
                await promiseChain;
                const result = await composer.send(params);
                return {
                    ...result,
                    returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i](val) : val.returnValue)
                };
            }
        };
    }
}
//# sourceMappingURL=RevocationContractClient.js.map