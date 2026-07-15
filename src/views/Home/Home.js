import React, { useState, useEffect } from "react";
import Timeline from "../../components/Timeline/Timeline";
import Button from "../../components/Button/Button"
import Gallery from "../../components/Gallery/Gallery";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import "./Home.css"


const WEDDING_DATE = new Date("October 17, 2026");

const HERO_IMAGES = [
    require("../../assets/gallery/picture_1.jpg"),
    require("../../assets/gallery/picture_2.png"),
    require("../../assets/gallery/picture_3.jpg"),
    require("../../assets/gallery/picture_4.png"),
    require("../../assets/gallery/picture_5.png"),
    require("../../assets/gallery/picture_6.png"),
    require("../../assets/gallery/picture_7.jpg"),
    require("../../assets/gallery/picture_8.jpg"),
    require("../../assets/gallery/picture_9.jpg"),
    require("../../assets/gallery/picture_10.png"),
    require("../../assets/gallery/picture_11.png"),
    require("../../assets/gallery/picture_12.png"),
    require("../../assets/gallery/picture_13.jpg"),
    require("../../assets/gallery/picture_14.png"),
    require("../../assets/gallery/picture_15.jpg")
];


const SEPARATOR = require("../../assets/backdrops/separator.webp");
const PINK_FLOWER = require("../../assets/icons/pink_flower.png");
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

const TIMELINE_IMAGES = [
    HERO_IMAGES[1],
    HERO_IMAGES[3],
    HERO_IMAGES[5]
];

const GALLERY_IMAGES = [
    { name: "Mari + Carlos", src: require("../../assets/gallery/mari_and_carlos.JPG"), caption: "Marilyn & Carlos" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_1.jpg"), caption: "Sweet moments" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_2.png"), caption: "Together" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_3.jpg"), caption: "Smiling" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_4.png"), caption: "Warm embrace" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_5.png"), caption: "By the water" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_6.png"), caption: "Happy times" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_7.jpg"), caption: "Laughter" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_8.jpg"), caption: "Side by side" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_9.jpg"), caption: "Always" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_10.png"), caption: "Holding hands" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_11.png"), caption: "Joy" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_12.png"), caption: "Beautiful day" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_13.jpg"), caption: "Adventures" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_14.png"), caption: "Sunsets" },
    { name: "Mari + Carlos", src: require("../../assets/gallery/picture_15.jpg"), caption: "Love" }
];

const GUEST_RULES = [
    {
        title: "Alcohol Policy",
        content: "Soft drinks will be provided, but we will not be providing alcohol. Outside alcohol is not allowed the venue; any alcohol brought in by guests is at their own responsibility and may be confiscated by security."
    },
    {
        title: "Smoking Policy",
        content: "Smoking is strictly prohibited inside the gardens and indoor facilities. It is only permitted outside the front entry gates."
    },
    {
        title: "Garden Sanctuary",
        content: "Guests must remain on designated pathways to protect the 100-year-old botanical plants. Children must be supervised by an adult at all times and should not climb rocks/trees or walk in flower beds."
    },
    {
        title: "Pet Policy",
        content: "Sunken Gardens is a no-pet facility. A pre-approved exception is made for the ceremony portion only starting at 4:30 PM (not allowed at the rehearsal). Pets must be on a leash at all times with a handler and must leave the property once the ceremony and photos are complete."
    }
];


function Home() {
    const separator = <img src={SEPARATOR} alt="separator" className="separator-image"/>

    const [scrollOffset, setScrollOffset] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(800);
    const [isMobile, setIsMobile] = useState(false);
    const [activeRuleIndex, setActiveRuleIndex] = useState(0);

    useEffect(() => {
        setViewportHeight(window.innerHeight);
        setIsMobile(window.innerWidth <= 768);
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getCardStyle = (startPercent, endPercent, restingTop, restingLeft, restingRotation, mobileConfig = null) => {
        if (isMobile && mobileConfig) {
            if (mobileConfig.hide) {
                return { display: "none" };
            }
            restingTop = mobileConfig.top;
            restingLeft = mobileConfig.left;
            restingRotation = mobileConfig.rotate;
        }

        const startScroll = viewportHeight * startPercent;
        const endScroll = viewportHeight * endPercent;

        const progress = Math.min(1, Math.max(0, (scrollOffset - startScroll) / (endScroll - startScroll)));
        // Translate from below viewport (750px) to resting position (0px)
        const translateY = (1 - progress) * 750;
        const opacity = progress;

        return {
            position: "absolute",
            top: restingTop,
            left: restingLeft,
            transform: `translateY(${translateY}px) rotate(${restingRotation}deg)`,
            opacity: opacity,
        };
    };

    const getStickyContentStyle = () => {
        if (scrollOffset < viewportHeight * 2.5) {
            return {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 1
            };
        } else {
            return {
                position: "absolute",
                top: `${viewportHeight * 2.5}px`,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 1
            };
        }
    };

    return(
        <div className="home-container">
            <div className="hero-sticky-track" id="home">
                <div className="hero-sticky-content" style={getStickyContentStyle()}>
                    <div className="backdrop left"/>
                    <div className="backdrop right"/>
                    
                    {/* Scrollable parallax Polaroids nested inside the sticky container */}
                    <div className="hero-scrollable-polaroids">
                        <div className="hero-scroll-card card-1" style={getCardStyle(0.1, 0.7, "15%", "4%", -6, { hide: true })}>
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[0]} alt="Mari + Carlos 1" />
                                <div className="hero-scroll-caption">Together</div>
                            </div>
                        </div>
                        <div className="hero-scroll-card card-2" style={getCardStyle(0.3, 1.0, "17%", "78%", 8, { hide: false, top: "80%", left: "8%", rotate: -6 })}>
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[1]} alt="Mari + Carlos 2" />
                                <div className="hero-scroll-caption">Gainesville, FL</div>
                            </div>
                        </div>
                        <div className="hero-scroll-card card-3" style={getCardStyle(0.6, 1.25, "45%", "6%", 4, { hide: true })}>
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[2]} alt="Mari + Carlos 3" />
                                <div className="hero-scroll-caption">Yes! 💍</div>
                            </div>
                        </div>
                        <div className="hero-scroll-card card-4" style={getCardStyle(0.8, 1.5, "47%", "80%", -5, { hide: false, top: "82%", left: "38%", rotate: 4 })}>
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[3]} alt="Mari + Carlos 4" />
                                <div className="hero-scroll-caption">Atlanta, GA</div>
                            </div>
                        </div>
                        <div className="hero-scroll-card card-5" style={getCardStyle(1.1, 1.75, "72%", "5%", -8, { hide: true })}>
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[4]} alt="Mari + Carlos 5" />
                                <div className="hero-scroll-caption">Adventure</div>
                            </div>
                        </div>
                        <div className="hero-scroll-card card-6" style={getCardStyle(1.3, 1.95, "74%", "77%", 6, { hide: false, top: "79%", left: "68%", rotate: -5 })}>
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[5]} alt="Mari + Carlos 6" />
                                <div className="hero-scroll-caption">Always</div>
                            </div>
                        </div>
                    </div>

                    <section className="row-entry" style={{ zIndex: 5, position: "relative", pointerEvents: "none" }}>
                        <h1 className="title">
                            Marilyn + Carlos 
                        </h1>
                        Join us on
                        <h4 style={{ pointerEvents: "auto" }}> {DATE_STRING} </h4>
                        at
                        <h4 style={{ pointerEvents: "auto" }}> {LOCATION} </h4>

                        <p className="home-text" style={{ pointerEvents: "auto" }}> for our wedding ceremony. We'll see you in </p><br/>
                        <div style={{ pointerEvents: "auto" }}>
                            <FlipClockCountdown to={WEDDING_DATE} className='flip-clock'/>  
                        </div>
                    </section>
            </div>
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
                    <Timeline entries={TIMELINE_DATA} images={TIMELINE_IMAGES}/>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="venue">
                    <h2>The Venue</h2>
                    <p className="home-text">
                        Our wedding ceremony and reception will be held at the beautiful <strong>Sunken Gardens</strong> (Oak Pavilion & North Lawn) in St. Petersburg, Florida.
                    </p>
                    <div className="venue-map-container" style={{"margin": "1.5em auto", "maxWidth": "600px", "width": "100%", "padding": "0 20px", "boxSizing": "border-box"}}>
                        <iframe 
                            src="https://maps.google.com/maps?q=Sunken%20Gardens,%20St.%20Petersburg,%20FL&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="350" 
                            style={{"border": 0, "borderRadius": "8px", "boxShadow": "0 4px 12px rgba(0,0,0,0.15)"}} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Sunken Gardens Map"
                        ></iframe>
                    </div>

                    <div className="venue-details-container stacked">
                        <div className="venue-card">
                            <h3>Timeline</h3>
                            <div className="venue-timeline-horizontal">
                                <div className="venue-timeline-line"></div>
                                <div className="venue-timeline-items">
                                    <div className="venue-timeline-item-node">
                                        <span className="venue-time">4:30 PM</span>
                                        <img src={PINK_FLOWER} alt="flower" className="venue-flower-bullet" />
                                        <span className="venue-event">Doors Open</span>
                                    </div>
                                    <div className="venue-timeline-item-node">
                                        <span className="venue-time">5:00 PM</span>
                                        <img src={PINK_FLOWER} alt="flower" className="venue-flower-bullet" />
                                        <span className="venue-event">Ceremony Begins</span>
                                    </div>
                                    <div className="venue-timeline-item-node">
                                        <span className="venue-time">5:30 PM</span>
                                        <img src={PINK_FLOWER} alt="flower" className="venue-flower-bullet" />
                                        <span className="venue-event">Cocktail Hour</span>
                                    </div>
                                    <div className="venue-timeline-item-node">
                                        <span className="venue-time">6:30 PM</span>
                                        <img src={PINK_FLOWER} alt="flower" className="venue-flower-bullet" />
                                        <span className="venue-event">Dinner</span>
                                    </div>
                                    <div className="venue-timeline-item-node">
                                        <span className="venue-time">8:00 PM</span>
                                        <img src={PINK_FLOWER} alt="flower" className="venue-flower-bullet" />
                                        <span className="venue-event">Dancing</span>
                                    </div>
                                    <div className="venue-timeline-item-node">
                                        <span className="venue-time">10:00 PM</span>
                                        <img src={PINK_FLOWER} alt="flower" className="venue-flower-bullet" />
                                        <span className="venue-event">Reception Ends</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="venue-card guest-rules-interactive-container" id="venue-rules-container">
                            <h3>Guest Info & Rules</h3>
                            <div className="rules-interactive-layout">
                                {/* Left side: Topics list */}
                                <div className="rules-topics-list">
                                    {GUEST_RULES.map((rule, idx) => (
                                        <button
                                            key={idx}
                                            className={`rule-topic-btn ${activeRuleIndex === idx ? 'active' : ''}`}
                                            onMouseEnter={() => setActiveRuleIndex(idx)}
                                            onClick={() => setActiveRuleIndex(idx)}
                                        >
                                            <img src={PINK_FLOWER} alt="flower" className="rule-btn-flower" />
                                            {rule.title}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Right side: Active rule content block */}
                                <div className="rules-content-display" key={activeRuleIndex}>
                                    <h4 className="rules-content-title">{GUEST_RULES[activeRuleIndex].title}</h4>
                                    <p className="rules-content-text">{GUEST_RULES[activeRuleIndex].content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="travel">
                    <h2>Travel and Accomodations</h2>
                    <div className="hotel-cards-container">
                        <div className="hotel-card">
                            <img 
                                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80" 
                                alt="Hollander Boutique Hotel" 
                                className="hotel-card-image"
                            />
                            <h3>Hollander Boutique Hotel</h3>
                            <div className="hotel-distance">📍 0.9 miles from venue</div>
                            <a href="https://hollanderhotel.com/" target="_blank" rel="noreferrer" className="hotel-link">Visit Website ↗</a>
                        </div>
                        <div className="hotel-card">
                            <img 
                                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80" 
                                alt="Hyatt Place Downtown" 
                                className="hotel-card-image"
                            />
                            <h3>Hyatt Place Downtown</h3>
                            <div className="hotel-distance">📍 1.4 miles from venue</div>
                            <a href="https://www.hyatt.com/hyatt-place/en-US/piezd-hyatt-place-st-petersburg-downtown" target="_blank" rel="noreferrer" className="hotel-link">Visit Website ↗</a>
                        </div>
                        <div className="hotel-card">
                            <img 
                                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80" 
                                alt="The Vinoy Resort" 
                                className="hotel-card-image"
                            />
                            <h3>The Vinoy Resort</h3>
                            <div className="hotel-distance">📍 1.3 miles from venue</div>
                            <a href="https://www.marriott.com/en-us/hotels/tpasr-the-vinoy-resort-and-golf-club-autograph-collection/overview/" target="_blank" rel="noreferrer" className="hotel-link">Visit Website ↗</a>
                        </div>
                        <div className="hotel-card">
                            <img 
                                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=400&q=80" 
                                alt="Hampton Inn & Suites" 
                                className="hotel-card-image"
                            />
                            <h3>Hampton Inn & Suites</h3>
                            <div className="hotel-distance">📍 1.3 miles from venue</div>
                            <a href="https://www.hilton.com/en/hotels/piesthex-hampton-suites-st-petersburg-downtown/" target="_blank" rel="noreferrer" className="hotel-link">Visit Website ↗</a>
                        </div>
                    </div>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="registry">
                    <h2>Registry</h2>
                    <p className="home-text">
                        Your presence at our wedding is the greatest gift of all, and please do not feel obligated to give anything. 
                        However, if you would like to honor us with a gift, a financial contribution would be warmly appreciated.
                    </p>
                    <div className="registry-card">
                        <h4>Zelle Information</h4>
                        <div className="registry-info">
                            Phone Number: <strong>786-702-4967</strong>
                            <br/>
                            Name: <strong>Marilyn Braojos</strong>
                        </div>
                    </div>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="gallery">
                    <h2>Gallery</h2>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia, arcu non dictum tincidunt, purus magna porttitor magna, eget ornare libero ipsum ut enim. Morbi rhoncus commodo consequat. 
                    </p>
                    <Gallery images={GALLERY_IMAGES}/>
                </section>
            </div>
        </div>
    )
}

export default Home;