import React, { useState, useEffect } from "react";
import Timeline from "../../components/Timeline/Timeline";
import Gallery from "../../components/Gallery/Gallery";
import Lightbox from "../../components/Lightbox/Lightbox";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import "./Home.css"


const WEDDING_DATE = new Date("October 17, 2026");

const HERO_IMAGES = [
    require("../../assets/header/2019.webp"),
    require("../../assets/header/2024.webp"),
    require("../../assets/header/2020.webp"),
    require("../../assets/header/2026.webp"),
    require("../../assets/header/2021.webp"),
    require("../../assets/header/2025.webp")
];


const SEPARATOR = require("../../assets/backdrops/separator.webp");
const PINK_FLOWER = require("../../assets/icons/pink_flower.webp");
const LOCATION = "St. Petersburg,  Florida";

const XOR_KEY = "carlosandmari2026"; // Secret key for decoding, matches Python script

function decodeGuestName(base64) {
    try {
        if (!base64) return null;
        let b64 = base64.replace(/-/g, "+").replace(/_/g, "/");
        while (b64.length % 4) {
            b64 += "=";
        }
        const binaryStr = window.atob(b64);
        let str = "";
        for (let i = 0; i < binaryStr.length; i++) {
            const byte = binaryStr.charCodeAt(i);
            const keyChar = XOR_KEY.charCodeAt(i % XOR_KEY.length);
            str += String.fromCharCode(byte ^ keyChar);
        }
        return decodeURIComponent(escape(str));
    } catch (e) {
        console.error("Failed to decode guest name:", e);
        return null;
    }
}

function formatAttendeesList(namesArray) {
    if (!namesArray || namesArray.length === 0) return "";
    if (namesArray.length === 1) return namesArray[0];
    if (namesArray.length === 2) return `${namesArray[0]} and ${namesArray[1]}`;
    
    const last = namesArray[namesArray.length - 1];
    const rest = namesArray.slice(0, -1).join(", ");
    return `${rest}, and ${last}`;
}

const weekday = WEDDING_DATE.toLocaleDateString('en-US', { weekday: 'long' });
const restOfDate = WEDDING_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const DATE_STRING = `${weekday} ${restOfDate}`;

const TIMELINE_DATA = [
    { date: "October 18 2019", title: "Our first date", description: "We went out for a bite at Cheesecake Factory and took a stroll around Celebration Pointe in Gainesville, FL.", location: "Gainesville, Florida", locationLink: "https://www.google.com/maps/place/The+Cheesecake+Factory/@29.6263379,-82.3753332,71m/data=!3m1!1e3!4m6!3m5!1s0x88e8a326a651d29f:0xccca28c6ec2ca9d2!8m2!3d29.6264215!4d-82.3752174!16s%2Fg%2F11h4zncc6_?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"},
    { date: "March 21 2025", title: "She said yes!", description: "At Piedmont Park in Atlanta, Georgia.", location: "Atlanta, Georgia", locationLink: "https://maps.app.goo.gl/XXNGUARwk1RZZ5PF7"},
    { date: "October 17 2026", title: "The wedding", description: "Celebrating our 7-year relationship anniversary with family and friends.", location: "St. Petersburg, Florida", locationLink: "https://www.google.com/maps/place/Sunken+Gardens/@27.789574,-82.6411269,1142m/data=!3m1!1e3!4m6!3m5!1s0x88c2e1657e0a9257:0x70d77b2754fc7557!8m2!3d27.7897718!4d-82.6378269!16zL20vMDV6bHl0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"},
];

const TIMELINE_IMAGES = [
    require("../../assets/archive_gallery/mari_and_carlos.webp"),
    require("../../assets/archive_gallery/proposal.webp"),
    require("../../assets/archive_gallery/engagement.webp"),
];

const GALLERY_IMAGES_BASE = [
    { name: "Baby Carlos", src: require("../../assets/gallery/baby_carlos.webp"), caption: "San Juan, PR" },
    { name: "Baby Mari", src: require("../../assets/gallery/baby_mari.webp"), caption: "Placetas, Cuba" },
    { name: "Our parents", src: require("../../assets/gallery/families_both.webp"), caption: "Atlanta, GA" },
    { name: "Carlos' Family", src: require("../../assets/gallery/space_needle.webp"), caption: "Seattle, WA" },
    { name: "Mari's Family", src: require("../../assets/gallery/mia_airport.webp"), caption: "Miami, FL" },
    { name: "Helen + Jasmine", src: require("../../assets/gallery/helen_jasmine.webp"), caption: "Miami, FL" },
    { name: "Mari's Grandmas", src: require("../../assets/gallery/grandmas.webp"), caption: "Miami, FL" },
    { name: "Carrasquillo Family", src: require("../../assets/gallery/carrasquillo_family.webp"), caption: "Carolina, PR" },
    { name: "Kenny + Clau", src: require("../../assets/gallery/kiko_fam.webp"), caption: "Miami, FL" },
    { name: "Valeria", src: require("../../assets/gallery/valeria.webp"), caption: "Canovanas, PR" },
    { name: "Jose + Clau + Tere", src: require("../../assets/gallery/kiko_inlaw_1.webp"), caption: "Miami, FL" },
    { name: "Angel + Tere", src: require("../../assets/gallery/kiko_inlaw_2.webp"), caption: "Miami, FL" },
    { name: "Grety + Tia", src: require("../../assets/gallery/aunt_grethel.webp"), caption: "Miami, FL" },
    { name: "Torres Family", src: require("../../assets/gallery/torres_family.webp"), caption: "Carlonia, PR" },
    { name: "Teresa", src: require("../../assets/gallery/teresa.webp"), caption: "Atlanta, GA" },
    { name: "Teresa + Sam", src: require("../../assets/gallery/teresa_sam.webp"), caption: "Lisboa, Portugal" },
    { name: "Kimmy", src: require("../../assets/gallery/kimmy.webp"), caption: "Miami, FL" },
    { name: "Rawabi + Kimmy", src: require("../../assets/gallery/rawabi.webp"), caption: "Coral Gables, FL" },
    { name: "Janaki", src: require("../../assets/gallery/janaki.webp"), caption: "Gainesville, FL" },
    { name: "Jonathan + Janaki", src: require("../../assets/gallery/janaki_jonathan.webp"), caption: "Chicago, IL" },
    { name: "Reshma", src: require("../../assets/gallery/reshma.webp"), caption: "Gainesville, FL" },
    { name: "Mathew + Reshma", src: require("../../assets/gallery/reshma_mathew.webp"), caption: "Gainesville, FL" },
    { name: "Chris + Desi", src: require("../../assets/gallery/desi_chris.webp"), caption: "Atlanta, GA" },
    { name: "Haley, Joe + Parth", src: require("../../assets/gallery/haley_joe_parth.webp"), caption: "Atlanta, GA" },
    { name: "Dylan", src: require("../../assets/gallery/dylan.webp"), caption: "Gainesville, FL" },
    { name: "Jake", src: require("../../assets/gallery/jake.webp"), caption: "Tampa, FL" },
    { name: "Maite", src: require("../../assets/gallery/maite.webp"), caption: "Gainesville, FL" },
    { name: "Maite + Migue", src: require("../../assets/gallery/maite_migue.webp"), caption: "Miami, FL" },
    { name: "Daniel", src: require("../../assets/gallery/daniel.webp"), caption: "Bayamon, PR" },
    { name: "UF Roomies", src: require("../../assets/gallery/keishla_nicole.webp"), caption: "Gainesville, FL" },
    { name: "Ines", src: require("../../assets/gallery/ines.webp"), caption: "Gainesville, FL" },
    { name: "Ines + Kyle", src: require("../../assets/gallery/ines_kyle.webp"), caption: "George, WA" },
    { name: "Chloe", src: require("../../assets/gallery/chloe.webp"), caption: "Gainesville, FL" },
    { name: "Christoph", src: require("../../assets/gallery/christoph.webp"), caption: "Atlanta, GA" },
    { name: "Wes + Chloe", src: require("../../assets/gallery/wes_chloe.webp"), caption: "Asheville, NC" },
    { name: "Luis", src: require("../../assets/gallery/luis.webp"), caption: "Atlanta, GA" },
    { name: "James", src: require("../../assets/gallery/james.webp"), caption: "Gainesville, FL" },
    { name: "Mark", src: require("../../assets/gallery/mark.webp"), caption: "Breckenridge, CO" },
    { name: "Matt + Mina", src: require("../../assets/gallery/mina_matt.webp"), caption: "Atlanta, GA" },
    { name: "Jonathan, Matteo + Jaxon", src: require("../../assets/gallery/jonathan_matteo_jaxon.webp"), caption: "Gainesville, FL" },
    { name: "Jonathan, Sean + Jaxon", src: require("../../assets/gallery/jonathan_sean_jaxon.webp"), caption: "Gainesville, FL" },
    { name: "Julia + Andrew", src: require("../../assets/gallery/julia_andrew.webp"), caption: "Atlanta, GA" },
    { name: "Aakash + Eudorah", src: require("../../assets/gallery/aakash_eudorah.webp"), caption: "Atlanta, GA" }
];

const GALLERY_IMAGES = GALLERY_IMAGES_BASE.map((img, i) => ({
    ...img,
    id: i
}));

const MEMORIAL_IMAGES = [
    { name: "Nereida Gonzalez", src: require("../../assets/memorial/nereida.webp"), caption: "" },
    { name: "Teresita Chavez", src: require("../../assets/memorial/teresita.webp"), caption: "" },
    { name: "Gabe Dantzler", src: require("../../assets/memorial/gabe.webp"), caption: "" }
];

const GUEST_RULES = [
    {
        title: "Alcohol Policy",
        content: "Soft drinks will be provided, but we will not be providing alcohol. Outside alcohol is not allowed in the venue; any alcohol brought in by guests is at their own responsibility and may be confiscated by security."
    },
    {
        title: "Smoking Policy",
        content: "Smoking is strictly prohibited inside the gardens and indoor facilities. It is only permitted outside the front entry gates."
    },
    {
        title: "Dress Code",
        content: "We request formal or cocktail attire for our celebration. Since our ceremony and reception will be outdoors in a garden with grass and brick paths, we recommend block heels, wedges, or flats (please avoid stilettos so you don't sink into the grass). We also kindly ask that guests avoid wearing white, cream, or ivory, as well as overly casual clothing like jeans, shorts, and flip-flops."
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

const HOTELS = [
    {
        name: "Hollander",
        distance: "1.2 miles from venue",
        website: "https://book.bookingcenter.com/01/?site=HOLLAND",
        image: require("../../assets/hotels/hollander.png")
    },
    {
        name: "Avalon",
        distance: "1.2 miles from venue",
        website: "https://book.bookingcenter.com/01/?site=AVAHOT",
        image: require("../../assets/hotels/avalon.png")
    },
    {
        name: "Courtyard by Marriott",
        distance: "1.2 miles from venue",
        website: "https://www.marriott.com/en-us/hotels/tpadt-courtyard-tampa-downtown/overview/",
        image: require("../../assets/hotels/courtyard.png")
    },
    {
        name: "Galaxy",
        distance: "1.3 miles from venue",
        website: "https://thegalaxyhotel.com/",
        image: require("../../assets/hotels/galaxy.png")
    },
    {
        name: "Hyatt Place",
        distance: "1.5 miles from venue",
        website: "https://www.hyatt.com/hyatt-place/en-US/piezd-hyatt-place-st-petersburg-downtown",
        image: require("../../assets/hotels/hyatt.png")
    },
    {
        name: "Hilton",
        distance: "1.8 miles from venue",
        website: "https://www.hilton.com/en/hotels/sptshhf-hilton-st-petersburg-bayfront/",
        image: require("../../assets/hotels/hilton.png")
    }
];


function Home() {
    const separator = <img src={SEPARATOR} alt="separator" className="separator-image"/>

    const [scrollOffset, setScrollOffset] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(800);
    const [isMobile, setIsMobile] = useState(false);
    const [activeRuleIndex, setActiveRuleIndex] = useState(0);
    const [selectedHeroImage, setSelectedHeroImage] = useState(null);

    // RSVP form states
    const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
    const [rsvpCount, setRsvpCount] = useState(1);
    const [rsvpGuests, setRsvpGuests] = useState([
        { name: "", entree: "", isAttending: true }
    ]);
    const [rsvpMessage, setRsvpMessage] = useState("");
    const [showMenuInfo, setShowMenuInfo] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [welcomeGuestName, setWelcomeGuestName] = useState(null);
    const [welcomeGuestsList, setWelcomeGuestsList] = useState([]);
    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

    const handleCountChange = (count) => {
        setRsvpCount(count);
        setRsvpGuests(prev => {
            const next = [...prev];
            if (count > next.length) {
                while (next.length < count) {
                    next.push({ name: "", entree: "", isAttending: true });
                }
            } else if (count < next.length) {
                next.splice(count);
            }
            return next;
        });
    };

    const handleRsvpSubmit = () => {
        setIsSubmitted(true);
        
        // Reset states and close modal after 3 seconds
        setTimeout(() => {
            setIsRsvpModalOpen(false);
            setIsSubmitted(false);
            if (welcomeGuestsList && welcomeGuestsList.length > 0) {
                const count = Math.min(welcomeGuestsList.length, 4);
                setRsvpCount(count);
                const prepopulatedGuests = Array.from({ length: count }, (_, idx) => ({
                    name: welcomeGuestsList[idx] || "",
                    entree: "",
                    isAttending: true
                }));
                setRsvpGuests(prepopulatedGuests);
            } else {
                setRsvpCount(1);
                setRsvpGuests([{ name: "", entree: "", isAttending: true }]);
            }
            setRsvpMessage("");
            setShowMenuInfo(false);
        }, 3000);
    };

    useEffect(() => {
        setViewportHeight(window.innerHeight);
        setIsMobile(window.innerWidth <= 768);
        
        // Parse guest URL parameter and decode names
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get("guest");
        if (guestParam) {
            const decodedNamesStr = decodeGuestName(guestParam);
            if (decodedNamesStr) {
                const names = decodedNamesStr.split(",").map(n => n.trim()).filter(Boolean);
                if (names.length > 0) {
                    setWelcomeGuestsList(names);
                    const formattedList = formatAttendeesList(names);
                    setWelcomeGuestName(formattedList);
                    setIsWelcomeModalOpen(true);
                    
                    const count = Math.min(names.length, 4);
                    setRsvpCount(count);
                    const prepopulatedGuests = Array.from({ length: count }, (_, idx) => ({
                        name: names[idx] || "",
                        entree: "",
                        isAttending: true
                    }));
                    setRsvpGuests(prepopulatedGuests);
                }
            }
        }
        
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollOffset(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        let lastWidth = window.innerWidth;
        const handleResize = () => {
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth;
                setViewportHeight(window.innerHeight);
                setIsMobile(window.innerWidth <= 768);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [welcomeGuestName]);

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
        // Translate from below viewport (smaller on mobile) to resting position (0px)
        const translateDistance = isMobile ? 300 : 750;
        const translateY = (1 - progress) * translateDistance;
        const opacity = progress;

        return {
            position: "absolute",
            top: restingTop,
            left: restingLeft,
            transform: `translateY(${translateY}px) rotate(${restingRotation}deg)`,
            opacity: opacity,
        };
    };

    return (
        <div className="home-container">
            <div className="hero-sticky-track" id="home">
                <div className="hero-sticky-content">
                    <div className="backdrop left"/>
                    <div className="backdrop right"/>
                    
                    {/* Scrollable parallax Polaroids nested inside the sticky container */}
                    <div className="hero-scrollable-polaroids">
                        <div 
                            className="hero-scroll-card card-1" 
                            style={getCardStyle(0.1, 0.7, "15%", "4%", -6, { hide: false, top: "8%", left: "5%", rotate: -6 })}
                            onClick={() => setSelectedHeroImage({ src: HERO_IMAGES[0], caption: "Tampa, FL" })}
                        >
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[0]} alt="Mari + Carlos 1" />
                                <div className="hero-scroll-caption">Tampa, FL</div>
                            </div>
                        </div>
                        <div 
                            className="hero-scroll-card card-2" 
                            style={getCardStyle(0.3, 1.0, "17%", "78%", 8, { hide: false, top: "80%", left: "8%", rotate: -6 })}
                            onClick={() => setSelectedHeroImage({ src: HERO_IMAGES[1], caption: "Pasadena, CA" })}
                        >
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[1]} alt="Mari + Carlos 2" />
                                <div className="hero-scroll-caption">Pasadena, CA</div>
                            </div>
                        </div>
                        <div 
                            className="hero-scroll-card card-3" 
                            style={getCardStyle(0.6, 1.25, "45%", "6%", 4, { hide: false, top: "11%", left: "37%", rotate: 4 })}
                            onClick={() => setSelectedHeroImage({ src: HERO_IMAGES[2], caption: "Gainesville, FL" })}
                        >
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[2]} alt="Mari + Carlos 3" />
                                <div className="hero-scroll-caption">Gainesville, FL</div>
                            </div>
                        </div>
                        <div 
                            className="hero-scroll-card card-4" 
                            style={getCardStyle(0.8, 1.5, "47%", "80%", -5, { hide: false, top: "82%", left: "38%", rotate: 4 })}
                            onClick={() => setSelectedHeroImage({ src: HERO_IMAGES[5], caption: "Suwon, South Korea" })}
                        >
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[5]} alt="Mari + Carlos 4" />
                                <div className="hero-scroll-caption">Suwon, South Korea</div>
                            </div>
                        </div>
                        <div 
                            className="hero-scroll-card card-5" 
                            style={getCardStyle(1.1, 1.75, "72%", "5%", -8, { hide: false, top: "8%", left: "69%", rotate: -8 })}
                            onClick={() => setSelectedHeroImage({ src: HERO_IMAGES[4], caption: "San Juan, PR" })}
                        >
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[4]} alt="Mari + Carlos 5" />
                                <div className="hero-scroll-caption">San Juan, PR</div>
                            </div>
                        </div>
                        <div 
                            className="hero-scroll-card card-6" 
                            style={getCardStyle(1.3, 1.95, "74%", "77%", 6, { hide: false, top: "79%", left: "68%", rotate: -5 })}
                            onClick={() => setSelectedHeroImage({ src: HERO_IMAGES[3], caption: "Atlanta, GA" })}
                        >
                            <div className="hero-scroll-polaroid">
                                <img src={HERO_IMAGES[3]} alt="Mari + Carlos 6" />
                                <div className="hero-scroll-caption">Atlanta, GA</div>
                            </div>
                        </div>
                    </div>

                    <section className="row-entry" style={{ zIndex: 5, position: "relative", pointerEvents: "none" }}>
                        <h1 className="title title-grid">
                            <span className="title-left">Marilyn</span>
                            <span className="title-center">+</span>
                            <span className="title-right">Carlos</span>
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
        <img src={SEPARATOR} alt="separator" className="separator-image first-separator"/>
            <div className="row">
                <section className="row-entry" id="welcome">
                    <h2>Welcome!</h2>
                    <p className="home-text">To our family and friends: We're so excited to celebrate our wedding with you. Find all the details you need to know about our big day here.</p>
                </section>
            </div>
            
            {separator}
            <div className="row">
                <section className="row-entry" id="our-story">
                    <h2>Our Story</h2>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        Our story began in May 2019, when we met in the Design and Manufacturing Laboratory at the University of Florida. Before long, we realized we were also taking a controls course together that same term. Between exam study sessions and intense design reviews, we quickly grew from classmates to close friends.
                    </p>
                    <p className="home-text" style={{"textAlign": "left"}}>
                        The following semester brought us even closer when we found ourselves sharing yet another class. Sitting side-by-side during lectures and working through joint study sessions, our friendship bloomed into something deeper. It wasn't long before we both developed feelings for one another, and with a gentle nudge from Teresa, the maid of honor, we finally admitted it! Once the conversation was sparked, the rest was history.
                    </p>
                    <br/>
                    <Timeline entries={TIMELINE_DATA} images={TIMELINE_IMAGES}/>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="venue">
                    <h2>Venue</h2>
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
                                        <span className="venue-time">5:45 PM</span>
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
                        {HOTELS.map((hotel, idx) => (
                            <a 
                                href={hotel.website} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="hotel-card" 
                                key={idx}
                            >
                                <div className="hotel-card-image-container">
                                    <img 
                                        src={hotel.image} 
                                        alt={hotel.name} 
                                        className="hotel-card-image"
                                    />
                                </div>
                                <h3>{hotel.name}</h3>
                                <div className="hotel-distance">📍 {hotel.distance}</div>
                                <div className="hotel-link">Visit Website ↗</div>
                            </a>
                        ))}
                    </div>

                    <div className="booking-buttons-group">
                        <a 
                            href="https://www.priceline.com/relax-ui/listings?searchType=NEARBY&destination=68319&checkIn=20261017&checkOut=20261018&rooms=1&adults=2" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="booking-partner-btn priceline-btn"
                        >
                            <img src={require("../../assets/hotels/priceline.png")} alt="Priceline" className="booking-partner-logo" />
                            <span>Book on Priceline.com</span>
                        </a>
                        <a 
                            href="https://www.expedia.com/Hotel-Search?destination=Sunken%20Gardens%2C%20St.%20Petersburg%2C%20Florida%2C%20United%20States%20of%20America&regionId=503017&latLong=27.789968%2C-82.63712&flexibility=0_DAY&d1=2026-10-17&startDate=2026-10-17&d2=2026-10-18&endDate=2026-10-18&adults=2&rooms=1&typeaheadCollationId=b039e2fa-932b-4477-beec-636351a0e9d4&sort=RECOMMENDED&previousRegionId=503017&theme=&userIntent=&semdtl=&categorySearch=&useRewards=false" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="booking-partner-btn expedia-btn"
                        >
                            <img src={require("../../assets/hotels/expedia.png")} alt="Expedia" className="booking-partner-logo" />
                            <span>Book on Expedia.com</span>
                        </a>
                    </div>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="rsvp">
                    <h2>RSVP</h2>
                    <p className="home-text">
                        We would love to celebrate our special day with you! Please let us know if you can make it by October 1st, 2026.
                    </p>
                    <div className="rsvp-card">
                        <p className="rsvp-instructions">
                            Click to fill out your RSVP details.
                        </p>
                        <button onClick={() => setIsRsvpModalOpen(true)} className="rsvp-button-trigger">
                            RSVP
                        </button>
                    </div>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="registry">
                    <h2>Registry</h2>
                    <p className="home-text">
                        Your presence at our wedding is the greatest gift of all, and please do not feel obligated to give anything. 
                        However, if you would like to honor us with a gift, a financial contribution toward our future together would be warmly appreciated.
                    </p>
                    <div className="registry-card">
                        <h3>Zelle Information</h3>
                        <div className="registry-info">
                            Phone Number: <strong>786-702-4967</strong>
                            <br/>
                            Name: <strong>Marilyn Braojos</strong>
                        </div>
                        <a 
                            href="https://www.zellepay.com/go/zelle" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="zelle-btn"
                        >
                            Send with Zelle
                        </a>
                    </div>
                </section>
            </div>

            {separator}
            <div className="row">
                <section className="row-entry" id="gallery">
                    <h2>Gallery</h2>
                    <p className="home-text" style={{"textAlign": "center", "marginBottom": "2rem"}}>
                        We are so grateful to have all of you in our lives!
                    </p>
                    <Gallery images={GALLERY_IMAGES} breakFirstTwo={true}/>

                    <div className="memorial-gallery-section">
                        <h3 className="memorial-title">In Loving Memory</h3>
                        <p className="memorial-subtitle">Remembering our loved ones who are with us in spirit.</p>
                        <Gallery images={MEMORIAL_IMAGES}/>
                    </div>
                </section>
            </div>

            {selectedHeroImage && (
                <Lightbox 
                    imageSrc={selectedHeroImage.src}
                    title={selectedHeroImage.caption}
                    onClose={() => setSelectedHeroImage(null)}
                />
            )}

            {isRsvpModalOpen && (
                <div className="rsvp-modal-overlay">
                    <div className="rsvp-modal-card">
                        <button 
                            className="rsvp-modal-close-btn" 
                            onClick={() => setIsRsvpModalOpen(false)}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        
                        {isSubmitted && (
                            <div className="rsvp-success-container">
                                <img src={PINK_FLOWER} alt="flower" className="rsvp-success-flower" />
                                <h3>Thank You!</h3>
                                <p className="rsvp-success-text">Your RSVP has been saved successfully.</p>
                                <p className="rsvp-success-sub">We can't wait to celebrate our special day with you!</p>
                            </div>
                        )}
                        
                        <div className={`rsvp-form-container ${isSubmitted ? "hidden-form" : ""}`}>
                            <h3>RSVP Details</h3>
                            <form 
                                action="https://docs.google.com/forms/d/e/1FAIpQLSerJb0shGogMDzepx8BsePdif2jqigKqwIfBSAi1owzuYTAcA/formResponse"
                                method="POST"
                                target="hidden_iframe"
                                onSubmit={handleRsvpSubmit} 
                                className="rsvp-modal-form"
                            >
                                {/* Hidden inputs mapping to Google Form entry parameters */}
                                <input type="hidden" name="entry.1058395948" value={rsvpGuests.some(g => g.isAttending) ? "Yes" : "No"} />
                                <input type="hidden" name="entry.1741651700" value={rsvpGuests.filter(g => g.isAttending).length} />
                                
                                <input type="hidden" name="entry.1909768101" value={rsvpGuests[0]?.name || ""} />
                                <input type="hidden" name="entry.1771373528" value={rsvpGuests[0]?.isAttending ? (rsvpGuests[0]?.entree || "") : "Declined"} />
                                
                                <input type="hidden" name="entry.911835970" value={rsvpCount >= 2 ? (rsvpGuests[1]?.name || "") : ""} />
                                <input type="hidden" name="entry.448187643" value={rsvpCount >= 2 ? (rsvpGuests[1]?.isAttending ? (rsvpGuests[1]?.entree || "") : "Declined") : ""} />
                                
                                <input type="hidden" name="entry.1266679397" value={rsvpCount >= 3 ? (rsvpGuests[2]?.name || "") : ""} />
                                <input type="hidden" name="entry.122115254" value={rsvpCount >= 3 ? (rsvpGuests[2]?.isAttending ? (rsvpGuests[2]?.entree || "") : "Declined") : ""} />
                                
                                <input type="hidden" name="entry.350072060" value={rsvpCount >= 4 ? (rsvpGuests[3]?.name || "") : ""} />
                                <input type="hidden" name="entry.44416253" value={rsvpCount >= 4 ? (rsvpGuests[3]?.isAttending ? (rsvpGuests[3]?.entree || "") : "Declined") : ""} />
                                
                                <input type="hidden" name="entry.935076605" value={rsvpMessage} />

                                <div className="rsvp-guests-condensed-container">
                                    <div className="entree-header-row">
                                        <span>Guest Details</span>
                                        <button 
                                            type="button" 
                                            className="menu-info-trigger"
                                            onClick={() => setShowMenuInfo(prev => !prev)}
                                        >
                                            ⓘ View Menu Details
                                        </button>
                                    </div>

                                    {showMenuInfo && (
                                        <div className="menu-info-details">
                                            <p><strong>Chicken Paella:</strong> Chicken cooked with saffron, green olives, and tomato rice.</p>
                                            <p><strong>Filet Mignon:</strong> Carved whole-beef tenderloin with béarnaise and horseradish sauces, served with creamy garlic mashed potatoes.</p>
                                            <p><strong>Duet Plate:</strong> A half-portion of both the savory Chicken Paella and the tender Filet Mignon.</p>
                                        </div>
                                    )}

                                    <div className="guest-rows-list">
                                        {rsvpGuests.map((guest, idx) => (
                                            <div key={idx} className="guest-condensed-row">
                                                <div className="guest-field attend-check-field">
                                                    <button
                                                        type="button"
                                                        className={`rsvp-guest-attend-btn ${guest.isAttending ? "active" : ""}`}
                                                        onClick={() => {
                                                            setRsvpGuests(prev => {
                                                                const next = [...prev];
                                                                next[idx].isAttending = !next[idx].isAttending;
                                                                return next;
                                                            });
                                                        }}
                                                    >
                                                        {guest.isAttending ? (
                                                            <img src={PINK_FLOWER} alt="flower" className="rsvp-radio-flower" />
                                                        ) : (
                                                            <span className="rsvp-decline-dot" />
                                                        )}
                                                        <span>{guest.isAttending ? "Attending" : "Declining"}</span>
                                                    </button>
                                                </div>
                                                <div className="guest-field name-field">
                                                    <input 
                                                        type="text" 
                                                        required 
                                                        placeholder={`Guest ${idx + 1} Name`}
                                                        value={guest.name} 
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setRsvpGuests(prev => {
                                                                const next = [...prev];
                                                                next[idx].name = val;
                                                                return next;
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="guest-field entree-field">
                                                    <select 
                                                        disabled={!guest.isAttending}
                                                        required
                                                        value={guest.isAttending ? guest.entree : "Declined"} 
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setRsvpGuests(prev => {
                                                                const next = [...prev];
                                                                next[idx].entree = val;
                                                                return next;
                                                            });
                                                        }}
                                                    >
                                                        {guest.isAttending ? (
                                                            <>
                                                                <option value="" disabled hidden>Make Selection</option>
                                                                <option value="Chicken Paella">Chicken Paella</option>
                                                                <option value="Filet Mignon with Garlic Mashed Potatoes">Filet Mignon</option>
                                                                <option value="Duet Plate">Duet Plate</option>
                                                            </>
                                                        ) : (
                                                            <option value="Declined">Declined</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="form-group party-note-group">
                                        <label htmlFor="rsvp-party-message">Dietary Restrictions / Note (for party):</label>
                                        <textarea 
                                            id="rsvp-party-message" 
                                            rows="2"
                                            placeholder="Allergies, restrictions, or messages"
                                            value={rsvpMessage} 
                                            onChange={(e) => setRsvpMessage(e.target.value)}
                                            style={{ resize: "vertical" }}
                                        />
                                    </div>
                                </div>
                                
                                <div className="rsvp-modal-actions">
                                    <button type="button" className="rsvp-cancel-btn" onClick={() => setIsRsvpModalOpen(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="rsvp-submit-btn">
                                        Submit RSVP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isWelcomeModalOpen && welcomeGuestName && (
                <div className="rsvp-modal-overlay">
                    <div className="rsvp-modal-card welcome-modal-card">
                        <button 
                            className="rsvp-modal-close-btn" 
                            onClick={() => setIsWelcomeModalOpen(false)}
                            aria-label="Close welcome message"
                        >
                            &times;
                        </button>
                        <div className="welcome-modal-content">
                            <img src={PINK_FLOWER} alt="flower" className="welcome-flower" />
                            <h3>Welcome, {welcomeGuestName}!</h3>
                            <p className="welcome-text-msg">
                                We are so honored and excited to share our special day with you.
                            </p>
                            <p className="welcome-text-sub">
                                Please explore our wedding details below, and RSVP online when you are ready!
                            </p>
                            <button 
                                className="welcome-close-btn" 
                                onClick={() => setIsWelcomeModalOpen(false)}
                            >
                                Enter Site
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invisible iframe to handle background Google Forms posting */}
            <iframe 
                name="hidden_iframe" 
                id="hidden_iframe" 
                style={{ display: "none" }} 
                title="hidden_submit"
            />
        </div>
    )
}

export default Home;