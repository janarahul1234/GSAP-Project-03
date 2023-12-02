gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main-wrapper"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main-wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main-wrapper", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main-wrapper").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const cursor = document.querySelector(".cursor");
const mainWrapper = document.querySelector(".main-wrapper");

mainWrapper.addEventListener("mousemove", function(e){
    cursor.style.left = e.x + "px";
    cursor.style.top = e.y + "px";
});

const timeLine1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero__title",
        scroller: ".main-wrapper",
        start: "top 34%",
        end: "top -10%",
        scrub: 2
    }
});

gsap.from(".hero__title:first-child", {
    duration: 1,
    delay: 0.3,
    x: 80,
    opacity: 0
});

gsap.from(".hero__title:last-child", {
    duration: 1,
    delay: 0.3,
    x: -80,
    opacity: 0
});

timeLine1.to(".hero__title:first-child", {
    x: -80,
}, "hero");

timeLine1.to(".hero__title:last-child", {
    x: 80,
}, "hero");

gsap.from(".hero__video", {
    duration: 1,
    delay: 0.3,
    y: 30,
    opacity: 0
});

timeLine1.to(".hero__video", {
    width: "95%"
}, "hero");

const timeLine2 = gsap.timeline({
    scrollTrigger: {
        // markers: true,
        trigger: ".section-2",
        scroller: ".main-wrapper",
        start: "top -5%",
        end: "top -45%",
        scrub: 2
    }
});

timeLine2.to(".main-wrapper", {
    background: "white",
});