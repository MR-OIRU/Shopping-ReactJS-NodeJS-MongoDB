import React from 'react'
import {Container, Row} from 'react-bootstrap'
import {BsFacebook, BsInstagram, BsYoutube, BsTwitter } from 'react-icons/bs'
import '../../assets/css/Footer.css'

function Footer() {
  return (
    <footer>
      <div className="custom-footer">
        <Container>
          <Row>
            <div className="icons">
              <ul>
                <li><a href='#'><BsFacebook /></a></li>
                <li><a href='#'><BsInstagram /></a></li>
                <li><a href='#'><BsYoutube /></a></li>
                <li><a href='#'><BsTwitter /></a></li>
              </ul>
            </div>
          </Row>
          <Row>
            <div className="detail">
              <ul>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Our Services</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
          </Row>
          <Row>
            INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh 
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer