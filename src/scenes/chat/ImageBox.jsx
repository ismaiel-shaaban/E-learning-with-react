import React from 'react'

const ImageBox = ({src}) => {
  return (
    <img
      onClick={()=> window.open(src)}
      src={src}
      alt="Selected"
      style={{ maxWidth: '100%', maxHeight: '300px' , cursor : "pointer" }}
    />
  )
}

export default ImageBox