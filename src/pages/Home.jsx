import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import TypeIt from "typeit-react";
import itemData from "../data/item.json";


function Home() {

  useEffect(() => {

    window.scrollTo(0, 0);

    const el_photo = document.querySelectorAll('.ani');

    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entrie, i) {
        if (entries[i].isIntersecting) { entries[i].target.classList.add('active'); }
      });
    }, { threshold: 0.5 });

    el_photo.forEach(function (target, i) { observer.observe(el_photo[i]); })

  }, [])

  const { bannerData } = itemData;


  return (
    <article className='home'>
      <section className='intros'>
        <div>
          <p>STUDIO BEAN</p>
          <p><em>_</em>
            <TypeIt options={{
              strings: [
                "PACKAGE",
                "WEB & DETAIL",
                "GRAPHIC",
                "STORYTELLERING"
              ],
              speed: 100,           // 타이핑 속도
              deleteSpeed: 40,      // 지워지는 속도 (보통 타이핑보다 빠르게 함)
              breakLines: false,    // 한 줄에서 썼다 지웠다 반복
              nextStringDelay: 1500, // 문장 완성 후 대기 시간 (1.5초)
              loop: true,           // 무한 반복
              cursor: false,        // TypeIt 기본 커서는 비활성화
            }}
            />
          </p>
        </div>
      </section>

      <div>
        <section className='summarys ani'>
          <div className='left'>
            <img src="./imgs/main/summary_p.png" alt="p" />
          </div>
          <div className='right'>
            <div className='img'>
              <img src="./imgs/main/summary_w.png" alt="w" />
              <img src="./imgs/main/summary_u.png" alt="u" />
            </div>
            <div className='text'>
              <h3>사물의 본질에서 감각의 인터페이스까지</h3>
              <p>
                제품이 가진 고유의 가치를 패키지에 담아내고, 이를 다시 웹디자인으로 확장하여 매력적인 브랜드 스토리를 완성합니다
              </p>
              <Link className='more' to="/about">More</Link>
            </div>
          </div>
        </section>
        <section className='packages ani'>
          <div className='width'>
            <p className='title'>Package Design</p>
            <p>제품이 사용자에게 닿는 첫 순간, 손끝에 닿는 종이의 질감과 패키지를 여는 손길까지.</p>
            <p>제품의 본질을 돋보이게 하는 감각적인 그래픽과 탄탄한 디테일을 더해, 소유하는 즐거움 그 이상의 가치를 디자인에 담아냅니다 </p>
            <Link className='more' to="/package">More</Link>
          </div>
          <div className="banner-container" >
            <Swiper
              modules={[Autoplay]}
              loop={true}
              loopAdditionalSlides={1}
              speed={2000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                770: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}

              allowTouchMove={false}
              className="mySwiper"
            >
              {bannerData.map((item) => (
                <SwiperSlide key={item.id}>
                  <img src={item.url} alt={`package-${item.id}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section className='webs ani'>
          <div className='text'>
            <p className='title'>Web<br /> Design</p>
            <p className='magin'>패키지의 무드를 온라인으로 확장하여 브랜드의 일관성을 유지하고 최적화된 정보를 전달합니다 </p>
            <Link className='more' to="/web">More</Link>
          </div>
          <div className='p-bg'>
            <div className='phone'>
              <img src="./imgs/main/web.png" alt="web" />
            </div>
          </div>
        </section>
        <section className='designs ani'>
          <div>
            <Link to="/package">Package<br />design</Link>
            <Link to="/web">Web<br />design</Link>
            <Link to="/etc">etc<br />design</Link>
            <Link to="/ui">UI/UX<br />design</Link>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Home