// Importa a biblioteca kafkajs, que permite conectar e interagir com o Kafka
const { Kafka } = require('kafkajs');

// Cria uma instância do cliente Kafka (mesma configuração do produtor)
const kafka = new Kafka({
  clientId: 'meu-app',
  brokers: ['localhost:9092'],
});

// Cria o consumidor a partir do cliente Kafka
// groupId: identifica o grupo de consumidores
// Consumidores no mesmo grupo dividem as mensagens entre si (paralelismo)
const consumer = kafka.consumer({ groupId: 'grupo_teste' });

// Função assíncrona para receber mensagens do tópico
async function receiveMessage() {
  try {
    // Conecta o consumidor ao servidor Kafka
    await consumer.connect();

    // Assina o tópico que deseja escutar
    // fromBeginning: true  → lê todas as mensagens desde o início
    // fromBeginning: false → lê apenas mensagens novas (padrão)
    await consumer.subscribe({ topic: 'topico_teste', fromBeginning: true });

    // Exibe no console que o consumidor está pronto para receber mensagens
    console.log('Aguardando mensagens...');

    // Inicia o loop de consumo de mensagens
    // eachMessage é chamada para cada mensagem recebida
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Converte o conteúdo da mensagem de Buffer para objeto JavaScript
        const mensagem = JSON.parse(message.value.toString());

        // Exibe informações sobre a mensagem recebida
        // partition: partição do Kafka de onde veio a mensagem
        // offset: posição da mensagem dentro da partição (como um índice)
        console.log(`Mensagem recebida (partição ${partition}, offset ${message.offset}):`, mensagem);

        // No Kafka, o ACK é automático por padrão com kafkajs
        // Não é necessário confirmar manualmente como no RabbitMQ
      },
    });
  } catch (error) {
    // Caso ocorra algum erro durante o recebimento, exibe no console
    console.error('Erro:', error);
  }
}

// Chama a função para iniciar o consumidor
receiveMessage();