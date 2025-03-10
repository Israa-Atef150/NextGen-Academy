    import React from 'react'
    import AboutSection from './AboutSection/AboutSection'
    import HeroSection from './HeroSection/HeroSection'
    import CoursesSection from './CoursesSection/CoursesSection'
    import Footer from '../../SharedModule/Components/Footer/Footer'
    import ContactUs from './ContactUs/ContactUs'

    export default function Guide() {

    return (
    <div  style={{display:"flex",flexDirection:"column",gap:"20px"}}>
    <HeroSection/>
    <AboutSection/>
    <CoursesSection/>
    <ContactUs/>
    <Footer/>
    </div>
    )
    }
