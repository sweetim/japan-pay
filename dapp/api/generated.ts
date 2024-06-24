import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JPYC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const jpycAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JapanPayShop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const japanPayShopAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountToPay',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PayEvent',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_PAY_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_TAX_FREE_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getAllPayLogs',
    outputs: [
      {
        name: '',
        internalType: 'struct JapanPayShop.PayLog[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'amountToPay', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllShops',
    outputs: [
      {
        name: '',
        internalType: 'struct JapanPayShop.Shop[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'iconUri', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'payLogs',
    outputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'amountToPay', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'iconUri', internalType: 'string', type: 'string' },
    ],
    name: 'registerShop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'registerToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'shops',
    outputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'iconUri', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const usdtAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__
 */
export const useReadJpyc = /*#__PURE__*/ createUseReadContract({ abi: jpycAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadJpycAllowance = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadJpycBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadJpycDecimals = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"name"`
 */
export const useReadJpycName = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadJpycSymbol = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadJpycTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__
 */
export const useWriteJpyc = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteJpycApprove = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteJpycMint = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteJpycTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteJpycTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__
 */
export const useSimulateJpyc = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateJpycApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateJpycMint = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateJpycTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateJpycTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: jpycAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__
 */
export const useWatchJpycEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: jpycAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchJpycApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: jpycAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchJpycTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: jpycAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__
 */
export const useReadJapanPayShop = /*#__PURE__*/ createUseReadContract({
  abi: japanPayShopAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"MIN_PAY_AMOUNT"`
 */
export const useReadJapanPayShopMinPayAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: japanPayShopAbi,
    functionName: 'MIN_PAY_AMOUNT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"MIN_TAX_FREE_AMOUNT"`
 */
export const useReadJapanPayShopMinTaxFreeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: japanPayShopAbi,
    functionName: 'MIN_TAX_FREE_AMOUNT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"getAllPayLogs"`
 */
export const useReadJapanPayShopGetAllPayLogs =
  /*#__PURE__*/ createUseReadContract({
    abi: japanPayShopAbi,
    functionName: 'getAllPayLogs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"getAllShops"`
 */
export const useReadJapanPayShopGetAllShops =
  /*#__PURE__*/ createUseReadContract({
    abi: japanPayShopAbi,
    functionName: 'getAllShops',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"payLogs"`
 */
export const useReadJapanPayShopPayLogs = /*#__PURE__*/ createUseReadContract({
  abi: japanPayShopAbi,
  functionName: 'payLogs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"shops"`
 */
export const useReadJapanPayShopShops = /*#__PURE__*/ createUseReadContract({
  abi: japanPayShopAbi,
  functionName: 'shops',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link japanPayShopAbi}__
 */
export const useWriteJapanPayShop = /*#__PURE__*/ createUseWriteContract({
  abi: japanPayShopAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"pay"`
 */
export const useWriteJapanPayShopPay = /*#__PURE__*/ createUseWriteContract({
  abi: japanPayShopAbi,
  functionName: 'pay',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"registerShop"`
 */
export const useWriteJapanPayShopRegisterShop =
  /*#__PURE__*/ createUseWriteContract({
    abi: japanPayShopAbi,
    functionName: 'registerShop',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"registerToken"`
 */
export const useWriteJapanPayShopRegisterToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: japanPayShopAbi,
    functionName: 'registerToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link japanPayShopAbi}__
 */
export const useSimulateJapanPayShop = /*#__PURE__*/ createUseSimulateContract({
  abi: japanPayShopAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"pay"`
 */
export const useSimulateJapanPayShopPay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: japanPayShopAbi,
    functionName: 'pay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"registerShop"`
 */
export const useSimulateJapanPayShopRegisterShop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: japanPayShopAbi,
    functionName: 'registerShop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link japanPayShopAbi}__ and `functionName` set to `"registerToken"`
 */
export const useSimulateJapanPayShopRegisterToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: japanPayShopAbi,
    functionName: 'registerToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link japanPayShopAbi}__
 */
export const useWatchJapanPayShopEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: japanPayShopAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link japanPayShopAbi}__ and `eventName` set to `"PayEvent"`
 */
export const useWatchJapanPayShopPayEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: japanPayShopAbi,
    eventName: 'PayEvent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__
 */
export const useReadUsdt = /*#__PURE__*/ createUseReadContract({ abi: usdtAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadUsdtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadUsdtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"name"`
 */
export const useReadUsdtName = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadUsdtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadUsdtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__
 */
export const useWriteUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteUsdtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteUsdtMint = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteUsdtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteUsdtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__
 */
export const useSimulateUsdt = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateUsdtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateUsdtMint = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateUsdtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateUsdtTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__
 */
export const useWatchUsdtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchUsdtApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchUsdtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    eventName: 'Transfer',
  })
