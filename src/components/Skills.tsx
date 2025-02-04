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
            className="group relative w-fit h-fit rounded-2xl p-4 flex gap-3 items-center bg-gray-900/50 border border-gray-700 backdrop-blur-lg shadow-lg  hover:border-gray-500 hover:scale-[1.02] transition-all duration-300 ease-in-out"
        >
            {/* Tech Image */}
            <Image
                src={`/techimgs/${name}.${type}`}
                alt={name}
                width={48}
                height={48}
                className="w-14 h-14 object-cover group-hover:rotate-[5deg] transition-all duration-300 ease-in-out overflow-visible"
            />

            {/* Text Content */}
            <div className="flex flex-col">
                <div className='text-lg font-semibold text-white max-h-[1.8rem] select-none overflow-y-hidden relative group'>
                    <h1 className='whitespace-nowrap min-h-[1.8rem] transition-all duration-300 transform group-hover:-translate-y-[1.8rem]'>
                        {name}
                    </h1>
                    <h1 className='whitespace-nowrap min-h-[1.8rem] transition-all duration-300 transform group-hover:-translate-y-[1.8rem]'>
                        {name}
                    </h1>
                </div>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="flex flex-col gap-14 h-auto min-h-screen sm:gap-20 lg:gap-28">
            <StylishHeading source="skills" />

            <div
                id="cards"
                className="flex justify-center flex-wrap gap-6 px-6 max-w-[80rem] mx-auto"
            >
                {cards.map((card, index) => (
                    <Card key={index} name={card.name} type={card.type} description={card.description} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
