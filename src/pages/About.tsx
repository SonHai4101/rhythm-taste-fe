import { GoDotFill } from "react-icons/go";

export const About = () => {
  const skills = [
    {
      key: 1,
      title: "Frontend",
      sub: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },
    {
      key: 2,
      title: "Backend",
      sub: ["Node.js", "Express", "Prisma", "PostgreSQL", "GraphQL"],
    },
    {
      key: 3,
      title: "Tools",
      sub: ["Git", "Docker", "AWS", "Vercel", "Github Actions"],
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="bg-background">
        <div className="pt-32 pb-20 px-6 mx-auto max-w-6xl">
          <div className="flex flex-col mb-12 gap-4">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              About me
            </p>
            <p className="text-6xl font-extrabold">Who I Am</p>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-2 flex flex-col gap-6">
              <p className="text-gray-500 text-lg font-medium max-w-2xl">
                I'm a full-stack developer with a passion for building fast,
                modern web applications. With over 8 years of experience in web
                development, I've worked with startups and enterprises to
                deliver high-quality digital products.
              </p>
              <p className="text-gray-500 text-lg font-medium max-w-2xl">
                My journey started with a curiosity about how things work on the
                web. Since then, I've developed a deep understanding of both
                frontend and backend technologies, allowing me to build complete
                solutions from scratch.
              </p>
              <p className="text-gray-500 text-lg font-medium max-w-2xl">
                I specialize in React and TypeScript for building dynamic user
                interfaces, and Node.js with Prisma for robust backend systems.
                I'm committed to writing clean, maintainable code and delivering
                exceptional user experiences.
              </p>
              <p className="text-gray-500 text-lg font-medium max-w-2xl">
                When I'm not coding, I enjoy writing technical blogs,
                contributing to open-source projects, and exploring new
                technologies. I'm always eager to learn and stay updated with
                the latest industry trends.
              </p>
            </div>
            <div className="h-fit flex flex-col gap-6 p-8 border border-gray-300 rounded-xl bg-background-card">
              <p className="text-xl font-bold">Quick Facts</p>
              <div>
                <p className="uppercase text-sm text-[#0096a5] font-bold">
                  Experience
                </p>
                <p className="uppercase text-2xl font-bold">8+ Years</p>
              </div>
              <div>
                <p className="uppercase text-sm text-[#0096a5] font-bold">
                  Projects
                </p>
                <p className="uppercase text-2xl font-bold">50+</p>
              </div>{" "}
              <div>
                <p className="uppercase text-sm text-[#0096a5] font-bold">
                  Clients
                </p>
                <p className="uppercase text-2xl font-bold">30+</p>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <p className="text-4xl font-bold mb-12">Skills & Expertise</p>
            <div className="flex justify-between gap-8">
              {skills.map((item) => (
                <div
                  key={item.key}
                  className="p-8 flex-1 bg-background-card border border-gray-300 rounded-xl flex flex-col gap-6"
                >
                  <p className="text-xl font-bold">{item.title}</p>
                  <div className="flex flex-col gap-3">
                    {item.sub.map((i) => (
                      <p className="flex items-center gap-2 text-gray-500">
                        <span className="text-primary">
                          <GoDotFill />
                        </span>{" "}
                        {i}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
