import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

const TestCard = ({ number, title, children }: { number: number; title: string; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="glass-card p-8 space-y-4"
  >
    <div className="flex items-start gap-4">
      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
        {number}
      </span>
      <div className="space-y-3 flex-1">
        <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
        {children}
      </div>
    </div>
  </motion.div>
);

const Label = ({ children }: { children: ReactNode }) => (
  <span className="font-semibold text-primary">{children}</span>
);

const tests = [
  {
    number: 1,
    title: 'Transform vs. Center-of-Mass Rotation (The \u201CWobble\u201D Fix)',
    entries: [
      { label: "Observation", text: 'The toroid station model was rotating off-center. Despite the model being a perfect toroid, the pivot point was not centered at (0, 0, 0), causing the player to be \u201Cslung\u201D around as the station swung in a wide arc.' },
      { label: "Change", text: 'Reset the Station\u2019s Transform to origin and utilized a \u201CPivot Child\u201D method. By parenting the geometry to an empty object at the geometric center, the rotation was locked to the central axis.' },
    ],
  },
  {
    number: 2,
    title: 'Relative vs. Global Movement (The \u201CLook-Direction\u201D Fix)',
    entries: [
      { label: "Observation", text: 'Early movement was locked to raw axial translation (X, Y, Z). Pressing \u201CForward\u201D moved the player toward the world\u2019s North, regardless of where they were looking or how the station had rotated.' },
      { label: "Change", text: 'Scrapped the raw transform.Translate logic. Implemented a system that projects the camera\u2019s forward and right vectors onto the player\u2019s current local \u201Cup\u201D plane.' },
      { label: "Result", text: '\u201CForward\u201D now consistently moves the player in the direction they are facing within the station.' },
    ],
  },
  {
    number: 3,
    title: 'The \u201CSeizure\u201D Glitch (Visual Flashing & Jitter)',
    entries: [
      { label: "Observation", text: 'Turning or moving caused violent visual flashing and black frame stutters. This was caused by \u201CCamera Fighting\u201D \u2014 the VR camera rig was trying to track real-world movement while the script was fighting to override it every frame.' },
      { label: "Change", text: 'Implemented a Parent-Child hierarchy. The player container was tasked with handling \u201CArtificial\u201D movement (joystick), while the OVRCameraRig was left to handle \u201CNatural\u201D movement (head tracking).' },
      { label: "Result", text: 'Smooth visual delivery; flashing was eliminated.' },
    ],
  },
  {
    number: 4,
    title: 'Rotation Offset (Rotating around the wrong Center)',
    entries: [
      { label: "Observation", text: 'After fixing movement, turning the player via the right stick caused the player to \u201Cswing\u201D in a circle rather than spinning in place. This was due to the OVRCameraRig being offset from the parent container\u2019s origin.' },
      { label: "Change", text: 'Zeroed out the local coordinates of the OVRCameraRig and synchronized the rotation logic to use Space.Self relative to the player\u2019s current artificial gravity orientation.' },
    ],
  },
  {
    number: 5,
    title: 'Skybox \u201CMulti-Axis\u201D Integration',
    entries: [
      { label: "Observation", text: 'Standard skyboxes only spin on the Y-axis, which looked \u201Cbroken\u201D once the station started rolling on X or Z.' },
      { label: "Change", text: 'Built a custom Shader Graph to allow 3D rotation of the starfield. Developed a controller to sync this with the station\u2019s RPM.' },
    ],
  },
  {
    number: 6,
    title: 'Vertical Navigation (Ladders & Climbing)',
    entries: [
      { label: "Observation", text: 'The artificial gravity script made verticality impossible; the player was \u201Cglued\u201D to the outer hull.' },
      { label: "Change", text: 'Added a vertical override to the GravityMove script. Right stick Y-input now applies force along transform.up, allowing the player to \u201Cclimb\u201D away from the hull.' },
    ],
  },
  {
    number: 7,
    title: 'The \u201CSpace Launch\u201D & Layer Collision Matrix',
    entries: [
      { label: "Observation", text: 'Picking up the gravity-enabled ball caused the physics engine to explode, launching the player out of the hull. This was caused by the held object colliding with the player\u2019s own capsule.' },
      { label: "Change", text: 'Developed a 3-tier Layer system (Player, Hands, Grabbable). Configured the Physics Matrix to allow Hands to touch Grabbables, but forced the Ball to be \u201Cghost-like\u201D to the Player Body.' },
    ],
  },
  {
    number: 8,
    title: 'Object Kinematics (Bounciness & Trails)',
    entries: [
      { label: "Observation", text: 'The ball felt like a heavy, dead weight with no visual feedback.' },
      { label: "Change", text: 'Reduced Mass to 0.2, added a Physic Material with 0.8 bounciness, and attached a Trail Renderer that toggles off when held and on when thrown.' },
      { label: "Result", text: 'A fully functional, satisfying \u201Clow-gravity\u201D interaction system.' },
    ],
  },
  {
    number: 9,
    title: 'Mesh Collision Integrity (The \u201CGhost Floor\u201D Problem)',
    entries: [
      { label: "Observation", text: 'The player was consistently falling through the station hull into the void. Even adding massive box colliders below the station didn\u2019t stop the clipping; the player would pass through the station mesh and only hit the \u201Csafety\u201D box below.' },
      { label: "Change", text: 'Identified that the station lacked a proper Mesh Collider. Navigated the hierarchy to find the specific \u201CAssembly\u201D mesh and applied a Mesh Collider.' },
      { label: "Result", text: 'The player finally achieved \u201Csolid ground\u201D status within the toroid.' },
    ],
  },
  {
    number: 10,
    title: 'Gravity Vector Alignment (The \u201C45-Degree Lean\u201D)',
    entries: [
      { label: "Observation", text: 'Upon standing, the player was being pulled at a 45\u00B0 angle toward the walls and floor simultaneously. The head was not aligning with the station\u2019s center, causing a permanent \u201Ctilt\u201D that made navigation impossible.' },
      { label: "Change", text: 'Discovered the gravity center was defaulting to (0, 0, 0), but the station model was offset. Hard-coded the gravity center to a specific point in space (x = \u22127) to align with the actual geometric center of the toroidal corridor.' },
      { label: "Result", text: 'Gravity now pulls \u201Cdown\u201D relative to the floor perfectly across the entire ring.' },
    ],
  },
  {
    number: 11,
    title: 'The \u201CLag Hell\u201D & Performance Bottleneck',
    entries: [
      { label: "Observation", text: 'After adding friction components and complex gravity logic, the scene became extremely laggy with heavy visual distortion.' },
      { label: "Change", text: 'Identified that the \u201CStation Spin\u201D logic was forcing the physics engine to recalculate thousands of collisions per second.' },
      { label: "Executive Decision", text: 'Stopped the station\u2019s physical rotation entirely. Instead, shifted to a \u201CStatic Station, Dynamic Skybox\u201D approach to simulate movement without the massive overhead of moving the entire environment\u2019s physics geometry.' },
    ],
  },
  {
    number: 12,
    title: 'Centripetal Drift & Rotation Bricking',
    entries: [
      { label: "Observation", text: 'While trying to counteract the station\u2019s spin with player movement, the player began spinning uncontrollably. Locking the Freeze Rotation constraints on the Rigidbody \u201Cbricked\u201D the movement script.' },
      { label: "Change", text: 'Scrapped the axial-counteract script. Reverted to a clean version of the GravityMove script that handles orientation based on a static center point.' },
      { label: "Result", text: 'Stable orientation without the \u201Cdeath spin.\u201D' },
    ],
  },
  {
    number: 13,
    title: 'The \u201CJitter\u201D Synchronization (FixedUpdate vs. Update)',
    entries: [
      { label: "Observation", text: 'The player was stable while standing still, but moving caused intense jittering and \u201Cstutter-stepping\u201D in the VR headset.' },
      { label: "Root Cause", text: 'A classic \u201CRace Condition\u201D where the physics (a\u0067) was calculating at 50 Hz while the camera was trying to render at 72 Hz / 90 Hz.' },
      { label: "Change", text: 'Moved all movement and gravity calculations into FixedUpdate. Set the Rigidbody to Interpolate.' },
      { label: "Result", text: 'The physics and the frame rate finally \u201Chandshaked,\u201D resulting in smooth movement.' },
    ],
  },
  {
    number: 14,
    title: 'The \u201CStatic Universe\u201D (Skybox Rotation)',
    entries: [
      { label: "Observation", text: 'The default Unity skybox remained static, breaking immersion when the station rotated.' },
      { label: "Change", text: 'Created a custom Shader Graph using Rotate About Axis and Sample Cubemap nodes. Developed a SkyboxController script to feed the station\u2019s rotation axis and amount into the shader\u2019s _rotationaxis and _rotationammount properties.' },
      { label: "Result", text: 'The starfield now spins accurately relative to the player\u2019s perspective, simulating station roll.' },
    ],
  },
  {
    number: 15,
    title: 'Vertical Navigation (The \u201CLadder\u201D Problem)',
    entries: [
      { label: "Observation", text: 'The artificial gravity script correctly pulled the player toward the outer hull, but this made vertical movement (climbing ladders) impossible as the player couldn\u2019t fight the downward a\u1D9C (centripetal acceleration).' },
      { label: "Change", text: 'Updated the GravityMove script to include Right Thumbstick vertical inputs. The script now applies a manual velocity along the player\u2019s transform.up axis, allowing them to override the gravity pull and move \u201Cup\u201D toward the station center.' },
    ],
  },
  {
    number: 16,
    title: 'Object Gravity (The \u201CPhysics Ball\u201D Project)',
    entries: [
      { label: "Observation", text: 'Objects thrown by the player moved in straight lines, ignoring the station\u2019s curved gravity field.' },
      { label: "Change", text: 'Created the ObjectGravity script which disables Unity\u2019s global gravity and applies a constant AddForce toward the station\u2019s center point (X: \u22127, Y: 0, Z: 0).' },
      { label: "Result", text: 'The ball now follows a natural \u201Cfalling\u201D arc toward the floor just like the player.' },
    ],
  },
  {
    number: 17,
    title: 'Interaction \u201CGhosting\u201D & Hand Anchors',
    entries: [
      { label: "Observation", text: 'The player\u2019s hands passed through the ball without any interaction, and the hand anchors were falling through the floor due to active physics.' },
      { label: "Change", text: 'Added Sphere Colliders to the LeftHandAnchor and RightHandAnchor. Set the Hand Rigidbody to Is Kinematic so they follow the VR tracking instead of physics, and updated the OVR Grabber script to include the new colliders in the Grab Volumes list.' },
    ],
  },
  {
    number: 18,
    title: 'The \u201CSpace Launch\u201D (Self-Collision Feedback Loop)',
    entries: [
      { label: "Observation", text: 'Upon grabbing the ball, the player would be violently ejected from the station. The physics engine was resolving a collision between the ball (now parented to the hand) and the player\u2019s body capsule.' },
      { label: "Change", text: 'Implemented a three-tier Layer Collision Matrix. Created layers for \u201CPlayer,\u201D \u201CHands,\u201D and \u201CGrabbable.\u201D Set the Player Container to change all children to the \u201CPlayer\u201D layer. Configured the Physics settings to allow Hands to touch the Ball, but forced the Ball and Player body to ignore each other entirely.' },
    ],
  },
  {
    number: 19,
    title: 'Object Feel & Collision Resolution',
    entries: [
      { label: "Observation", text: 'The ball felt like a heavy brick and came to a dead stop upon hitting the floor.' },
      { label: "Change", text: 'Reduced ball Mass to 0.2 and Gravity Strength to 4.0 for a \u201Clightweight\u201D space feel. Created a Physic Material with 0.8 Bounciness and Maximum Bounce Combine.' },
      { label: "Result", text: 'The ball now bounces realistically off the curved station hull.' },
    ],
  },
];

const TestingData = () => {
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
            <span className="text-primary font-medium mb-4 block">Research & Validation</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Engineering & Physics Log
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Complete session history — every bug, fix, and breakthrough from the VR Gravity Simulation project.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {tests.map((test) => (
            <TestCard key={test.number} number={test.number} title={test.title}>
              {test.entries.map((entry, i) => (
                <p key={i} className="text-muted-foreground">
                  <Label>{entry.label}:</Label> {entry.text}
                </p>
              ))}
            </TestCard>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 border-primary/30"
          >
            <h2 className="font-display text-2xl font-bold mb-6 text-primary">Current Build Status</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground"><Label>Stability:</Label> High. No more falling through the world or seizure flashes.</p>
              <p className="text-muted-foreground"><Label>Performance:</Label> Optimized by removing physical station rotation.</p>
              <p className="text-muted-foreground"><Label>Control:</Label> Forward is look-relative, allowing for intuitive VR navigation.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestingData;
