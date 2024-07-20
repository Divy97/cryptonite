import IndividualCoin from "@/components/IndividualCoin";

const Coin = ({ params }) => {
  const coinId = params?.name[0];
  return <IndividualCoin coinId={coinId} />;
};

export default Coin;
