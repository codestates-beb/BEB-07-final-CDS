// modules
import { Pagination } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//components
import ProposedCard_type2 from '../ProposedCard_type2';

function ProposedCardScroll(props) {
  const proposed = props.response.filter((swap) => swap.status === 'pending');

  console.log(proposed);

  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={15}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <div>
          {proposed.map((swap) => {
            return (
              <div key={swap.swapId}>
                <SwiperSlide>
                  <ProposedCard_type2
                    premium={swap.premium}
                    premiumInterval={swap.premiumInterval}
                    requiredDeposit={swap.sellerDeposit}
                    premiumRounds={swap.totalPremiumRounds}
                  />
                </SwiperSlide>
              </div>
            );
          })}
        </div>
      </Swiper>
    </>
  );
}

export default ProposedCardScroll;
