import React from "react";
import Timeline from "../../components/Timeline/Timeline";
import Button from "../../components/Button/Button"
import Gallery from "../../components/Gallery/Gallery";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import "./Home.css"


const WEDDING_DATE = new Date("October 18, 2026");
const HERO_IMG = require("../../assets/hero.png");
const SEPARATOR = require("../../assets/backdrops/separator.webp");
const LOCATION = "St. Petersburg,  Florida";
const REGISTRY_LINK = "https://www.amazon.com"

const weekday = WEDDING_DATE.toLocaleDateString('en-US', { weekday: 'long' });
const restOfDate = WEDDING_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const DATE_STRING = `${weekday} ${restOfDate}`;

const TIMELINE_DATA = [
    { date: "October 18 2019", title: "Our first date", description: "We went our for a bite at Cheesecake Factory and took a stroll around Celebration Pointe in Gainesville, FL.", location: "Gainesville, Florida", locationLink: "https://www.google.com/maps/place/The+Cheesecake+Factory/@29.6263379,-82.3753332,71m/data=!3m1!1e3!4m6!3m5!1s0x88e8a326a651d29f:0xccca28c6ec2ca9d2!8m2!3d29.6264215!4d-82.3752174!16s%2Fg%2F11h4zncc6_?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"},
    { date: "March 21 2025", title: "She said yes!", description: "At Piedmont Park in Atlanta, Georgia.", location: "Atlanta, Georgia", locationLink: "https://maps.app.goo.gl/XXNGUARwk1RZZ5PF7"},
    { date: "October 18 2026", title: "The wedding", description: "Celebrating our 7-year relationship anniversary with family and friends.", location: "St. Petersburg, Florida", locationLink: "https://www.google.com/maps/place/Sunken+Gardens/@27.789574,-82.6411269,1142m/data=!3m1!1e3!4m6!3m5!1s0x88c2e1657e0a9257:0x70d77b2754fc7557!8m2!3d27.7897718!4d-82.6378269!16zL20vMDV6bHl0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"},
];

const IMAGE_DATA = [
    {
        name: "Mari + Carlos",
        caption: "Placeholder",
        link: "",
        src: require("./../../assets/gallery/mari_and_carlos.JPG"),
    },
    {
        name: "Mari + Carlos",
        caption: "Placeholder",
        link: "",
        src: require("./../../assets/gallery/mari_and_carlos.JPG"),
    },
    {
        name: "Mari + Carlos",
        caption: "Placeholder",
        link: "",
        src: require("./../../assets/gallery/mari_and_carlos.JPG"),
    },
    // ...more images
];


function Home() {
    const separator = <img src={SEPARATOR} alt="separator" className="separator-image"/>

    return(
        <div className="home-container">
            <div className="row">
                <section id="home">
                    <img src={HERO_IMG} alt="hero" className="hero-image"/>
                </section>
            </div>
            <div className="row">
                <div className="backdrop left"/>
                <div className="backdrop right"/>
                <section className="row-entry">
                    <h1 className="title">
                        Marilyn + Carlos 
                    </h1>
                    join us on
                    <h4> {DATE_STRING} </h4>
                    at
                    <h4> {LOCATION} </h4>

                    <p className="home-text"> for our wedding ceremony. we'll see you in </p><br/>
                    <FlipClockCountdown to={WEDDING_DATE} className='flip-clock'/>  
                </section>
            </div>
            {separator}
            <div className="row">
                <section className="row-entry" id="welcome">
                    <h2>Welcome!</h2>
                    <p className="home-text">To our friends and family: We're so excited to celebrate our wedding with you. Find all the details you need to know about our big day here.</p>
                </section>
            </div>
            {separator}
            <div className="row">
                <section className="row-entry" id="our-story">
                    <h2>Our Story</h2>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia, arcu non dictum tincidunt, purus magna porttitor magna, eget ornare libero ipsum ut enim. Morbi rhoncus commodo consequat. Nulla vitae laoreet velit. Donec imperdiet risus ut nulla commodo scelerisque. Proin vestibulum id tellus at euismod. In eu sem suscipit neque congue pellentesque. Quisque mollis arcu turpis, a aliquam massa sodales non. Ut finibus purus at urna vestibulum posuere. Aenean congue magna purus, nec molestie mauris aliquet sed. Aliquam erat volutpat. Nulla viverra mauris nibh, eu efficitur arcu fringilla sed. Nullam pharetra iaculis bibendum. Nunc id purus vel purus fermentum fermentum.
                    </p>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        Aenean consequat efficitur lacus, ut commodo nibh iaculis in. Donec eget euismod felis, elementum laoreet leo. Nam elementum enim turpis, eget placerat magna maximus eget. Maecenas tempus, sapien sit amet cursus lobortis, purus mi porttitor neque, quis commodo neque diam quis justo. Mauris varius tortor et velit bibendum, in pellentesque lacus imperdiet. Donec dictum elit at elit dictum fringilla. Morbi fringilla justo ultricies arcu pharetra, sed lobortis felis elementum. Praesent pharetra dolor vel dolor suscipit, at lacinia est gravida. Suspendisse vitae erat iaculis, fringilla odio sit amet, vestibulum orci. Sed sit amet pharetra.
                    </p>
                    <br/>
                    <Timeline entries={TIMELINE_DATA}/>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="registry">
                    <h2>Registry</h2>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia, arcu non dictum tincidunt, purus magna porttitor magna, eget ornare libero ipsum ut enim. Morbi rhoncus commodo consequat. 
                        <br/>
                        <div className="button-list">
                            <Button name="🌐︎ Amazon" href={REGISTRY_LINK} newtab={true}/>
                        </div>
                    </p>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="gallery">
                    <h2>Gallery</h2>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia, arcu non dictum tincidunt, purus magna porttitor magna, eget ornare libero ipsum ut enim. Morbi rhoncus commodo consequat. 
                        <br/>
                        <Gallery images={IMAGE_DATA}/>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Home;