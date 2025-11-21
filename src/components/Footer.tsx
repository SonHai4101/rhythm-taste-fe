import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

export const Footer = () => {
  return (
    <div className="bg-background-card">
      <div className="py-12 px-6 mx-auto max-w-6xl">
        <div className="flex gap-8">
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-bold text-lg">Hai Son</p>
            <p className="text-sm text-gray-600">
              Full-Stack Developer crafting beautiful web experiences with
              React, TypeScript, and Node.
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-bold text-sm">Navigation</p>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">Home</p>
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">
                Projects
              </p>
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">
                About
              </p>
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">Blog</p>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-bold text-sm">Services</p>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">
                Web Development
              </p>
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">
                Consulting
              </p>
              <p className="text-sm text-gray-600 hover:text-[#0096a5]">
                Freelance
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-bold text-sm">Connect</p>
            <div className="flex gap-4">
              <div className="rounded-lg">
                <FiGithub className="size-5 text-text hover:text-[#0096a5]" />
              </div>
              <div className="rounded-lg">
                <FiLinkedin className="size-5 text-text hover:text-[#0096a5]" />
              </div>
              <div className="rounded-lg">
                <FaXTwitter className="size-5 text-text hover:text-[#0096a5]" />
              </div>
              <div className="rounded-lg">
                <MdOutlineMail className="size-5 text-text hover:text-[#0096a5]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8 pt-8 border-t border-gray-300 text-sm text-gray-600">
          <p>© 2025 Hai Son. All rights reserved.</p>
          <div className="flex gap-4">
            <p className="hover:text-[#0096a5]">Privacy</p>
            <p className="hover:text-[#0096a5]">Terms</p>
          </div>
        </div>
      </div>
    </div>
  );
};
