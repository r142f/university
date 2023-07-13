## Как запустить
- Склонируйте репозиторий.
- Запустите MongoDB на порту 27017. Автор запускал, используя докер:
    ```bash
    docker run -p 27017:27017 --name local-mongo mongo
    ```
- В репозитории лабораторной:
    ```bash
    # установка необходимых модулей
    go mod download
    go run .
    ```

## Как работает
- Добавление пользователя `http://localhost:8082/addUser?id=1&currency=USD`
- Просмотр пользователей `http://localhost:8082/users`
- Добавление продукта `http://localhost:8082/addProduct?name=product&price=123.45`
- Просмотр продуктов `http://localhost:8082/products?id=1` — в `id` указывается пользователь, в чьей валюте будут отображены цены
