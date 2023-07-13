## Перед запуском
- [Получите Alchemy API key](https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key).
## Как запустить
- Склонируйте репозиторий. 
- Создайте файл [env.json](env.json) со следующим содержанием:

      {
        "ALCHEMY_API_KEY": "YOUR_KEY"
      }
      
- Замените `YOUR_KEY` на полученный ранее API ключ Alchemy.
- В репозитории проекта:
    ```bash
    npm install   # установка необходимых модулей
    node index.js # запуск монитора
    ```
## Образец вывода логов
```bash
[06.11.2022, 13:18:20,  ETH/USD] subscribed to AnswerUpdated(int256,uint256,uint256) event emitted by 0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6 aggregator
[06.11.2022, 13:18:20, LINK/ETH] subscribed to AnswerUpdated(int256,uint256,uint256) event emitted by 0xbba12740DE905707251525477bAD74985DeC46D2 aggregator
[06.11.2022, 13:18:20, USDT/ETH] subscribed to AnswerUpdated(int256,uint256,uint256) event emitted by 0x7De0d6fce0C128395C488cb4Df667cdbfb35d7DE aggregator
[06.11.2022, 13:56:28,  ETH/USD] current: 163080000000, roundId: 36333, updatedAt: 1667732183
[06.11.2022, 13:57:04,  ETH/USD] current: 162940000000, roundId: 36334, updatedAt: 1667732219
[06.11.2022, 14:27:02,  ETH/USD] current: 162125000000, roundId: 36335, updatedAt: 1667734019
[06.11.2022, 14:32:28, USDT/ETH] current: 617958500797041, roundId: 8260, updatedAt: 1667734343
[06.11.2022, 14:33:01,  ETH/USD] current: 161055964021, roundId: 36336, updatedAt: 1667734379
[06.11.2022, 14:43:07,  ETH/USD] current: 161862648752, roundId: 36337, updatedAt: 1667734979
```