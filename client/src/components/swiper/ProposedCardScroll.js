// modules
import { FreeMode, Pagination } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//components
import ProposedCardType2 from '../ProposedCardType2';

function ProposedCardScroll(props) {
  const proposed = props.response.filter((swap) => swap.status === 'pending');

  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={15}
        freeMode={true}
        keyboard={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div>
          {proposed.map((swap) => {
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
