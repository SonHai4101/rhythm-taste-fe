import { LuArrowRight } from "react-icons/lu";

export const Feature = () => {
  const items = [1, 2, 3];
  return (
    <div className="bg-secondary">
      <div className="pt-20 pb-20 px-6 mx-auto max-w-6xl">
        <div className="">
          <div className="mb-12">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              Featured Work
            </p>
            <p className="text-4xl font-bold mt-4 mb-6">Recent Projects</p>
          </div>
          <div className="flex gap-6">
            {items.map((i) => (
              <div
                key={i}
                className="p-6 border border-gray-300 rounded-xl bg-background-card hover:border-primary transition-all hover:-translate-y-1"
              >
                <img
                  className="max-h-44 w-full mb-6 object-fill rounded-lg"
                  src="/gray.png"
                  alt="project-1"
                />
                <p>Project Title 1</p>
                <p className="mt-2 mb-4">
                  Brief description of the project and technologies used.
                </p>
                <div className="flex gap-3">
                  <p className="text-[#1957d3] bg-[#d1ddf6] text-xs font-medium px-2 py-1 rounded-md">
                    React
                  </p>
                  <p className="text-[#1957d3] bg-[#d1ddf6] text-xs font-medium px-2 py-1 rounded-md">
                    TypeScript
                  </p>
                  <p className="text-[#1957d3] bg-[#d1ddf6] text-xs font-medium px-2 py-1 rounded-md">
                    Node
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="flex items-center gap-2 py-3 px-6 text-primary border border-primary hover:cursor-pointer hover:bg-[#e2e8f4] font-bold mt-12 rounded-xl">
              View All Projects <LuArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
