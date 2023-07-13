## Децентрализованная лотерея
DApp доступен по ссылке: https://super-wave-0837.on.fleek.co/

### Описание
- Децентрализованная лотерея, ограниченная по времени (30 секунд)
- Пользователь покупает билет за 0.1 ETH
- По прошествии необходимого времени с помощью [Chainlink Keeper](https://docs.chain.link/chainlink-automation/introduction/) вызывается [Chainlink VRF](https://docs.chain.link/vrf/v2/introduction/), передающий в контракт рандомное число
- С помощью рандомного числа выбирается победитель
- Победителю переводятся все собранные деньги

### Код
- [Код смарт-контракта](https://github.com/r142f/HW2_BACKEND)
- [Код фронтенда](https://github.com/r142f/HW2_FRONTEND)
