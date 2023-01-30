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
import ProposedCardType2 from '../ProposedCardType2';

// css
import '../../assets/css/cardScroll.css';

function ProposedCardScroll(props) {
  const proposed = props.response.filter((swap) => swap.status === 'pending');
  const randomSort = proposed.sort(() => Math.random() - 0.5);

  //처음 6개의 Card만 보여주도록 합니다
  const [index, setIndex] = useState(6);
  const initialProposed = randomSort.slice(0, index);

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
          {initialProposed.map((swap) => {
            return (
              <SwiperSlide key={swap.swapId}>
                <ProposedCardType2
                  swapId={swap.swapId}
                  premium={swap.premium}
                  premiumInterval={swap.premiumInterval}
                  requiredDeposit={swap.sellerDeposit}
                  premiumRounds={swap.totalPremiumRounds}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
}

export default ProposedCardScroll;
