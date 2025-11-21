import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";

export const Hero = () => {
  return (
    <div className="bg-background">
      <div className="pt-32 pb-20 px-6 mx-auto max-w-6xl">
        <div className="flex justify-between gap-12">
          <div className="flex-1">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              Welcome to my portfolio
            </p>
            <p className="text-6xl font-extrabold mt-4 mb-6">Hi, I'm Hai Son</p>
            <p className="text-primary text-2xl font-bold mb-8">
              Full-Stack Developer
            </p>
            <p className="max-w-md text-lg text-gray-500">
              I build fast, modern web apps using React, TypeScript, Node, and
              Prisma. Passionate about creating beautiful, performant digital
              experiences.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 py-3 px-6 bg-primary text-white font-bold mt-8 rounded-xl">
                View Projects <LuArrowRight className="size-5" />
              </button>
              <button className="py-3 px-6 bg-transparent border border-primary text-primary font-bold mt-8 rounded-xl">
                Download Resume
              </button>
            </div>
            <div className="flex gap-5 mt-16">
              <div className="bg-background-card p-3 rounded-lg">
                <FiGithub className="size-6 text-text" />
              </div>
              <div className="bg-background-card p-3 rounded-lg">
                <FiLinkedin className="size-6 text-text" />
              </div>
              <div className="bg-background-card p-3 rounded-lg">
                <FaXTwitter className="size-6 text-text" />
              </div>
              <div className="bg-background-card p-3 rounded-lg">
                <MdOutlineMail className="size-6 text-text" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 p-8 border border-gray-300 bg-background-card rounded-xl hover:border-primary transition-colors">
                <p className="text-[#0096a5] text-4xl font-bold">50+</p>
                <p className="font-bold">Projects Completed</p>
                <p className="text-gray-500">
                  Building scalable web applications for startups and
                  enterprises.
                </p>
              </div>
              <div className="flex flex-col gap-2 p-8 border border-gray-300 bg-background-card rounded-xl hover:border-primary transition-colors">
                <p className="text-[#0096a5] text-4xl font-bold">8+</p>
                <p className="font-bold">Years of Experience</p>
                <p className="text-gray-500">
                  Specializing in React, TypeScript, and modern web
                  technologies.
                </p>
              </div>
              <div className="flex flex-col gap-2 p-8 border border-gray-300 bg-background-card rounded-xl hover:border-primary transition-colors">
                <p className="text-[#0096a5] text-4xl font-bold">100%</p>
                <p className="font-bold">Client Satisfaction</p>
                <p className="text-gray-500">
                  Delivering high-quality code and exceptional user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
