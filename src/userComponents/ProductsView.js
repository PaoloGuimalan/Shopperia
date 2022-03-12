import React from 'react'
import { useParams } from 'react-router-dom'
import './css/ProductsView.css'

function ProductsView() {

  const {queryID} = useParams();

  return (
    <div>ProductsView: {queryID}</div>
  )
}

export default ProductsView