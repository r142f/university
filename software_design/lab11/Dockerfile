FROM golang:1.20-buster

WORKDIR /lab11

RUN echo "module lab11\n\ngo 1.20" > go.mod
RUN go mod download

ADD exchange_emulator ./exchange_emulator
COPY /main.go .

RUN go build -o /exchange-emulator

EXPOSE 5000

CMD ["/exchange-emulator", "-p 5000"]
