# Benchmark: RabbitMQ vs Kafka

Projeto de iniciação científica comparando performance de dois sistemas de mensageria amplamente usados em arquiteturas distribuídas.

## Estrutura

```
├── rabbitmq/
│   ├── send.js        # Produtor — envia array de mensagens JSON para a fila 'nomes'
│   └── receive.js     # Consumidor — lê e faz ACK das mensagens da fila
├── kafka/
│   ├── producer.js    # Produtor — envia mensagem com chave para o tópico 'topico_teste'
│   └── consumer.js    # Consumidor — lê mensagens do tópico desde o início (fromBeginning)
└── index.html  # Simulador interativo de performance
```

## Pré-requisitos

- Node.js 18+
- RabbitMQ rodando em `localhost:5672`
- Kafka rodando em `localhost:9092`

## Instalação

```bash
npm install amqplib kafkajs
```

## Execução

**RabbitMQ**
```bash
node rabbitmq/receive.js   # iniciar consumidor primeiro
node rabbitmq/send.js      # enviar mensagens
```

**Kafka**
```bash
node kafka/consumer.js     # iniciar consumidor primeiro
node kafka/producer.js     # enviar mensagem
```

## Simulador

Abra `benchmark_rabbitmq_kafka.html` no navegador para comparar throughput, latência p50/p99 e comportamento sob carga com parâmetros ajustáveis.

## Métricas comparadas

| Métrica | RabbitMQ | Kafka |
|---|---|---|
| Protocolo | AMQP | TCP binário próprio |
| ACK | Manual (`channel.ack`) | Automático (kafkajs) |
| Replay | Não — mensagem removida após ACK | Sim — log persistente |
| Ordem | Por fila | Por partição |
| Melhor caso | Baixa latência, volume moderado | Alto throughput, volume massivo |

## Referências

- [RabbitMQ Docs](https://www.rabbitmq.com/docs)
- [Kafka Docs](https://kafka.apache.org/documentation/)
- [kafkajs](https://kafka.js.org/)
- [amqplib](https://amqp-node.github.io/amqplib/)
