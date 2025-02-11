import Image from "next/image";
import StylishHeading from "./StylishHeading";

const cards = [
    { name: "React", type: "webp", description: "JavaScript library." },
    { name: "Next.js", description: "React framework." },
    { name: "Spring", description: "Java framework." },
    { name: "Tailwind CSS", description: "CSS framework." },
    { name: "GSAP", type: "png", description: "JavaScript Animation library." },
    { name: "MongoDB", description: "NoSQL database." },
    { name: "Three.js", type: "webp", description: "3D graphics library." },
    { name: "Git", description: "Version control." },
    { name: "Java", description: "Programming language." },
];

const Card = ({ name, type, description }: { name: string; type?: string; description: string }) => {
    if (!type) type = "svg";

    return (
        <div
            id="card"
            className="group relative w-fit rounded-lg sm:rounded-2xl p-3 md:p-4 
                     flex gap-2 sm:gap-3 items-center bg-gray-900/50 border border-gray-700 
                     backdrop-blur-lg shadow-lg hover:border-gray-500 
                     hover:scale-[1.02] transition-all duration-300 ease-in-out flex-grow ss:flex-none"
        >
            <Image
                src={`/techimgs/${name}.${type}`}
                alt={name}
                width={40}
                height={40}
                className="object-cover w-9 aspect-square md:w-12 lg:w-15 group-hover:rotate-[5deg] transition-all duration-300 ease-in-out"
            />

            {/* Text Content */}
            <div className="flex flex-col min-w-0">
                <div className="text-base sm:text-lg font-semibold text-white max-h-[1.8rem] 
                              select-none overflow-y-hidden relative group">
                    <h1 className="whitespace-nowrap min-h-[1.8rem] transition-all duration-300 
                                 transform group-hover:-translate-y-[1.8rem] truncate">
                        {name}
                    </h1>
                    <h1 className="whitespace-nowrap min-h-[1.8rem] transition-all duration-300 
                                 transform group-hover:-translate-y-[1.8rem] truncate">
                        {name}
                    </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 truncate">{description}</p>
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="flex flex-col gap-14 h-auto sm:gap-20 lg:gap-28 w-full">
            <StylishHeading source="skills" />

            <div
                id="cards"
                className="flex justify-center flex-wrap gap-4 md:gap-6 px-6 max-w-[80rem] mx-auto"
            >
                {cards.map((card, index) => (
                    <Card key={index} name={card.name} type={card.type} description={card.description} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
