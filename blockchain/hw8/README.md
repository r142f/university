## Предварительно
- Склонируйте репозиторий
- В репозитории проекта
  ```bash
  npm install   # установка необходимых зависимостей
  ```

## Запуск локальной Ethereum ноды:
- Установить go-ethereum (https://geth.ethereum.org/docs/getting-started/installing-geth)
  ```bash
  sudo add-apt-repository -y ppa:ethereum/ethereum
  sudo apt-get update
  sudo apt-get install ethereum
  ```
- Создать новый аккаунт
  ```bash
  mkdir datadir
  geth account new -datadir datadir
  ```
- Добавить из сгенерированного в директории `datadir/keystore` файла адрес `$ADDRESS` (поле `"address"`) в файл [genesis.json](./genesis.json) как элемент списка в поле `"alloc"`
  ```json
    ...
    "alloc": {
      "$ADDRESS": { "balance": "300000" }
    }
  ```
- Инициализировать сеть
  ```bash
  geth --datadir=./datadir init genesis.json
  ```
- Запустить ethereum ноду
  ```bash
  geth --datadir datadir --http --mine --networkid 17 --miner.etherbase $ADDRESS --miner.threads 2 --unlock $ADDRESS --allow-insecure-unlock
  ```
  где `$ADDRESS` — значение поля `"address"` из сгенерированного файла в директории [datadir/keystore](./datadir/keystore)
- Ввести придуманный для аккаунта пароль
- Среди логов будет строка вида
  ```bash
  endpoint=127.0.0.1:8545 auth=false prefix= cors= vhosts=localhost
  ```
  Значение параметра endpoint добавьте в файл [configuration.json](./configuration.json) как значение поля `"ethereum_node_address"` в формате `http://127.0.0.1:8545`

## Деплой контракта:
- Задеплоить контракт
  ```bash
  npx hardhat run scripts/deploy.js --network localhost
  ```
- Адрес контракта в логах добавьте в файл [configuration.json](./configuration.json) как значение поля `"contract_address"` 

## Запуск локальной IPFS ноды:
- Скачать дистрибутив ipfs ноды (https://dist.ipfs.tech/#go-ipfs)
  ```bash
  wget https://dist.ipfs.tech/kubo/v0.17.0/kubo_v0.17.0_linux-amd64.tar.gz
  ```
- Разархивировать содержимое и запустить `install.sh`
  ```bash
  tar -xvzf kubo_v0.17.0_linux-amd64.tar.gz
  cd kubo
  sudo sh install.sh
  ```
- Инициализировать ipfs и запустить демон
  ```bash
  ipfs init
  ipfs daemon
  ```
- В выводе будет строка вида `API server listening on $ADDRESS`. Внесите `$ADDRESS` как значение поля `"ipfs_address"` в файле [configuration.json](./configuration.json)

## Запуск DApp
- 
  ```bash 
  node app/index.js
  ```
- Перейти по ссылке http://localhost:8081

## Цепочка действия
- [Демонстрация](https://drive.google.com/file/d/1kdnW1xp4XnQfBNtjZNLX3yTky5iiXHJr/view?usp=share_link)

## Пример вывода тестов
```bash

  Storage
Contract deployed to: 0xcEf9fa79d32EBE82bE6e1769c8318Bf710dc763C
    ✔ Should correctly store file hashes (20813ms)


  1 passing (21s)
```
