import React from 'react'
import { Container } from 'react-bootstrap'
import '../../assets/css/Banner.css'

export const BannerCart = () => {
  return (
    <>
    <section className="sectionBanner">
      <Container>
        <div className="content">
            <h2>Cart</h2>
            <p>
                <span className="text-warning">HOME</span>
                <span>/</span>
                <span className="text-warning">PAGES</span>
                <span>/</span>
                <span>Cart</span>
            </p>
        </div>
      </Container>
    </section>
  </>
  )
}
export default BannerCart