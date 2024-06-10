// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JapanPayShop {
    uint public constant MIN_PAY_AMOUNT = 100;
    uint public constant MIN_TAX_FREE_AMOUNT = 5000;

    address private tokenAddress;
    address private owner;

    event PayEvent(address indexed user, string id, uint amount, uint amountToPay);

    struct PayLog {
        string id;
        uint amount;
        uint amountToPay;
        uint timestamp;
    }

    mapping(address => PayLog[]) public payLogs;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function registerToken(address token) public onlyOwner {
        tokenAddress = token;
    }

    function pay(string calldata id, uint amount) public {
        require(amount > MIN_PAY_AMOUNT, "payment is below min amount");

        uint amountToPay = amount;
        uint beforeTaxAmount = amount * 100 / 108;

        if (amount > MIN_TAX_FREE_AMOUNT) {
            amountToPay = beforeTaxAmount;
        }

        IERC20 token = IERC20(tokenAddress);

        require(
            token.allowance(msg.sender, address(this)) >= amount,
            "Token allowance too low"
        );

        token.transferFrom(
            msg.sender,
            address(this),
            amountToPay
        );

        payLogs[msg.sender].push(PayLog(id, amount, amountToPay, block.timestamp));

        emit PayEvent(msg.sender, id, amount, amountToPay);
    }
}
