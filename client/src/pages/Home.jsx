import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Features from '../components/Features'
import FeedbackVision from '../components/FeedbackVision'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <FeedbackVision />
      <Footer />
    </div>
  )
}

export default Home
