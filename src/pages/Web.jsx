import { useEffect, useRef, useState } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import itemData from "../data/item.json"; 

export default function Web() {
  const gridRef = useRef(null);
  const masonryRef = useRef(null);

  // 아이템 인덱스 관리용
  const [activeIndex, setActiveIndex] = useState(null);
  const items = itemData.web;
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  // 아이템 클릭 시 실행
  const handleItemClick = (index) => {
    setActiveIndex(index);
    // 스크롤이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 좌우이동
  const handlePrev = (e) => {
    e.stopPropagation(); 
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };


  // Masonry 
  useEffect(() => {
    if (gridRef.current) {
      masonryRef.current = new Masonry(gridRef.current, {
        itemSelector: ".web-grid-item", 
        columnWidth: ".web-grid-sizer", 
        percentPosition: true,
        gutter: 20,
      });

      imagesLoaded(gridRef.current).on("progress", () => {
        masonryRef.current.layout();
      });
      window.scrollTo(0,0);
    }
    return () => masonryRef.current?.destroy();
  }, []);

  return (
    <section className="bg-white">
      <article className='web'>
        <div className='con-title'>
          <p className='title'>Web design</p>
          <p>패키지에 담긴 브랜드의 정체성을 가장 명확하고 매력적인 상세페이지로 연결합니다</p>
        </div>
        <div className='contents'>
          {/* 리스트 */}
          <div className="web-grid" ref={gridRef}>
            <div className="web-grid-sizer"></div>
            {items.map((item, index) => (
              <figure key={item.id} className="web-grid-item" onClick={() => handleItemClick(index)}>
                <img src={item.thumb} alt="thumb" />
                <figcaption>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>

      {/* 모달 */}
      {activeItem && (
        <div className="modal-overlay" onClick={() => setActiveIndex(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="nav-btn prev" onClick={handlePrev}>&lt;</button>
            <button className="nav-btn next" onClick={handleNext}>&gt;</button>                
            
            <div className="img-box">
              <img src={activeItem.detail} alt="detail" />
            </div>

            <div className='text'>
              <div className='top'>
                <p>{activeItem.brand}</p>
                <h2>{activeItem.name}</h2>
              </div>
              <div className='bottom'>
                <b>Work</b>
                <p>{activeItem.text}</p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}