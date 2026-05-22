import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const proj1Ref = useRef(null);
  const proj2Ref = useRef(null);
  const proj3Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    const cards = [proj1Ref.current, proj2Ref.current, proj3Ref.current];
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.3 * (index + 1),
          scrollTrigger: { trigger: card, start: "top bottom-=100" },
        }
      );
    });
  }, []);

  const [p1, p2, p3] = projects;

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={proj1Ref} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src={p1.imgPath} alt={p1.title} />
            </div>
            <div className="text-content">
              <h2>{p1.title}</h2>
              <p className="text-white-50 md:text-xl">{p1.description}</p>
              {p1.liveUrl && (
                <a href={p1.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-blue-50 underline">
                  View Project →
                </a>
              )}
            </div>
          </div>
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={proj2Ref}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img src={p2.imgPath} alt={p2.title} loading="lazy" />
              </div>
              <h2>{p2.title}</h2>
            </div>
            <div className="project" ref={proj3Ref}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src={p3.imgPath} alt={p3.title} loading="lazy" />
              </div>
              <h2>{p3.title}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
