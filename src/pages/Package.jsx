import { useEffect, useRef, useState } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import itemData from "../data/item.json"; 

export default function Package() {
  const gridRef = useRef(null);
  const masonryRef = useRef(null);

  // 아이템 인덱스 관리용
  const [activeIndex, setActiveIndex] = useState(null);
  const items = itemData.package;
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


  // Masonry 초기화 + 이미지 로딩 대응
  useEffect(() => {
    if (gridRef.current) {
      masonryRef.current = new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 20,
      });

      // 이미지 로딩 후 layout
      imagesLoaded(gridRef.current).on("progress", () => {
        masonryRef.current.layout();
      });

      //스크롤이동
      window.scrollTo(0,0);
    }

    return () => masonryRef.current?.destroy();
  }, []);

  // 디테일 열릴 때
  useEffect(() => {
    if (!masonryRef.current) return;

    requestAnimationFrame(() => {
      masonryRef.current.reloadItems();
      masonryRef.current.layout();
    });
  }, [activeItem]);

  return (
    <section className="bg-white">
      <article className='package'>
        <div className='con-title'>
          <p className='title'>Package design</p>
          <p>제품의 첫인상, 패키지에 브랜드의 진심과 가치를 담아냅니다</p>
        </div>
        <div className='contents'>
          <div className="list" ref={gridRef}>
            <div className="grid-sizer"></div>
            {/* detail */}
            {activeItem && (
              <div className="grid-item  detail big" onClick={()=>setActiveIndex(null)}>
                <button className="nav-btn prev" onClick={handlePrev}>&lt;</button>
                <button className="nav-btn next" onClick={handleNext}>&gt;</button>                
                
                <img src={activeItem.detail} alt="detail" />
                  <div className='text'>
                    <div className='top'>
                      <p>{activeItem.brand}</p>
                      <h2>{activeItem.name}</h2>
                    </div>
                    <div className='bottom'>
                      <div>
                        <b>Work</b>
                        <p>{activeItem.text}</p>
                      </div>
                      <div>
                        <b>Overview</b>
                        <p dangerouslySetInnerHTML={{ __html: activeItem.view }} />
                      </div>
                    </div>
                  </div>
              </div>
            )}
            {/* 리스트 */}
            {items.map((item,index) => (
              <figure
                key={item.id}
                className={`grid-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleItemClick(index)}
              >
                <img src={item.thumb} alt="thumb" />
                <figcaption>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}