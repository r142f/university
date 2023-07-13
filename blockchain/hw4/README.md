## Перед запуском
- [Получите Alchemy API key](https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key).
## Как запустить
- Склонируйте репозиторий. 
- Создайте в нем файл [env.json](env.json) со следующим содержанием:

      {
        "ALCHEMY_API_KEY": "YOUR_KEY"
      }
  Этот файл должен быть на том же уровне, что и `package.json`.
- Замените `YOUR_KEY` на полученный ранее API ключ Alchemy.
- В репозитории проекта:
    ```bash
    npm install   # установка необходимых модулей
    npx hardhat test # запуск теста, имплементирующего решение задания
    ```
## Образец вывода логов
```bash


  -> Deploying XToken to the mainnet fork...
  -> Deploying YToken to the mainnet fork...
  -> XToken deployed to: 0x3D63c50AD04DD5aE394CAB562b7691DD5de7CF6f, supply: 100XT
  -> YToken deployed to: 0x103A3b128991781EE2c8db0454cA99d67b257923, supply: 100YT
  -> Gave the router an allowance of 50XT
  -> Gave the router an allowance of 50YT
  -> Added liquidity to XT-YT pair, 25 tokens each
  -> Initial XToken balance of owner: 75XT
  -> Initial YToken balance of owner: 75YT
  -> Performing swap...
  -> New XToken balance of owner: 65XT
  -> New YToken balance of owner: 82.12753788961967YT
  ✔ Token swap should decrease amount of XToken and increase amount of YToken (9607ms)

  1 passing (10s)

```