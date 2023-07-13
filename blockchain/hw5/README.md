## Особенности
- При переводе денег отправитель уменьшает силу голоса, получатель ее увеличивает
- До принятия решения по предложению и до наступления дедлайна проголосовавший может менять свой голос

## Как запустить
- Склонируйте репозиторий. 
- В репозитории проекта:
    ```bash
    npm install   # установка необходимых модулей
    npx hardhat test # запуск теста, имплементирующего решение задания
    ```
## Образец вывода логов
```bash


  VotingToken contract
   deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3, supply: 100VTK
   -> Balance of A: 25
   -> Balance of B: 40
   -> Balance of C: 35
   -> A created proposal with text "__test proposal__"
   -> A voted for proposal
   -> B's voting for proposal
   -> Event "ProposalAccepted" was emitted
   -> Contract's proposal queue is empty
    ✔ Should implement user story from the task (2773ms)
   -> Balance of A: 50
   -> Balance of B: 50
   -> A created proposal with text "__test proposal__"
   -> A's voting for proposal now. We don't expect proposal to be accepted
   -> B's voting against proposal now. We don't expect proposal to be rejected
    ✔ Should not accept proposal with 50% for votes (162ms)
   -> Created 3 proposals
   -> Couldn't create 4th proposal
   -> Balance of A: 100
   -> A's voting for the first proposal now
   -> First proposal's accepted, now we can create new one
   -> Created new proposal
    ✔ Has maximum 3 current proposals, new proposals cannot be added until old ones will be “accepted”, “declined” or “discarded” by TTL (332ms)
   -> Created 3 proposals
   -> Increased timestamp by 3 days
   -> Created new proposal; most obsolete one was kicked out
    ✔ If > 1 old proposals are obsolete, then addition of a new proposal automatically “kicks out” the most obsolete proposal, making it “discarded” (185ms)
   -> A created proposal with text "__test proposal__"
   -> Balance of A: 50
   -> Balance of B: 50
   -> A voted for proposal
   -> B voted against proposal
   -> A transferred 10VTK to B after voting for proposal and proposal got declined
   -> Balance of A: 40
   -> Balance of B: 60
    ✔ Should not “freeze” tokens when after voting (251ms)

  Revert cases
   deployed to: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707, supply: 100VTK
    ✔ "VotingToken: proposal doesn't exist!" in getProposal (183ms)
    ✔ "VotingToken: proposal already exists!" in createProposal (60ms)
    ✔ "VotingToken: no place for new proposal!" in createProposal (122ms)
    ✔ "VotingToken: proposal doesn't exist!" in voteFor
    ✔ "VotingToken: proposal's obsolete!" in voteFor (72ms)
    ✔ "VotingToken: sender's already voted for!" in voteFor (117ms)
    ✔ "VotingToken: proposal doesn't exist!" in voteAgainst
    ✔ "VotingToken: proposal's obsolete!" in voteAgainst (76ms)
    ✔ "VotingToken: sender's already voted against!" in voteAgainst (127ms)


  14 passing (5s)

```