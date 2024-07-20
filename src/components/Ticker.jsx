"use client";
import React, { useEffect, useState } from "react";
import pubsub from "@/utils/pubsub";

const Ticker = () => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const handlePriceUpdate = (newPrice) => {
      setPrice(newPrice);
    };

    pubsub.subscribe("priceUpdate", handlePriceUpdate);

    return () => {
      pubsub.unsubscribe("priceUpdate", handlePriceUpdate);
    };
  }, []);

  return (
    <div className="ticker">
      <p>Current Price: ${price.toFixed(2)}</p>
    </div>
  );
};

export default Ticker;
