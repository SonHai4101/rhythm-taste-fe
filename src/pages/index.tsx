import { Hero } from "../components/Hero";
import { Feature } from "../components/Feature";
import { Skill } from "../components/Skill";

export const index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Feature />
      <Skill />
    </div>
  );
};
