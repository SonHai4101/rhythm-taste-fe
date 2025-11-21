import { LuArrowRight } from "react-icons/lu";

export const Project = () => {
  const projects = [
    {
      key: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with real-time inventory management and Stripe integration.",
      tech: [
        "React",
        "TypeScript",
        "Node.js",
        "Prisma",
        "PostgresSQL",
        "Stripe",
      ],
      year: "2025",
    },
    {
      key: 2,
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates and team features.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      year: "2024",
    },
    {
      key: 3,
      title: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with data visualization and custom reports.",
      tech: ["React", "TypeScript", "Chart.js", "Node.js"],
      year: "2023",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="bg-background">
        <div className="pt-32 pb-20 px-6 mx-auto max-w-6xl">
          <div className="flex flex-col mb-12 gap-4">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              Portfolio
            </p>
            <p className="text-6xl font-extrabold">All Projects</p>
            <p className="text-gray-500 text-lg font-medium max-w-2xl">
              A collection of projects I've built showcasing my expertise in web
              development, design, and problem-solving.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {projects.map((item) => (
              <div
                key={item.key}
                className="relative group flex flex-col gap-6 p-8 rounded-xl border border-gray-300 bg-background-card hover:cursor-pointer hover:border-primary hover:bg-background-card/50 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-base text-gray-500">{item.description}</p>
                </div>
                <div className="flex gap-3">
                  {item.tech.map((i) => (
                    <p className="text-[#1957d3] bg-[#d1ddf6] text-xs font-medium px-2 py-1 rounded-full">
                      {i}
                    </p>
                  ))}
                </div>
                <button className="flex w-fit items-center gap-2 text-primary group-hover:translate-x-2 transition-transform font-bold rounded-xl">
                  View Projects <LuArrowRight className="size-5" />
                </button>
                <div className="absolute top-8 right-8">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
