// modules
import { useState, useEffect } from 'react';

// components
import ProposedCardType2 from '../components/ProposedCardType2.js';
import Footer from '../components/Footer.js';

function CardDisplayProposed() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(4);

  const loadMore = () => {
    setIndex(index + 4);
    if (index >= 3) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <>
      <div>
        <div className="mt-[6rem] mb-[7rem]">
          <div className="text-center text-5xl font-bold">
            Proposed Crypto Default Swap Cards
          </div>
          <div className="flex justify-center w-screen mx-auto">
            <div className="w-[18.5rem] h-[3px] bg-primaryColor my-[2rem]"></div>
          </div>
          <div className="text-center text-sm font-light">
            As a buyer, you can accpet CDS Card, pay Seller a premium for a
            period of time, and protect your assets.{' '}
          </div>
          <div>
            <p className="text-center text-sm font-light">
              As a Seller, you can provide liquidity and receive a premium from
              Buyer for a period of time.
            </p>
            <p className="text-center text-sm font-light">
              {' '}
              If the Claim incident does not occur, you will receive back all
              the liquidity you provided.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-fill-25 justify-center">
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
          <div className="mx-auto">
            <ProposedCardType2 />
          </div>
        </div>
        <div className="mt-[5rem] flex justify-center">
          {isCompleted ? (
            <button
              onClick={loadMore}
              type="button"
              className="hidden"
            ></button>
          ) : (
            <button
              onClick={loadMore}
              type="button"
              className="h-16 w-44 rounded-3xl bg-primaryColor text-center transition-all hover:scale-110"
            >
              More Cards
            </button>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default CardDisplayProposed;
