// components
import ProposedCard from '../components/ProposedCard';
import ConfirmedCard from '../components/ConfirmedCard.js';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

//image
import MyPage_bg from '../img/MyPage_bg.jpg';
import Profile from '../img/profile.jpg';

function Mypage() {
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
              className=" object-cover bottom-[-15%] absolute z-10 ml-[6%] w-[12%] h-[55%] rounded-full border-[0.3rem] border-blackColor"
              alt="Profile"
              src={Profile}
            />
          </div>
        </div>
        <div className="bg-blackColor pt-[5%] pb-[5%] rounded-b-3xl px-[7%]">
          <div className="">
            <div className="text-4xl pb-[2.5%] font-semibold text-whiteColor">
              NotoriousHong
            </div>
            <div className="pt-[2%] text-lightGray overflow-hidden">
              <div className="text-xl font-semibold">Address</div>
              <div className="text-xl">
                0x247b669CbDD58FCa982DBf337C5D94880852E3Fa
              </div>
            </div>
            <div className="flex pt-[3%] text-lightGray">
              <div className="pr-[5%]">
                <div className="text-xl font-semibold">
                  Transactions as a Buyer
                </div>
                <div className="text-xl">6 times</div>
              </div>
              <div>
                <div className="text-xl font-semibold">
                  Transactions as a Seller
                </div>
                <div className="text-xl">2 times</div>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div className="mt-[10%] font-bold text-3xl mb-[2rem]">
              Proposed CDSs
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-y-7 gap-x-[4rem] justify-start">
              <ProposedCard />
              <ProposedCard />
              <ProposedCard />
              <ProposedCard />
              <ProposedCard />
              <ProposedCard />
              <ProposedCard />
            </div>
          </div>
          <div className="flex-col">
            <div className="mt-[10%] font-bold text-3xl mb-[2rem]">
              Accepted CDSs
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-y-7 gap-x-[4rem] justify-start">
              <ConfirmedCard />
              <ConfirmedCard />
              <ConfirmedCard />
              <ConfirmedCard />
              <ConfirmedCard />
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
