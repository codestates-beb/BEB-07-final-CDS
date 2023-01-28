// modules
import { Pagination } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//components
import AcceptedCard_type2 from '../AcceptedCard_type2';

function AcceptedCardScroll(props) {
  const accepted = props.response.filter((swap) => swap.status === 'active');

  console.log(accepted);

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
          {accepted.map((swap) => {
            return (
              <div key={swap.swapId}>
                <SwiperSlide>
                  <AcceptedCard_type2
                    InitialPrice={swap.initialAssetPrice}
                    ClaimPrice={swap.claimPrice}
                    Liquidation
                    Price={swap.liquidationPrice}
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

export default AcceptedCardScroll;
