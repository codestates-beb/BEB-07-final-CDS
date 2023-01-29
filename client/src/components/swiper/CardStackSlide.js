// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper';

//components
import ProposedCard from '../ProposedCard.js';

function CardStackSlide(props) {
  function getSymbol(symbol) {
    const symbolURL = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
    return symbolURL;
  }

  const btcSymbol = getSymbol('btc');

  return (
    <div className="m-20 items-center">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-[13rem]"
      >
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide rounded-3xl">
          <ProposedCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CardStackSlide;
