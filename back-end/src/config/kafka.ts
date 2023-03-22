import kafka from "kafka-node";
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
const consumer = new Consumer(
    client,
    [{ topic: 'notifications' }],
    { autoCommit: true }
);

producer.on('ready', () => {
    console.log('Producer is ready');
});

consumer.on('message', (message: any) => {
    console.log('Received message:', message.value);
});

consumer.on('error', (error: any) => {
    console.log('Consumer error:', error);
});