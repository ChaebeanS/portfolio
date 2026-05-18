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

export default function Photo() {
  const gridRef = useRef(null);
  const pckryRef = useRef(null); 
  const [items] = useState(() => shuffle(itemData.photo));

  useEffect(() => {
    window.scrollTo(0, 0);

    if (gridRef.current && items.length > 0) {
      pckryRef.current = new Packery(gridRef.current, {
        itemSelector: ".etc-grid-item",
        columnWidth: ".etc-grid-item",
        gutter: 15,
        percentPosition: true,
      });

      const itemsElements = gridRef.current.querySelectorAll('.etc-grid-item');
      itemsElements.forEach((itemElem) => {
        const draggie = new Draggabilly(itemElem);
        pckryRef.current.bindDraggabillyEvents(draggie);
      });

      imagesLoaded(gridRef.current).on("always", () => {
        setTimeout(()=>{
          pckryRef.current.layout();
        },500)
      });

      return () => pckryRef.current?.destroy();
    }
  }, [items]);


  return (
    <section className="bg-white">
      <article className='etc'>
        <div className='con-title'>
          <p className='title'>Photo graphy</p>
          <p>브랜드의 가치를 다양한 매체에 최적화된 비주얼 콘텐츠로 전달합니다</p>
        </div>
        <div className='contents'>
          <div className="etc-grid" ref={gridRef}>
            {items.map((item) => (
              <figure key={item.id} className="etc-grid-item">
                <img src={item.thumb} alt={`photo-${item.id}`} />
              </figure>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}