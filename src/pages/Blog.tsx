import { LuArrowRight } from "react-icons/lu";

export const Blog = () => {
  const blogs = [
    {
      key: 1,
      tag: "TypeScript",
      title: "Building Scalable Web Applications with TypeScript",
      description:
        "Learn best practices for building large-scale web applications using TypeScript and Next.js.",
      readTime: "8 min read",
      date: "Dec 15, 2024",
    },
    {
      key: 2,
      tag: "React",
      title: "React Performance Optimization Techniques",
      description:
        "Discover practical techniques to optimize your React applications for better performance.",
      readTime: "6 min read",
      date: "Dec 10, 2024",
    },
    {
      key: 3,
      tag: "Database",
      title: "Database Design Patterns with Prisma",
      description:
        "Explore advanced database design patterns and how to implement them with Prisma ORM.",
      readTime: "10 min read",
      date: "Dec 5, 2024",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="bg-background">
        <div className="pt-32 pb-20 px-6 mx-auto max-w-6xl">
          <div className="flex flex-col mb-12 gap-4">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              Blog
            </p>
            <p className="text-6xl font-extrabold">Lastest Articles</p>
            <p className="text-gray-500 text-lg font-medium">
              Thoughts on web development, TypeScript, React, and building
              scalable applications.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {blogs.map((item) => (
              <div
                key={item.key}
                className="relative group flex flex-col gap-6 p-8 rounded-xl border border-gray-300 bg-background-card hover:cursor-pointer hover:border-primary hover:bg-background-card/50 transition-all"
              >
                <div className="flex justify-between">
                  <p className="text-[#1957d3] bg-[#d1ddf6] text-xs font-medium px-2 py-1 rounded-full">
                    {item.tag}
                  </p>
                  <p className="text-xs text-gray-500">{item.readTime}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-base text-gray-500">{item.description}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <button className="flex w-fit items-center gap-2 text-primary group-hover:translate-x-2 transition-transform font-bold rounded-xl">
                    View Projects <LuArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
