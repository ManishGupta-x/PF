import Image from 'next/image';
export const workData = {

    header: {
        title: "Work Experience",
        subtitle: "Showcasing few of my big projects and roles in software development."
    },


    projects: [
        {
            id: "jarvis",
            title: "Jarvis-A Music Streaming Service Application",
            techStack: "Discord.js, MongoDB, Node.js",
            images: [
                {
                    src: "https://raw.githubusercontent.com/ManishGupta-x/Jarvis/master/Images/image5.png",
                    alt: "Jarvis-A Music Streaming Service Application",
                    width: 460,
                    height: 300,
                    key: "jarvis1"
                },
                {
                    src: "https://raw.githubusercontent.com/ManishGupta-x/Jarvis/master/Images/image7.png",
                    alt: "Jarvis-A Music Streaming Service Application",
                    width: 500,
                    height: 300,
                    key: "jarvis2"
                },
                {
                    src: "https://raw.githubusercontent.com/ManishGupta-x/Jarvis/refs/heads/master/Images/image3.png",
                    alt: "Jarvis-A Music Streaming Service Application",
                    width: 300,
                    height: 200,
                    key: "jarvis3"
                },
                {
                    src: "https://raw.githubusercontent.com/ManishGupta-x/Jarvis/master/Images/image4.png",
                    alt: "Jarvis-A Music Streaming Service Application",
                    width: 290,
                    height: 200,
                    key: "jarvis4"
                }
            ],
            content: [
                {
                    type: "paragraph",
                    text: "In this Programming world this was my first invention i made out of javascript in 2019 after working on it for around a year to make it stable. I got tempted by seeing the craze of music applications on discord and being a melophile i wanted to make for myself and my \"someone\" at that point of my life hahaha. As soon as i made it live for the world i got great attractions because i was providing features like filters, playlists etc for free spending my own money on to it. Soon i got out of money and started using some free services like heroku with fake accounts and temp mails but they caught me and improved their security xD... because i was burning there dynos like anything at that point, like just exploiting there bugs lmao."
                },
                {
                    type: "paragraph",
                    text: "Soon Google just striked all the music applications running on discord because of some legal issues the one i got to know was that we are streaming audio without video and that came out againt the policies of youtube, growing Jarvis more was not possible so i just used it to listen to music with my friends and some close ones."
                },
                {
                    type: "images",
                    imageKeys: ["jarvis1", "jarvis2"]
                },
                {
                    type: "paragraph",
                    text: "Moving on to the technical part of it, i used discord.js v12 and v13 and used distube ",
                    links: [
                        {
                            text: "documentation",
                            url: "https://distube.js.org/",
                            position: "after" // indicates this link comes after the text
                        }
                    ],
                    continuation: " for implementing the music features. Utilized MongoDB's free clusters to efficiently store and manage user data and their playlists. Developed and integrated numerous features into the application leveraging this database infrastructure. A visual overview of these features is provided below."
                },
                {
                    type: "images",
                    imageKeys: ["jarvis3", "jarvis4"]
                }
            ]
        },
        {
            id: "dropmyorder",
            title: "dropmyorder.com - Online Food Ordering and Delivery Platform",
            titleLink: "https://dropmyorder.com",
            techStack: "Next.js(React + next-pwa), Tailwind CSS, Django, Python, SQL",
            images: [
                {
                    src: "https://cdn.discordapp.com/attachments/730714810614022228/1392492843607658637/image.png?ex=686fbb85&is=686e6a05&hm=1104221441b58974bc234f4fae6b993877e6ea9fbc2796b2d580f10b7e0caf38&",
                    alt: "Dropmyorder1",
                    width: 500,
                    height: 200,
                    key: "dmo1"
                },
                {
                    src: "https://cdn.discordapp.com/attachments/730714810614022228/1392492965485609083/image.png?ex=686fbba2&is=686e6a22&hm=8af0b82eca2e9357ee8de78e0e8ebdb6945ffcb55fe944fe3c409d86e7dae426&",
                    alt: "Dropmyorder2",
                    width: 500,
                    height: 200,
                    key: "dmo2"
                }
            ],
            content: [
                {
                    type: "paragraph",
                    text: "It was when I got my first client, who believed in me and gave me work to build their website. They were running a restaurant chain in Shimla, Himachal Pradesh. Their CTO Mr. Vanesh Trikha constantly believed in me and guided me to build the front end of the website. As a freshman, I was not aware of the complexities of building a production-level website, but I learned with time how to make it secure, scalable, and responsive."
                },
                {
                    type: "paragraph",
                    text: "I used React to build the frontend of the website and learned the dynamics of a React project structure and how to make components reusable and provide a readable file structure to anyone who would come to maintain it in the future. I came across a lot of challenges, like loading the data as fast as possible on the landing page and giving users a seamless experience. As it was important for people living in Shimla without high-speed internet, loading the website fast was a challenge."
                },
                {
                    type: "images",
                    imageKeys: ["dmo1", "dmo2"]
                },
                {
                    type: "paragraph",
                    text: "If you ever get a chance to visit Shimla and want to order food online feel free to visit ",
                    links: [
                        {
                            text: "dropmyorder.com",
                            url: "https://dropmyorder.com"
                        }
                    ],
                    continuation: " and order food from the restaurant of your choice. And if you tell me you ordered from the website being in shimla because u saw it here 😂 i can provide u discounts fr lmao."
                }
            ]
        },
        {
            id: "backoffice",
            title: "BackOffice and Advanced POS System",
            techStack: "Next.js(React + next-pwa), Tailwind CSS, Django, Python, SQL",
            images: [
                {
                    src: "https://cdn.discordapp.com/attachments/730714810614022228/1392502149790830765/image.png?ex=686fc42f&is=686e72af&hm=c108fe63083c97535acc715eaa53aba6b19cee0444edc52a9875378e208bcf09&",
                    alt: "BackOffice1",
                    width: 500,
                    height: 200,
                    key: "backoffice1",
                    hasBorder: true
                },
                {
                    src: "https://cdn.discordapp.com/attachments/730714810614022228/1392502076852011068/image.png?ex=686fc41e&is=686e729e&hm=13bb0c117107bfa74704a3deea29ce0d6c1a2aa16e5bff39cc2bd2bebb968a12&",
                    alt: "BackOffice2",
                    width: 575,
                    height: 200,
                    key: "backoffice2",
                    hasBorder: true
                }
            ],
            content: [
                {
                    type: "paragraph",
                    text: "For the same client, I was given the task to build a back office and an advanced POS system that would manage the whole restaurant chain and their deliveries. In the Project we had to manage the orders from online, dine-ins, and takeaways. We built a comprehensive POS competitive to Big Companies like PetPooja in India who is serving POS in india for a long time now."
                },
                {
                    type: "paragraph",
                    text: "The product is a combination of several integrated software systems that work together in a pipeline to efficiently manage a restaurant chain. It forms a complete ecosystem — starting from the addition of inventory, managing it through racks, packages, and other logistics, to the transportation of packages from warehouses to restaurant outlets. The system ensures proper checks during transfer, updates the outlet's inventory, records consumption, and ultimately tracks sales."
                },
                {
                    type: "images",
                    imageKeys: ["backoffice1", "backoffice2"]
                },
                {
                    type: "paragraph",
                    text: "This is a brief overview of the project and the technologies powering it. The system is currently approaching the MVP (Minimum Viable Product) stage, after which I plan to publish detailed documentation covering its architecture and functionality."
                }
            ]
        },
        {
            id: "omegaworld",
            title: "OmegaWorld - CSGO Matchmaking Platform",
            titleLink: "https://play.omegaindiaworld.win",
            techStack: "Next.js(React + next-pwa), Tailwind CSS, Django, Python, SQL",
            video: {
                src: "https://www.youtube.com/embed/F5Un28sxQXY",
                title: "YouTube video player"
            },
            content: [
                {
                    type: "paragraph",
                    text: "A good friend of mine approached me to bring back CSGO to life again after Valve ( the developer of CSGO) stopped the official servers and supporting the game. He contacted me to build his frontend for the website and i was like why not, ofcourse we all loved to play that game once and considering the current upgraded version of the game CS2 is full of hackers and people are eager to find a non-toxic place to play the game again."
                },
                {
                    type: "paragraph",
                    text: "With the aid of Discord and Steam, we have developed an entire ecosystem that allows players to download and utilize CSGO on our servers. Below is a comprehensive video made by us that explains how to install CSGO and make real money from it."
                },
                {
                    type: "video"
                },
                {
                    type: "paragraph",
                    text: "If you are a gamer and loved to play csgo at some point of your life, you should definitely check this out! Here is a ",
                    links: [
                        {
                            text: "Reddit Post",
                            url: "https://www.reddit.com/r/csgolegacy/comments/1lvep9v/csgo_india_why_am_i_rewarding_players_to_play_csgo/"
                        }
                    ],
                    continuation: " about us and our website",
                    additionalLinks: [
                        {
                            text: " play.omegaindiaworld.win",
                            url: "https://play.omegaindiaworld.win"
                        }
                    ],
                    finalText: " where you can download the game and play with your friends."
                }
            ]
        }
    ],


    footer: {
        text: "Apart from these Big Projects, you can checkout my other projects",
        link: {
            text: "Here.",
            url: "/SmallProjects"
        }
    }
};


export const getAllImageKeys = () => {
    const keys = [];
    workData.projects.forEach(project => {
        if (project.images) {
            project.images.forEach(image => {
                keys.push(image.key);
            });
        }
    });
    return keys;
};


export const createInitialImageState = () => {
    const keys = getAllImageKeys();
    const initialState = {};
    keys.forEach(key => {
        initialState[key] = false;
    });
    return initialState;
};


export const aboutData = {

    header: {
        title: "About Me"
    },


    content: {
        paragraphs: [
            {
                text: "Hey there 👋! I'm Manish Gupta — a passionate Software Engineer who's been coding since 2018. I've always been curious about solving problems through code, which might be making me a little lazier every day… but hey, if it works, why not!"
            },
            {
                text: "I consider myself an ambivert — someone who enjoys both deep solo focus and engaging with the right company ."
            },
            {
                text: "A melophile at heart, I absolutely love blending music with my coding sessions. My journey began with C++ and Competitive Programming, which I pursued seriously for over two years. Eventually, I shifted gears to Web Development, diving deep into the MERN stack."
            },
            {
                text: "One of the most exciting phases of my journey has been working with",
                link: {
                    text: "DropMyOrder",
                    url: "https://dropmyorder.com/",
                    className: "text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200"
                },
                continuation: ", where I built their website, back-office dashboard, and a complete POS system — powering restaurant chains and their delivery networks."
            }
        ]
    },


    image: {
        src: "/about.jpg",
        alt: "Manish Gupta - Software Engineer",
        width: 600,
        height: 600,
        className: "w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl shadow-portfolio-lg hover:shadow-portfolio-xl transition-all duration-300 hover:scale-105 border-4 border-border"
    },


    decorations: [
        {
            type: "circle",
            className: "absolute -top-8 -right-2 sm:-top-10 sm:-right-10 md:-top-12 md:-right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-2 border-medium-tan/50 rounded-full -z-10",
            description: "Circle Decoration - Top Right"
        },
        {
            type: "rhombus",
            className: "absolute -bottom-8 -left-8 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 -z-10",
            innerClassName: "w-full h-full border-2 border-medium-tan/50 transform rotate-45",
            description: "Rhombus Decoration - Bottom Left"
        }
    ],


    layout: {
        containerClasses: "max-w-7xl mx-auto",
        mainWrapperClasses: "flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24",
        textContainerClasses: "w-full lg:w-1/2 order-2 lg:order-1",
        imageContainerClasses: "w-full lg:w-1/2 order-1 lg:order-2 relative flex justify-center lg:justify-end",
        imageWrapperClasses: "relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
    },


    typography: {
        headerClasses: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-8 sm:mb-12 md:mb-16",
        paragraphClasses: "text-sm sm:text-base md:text-lg font-kanit text-portfolio-600 leading-relaxed sm:leading-loose text-justify"
    }
};


export const renderParagraphContent = (paragraph) => {
    if (paragraph.link) {
        return (
            <>
                {paragraph.text}{' '}
                <a
                    href={paragraph.link.url}
                    className={paragraph.link.className}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {paragraph.link.text}
                </a>
                {paragraph.continuation}
            </>
        );
    }
    return paragraph.text;
};




export const pcSpecs = [
    { component: 'CPU', spec: 'Ryzen 5 7600X 6-Core' },
    { component: 'GPU', spec: 'NVIDIA RTX 4060' },
    { component: 'RAM', spec: 'A-Data 16GB DDR5 5200MHz' },
    { component: 'Storage', spec: '1TB NVMe WD_BLACK SN770 SSD' },
    { component: 'Motherboard', spec: 'GigaByte B650M Gaming Wifi' },
    { component: 'PSU', spec: '750W MSI Bronze' },
    { component: 'Cooling', spec: 'DeepCool Mystique 240mm ARGB' },
    { component: 'Case', spec: 'Deepcool CH370 White' },
    { component: 'Monitor', spec: 'LG UltraGear 180Hz 24gs60f-B' },
    { component: 'Laptop', spec: 'HP Pavilion Ryzen 5 5600H' },
];

export const csgoClips = [
    { title: 'Dust 2 Crazy Scenes', videoId: 'RtyeFe6HYrA' },
    { title: 'Mirage No Scope Shot', videoId: 'qyIrDyOVt3A' },
    { title: 'Ancient last man alive clutch', videoId: '-5YEfQaLvoE' },
    { title: 'Mirage Clutch', videoId: 'w0pobV-zsks' },
    { title: 'Shot of Universe', videoId: 'XmnbqohcwiY' }
];

export const cs2Clips = [
    { title: 'Dust 2 One position Clutch', videoId: 'A5Ba0fhAKCE' },
    { title: 'D2 B Site Window No Scope', videoId: 'HC2Q1U771b4' },
    { title: 'D2 AK Clutch', videoId: '0K82wS4F3CI' },
    { title: 'D2 Awp Clutch', videoId: 'uJcXExmXOYo' },
    { title: 'No Reaction Time', videoId: 'NarHP7unzGU' },
    { title: 'Flying Awp Kill', videoId: 'FRKPkQsV898' },
    { title: 'Another Flying Awp Kill', videoId: 'c6lQplqfBnQ' },
    { title: 'Sad For The Bizon One', videoId: 'X6Co64K49wg' },
    { title: 'Failed Clutch', videoId: 'nvkBLpjYYIo' },
    { title: '4k Clutch D2', videoId: 'gYDlxyHmjAA' },
    { title: '3k Clutch D2', videoId: 'iBsMoVLplt0' },
];


export const tournamentClips = [
    {
        videoId: '_KNfUqAr8WI',
        title: 'Tournament Match Highlights'
    }
   
];
export const smallProjectsData = {

    header: {
        title: "Small Projects",
        subtitle: "Showcasing few of my small projects ."
    },


    projects: [
        {
            id: "lsb-steganography",
            title: "LSB - Image Stegnography Tool",
            titleLink: "https://github.com/ManishGupta-x/Image_steganography",
            description: "LSB is a steganography tool that I developed to demonstrate the concept of hiding information within images. The tool allows users to embed text messages into image files. It's way we can encrypt data into the image and decrypt it back without anyone noticing. The tool works by manipulating the least significant bits of the pixel values in an image, which are typically imperceptible to the human eye. This way, the hidden message can be extracted later without altering the appearance of the image. I made this product totally with scripts in linux command line.",
            image: {
                src: "https://cdn.discordapp.com/attachments/730714810614022228/1392889023218843730/hidden_data-01.png?ex=68712c7d&is=686fdafd&hm=7c81ae70b499f14a7a4a7e0ee16651d23d193808284c9a391627f2b0373decd6&",
                alt: "LSB Steganography Tool",
                width: 500,
                height: 300
            }
        },
        {
            "id": "timely-scheduler",
            "title": "Timely - A Auto Scheduler",
            "titleLink": "https://github.com/ManishGupta-x/Timely",
            "description": "Timely is an intelligent web application I developed during a hackathon with a close friend. We created a comprehensive task scheduling system that leverages Google's AI to automatically plan and organize tasks across weekdays and weekends, optimizing productivity through smart scheduling algorithms. The core algorithm implements a multi-layered approach: 1) Prioritization - sorting tasks by priority levels (high, medium, low) to ensure important tasks receive optimal scheduling, 2) Difficulty and Duration Analysis - evaluating tasks within each priority tier based on difficulty and estimated completion time, with high-priority complex tasks (4+ hours) scheduled first, followed by medium-priority tasks (2-3 hours), and low-priority shorter tasks (1 hour) last, 3) User Preference Integration - incorporating personalized settings like maximum sitting time limits (e.g., 2-hour sessions), preferred break intervals, and work-life balance considerations, automatically inserting breaks to prevent burnout, and 4) Even Distribution Logic - strategically distributing tasks across available days for balanced workload management, with shorter tasks on Day 1 for momentum, complex high-priority tasks on Day 2 during peak productivity, and breaks/lighter tasks on Day 3 for sustainability. I developed the frontend interface that seamlessly integrates with the AI-powered scheduling engine, providing users with an intuitive experience for task input, schedule visualization, and real-time adjustments. This project earned us a consolation prize in the hackathon, demonstrating the practical value of combining AI capabilities with thoughtful user experience design.",
            "image": {
                "src": "https://cdn.discordapp.com/attachments/730714810614022228/1392888880130298067/image.png?ex=68712c5b&is=686fdadb&hm=02f643deef691049977703f4089349c5f37d477438011ac9ced23f0eacc29c27&",
                "alt": "Timely - A Auto Scheduler",
                "width": 500,
                "height": 300
            }
        },
        {
            id: "smart-traffic-management",
            title: "Smart Traffic Management System",
            titleLink: "https://github.com/ManishGupta-x/Smart-Traffic-Management-System",
            description: "This Smart Traffic Management System represents an innovative approach to urban traffic challenges through the integration of cutting-edge technologies including artificial intelligence, machine learning, and IoT sensors. The system comprises three critical components: real-time accident detection using computer vision and CNN algorithms achieving over 90% accuracy, drowsiness monitoring through biometric sensors and facial recognition technology to prevent fatigue-related incidents, and intelligent traffic simulation for predictive traffic flow optimization. Developed as a Bachelor's project at Maharaja Agrasen Institute of Technology, this comprehensive solution addresses the growing concerns of traffic congestion, road safety, and emergency response times in metropolitan areas. The accident detection module leverages LIDAR sensors and surveillance cameras to instantly identify incidents and notify emergency services, while the drowsiness monitoring system uses eye-tracking and facial expression analysis to alert drivers before dangerous situations occur. The traffic simulation component employs advanced modeling techniques using MATLAB and Python to predict congestion patterns and provide actionable insights for city planners and traffic authorities. This integrated system not only enhances immediate safety through proactive monitoring but also contributes to long-term urban planning by enabling data-driven decisions for traffic infrastructure optimization, ultimately creating safer and more efficient roadways for urban environments.",
            image: {
                src: "https://cdn.discordapp.com/attachments/730714810614022228/1392889423682736261/image.png?ex=68712cdd&is=686fdb5d&hm=728ac0b644f53124c84aec38948ddc93aeffa2a241544d3624c039b78f386248&",
                alt: "Smart Traffic Management System",
                width: 500,
                height: 300
            }
        },
        {
            id: "telephone-diary",
            title: "Telephone Diary in Turbo C++",
            titleLink: "https://github.com/ManishGupta-x/telephoneDiary",
            description: "This is a simple telephone diary application developed in Turbo C++. It allows users to store and manage contact information, including names, phone numbers, and addresses. The application provides a user-friendly interface for adding, deleting, and searching for contacts. It serves as a basic example of how to handle data structures and file operations in C++. This was one of my first projects in C++ while learning all the Oops Concepts.",
            hasImage: false // This project doesn't have an image
        }
    ],


    footer: {
        hasBorder: true,
        hasStars: true,
        starsCount: 5
    },


    layout: {
        headerContainerClasses: "text-center my-12 sm:my-16 md:my-20",
        projectContainerClasses: "max-w-[90%] mx-auto flex flex-col mt-16",
        imageContainerClasses: "flex justify-center mt-8",
        borderClasses: "border-dark-brown/50 border-b-2 mt-12 max-w-[95%] sm:max-w-[90%] mx-auto",
        starsContainerClasses: "flex justify-center items-center space-x-2 text-portfolio-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-signika mt-4"
    },


    typography: {
        headerTitleClasses: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6",
        headerSubtitleClasses: "text-base sm:text-lg md:text-xl text-portfolio-600 max-w-3xl mx-auto font-signika px-4",
        projectTitleClasses: "text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline",
        projectDescriptionClasses: "text-sm sm:text-base md:text-lg text-justify"
    }
};


export const renderProjectTitle = (project, titleClasses) => {
    if (project.titleLink) {
        return (
            <a
                href={project.titleLink}
                target='_blank'
                rel='noopener noreferrer'
                className={titleClasses}
            >
                {project.title}
            </a>
        );
    }
    return (
        <h2 className={titleClasses}>
            {project.title}
        </h2>
    );
};


export const renderProjectImage = (project, containerClasses) => {
    if (!project.hasImage && !project.image) return null;

    if (project.image) {
        return (
            <div className={containerClasses}>
                <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                />
            </div>
        );
    }
    return null;
};


export const renderFooterStars = (count, containerClasses) => {
    return (
        <div className={containerClasses}>
            {[...Array(count)].map((_, index) => (
                <span key={index}>**</span>
            ))}
        </div>
    );
};

export const skillCategories = [
    {
        title: "Programming Languages",
        description: "C/C++ (Advanced), JavaScript/TypeScript (Expert), Java, Python, HTML/CSS, SQL",
        skills: [
            { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
        ]
    },
    {
        title: "Full-Stack Development",
        description: "React.js, Next.js, Node.js, Express.js, MongoDB, MySQL, REST APIs, WebSockets, Tailwind CSS",
        skills: [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },


        ]
    },
    {
        title: "Cross-Domain Expertise",
        description: "Data Structures & Algorithms, System Design, Database Architecture, Network Programming, Security Fundamentals",
        skills: [
            { name: "Algorithms", icon: "🧮" },
            { name: "System Design", icon: "🏗️" },
            { name: "Database", icon: "🗄️" },
            { name: "Network", icon: "🌐" },
            { name: "Security", icon: "🔒" }
        ]
    },
    {
        title: "Tools & Practices",
        description: "Git/GitHub, Postman, Chrome DevTools, CI/CD, Agile Development, Test-Driven Development",
        skills: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
            { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },

            { name: "Chrome DevTools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
            { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" }
        ]
    }
]

export const achievements = [
    { number: "500+", label: "Coding Challenges Solved", platform: "LeetCode/CodeChef" },
    { number: "5+", label: "Years of Experience", platform: "Programming" },
    { number: "10+", label: "Technologies Mastered", platform: "Full-Stack" }
]
