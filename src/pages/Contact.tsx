import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiLinkedin, FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

export const Contact = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-background">
        <div className="pt-32 pb-20 px-6 mx-auto max-w-6xl">
          <div className="flex flex-col mb-12 gap-4">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              Get In Touch
            </p>
            <p className="text-6xl font-extrabold">Contact Me</p>
            <p className="text-gray-500 text-lg font-medium">
              I'm always open to new opportunities and interesting projects.
              Feel free to reach out!
            </p>
          </div>
          <div className="flex gap-12 justify-between">
            <div className="flex-1 flex flex-col gap-6 bg-background-card p-8 border border-gray-300 rounded-xl">
              <p className="text-2xl font-bold">Send me a message</p>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-text" htmlFor="name">
                  Name
                </label>
                <input
                  className="px-4 py-2 bg-input border border-gray-300 text-text-placehoder rounded-xl"
                  id="name"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-text" htmlFor="email">
                  Email
                </label>
                <input
                  className="px-4 py-2 bg-input border border-gray-300 text-text-placehoder rounded-xl focus:ring"
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-text" htmlFor="subject">
                  Subject
                </label>
                <input
                  className="px-4 py-2 bg-input border border-gray-300 text-text-placehoder rounded-xl"
                  id="subject"
                  placeholder="Project inquiry"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-text" htmlFor="subject">
                  Message
                </label>
                <textarea
                  className="px-4 py-2 bg-input border border-gray-300 text-text-placehoder rounded-xl resize-none"
                  id="subject"
                  rows={5}
                  placeholder="Tell me about your project..."
                />
              </div>
              <button className="bg-primary text-white py-3 px-6 rounded-xl font-bold hover:bg-primary/90">
                Send Message
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <p className="text-2xl font-bold">Contact Information</p>
                <p className="text-gray-500 font-medium">
                  I'm based in San Francisco and available for freelance work,
                  collaborations, and full-time opportunities.
                </p>
              </div>
              <div className="flex items-center border border-gray-300 rounded-xl bg-background-card p-6 gap-4">
                <MdOutlineMail className="size-6 text-primary" />
                <div className="flex flex-col">
                  <p className="text-gray-500">Email</p>
                  <p className="font-bold">sonhai.52870@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center border border-gray-300 rounded-xl bg-background-card p-6 gap-4">
                <FiPhone className="size-6 text-primary" />
                <div className="flex flex-col">
                  <p className="text-gray-500">Phone</p>
                  <p className="font-bold">(+84) 354 7979 41</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold text-xl">Social Links</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-xl bg-background-card">
                    <FiGithub className="size-4 text-primary" />
                    <p className="font-bold">Github</p>
                  </div>
                  <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-xl bg-background-card">
                    <FiLinkedin className="size-4 text-primary" />
                    <p className="font-bold">Linkedln</p>
                  </div>
                  <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-xl bg-background-card">
                    <FaXTwitter className="size-4 text-primary" />
                    <p className="font-bold">Twiiter</p>
                  </div>
                  <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-xl bg-background-card">
                    <MdOutlineMail className="size-4 text-primary" />
                    <p className="font-bold">Email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
