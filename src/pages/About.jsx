import React, { useEffect } from 'react'

function About() {

  useEffect(()=>{ window.scrollTo(0,0); },[])

  return (
    <article className='about'>
      <div className='me'>
          <div className='con-title'>
            <p className='title'>About me</p>
            <p>브랜드의 실물감과 디지털의 경험을 연결하는 디자이너</p>
          </div>
          <div className='content'>
            <div className='icon'></div>
            <div className='con'>
                <div className='self'>
                    <b>Self</b>
                    <p>hello</p>
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