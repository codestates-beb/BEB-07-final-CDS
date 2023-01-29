// modules
import { FreeMode, Pagination } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//components
import AcceptedCardType2 from '../AcceptedCardType2';

function AcceptedCardScroll(props) {
  const accepted = props.response.filter((swap) => swap.status === 'active');

  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={15}
        freeMode={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div>
          {accepted.map((swap) => {
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
