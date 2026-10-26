import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Component } from "@/components/ui/sterling-gate-kinetic-navigation";

export function DemoOne() {
  return <Component />;
}

export function Default() {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10 custom-cursor">
      <GlowCard />
      <GlowCard />
      <GlowCard />
    </div>
  );
}

export default function ParallaxDemo() {
  return (
    <>
      <ParallaxComponent title="Parallax" />
      <div className="osmo-credits">
        <p className="osmo-credits__p">
          Resource by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.osmo.supply/"
            className="osmo-credits__p-a"
          >
            Osmo
          </a>
        </p>
      </div>
    </>
  );
}
