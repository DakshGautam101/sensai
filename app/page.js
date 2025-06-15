import Window from '@/components/headerwindow'
import Hero from '@/components/hero'
import React from 'react'
import Squares from '@/app/themes/grid';


function page() {
  return (
    <div>
      <div className="absolute inset-0 -z-10">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#ffffff11"
          hoverFillColor="#111"
        />
       
      </div>
       <Window />
        <Hero />
    </div>
  )
}

export default page
