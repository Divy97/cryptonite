import IndividualCoin from "@/components/IndividualCoin";
import Error from "@/components/common/Error";

const Coin = ({ params }) => {
  const coinId = params?.name[0];

  if (!coinId) {
    return <Error error="Invalid Coin Search." />;
  }

  const decodedCoinId = decodeURIComponent(coinId);
  const isValidCoinId = /^[a-zA-Z0-9]+$/.test(decodedCoinId);

  if (!isValidCoinId) {
    return <Error error="Invalid parameter." />;
  }

  return <IndividualCoin coinId={decodedCoinId} />;
};

export default Coin;
