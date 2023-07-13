// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VotingToken is ERC20 {
    // type for proposal
    struct Proposal {
        bytes32 proposalHash;
        uint256 againstVotes;
        uint256 forVotes;
        uint256 deadline;
    }

    // proposal queue from the task
    Proposal[] private proposalQueue;

    // mapping for checking that proposal exists and getting its index
    mapping(bytes32 => uint) private hashToProposalIdx;

    // mapping from proposal's hash to user's votes
    // 0 - not voted, 1 - for, 2 - against
    mapping(bytes32 => mapping(address => uint)) private votes;

    // event fixing the fact of acceptance of a proposal
    event ProposalAccepted(bytes32 proposalHash);

    constructor() ERC20("VotingToken", "VTK") {
        _mint(msg.sender, 100 * (10 ** decimals()));
    }

    // function for creating proposal
    function createProposal(bytes32 proposalHash) public {
        require(
            hashToProposalIdx[proposalHash] == 0,
            "VotingToken: proposal already exists!"
        );

        if (proposalQueue.length < 3) {
            Proposal memory proposal = Proposal({
                proposalHash: proposalHash,
                againstVotes: 0,
                forVotes: 0,
                deadline: block.timestamp + 3 days
            });
            _removeMostObsoleteProposal();
            proposalQueue.push(proposal);
            hashToProposalIdx[proposalHash] = proposalQueue.length;
            return;
        }

        if (_removeMostObsoleteProposal()) {
            Proposal memory proposal = Proposal({
                proposalHash: proposalHash,
                againstVotes: 0,
                forVotes: 0,
                deadline: block.timestamp + 3 days
            });
            proposalQueue.push(proposal);
            hashToProposalIdx[proposalHash] = proposalQueue.length;
            return;
        }

        revert("VotingToken: no place for new proposal!");
    }

    // function for voting for proposal
    function voteFor(bytes32 proposalHash) public {
        uint proposalIdx = hashToProposalIdx[proposalHash];
        require(proposalIdx != 0, "VotingToken: proposal doesn't exist!");

        Proposal storage proposal = proposalQueue[proposalIdx - 1];
        require(
            block.timestamp <= proposal.deadline,
            "VotingToken: proposal's obsolete!"
        );

        uint vote = votes[proposalHash][msg.sender];
        require(vote != 1, "VotingToken: sender's already voted for!");

        uint balance = balanceOf(msg.sender);
        proposal.forVotes += balance;
        if (vote == 2) {
            proposal.againstVotes -= balance;
        }
        votes[proposalHash][msg.sender] = 1;

        _checkFinalization(proposalHash);
    }

    // function for voting against proposal
    function voteAgainst(bytes32 proposalHash) public {
        uint proposalIdx = hashToProposalIdx[proposalHash];
        require(proposalIdx != 0, "VotingToken: proposal doesn't exist!");

        Proposal storage proposal = proposalQueue[proposalIdx - 1];
        require(
            block.timestamp <= proposal.deadline,
            "VotingToken: proposal's obsolete!"
        );

        uint vote = votes[proposalHash][msg.sender];
        require(vote != 2, "VotingToken: sender's already voted against!");

        uint balance = balanceOf(msg.sender);
        proposal.againstVotes += balance;
        if (vote == 1) {
            proposal.forVotes -= balance;
        }
        votes[proposalHash][msg.sender] = 2;

        _checkFinalization(proposalHash);
    }

    // decimals = 6
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    // view function for getting current queue
    function getProposalQueue() public view returns (Proposal[] memory) {
        return proposalQueue;
    }

    // view function for getting exact proposal
    function getProposal(
        bytes32 proposalHash
    ) public view returns (Proposal memory) {
        uint proposalIdx = hashToProposalIdx[proposalHash];
        require(proposalIdx != 0, "VotingToken: proposal doesn't exist!");

        return proposalQueue[proposalIdx - 1];
    }

    // view function for getting voter's vote for proposal with specified hash
    function getVote(
        bytes32 proposalHash,
        address voter
    ) public view returns (uint256) {
        return votes[proposalHash][voter];
    }

    // function for checking if vote is finished
    function _checkFinalization(bytes32 proposalHash) private returns (bool) {
        uint proposalIdx = hashToProposalIdx[proposalHash];
        Proposal storage proposal = proposalQueue[proposalIdx - 1];

        if (proposal.forVotes > totalSupply() / 2) {
            _deleteProposalFromQueue(proposalIdx - 1);

            delete hashToProposalIdx[proposalHash];
            emit ProposalAccepted(proposalHash);

            return true;
        } else if (proposal.againstVotes > totalSupply() / 2) {
            _deleteProposalFromQueue(proposalIdx - 1);
            delete hashToProposalIdx[proposalHash];
        }

        return false;
    }

    // function for removing element from queue
    function _deleteProposalFromQueue(uint from) private {
        for (uint i = from; i < proposalQueue.length - 1; i++) {
            proposalQueue[i] = proposalQueue[i + 1];
        }

        proposalQueue.pop();
    }

    // function for removing most obsolete proposal
    function _removeMostObsoleteProposal() private returns (bool) {
        if (
            proposalQueue.length > 0 &&
            block.timestamp > proposalQueue[0].deadline
        ) {
            delete hashToProposalIdx[proposalQueue[0].proposalHash];
            _deleteProposalFromQueue(0);
            return true;
        }
        return false;
    }

    // hook for redistribution of users' votes after token transfer
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (from == address(0)) {
            for (uint i = 0; i < proposalQueue.length; i++) {
                Proposal storage proposal = proposalQueue[i];

                if (block.timestamp > proposal.deadline) {
                    continue;
                }

                bytes32 proposalHash = proposal.proposalHash;
                uint recipientsVote = votes[proposalHash][to];
                if (recipientsVote == 1) {
                    proposal.forVotes += amount;
                    _checkFinalization(proposalHash);
                } else if (recipientsVote == 2) {
                    proposal.againstVotes += amount;
                    _checkFinalization(proposalHash);
                }
            }
        } else if (to == address(0)) {
            for (uint i = 0; i < proposalQueue.length; i++) {
                Proposal storage proposal = proposalQueue[i];

                if (block.timestamp > proposal.deadline) {
                    continue;
                }

                bytes32 proposalHash = proposal.proposalHash;
                uint sendersVote = votes[proposalHash][from];
                if (sendersVote == 1) {
                    proposal.forVotes -= amount;
                    _checkFinalization(proposalHash);
                } else if (sendersVote == 2) {
                    proposal.againstVotes -= amount;
                    _checkFinalization(proposalHash);
                }
            }
        } else {
            for (uint i = 0; i < proposalQueue.length; i++) {
                Proposal storage proposal = proposalQueue[i];

                if (block.timestamp > proposal.deadline) {
                    continue;
                }

                bytes32 proposalHash = proposal.proposalHash;
                uint sendersVote = votes[proposalHash][from];
                uint recipientsVote = votes[proposalHash][to];
                if (sendersVote == 1) {
                    proposal.forVotes -= amount;
                    if (recipientsVote == 2) {
                        proposal.againstVotes += amount;
                        _checkFinalization(proposalHash);
                    }
                } else if (sendersVote == 2) {
                    proposal.againstVotes -= amount;
                    if (recipientsVote == 1) {
                        proposal.forVotes += amount;
                        _checkFinalization(proposalHash);
                    }
                }
            }
        }
    }
}
