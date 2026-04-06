import React, { useEffect } from 'react'

function About() {

  useEffect(()=>{ window.scrollTo(0,0); },[])

  return (
    <article className='about'>
      <div className='me'>
          <div className='con-title'>
            <p className='title'>About me</p>
            <p>패키지의 질감을 닮은 밀도 높은 시각적 스토리텔링</p>
          </div>
          <div className='content'>
            <div className='icon'></div>
            <div className='con'>
                <div className='self'>
                    <b>디자인으로 브랜드에 가치를 더하다</b>
                    <p>제품 패키지 디자인부터 상세페이지까지, 브랜드의 온·오프라인 접점을 아우르며 10년의 실무 경험을 쌓아왔습니다.<br /> 
                    뷰티와 건강식품 등 카테고리를 폭넓게 경험하며 복잡한 기획안을 명확한 비주얼로 구현하고, 
                    오랜 노련함과 유연한 사고를 바탕으로 소비자의 시선에서 구매 포인트를 정확히 포착하여, 브랜드의 정체성과 실질적인 판매를 동시에 이끄는 디자인을 지향합니다. 
                    모든 작업에 유관 부서와의 커뮤니케이션을 통해 프로젝트의 효율을 높이고, 디자인이 브랜드의 실질적인 성과로 연결되도록 기여하고 있습니다.</p>
                </div>
                <div className='skill'>
                    <div className='skills'>
                        <b>Skills</b>
                        <p><span>그래픽디자인</span> 웹디자인<span> 편집디자인</span> UI/UX 디자인</p>
                    </div>
                    <div className='tools'>
                        <b>Tools</b>
                        <p><span>CORE</span></p>
                        <div>
                            <p>Ps</p><p>Ai</p><p>Id</p>
                        </div>
                        <p><span>SUB</span><br />
                        Design & Devㅣ<span className='br'> Premiere / Dimension / Figma / VScode</span><br /> 
                        Etcㅣ <span className='br'>PowerPoint / Excel / Word / Notion</span>
                        </p>
                    </div> {/* tool */}
                </div> {/* skill */}
            </div> {/* con */}
          </div> {/* content */}
      </div> {/* me */}
    </article>
  )
}

export default About