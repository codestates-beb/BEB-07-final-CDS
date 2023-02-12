// modules
import { EffectCoverflow, FreeMode, Pagination } from 'swiper';
import { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

//components
import AcceptedCard from '../AcceptedCard';

// css
import '../../assets/css/cardScroll.css';

function AcceptedCardScroll(props) {
  const accepted = props.response;

  //처음 6개의 Card만 보여주도록 합니다
  const [index, setIndex] = useState(7);
  const initialAccepted = accepted.slice(0, index);

  return (
    <>
      <Swiper
        slidesPerView={7}
        spaceBetween={15}
        freeMode={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, FreeMode, Pagination]}
        className="mySwiper"
      >
        <div>
          {initialAccepted.map((swap) => {
            return (
              <SwiperSlide key={swap.swapId}>
                <AcceptedCard
                  swapId={swap.swapId}
                  InitialPrice={swap.initialAssetPrice}
                  ClaimPrice={swap.claimPrice}
                  Liquidation
                  Price={swap.liquidationPrice}
                  assetType={swap.assetType}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
}

export default AcceptedCardScroll;
