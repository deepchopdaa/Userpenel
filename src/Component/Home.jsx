import React from 'react'
import Header from './Header'
import HeroSlider from './HeroSlider'
import Category from './Category'
import Product from './Product'
import ProductSlider from './ProductSlider'
import ServidesSlider from './ServidesSlider'
import Review from './Review'
import Footer from './Footer'
const Home = () => {
  return (
    <>
      <Header />
      <HeroSlider /> {/* top error */}
      <Category />
      <Product />
      <ProductSlider />
      <ServidesSlider />
      <Review />
      <Footer />
    </>
  )
}

export default Home
