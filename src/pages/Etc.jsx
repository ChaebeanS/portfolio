import { useEffect, useRef, useState } from "react";
import itemData from "../data/item.json"; 
import Packery from "packery";
import Draggabilly from "draggabilly";
import imagesLoaded from "imagesloaded";

const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Etc() {
  const gridRef = useRef(null);
  const pckryRef = useRef(null); 
  const [items] = useState(() => shuffle(itemData.etc));
  const [modalImg, setModalImg] = useState(null); 

  useEffect(() => {
    window.scrollTo(0, 0);

    if (gridRef.current && items.length > 0) {
      // Packery 초기화
      pckryRef.current = new Packery(gridRef.current, {
        itemSelector: ".etc-grid-item",
        columnWidth: ".etc-grid-item",
        gutter: 15,
        percentPosition: true,
      });

      // 드래그
      const itemsElements = gridRef.current.querySelectorAll('.etc-grid-item');
      itemsElements.forEach((itemElem) => {
        const draggie = new Draggabilly(itemElem);
        // Packery 인스턴스에 드래그 요소 연결
        pckryRef.current.bindDraggabillyEvents(draggie);
      });

      // 이미지 로딩 후 레이아웃 재배치
      imagesLoaded(gridRef.current).on("always", () => {
        setTimeout(()=>{
          pckryRef.current.layout();
        },1000)
      });

      return () => pckryRef.current?.destroy();
    }
  }, [items]);


  return (
    <section className="bg-white">
      <article className='etc'>
        <div className='con-title'>
          <p className='title'>Etc design</p>
          <p>브랜드의 가치를 다양한 매체에 최적화된 비주얼 콘텐츠로 전달합니다</p>
        </div>
        <div className='contents'>

          <div className="etc-grid" ref={gridRef}>
            {items.map((item) => (
              <figure key={item.id} className={`etc-grid-item ${item.size === 'wide' ? 'wide' : ''}`}>
                <img src={item.thumb} alt={`etc-${item.id}`} />
                
                {item.hasModal && (
                  <div className="zoom-btn" onClick={() => setModalImg(item.detail)}>
                    <span>+</span>
                  </div>
                )}
              </figure>
            ))}
          </div>

        </div>
      </article>

      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={() => setModalImg(null)}>&times;</button>
            <div className="modal-body">
              <img src={modalImg} alt="Detail view" />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}