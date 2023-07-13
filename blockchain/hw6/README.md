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
    Если `npx hardhat test` вылетает из-за тайм-аута, запустите команду еще раз.
## Образец вывода логов
```bash


  Receiver contract
   deployed to: 0x3D63c50AD04DD5aE394CAB562b7691DD5de7CF6f
   -> Receiver Wrapped Ether balance: 1 WETH.
   -> Receiver is performing 3 swaps using flashloan...
   -> Receiver Wrapped Ether balance: 0.5482886009380314 WETH.
    ✔ Should perform 3 swaps using flashloan (4480ms)


  1 passing (4s)

```