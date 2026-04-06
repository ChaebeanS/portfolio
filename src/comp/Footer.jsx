import React from 'react'

function Footer() {
  return (
    <article className='footer'>
        <div className='con'>
            <div className='text'>
                <h3>SIM CHAE BEAN</h3>
                <p>
                    <b>E.</b> sc.bean25@gmail.com <br/>
                    <b>A.</b> Uijeongbu-si, Gyeonggi-do <br/>
                    <b>kakao QR</b>
                </p>
            </div>
            <div className='qr'>
                <img src="./imgs/main/kakao.png" alt="QR" />
            </div>
        </div>
        <div className='copyright'>
            COPYRIGHT 2013-2026 STUDIO-BEAN. ALL RIGHTS RESERVED.
        </div>
    </article>
  )
}

export default Footer