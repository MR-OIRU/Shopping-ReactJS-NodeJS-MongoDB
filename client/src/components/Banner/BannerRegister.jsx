import React from 'react'
import { Container } from 'react-bootstrap'

const BannerRegister = () => {
  return (
    <>
      <section className="sectionBanner">
        <Container>
            <div className="content">
                <h2>SIGNUP</h2>
                <p>
                    <span className="text-warning">HOME</span>
                    <span>/</span>
                    <span className="text-warning">PAGES</span>
                    <span>/</span>
                    <span>SIGNUP</span>
                </p>
            </div>
        </Container>
      </section>
    </>
  )
}

export default BannerRegister