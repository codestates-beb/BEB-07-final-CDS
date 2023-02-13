// modules
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// apis
import { getUserByAddr } from '../apis/request';
import { getSwapByAddress } from '../apis/request';

// components
import ProposedCard from '../components/ProposedCard.js';
import AcceptedCard from '../components/AcceptedCard.js';
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

//image
import MyPage_bg from '../assets/img/MyPage_bg.jpg';
import Profile from '../assets/img/profile.png';

function User() {
  const navigate = useNavigate();

  // Params
  const { address } = useParams();

  // Global Auth Var
  const userAddress = useSelector(state=> state.auth.user_addr );

  // 해당 user Address의 mydata를 저장합니다
  const [bought, setBought] = useState('');
  const [sold, setSold] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');

  // 해당 user Address의 swaps중 필터링 된 data를 저장합니다.
  const [pendingSwaps, setPendingSwaps] = useState([]);
  const [activeSwaps, setActiveSwaps] = useState([]);

  // 처음 10개의 Swaps만 보여주도록 합니다
  const [index, setIndex] = useState(6);
  const initialPendingSwaps = pendingSwaps.slice(0, index);
  const initialActiveSwaps = activeSwaps.slice(0, index);

  // Swaps를 추가적으로 로드할지 판단합니다
  const [isPendingCompleted, setPendingCompleted] = useState(false);
  const [isActiveCompleted, setActiveCompleted] = useState(false);

  useEffect(() => {
    if (userAddress && address.toLowerCase() === userAddress.toLowerCase())
      navigate('/mypage');
    
    // get User Info by param & save in state var
    getUserByAddr(address).then((response) => {
      setBought(response.boughtCount);
      setSold(response.soldCount);
      setNickName(response.nickname);

      if (response.email == null) {
        setEmail('setYourEmail@CryptoDefault.com');
      } else {
        setEmail(response.email);
      }
    });

    // get User Swap by param
    const APIdata = getSwapByAddress(address);
    const getData = () => {
      APIdata.then((response) => {
        return response.swaps;
      }).then((data) => {
        const pendingFiltered = data.filter(
          (swap) => swap.status === 'pending',
        );
        const activeFiltered = data.filter(
          (swap) => swap.status === 'active',
        );

        setPendingSwaps(pendingFiltered);
        setActiveSwaps(activeFiltered);
      });
    };
    getData();
  }, []);

  useEffect(()=>{
    if (userAddress && address.toLowerCase() === userAddress.toLowerCase())
      navigate('/mypage');
  }, [userAddress])

  // swap card를 추가적으로 불러옵니다
  const loadMorePending = () => {
    setIndex(index + 4);
    if (index >= pendingSwaps.length) {
      setPendingCompleted(true);
    } else {
      setPendingCompleted(false);
    }
  };

  const loadMoreActive = () => {
    setIndex(index + 4);
    if (index >= activeSwaps.length) {
      setActiveCompleted(true);
    } else {
      setActiveCompleted(false);
    }
  };

  return (
    <>
      <div className="flex-col px-[10%]">
        <div className="flex justify-center mt-[5%]">
          <div className="relative">
            <img
              className="object-cover rounded-t-3xl"
              alt="MyPage_bg"
              src={MyPage_bg}
            />
            <img
              className=" object-cover bottom-[-15%] absolute z-10 ml-[6%] w-[12%] h-[55%] rounded-full border-[0.5rem] border-blackColor"
              alt="Profile"
              src={Profile}
            />
          </div>
        </div>
        <div className="bg-blackColor pt-[5%] pb-[5%] rounded-b-3xl px-[7%]">
          <div className="">
            <div className="flex pb-[2.5%]">
              <div className="text-4xl font-bold">{nickName}</div>
            </div>
            <div className="pt-[2%] overflow-hidden">
              <div className="text-xl font-bold text-lightGray">Address</div>
              <div className="text-sm">{address}</div>
            </div>
            <div className="pt-[2%] overflow-hidden">
              <div className="flex">
                <div className="text-xl font-bold text-lightGray">Email</div>
              </div>
              <div className="text-sm">{email}</div>
            </div>
            <div className="flex pt-[3%]">
              <div className="pr-[5%]">
                <div className="flex">
                  <p className="text-xl font-bold text-lightGray">
                    {' '}
                    Transactions as a{' '}
                  </p>
                  <p className="text-xl font-bold text-green">&nbsp;Buyer</p>
                </div>
                <div className="text-sm">{bought} times</div>
              </div>
              <div>
                <div className="flex">
                  <p className="text-xl font-bold text-lightGray">
                    {' '}
                    Transactions as a{' '}
                  </p>
                  <p className="text-xl font-bold text-red">&nbsp;Seller</p>
                </div>
                <div className="text-sm">{sold} times</div>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div className="mt-[10%] font-bold text-3xl">Proposed CDSs</div>
            <div className="grid grid-cols-fill-25">
              {initialPendingSwaps.map((swap) => {
                return (
                  <div className="" key={swap.swapId}>
                    <ProposedCard
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
            <div className="flex justify-center">
              {isPendingCompleted ? (
                <button
                  onClick={loadMorePending}
                  type="button"
                  className="hidden"
                ></button>
              ) : (
                <button
                  onClick={loadMorePending}
                  type="button"
                  className="h-[2rem] w-[7rem] font-semibold rounded-3xl bg-primaryColor text-center drop-shadow-md transition delay-80 hover:-translate-y-1 hover:bg-mintHover "
                >
                  Load More
                </button>
              )}
            </div>
          </div>
          <div className="flex-col">
            <div className="mt-[10%] font-bold text-3xl">Accepted CDSs</div>
            <div className="grid grid-cols-fill-25">
              {initialActiveSwaps.map((swap) => {
                return (
                  <div className="" key={swap.swapId}>
                    <AcceptedCard
                      swapId={swap.swapId}
                      InitialPrice={swap.initialAssetPrice}
                      ClaimPrice={swap.claimPrice}
                      Liquidation
                      Price={swap.liquidationPrice}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              {isActiveCompleted ? (
                <button
                  onClick={loadMoreActive}
                  type="button"
                  className="hidden"
                ></button>
              ) : (
                <button
                  onClick={loadMoreActive}
                  type="button"
                  className="h-[2rem] w-[7rem] rounded-3xl font-semibold bg-primaryColor text-center drop-shadow-md transition delay-80 hover:-translate-y-1 hover:bg-mintHover "
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default User;
