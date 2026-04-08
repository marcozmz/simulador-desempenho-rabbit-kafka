// Importa a biblioteca kafkajs, que permite conectar e interagir com o Kafka
const { Kafka } = require('kafkajs');

// Cria uma instância do cliente Kafka
// clientId: identificador do seu app
// brokers: lista de endereços dos servidores Kafka
const kafka = new Kafka({
  clientId: 'meu-app',
  brokers: ['localhost:9092'],
});

// Cria o produtor a partir do cliente Kafka
const producer = kafka.producer();

// Função assíncrona para enviar uma mensagem para o tópico
async function sendMessage() {
  try {
    // Conecta o produtor ao servidor Kafka
    await producer.connect();

    // Cria a mensagem a ser enviada (objeto JavaScript)
    const mensagem = { id: 1, texto: 'Olá Marco!' };

    // Envia a mensagem para o tópico 'topico_teste'
    // Um tópico é como uma "categoria" de mensagens no Kafka
    await producer.send({
      topic: 'topico_teste',
      messages: [
        {
          // key: opcional, usada para garantir ordem de mensagens do mesmo grupo
          key: String(mensagem.id),
          // value: conteúdo da mensagem, convertido para string JSON
          value: JSON.stringify(mensagem),
        },
      ],
    });

    // Exibe no console que a mensagem foi enviada
    console.log('Mensagem enviada:', mensagem);

    // Desconecta o produtor após enviar a mensagem
    await producer.disconnect();
  } catch (error) {
    // Caso ocorra algum erro durante o envio, exibe no console
    console.error('Erro:', error);
  }
}

// Chama a função para enviar a mensagem
sendMessage();