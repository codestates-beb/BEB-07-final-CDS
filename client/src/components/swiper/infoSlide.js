// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Mousewheel, Keyboard } from 'swiper';

//image
import infoSlide1 from '../../assets/img/infoSlide_bg_1.jpg';
import infoSlide2 from '../../assets/img/infoSlide_bg_2.jpg';
import infoSlide3 from '../../assets/img/infoSlide_bg_3.jpg';

// css
import '../../assets/css/infoSlide.css';

function infoSlide() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        className="mySwiperInfo w-[68rem] h-[24rem] bg-blackColor rounded-2xl relative my-[10rem]"
      >
        <SwiperSlide className="w-[68rem] h-[24rem]">
          <img
            src={infoSlide1}
            alt=" infoSlide1"
            className="w-[100%] h-[100%] object-fill"
          ></img>
          <div className="absolute top-[55%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
            <div className="flex-col w-[100%] text-center">
              <div className="text-4xl font-bold mb-[5%]">What is CDS ?</div>
              <div className="text-base font-light mb-[10%]">
                <p>
                  A credit default swap (CDS) is a financial derivative that
                  allows an investor
                </p>
                <p>
                  to swap or offset their credit risk with that of another
                  investor.
                </p>
                <p>
                  To swap the risk of default, the lender buys a CDS from
                  another investor
                </p>
                <p>who agrees to reimburse them if the borrower defaults.</p>
              </div>
              <button className="w-[9rem] h-[2rem] bg-primaryColor rounded-xl hover:bg-mintHover transition delay-100">
                <div className="font-semibold ">More Details</div>
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="object-cover w-[68rem] h-[24rem]">
          <img
            src={infoSlide2}
            alt="infoSlide1"
            className="w-[100%] h-[100%] object-fill"
          />
          <div className="absolute top-[55%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
            <div className="flex-col w-[100%] text-center">
              <div className="text-4xl font-bold mb-[5%]">Risks</div>
              <div className="text-base font-light mb-[10%]">
                <p>
                  Risk management in crypto is both an challenge and
                  opportunity.
                </p>
                <p>
                  How do you properly manage risk in a composable DeFi stack?
                </p>
                <p>Risk in DeFi is distinct for several reasons.</p>
                <p>
                  The non-custodial nature of its lending platforms, the price
                  volatility of tokens, on-chain vulnerabilities etc
                </p>
              </div>
              <button className="w-[9rem] h-[2rem] bg-primaryColor rounded-xl hover:bg-mintHover transition delay-100">
                <div className="font-semibold">More Details</div>
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="object-cover w-[68rem] h-[24rem]">
          <img
            src={infoSlide3}
            alt="infoSlide1"
            className="w-[100%] h-[100%] object-fill"
          />
          <div className="absolute top-[55%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
            <div className="flex-col w-[100%] text-center">
              <div className="text-4xl font-bold mb-[5%]">Teams</div>
              <div className="text-base font-light mb-[10%]">
                <p>Our team consists of creative and collaborative talents.</p>
                <p>They value communication, cooperation, and efficiency.</p>
                <p>
                  In the future, we will grow into an experienced professional
                  in finance, systems engineering, business strategy, and law.
                </p>
              </div>
              <button className="w-[9rem] h-[2rem] bg-primaryColor rounded-xl hover:bg-mintHover transition delay-100">
                <div className="font-semibold">More Details</div>
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default infoSlide;
