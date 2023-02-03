// modules
import { useState, useEffect } from 'react';

//APIs
import { getSwaps } from '../apis/request.js';

// components
import ProposedCardType2 from '../components/ProposedCardType2.js';
import Pagination from '../components/Pagination.js';
import Footer from '../components/Footer.js';

function CardDisplayProposed() {
  // proposed swaps를 필터링 한 후 저장합니다
  const [proposed, setProposed] = useState([]);

  // 하나의 page에 들어갈 데이터를 저장합니다
  const [page, setPage] = useState(1); //페이지
  const limit = 10; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  useEffect(() => {
    const APIdata = getSwaps();
    const getData = () => {
      APIdata.then((response) => {
        console.log(response);

        const proposedData = response.filter(
          (swap) => swap.status === 'pending',
        );
        setProposed(proposedData);
      });
    };
    getData();
  }, []);

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
          {proposed.map((swap) => {
            return (
              <div className="mx-auto">
                <ProposedCardType2
                  swapId={swap.swapId}
                  premium={swap.premium}
                  premiumInterval={swap.premiumInterval}
                  requiredDeposit={swap.sellerDeposit}
                  premiumRounds={swap.totalPremiumRounds}
                  buyerAddress={swap.buyer}
                />
              </div>
            );
          })}
        </div>
        <div>
          <Pagination
            limit={limit}
            page={page}
            totalPosts={proposed.length}
            setPage={setPage}
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default CardDisplayProposed;
