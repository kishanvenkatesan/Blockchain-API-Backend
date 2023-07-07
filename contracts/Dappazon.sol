// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string doe;
        string mdate;
        uint256 cost;
    }

    mapping(uint256 => Item) public items;

    event List(string name, uint256 cost, string doe);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _doe,
        string memory _mdate,
        uint256 _cost
    ) public onlyOwner {
        // Create Item
        Item memory item = Item(
            _id,
            _name,
            _doe,
            _mdate,
            _cost
        );

        // Add Item to mapping
        items[_id] = item;

        // Emit event
        emit List(_name, _cost, _doe);
    }

}
