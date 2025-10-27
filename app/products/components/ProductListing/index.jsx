"use client"

import ProductModal from "../Modal"


const { default: ProductCard } = require("@/components/ProductCard")

const ProductListing = ()=>{

    return  <div className="pb-24 grid grid-cols-3 gap-x-8 gap-y-4">
    {/* ***Should be removd*** */}
    <ProductCard
      name="Product card"
      source="/hands-assembling-advent-wreath_317x449.jpg"
    />
    <ProductCard
      name="Product card"
      source="/hands-assembling-advent-wreath_317x449.jpg"
    />
    <ProductCard
      name="Product card"
      source="/hands-assembling-advent-wreath_317x449.jpg"
    />
    <ProductCard
      name="Product card"
      source="/hands-assembling-advent-wreath_317x449.jpg"
    />
    <ProductCard
      name="Product card"
      source="/hands-assembling-advent-wreath_317x449.jpg"
    />

    <ProductModal/>
  </div>
}

export default ProductListing