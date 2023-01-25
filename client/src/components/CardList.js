// components
import Card from './Card';

function CardList() {
  const data = new Array(4);

  return (
    <>
      {data.map((ele) => {
        return <Card />;
      })}
    </>
  );
}

export default CardList;
