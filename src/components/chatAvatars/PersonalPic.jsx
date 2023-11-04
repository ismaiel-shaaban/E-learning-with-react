import React from 'react'

const PersonalPic = ({imageSrc}) => {
  return (
    <img
        src={imageSrc}
        alt="avatar 1"
        style={{ width: "45px", height: "45px" , borderRadius : "50%"  }}
    />
  )
}

export default PersonalPic