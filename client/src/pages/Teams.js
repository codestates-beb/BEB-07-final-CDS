//image
import duhun from '../assets/img/teamProfile/Duhun.jpg';
import dongheon from '../assets/img/teamProfile/Dongheon.png';
import yunsu from '../assets/img/teamProfile/Yunsu.jpeg';
import jeseok from '../assets/img/teamProfile/Jeseok.jpeg';
import MainLogo from '../assets/img/CDS_Symbol_bright_removebg.png';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

// css
import '../assets/css/teams.css';

function Teams() {
  return (
    <>
      <div className="text-4xl font-bold mt-[6rem] mb-[2rem] text-center text-primaryColor">
        Our Teams
      </div>
      <div className="text-2xl font-semibold text-center">
        " Great vision without great people is irrelevant "
      </div>
      <img
        src={MainLogo}
        alt="MainLogo"
        className="w-[6rem] h-[6rem] my-[3rem] mx-auto"
      ></img>
      <div className="text-xs font-semibold text-center text-grayForText">
        <p>We started the Crypto Default Swap project in 2023 </p>
        <p>
          with the idea that financial services should be provided fairly and
          transparently to anyone anywhere.
        </p>
        <p>
          Our team values the value of collaboration and pursues high
          performance.
        </p>
        <p>The team members want to be the best in their respective fields. </p>
        <p>
          We know what our strengths are and constantly strive to solve
          difficult problems.
        </p>
      </div>
      {/* top cards */}
      <div className="flex justify-center mt-[8rem]">
        <div className="teamCard w-[30%] bg-moreDarkGrayColor rounded-2xl p-[2rem] mr-[1rem]">
          <img
            alt="duhun"
            src={duhun}
            className="teamImg rounded-full w-[6rem] h-[6rem] mx-auto"
          ></img>
          <div className="text-center text-lg font-extrabold my-[1rem]">
            Duhun Kang
          </div>
          <div className="text-center text-[12px] font-semibold mb-[3rem] text-grayForText">
            <p>FrontEnd</p>
            <p>Team Leader</p>
          </div>
          <div className="text-center text-sm">
            It’s been almost 5 years Actually, I’ve been interested in Dev. But
            Just now, I decide to get a job related in Dev so that I got a new
            temporary residence in near Seoul. Because Seoul has many job for
            Dev like Silicon Valley. I totally fall in love with Blockchain.
            There are many interesting ideas and chances to get much money. More
            than that, It’s more interesting that there is no correct answer
            about any business in this ecosystem, so that I can try everything
            here. I predict this ecosystem will be a giant in IT Market. So, I
            want to work for Blockchain Core & Contract Develope. And now, I can
            participate in any project with Web3 by Front-End Developer. I have
            studied very hard about Blockchain, so It could be not long period
            for me to get a ability to work for Core & Contract. Thanks a lot! I
            hope I work with you.
          </div>
          <div className="flex justify-center mt-[3rem]">
            <div className="bg-grayForText text-black text-center text-[10px] font-bold w-[13rem] rounded-2xl">
              eclip6@naver.com
            </div>
          </div>
        </div>

        <div className="teamCard w-[30%] bg-moreDarkGrayColor rounded-2xl p-[2rem] ml-[1rem]">
          <img
            alt="dongheon"
            src={dongheon}
            className="teamImg rounded-full w-[6rem] h-[6rem] mx-auto"
          ></img>
          <div className="text-center text-lg font-extrabold my-[1rem]">
            Dongheon Seol
          </div>
          <div className="text-center text-[12px] font-semibold mb-[3rem] text-grayForText">
            <p>Backend</p>
            <p>Devops Engineer</p>
          </div>
          <div className="text-center text-sm">
            That motivated Backend-Bro I was born and raise in busan. I’ve been
            always intereted in influencing outside world with power of my mind.
            But as I grew up, like many others, I had to reconcile with reality.
            I put off my dream deep inside of my subconscious, took plain office
            job at public sector. Spending couple of boring years as normal
            salaray man, my inner fire led me to the world of programming. Since
            then I totally fell in love with programming. With a passion for
            programming, I graduated from Korea National Online University
            Computer Science Department with honors graduation. Upon completing
            codestates bootcamp I’ll start my new career as software engineer.
            As a motivated software engineer I want to spread good influence
            around the universe through my products.
          </div>
          <div className="flex justify-center mt-[3rem]">
            <div className="bg-grayForText text-black text-center text-[10px] font-bold w-[13rem] rounded-2xl">
              ssalssi1@gmail.com
            </div>
          </div>
        </div>
      </div>

      {/* bottom cards */}
      <div className="flex justify-center mt-[8rem]">
        <div className="teamCard w-[30%] bg-moreDarkGrayColor rounded-2xl p-[2rem] mr-[1rem]">
          <img
            alt="Yunsu"
            src={yunsu}
            className="teamImg rounded-full w-[6rem] h-[6rem] mx-auto"
          ></img>
          <div className="text-center text-lg font-extrabold my-[1rem]">
            Yunsu Kim
          </div>
          <div className="text-center text-[12px] font-semibold mb-[3rem] text-grayForText">
            <p>Smart Contract Engineer</p>
          </div>
          <div className="text-center text-sm">
            I was born and raised in Seoul most of the time except for a short
            time. When I was young, I liked almost all activities such as books,
            movies, puzzles, sports, and games except for studying. I graduated
            from Korea University in Seoul. My major was material engineering.
            After graduation, I encountered programming and felt a great
            attraction. Because it felt more like a puzzle or an assembly kit
            than studying. Since then, I have learned about the ai algorithm and
            blockchain at the recommendation of a friend who runs a development
            startup and participated in a simple project. Thanks to this, I have
            learned and applied various computer languages such as Python,
            Golang, and Solidity. While studying blockchain, I was very
            interested in the technological ideology, values, and vision behind
            it. I am eager to participate in various projects related to the
            blockchain industry and contribute greatly to this field.
          </div>
          <div className="flex justify-center mt-[3rem]">
            <div className="bg-grayForText text-black text-center text-[10px] font-bold w-[13rem] rounded-2xl">
              bbabi0901@gmail.com
            </div>
          </div>
        </div>

        <div className="teamCard w-[30%] bg-moreDarkGrayColor rounded-2xl p-[2rem] ml-[1rem]">
          <img
            alt="jeseok"
            src={jeseok}
            className="teamImg rounded-full w-[6rem] h-[6rem] mx-auto"
          ></img>
          <div className="text-center text-lg font-extrabold my-[1rem]">
            Jeseok Hong
          </div>
          <div className="text-center text-[12px] font-semibold mb-[3rem] text-grayForText">
            <p>Frontend</p>
            <p>Financial Advisor</p>
          </div>
          <div className="text-center text-sm">
            I was born and grew up in Busan and was an athlete when I was a
            teenager. So I wasn't interested in exploring and learning
            something, but my strong desire to live a better life made me a
            grinder. I graduated from a university in Seoul. I majored in
            economics there and am interested in macro investment strategies and
            financial engineering. I have experience in a credit finance company
            in Seoul, Korea, and a financial company in LA, California, USA. I
            have no qualms about adapting to a new environment and learning new
            knowledge. I began to be interested in the Web3 ecosystem and
            philosophy created by blockchain and cryptocurrency in 2017. Over
            the past few years, I've been thinking about how an innovative
            blockchain industry can change people's lives. After much
            consideration, I concluded that there would be a huge opportunity in
            the field of digital sovereignty and financial sovereignty and
            jumped into this industry.
          </div>
          <div className="flex justify-center mt-[3rem]">
            <div className="bg-grayForText text-black text-center text-[10px] font-bold w-[13rem] rounded-2xl">
              hjs97040@gmail.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teams;
