import logo1 from "../assests/logos/TimeLineLogo/Logo1.svg"
import logo2 from "../assests/logos/TimeLineLogo/Logo2.svg"
import logo3 from "../assests/logos/TimeLineLogo/Logo3.svg"
import logo4 from "../assests/logos/TimeLineLogo/Logo4.svg"

export const codeSectionData = [
    {
        layout: "true",
        headingValue1: "Unlock your",
        headingValue2: "with our online courses",
        highlightValue: "coding potential",
        paraValue: "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you",
        buttonValue1: "Try it Yourself",
        buttonValue2: "Learn More",
        codeValue: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <title>This is myPage</title>
            </head>
            <body>
            <h1><a href="/">Header</a></h1>
            <nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>
            </body>`,
        codeClr: "text-yellow-25"

    },

    {
        layout: "false",
        headingValue1: "Start",
        headingValue2: "",
        highlightValue: "coding in seconds",
        paraValue: "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson",
        buttonValue1: "Continue Lesson",
        buttonValue2: "Learn More",
        codeValue:
            `import React from "react";
            import CTAButton from "./Button";
            import TypeAnimation from "react-type";
            import { FaArrowRight } from "react-icons/fa";\n
            const Home = () => {
                return (
                    <div>Home</div>
                )
            }
            export default Home;`,
        codeClr: "text-white"
    },
]

export const timelimePartData = [
    {
        imgSource: logo1,
        heading: "Leadership",
        para: "Fully committed to the success company"
    },

    {
        imgSource: logo2,
        heading: "Responsibility",
        para: "Students will always be our top priority"
    },

    {
        imgSource: logo3,
        heading: "Flexibility",
        para: "The ability to switch is an important skills"
    },

    {
        imgSource: logo4,
        heading: "Solve the problem",
        para: "Code your way to a solution"
    },
]