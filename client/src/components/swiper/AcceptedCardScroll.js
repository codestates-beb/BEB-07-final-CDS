// modules
import { Navigation, FreeMode, Pagination } from 'swiper';
import { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//components
import AcceptedCardType2 from '../AcceptedCardType2';

// css
import '../../assets/css/cardScroll.css';

function AcceptedCardScroll(props) {
  const accepted = props.response.filter((swap) => swap.status === 'active');
  const randomSort = accepted.sort(() => Math.random() - 0.5);

  //처음 6개의 Card만 보여주도록 합니다
  const [index, setIndex] = useState(6);
  const initialAccepted = randomSort.slice(0, index);

  return (
    <>
      <Swiper
        navigation={true}
        slidesPerView={6}
        spaceBetween={15}
        freeMode={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, FreeMode, Pagination]}
        className="mySwiper"
      >
        <div>
          {initialAccepted.map((swap) => {
            return (
              <SwiperSlide key={swap.swapId}>
                <AcceptedCardType2
                  swapId={swap.swapId}
                  InitialPrice={swap.initialAssetPrice}
                  ClaimPrice={swap.claimPrice}
                  Liquidation
                  Price={swap.liquidationPrice}
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
