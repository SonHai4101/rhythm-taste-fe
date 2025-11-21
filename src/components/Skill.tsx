export const Skill = () => {
  const items = [
    { key: 1, label: "React" },
    { key: 2, label: "TypeScript" },
    { key: 3, label: "Next.js" },
    { key: 4, label: "Node.js" },
    { key: 5, label: "Prisma" },
    { key: 6, label: "PostgreSQL" },
    { key: 7, label: "Tailwind CSS" },
    { key: 8, label: "GraphQL" },
  ];
  return (
    <div className="bg-background">
      <div className="pt-20 pb-20 px-6 mx-auto max-w-6xl">
        <div className="">
          <div className="mb-12">
            <p className="uppercase text-sm text-[#0096a5] font-semibold">
              Expertise
            </p>
            <p className="text-4xl font-bold mt-4 mb-6">Technical Skills</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {items.map((i) => (
              <div
                key={i.key}
                className="p-6 font-bold border border-gray-300 text-center bg-background-card rounded-xl hover:border-primary transition-colors"
              >
                <p>{i.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
