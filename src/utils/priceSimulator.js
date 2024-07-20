import pubsub from "./pubsub";

const simulatePriceUpdates = () => {
  setInterval(() => {
    const newPrice = (Math.random() * 1000).toFixed(2);
    pubsub.publish("priceUpdate", parseFloat(newPrice));
  }, 60000);
};

export default simulatePriceUpdates;
