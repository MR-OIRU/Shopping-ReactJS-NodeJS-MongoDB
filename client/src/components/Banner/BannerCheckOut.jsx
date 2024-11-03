import React from 'react'
import { Container } from 'react-bootstrap'
import '../../assets/css/Banner.css'

const BannerCheckOut = () => {
  return (
    <>
    <section className="sectionBanner">
      <Container>
        <div className="content">
            <h2>CheckOut</h2>
            <p>
                <span className="text-warning">HOME</span>
                <span>/</span>
                <span className="text-warning">PAGES</span>
                <span>/</span>
                <span>CheckOut</span>
            </p>
        </div>
      </Container>
    </section>
  </>
  )
}

export default BannerCheckOut