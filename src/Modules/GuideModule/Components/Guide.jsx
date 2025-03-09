    import React from 'react'
    import AboutSection from './AboutSection/AboutSection'
    import HeroSection from './HeroSection/HeroSection'
    import CoursesSection from './CoursesSection/CoursesSection'
    import MapSection from './MapSection/MapSection'
    import Footer from '../../SharedModule/Components/Footer/Footer'

    export default function Guide() {

    return (
    <div  style={{display:"flex",flexDirection:"column",gap:"20px"}}>
    <HeroSection/>
    <AboutSection/>
    <CoursesSection/>
    <MapSection/>
    <Footer/>
    </div>
    )
    }
