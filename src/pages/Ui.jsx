import React, { useState, useEffect } from "react";
import { CgMaximizeAlt } from "react-icons/cg";
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import data from "../data/ui.json"; 

function Ui() {
  
  const [selectedModal, setSelectedModal] = useState(null);
  useEffect(()=>{ window.scrollTo(0,0); },[])

  const openModal = (id) => {
    const modalContent = data.modal.find((m) => m.id === id);
    setSelectedModal(modalContent);
  };

  const closeModal = () => setSelectedModal(null);

  return (
    <section className="bg-white">
      <article className="ui">
        <div className="con-title">
          <p className="title">UI/UX design</p>
          <p>디지털 환경의 메커니즘을 깊이 있게 이해합니다</p>
        </div>

        <div className="contents">
          {data.thumb.map((item) => (
            <section className="card" key={item.id}>
              <div className="img">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="info">
                  <h2>{item.title}</h2>
                <div className="text">
                  <p>{item.detail}</p>
                  <div className="link">
                    <button className="more" title="더보기" onClick={() => openModal(item.id)}>
                      <CgMaximizeAlt />
                    </button>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="icon-btn" title="사이트이동">
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
                <div className="tool">
                  <p dangerouslySetInnerHTML={{ __html: item.role }} />
                  {item.tool}
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>

      {selectedModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <IoClose size={30} />
            </button>
            <div className="modal-body">
              <h2>{selectedModal.title}</h2>
              <p>{selectedModal.detail}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Ui;