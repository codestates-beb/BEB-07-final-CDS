// modules
import { useEffect, useState, useRef } from 'react';
import { IconContext } from 'react-icons';

// apis
import { requestMyData } from '../apis/auth';
import { getSwapByAddress } from '../apis/request';
import { postEmailData, postNicknameData } from '../apis/post';

// components
import ProposedCard from '../components/ProposedCard.js';
import AcceptedCard from '../components/AcceptedCard.js';
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

//image
import MyPage_bg from '../assets/img/MyPage_bg.jpg';
import Profile from '../assets/img/profile.png';
import { FaEdit } from 'react-icons/fa';

function Mypage() {
  // 해당 user Address의 mydata를 저장합니다
  const [userAddress, setUserAddress] = useState('');
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

  // User가 서버로 post요청을 보낼 데이터를 저장합니다
  const [emailChange, setEmailChange] = useState('');
  const [nickNameChange, setNickNameChange] = useState('');

  // useEffect의 첫번째 랜더링을 막기 위한 상태를 저장합니다
  const isMountedGetSwapByAddress = useRef(false);
  const isMountedEmail = useRef(false);
  const isMountedNickname = useRef(false);

  useEffect(() => {
    requestMyData().then((response) => {
      setUserAddress(response.address);
      setBought(response.boughtCount);
      setSold(response.soldCount);
      setNickName(response.nickname);

      if (response.email == null) {
        setEmail('setYourEmail@CryptoDefault.com');
      } else {
        setEmail(response.email);
      }
    });
  }, []);

  ///////////////////////////////////////////////////
  useEffect(() => {
    if (isMountedGetSwapByAddress.current) {
      const APIdata = getSwapByAddress(userAddress);
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
    } else {
      isMountedGetSwapByAddress.current = true;
    }
  }, [userAddress]);

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

  // 사용자가 prompt에 empty value를 입력하거나 cancle을 눌렀을 경우를 처리합니다
  function emailClick() {
    let promptValue = prompt('Enter the email you want to change.');
    if (promptValue === '') {
      // user pressed OK, but the input field was empty
    } else if (promptValue) {
      // user typed something and hit OK
      setEmailChange(promptValue);
    } else {
      // user hit cancel
    }
  }

  function nickNameClick() {
    let promptValue = prompt('Enter the username you want to change.');
    if (promptValue === '') {
      // user pressed OK, but the input field was empty
    } else if (promptValue) {
      // user typed something and hit OK
      setNickNameChange(promptValue);
    } else {
      // user hit cancel
    }
  }

  ////////////////////////////////////////////
  // Email post요청을 보냅니다
  useEffect(() => {
    if (isMountedEmail.current) {
      const postData = () => {
        postEmailData(emailChange).then((response) => {
          setEmail(response.data.email);
        });
      };

      postData();
    } else {
      isMountedEmail.current = true;
    }
  }, [emailChange]);

  // Nickname post요청을 보냅니다
  useEffect(() => {
    if (isMountedNickname.current) {
      const postData = () => {
        postNicknameData(nickNameChange).then((response) => {
          setNickName(response.data.nickname);
        });
      };

      postData();
    } else {
      isMountedNickname.current = true;
    }
  }, [nickNameChange]);

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
              <button className="w-[1.5rem] h-[1.5rem] ml-[1rem] m-auto">
                <IconContext.Provider value={{ color: '#FF8B13' }}>
                  <FaEdit
                    className="w-[100%] h-[100%]"
                    onClick={() => nickNameClick()}
                  />
                </IconContext.Provider>
              </button>
            </div>
            <div className="pt-[2%] overflow-hidden">
              <div className="text-xl font-bold text-lightGray">Address</div>
              <div className="text-sm">{userAddress}</div>
            </div>
            <div className="pt-[2%] overflow-hidden">
              <div className="flex">
                <div className="text-xl font-bold text-lightGray">Email</div>
                <button className="w-[1rem] h-[1rem] ml-[0.5rem] m-auto">
                  <IconContext.Provider value={{ color: '#FF8B13' }}>
                    <FaEdit
                      className="w-[100%] h-[100%]"
                      onClick={() => emailClick()}
                    />
                  </IconContext.Provider>
                </button>
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

export default Mypage;
