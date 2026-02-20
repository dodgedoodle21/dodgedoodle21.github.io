import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SectionCard = ({
  number,
  title,
  children,
  delay = 0,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="glass-card border-primary/10 mb-8">
      <CardHeader>
        <CardTitle className="font-display text-2xl md:text-3xl flex items-start gap-3">
          <span className="text-primary font-bold">{number}.</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const Formula = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono text-sm">
    {children}
  </code>
);

const Research = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 star-field opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Deep Dive</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Research
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our research findings, literature reviews, and scientific references
              supporting the VR Gravity Simulation project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 md:p-12 mb-8 border border-primary/10"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              For the 2025–2026 NASA HUNCH VR Gravity Simulation project, the objective
              is to move beyond simple "floating" mechanics and create a high-fidelity
              simulation of <strong className="text-foreground">Artificial Gravity via Rotation</strong>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              To make our research data robust, we need to focus on the physics of a
              rotating reference frame, specifically how gravity changes based on position
              and movement within a 15-meter toroidal (ring-shaped) module.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* 1. Core Physics Parameters */}
          <SectionCard number={1} title="Core Physics Parameters" delay={0.15}>
            <p>
              When simulating artificial gravity (<Formula>a꜀</Formula>), the "floor" is the outer
              interior wall of the ring. You must program the relationship between the
              radius (<Formula>r</Formula>), the angular velocity (<Formula>ω</Formula>), and the
              perceived gravity (<Formula>g</Formula>).
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Formula / Value</TableHead>
                    <TableHead>Research Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Centripetal Acceleration</TableCell>
                    <TableCell><Formula>a꜀ = ω² · r</Formula></TableCell>
                    <TableCell>This is your "artificial gravity" value.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Module Radius (r)</TableCell>
                    <TableCell><Formula>7.5 meters</Formula></TableCell>
                    <TableCell>NASA HUNCH spec is a 15m diameter toroid.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Target Gravity (g)</TableCell>
                    <TableCell><Formula>9.81 m/s²</Formula> (Earth)</TableCell>
                    <TableCell>Requires <Formula>ω ≈ 1.14 rad/s</Formula> (≈ 11 RPM).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Mars Gravity (0.38g)</TableCell>
                    <TableCell><Formula>3.71 m/s²</Formula></TableCell>
                    <TableCell>Requires <Formula>ω ≈ 0.7 rad/s</Formula> (≈ 6.7 RPM).</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </SectionCard>

          {/* 2. Variable Gravity Research Data */}
          <SectionCard number={2} title="Variable Gravity Research Data" delay={0.2}>
            <p>
              One of the most complex things to simulate in VR is the <strong className="text-foreground">Gravity Gradient</strong>.
              In a 15m module, gravity is not uniform. If an astronaut stands up, their head is closer to the
              center than their feet, meaning their head weighs less than their feet.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>At the Floor (<Formula>r = 7.5m</Formula>): <strong className="text-foreground">1.0g</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>At Shoulder Height (<Formula>r = 6.0m</Formula>): <strong className="text-foreground">≈ 0.8g</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>At the Central Core (<Formula>r = 0m</Formula>): <strong className="text-foreground">0g</strong> (Weightlessness)</span>
              </li>
            </ul>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2">
              <p className="text-sm">
                <strong className="text-primary">Research Task:</strong> Design a data table showing how a "weight"
                (5 kg) changes as the user moves it from the floor to the ceiling. This gradient is what causes
                the "motion sickness" often cited in NASA research.
              </p>
            </div>
          </SectionCard>

          {/* 3. The Coriolis Effect */}
          <SectionCard number={3} title='The Coriolis Effect (The "Curve" Data)' delay={0.25}>
            <p>
              In a rotating station, if you throw a ball "up" (toward the center), it won't go straight.
              It will appear to curve because the floor is moving beneath it. This is the <strong className="text-foreground">Coriolis Effect</strong>.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Formula:</strong> <Formula>a<sub>Coriolis</sub> = 2(ω⃗ × v⃗)</Formula></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">VR Data Point:</strong> If a user runs <em>with</em> the rotation, their perceived weight increases. If they run <em>against</em> it, they feel lighter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Simulation Goal:</strong> Create a "Ball Toss" experiment. Record the deviation (in centimeters) of a ball thrown at 5 m/s from a distance of 3m.</span>
              </li>
            </ul>
          </SectionCard>

          {/* 4. Human Factors */}
          <SectionCard number={4} title="Human Factors & Interaction Elements" delay={0.3}>
            <p>
              NASA HUNCH specifically asks for "Workload" objects to test how humans function in this
              environment. You should include these items in your research data logs:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Pendulum Clocks:</strong> Place 3 at different heights. Because <Formula>g</Formula> varies
                  with <Formula>r</Formula>, the clocks will actually tick at different speeds.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Fluid Dynamics:</strong> Simulate a "hose for watering plants." In a rotating frame,
                  the water stream will curve significantly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">The "Ladder Climb":</strong> As the user climbs toward the center, you must simulate the
                  transition from 1g to 0g. Research how to "fade" the controller vibration (haptics) to
                  represent this loss of weight.
                </span>
              </li>
            </ul>
          </SectionCard>

          {/* 5. Recommended Technical Stack */}
          <SectionCard number={5} title="Recommended Technical Stack" delay={0.35}>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Engine:</strong> Unity or Unreal Engine 5 (NASA is currently using UE5 for Gateway simulations).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Hardware:</strong> Oculus Quest 3 or Rift S.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Data Logging:</strong> Create a .csv output from our VR project that logs <Formula>User_Velocity</Formula>, <Formula>Current_Radius</Formula>, and <Formula>Calculated_G_Force</Formula> every 0.1 seconds.</span>
              </li>
            </ul>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2">
              <p className="text-sm">
                To elevate a NASA HUNCH VR project from a "cool demo" to a scientifically grounded simulation,
                you need to account for the physiological and environmental factors that NASA engineers actually worry about.
              </p>
              <p className="text-sm mt-2">
                Beyond just the basic <Formula>a꜀ = ω² · r</Formula> physics, the following sections cover the critical
                factors you should integrate into your research and development.
              </p>
            </div>
          </SectionCard>

          {/* 6. Vestibular-Visual Conflict */}
          <SectionCard number={6} title="Vestibular-Visual Conflict (Motion Sickness)" delay={0.4}>
            <p>
              In a rotating environment, the inner ear (vestibular system) senses rotation, but if the VR user
              is looking at a "stable" interior wall, their eyes tell them they are stationary. This is the
              primary cause of <strong className="text-foreground">Space Adaptation Syndrome</strong> in simulations.
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">The Cross-Coupled Coriolis Effect:</strong> This occurs when a user rotates their head
                  perpendicular to the station's rotation. It creates a sensation of tumbling or tilting that
                  doesn't match the visuals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">VR Mitigation Factor:</strong> Research "vignetting" (narrowing the field of view) during
                  high-rotation movements to see if it reduces user nausea.
                </span>
              </li>
            </ul>
          </SectionCard>

          {/* 7. The Gravity Gradient */}
          <SectionCard number={7} title='The Gravity Gradient (The "Head-to-Foot" Delta)' delay={0.45}>
            <p>
              In a small-diameter station (like the 15m HUNCH spec), the change in gravity over the height
              of a human body is significant.
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Data Point:</strong> At a 7.5m radius, a 1.8m tall astronaut's feet experience <Formula>1.0g</Formula>,
                  but their head (at <Formula>r = 5.7m</Formula>) experiences only <Formula>≈ 0.76g</Formula>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">The "Heavy Leg" Factor:</strong> Simulate the physiological feeling where blood pools more
                  aggressively in the feet than on Earth. In VR, you can represent this by slightly slowing the
                  user's "sprint" speed compared to Earth's 1g.
                </span>
              </li>
            </ul>
          </SectionCard>

          {/* 8. Atmospheric Stratification */}
          <SectionCard number={8} title="Atmospheric Stratification" delay={0.5}>
            <p>
              Gravity doesn't just pull on humans; it pulls on air molecules. In a rotating drum, air pressure
              and composition can vary by depth.
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Convection Issues:</strong> On Earth, hot air rises because it is less dense. In a rotating
                  frame, "up" is toward the center. However, the "buoyancy" of hot air is weaker in the 0g center,
                  meaning CO₂ "pockets" can form around an astronaut's face while they sleep.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Simulation Element:</strong> Add a "Ventilation Subsystem" research task. If the fans fail,
                  the CO₂ levels (visualized as a HUD overlay) should rise faster near the central axis.
                </span>
              </li>
            </ul>
          </SectionCard>

          {/* 9. Acoustic Environment */}
          <SectionCard number={9} title="Acoustic Environment & Vibration" delay={0.55}>
            <p>
              Space stations are incredibly noisy. For a VR simulation to be immersive, the "Data of Sound" is vital.
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">The Hum:</strong> Constant noise from Life Support Systems (LSS) and the physical hum
                  of the motors/gears rotating the module.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Spatial Audio:</strong> Use "3D Audio" in your engine. As the user moves toward the central
                  "hub" (the axis of rotation), the mechanical grinding of the bearings should get louder, while the
                  wind shear of the air against the walls should get quieter.
                </span>
              </li>
            </ul>
          </SectionCard>

          {/* 10. Interaction Mechanics */}
          <SectionCard number={10} title='Interaction Mechanics: The "Newtonian" Factor' delay={0.6}>
            <p>
              Every action in your simulation must have an equal and opposite reaction, which is harder to code
              than it sounds.
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factor</TableHead>
                    <TableHead>VR Implementation</TableHead>
                    <TableHead>Research Goal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Momentum Transfer</TableCell>
                    <TableCell>If a user pushes off a wall, the "station" should technically react (though its mass is too high to see).</TableCell>
                    <TableCell>Calculate the force required to move a 90 kg astronaut in 0g.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Angular Momentum</TableCell>
                    <TableCell>If the user moves a heavy crate from the rim to the center, the station's rotation speed will technically increase (Ice Skater Effect).</TableCell>
                    <TableCell>Does moving "cargo" affect the simulated g-force?</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Tether Physics</TableCell>
                    <TableCell>Simulating a safety tether that behaves correctly under centripetal tension.</TableCell>
                    <TableCell>Test if the tether "curves" or stays straight during a spacewalk.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </SectionCard>

          {/* 11. Light and Shadow */}
          <SectionCard number={11} title="Light and Shadow (Circadian Rhythm)" delay={0.65}>
            <p>
              In a rotating toroid, "sunlight" through a window would strobe or flash at the rate of the RPM.
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">The "Flicker" Factor:</strong> At 11 RPM, a window would see the sun every ~5.5 seconds.
                  This is highly disorienting for humans.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Design Solution:</strong> Most NASA designs use "Light Tubes" or mirrors. Our project could
                  research the psychological impact of "Fake Windows" (LCD screens showing Earth) vs. "Real Windows"
                  (moving starfields).
                </span>
              </li>
            </ul>
          </SectionCard>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
