import FadeAnimation from '../components/FadeAnimation'
import PageTitle from '../components/PageTitle'
import React from 'react'

function About() {
  return (
    <FadeAnimation>
      <PageTitle title="About" description="Short description here soon..." />
      <p>Build test v1</p>
      <p>Coming soon...</p>
    </FadeAnimation>
  )
}

export default About
