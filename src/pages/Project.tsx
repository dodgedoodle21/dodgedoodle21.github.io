import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, Circle, ArrowLeft, Code, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// ============================================
// EASY TO EDIT TEMPLATE - Modify sections below
// ============================================

const projectOverview = {
  title: "VR Gravity Simulation",
  subtitle: "NASA HUNCH 2026",
  description: `Our team is developing an innovative Virtual Reality gravity simulation system 
    designed to help astronauts train for various gravitational environments. This cutting-edge 
    technology combines advanced physics engines with immersive VR experiences.`,
};

const milestones = [
  { 
    title: "Research & Concept Development", 
    status: "complete" as const,
    date: "September 2025",
    description: "Completed initial research and concept validation"
  },
  { 
    title: "Hardware Integration Testing", 
    status: "complete" as const,
    date: "October 2025",
    description: "Successfully integrated VR hardware components"
  },
  { 
    title: "Physics Engine Development", 
    status: "complete" as const,
    date: "November 2025",
    description: "Developed core physics simulation algorithms"
  },
  { 
    title: "VR Environment Design", 
    status: "complete" as const,
    date: "December 2025 - January 2026",
    description: "Created immersive space environments"
  },
  { 
    title: "User Testing & Validation", 
    status: "in-progress" as const,
    date: "February 2026",
    description: "Conducting user testing sessions"
  },
  { 
    title: "NASA CDR Presentation", 
    status: "upcoming" as const,
    date: "March 2026",
    description: "Final presentation to NASA judges"
  },
];

const features = [
  {
    title: "Realistic Physics",
    description: "Accurate gravity simulation based on real NASA data and physics models."
  },
  {
    title: "Immersive VR",
    description: "Full 360\u00B0 virtual reality experience with intuitive controls."
  },
  {
    title: "Virtual Playground",
    description: "An open sandbox environment to freely experiment with zero-gravity interactions and scenarios."
  },
  {
    title: "Real-Time Metrics",
    description: "Track G-forces, realistic HUD overlays, and live mission telemetry data."
  },
];

const stats = [
  { value: "5", label: "Team Members" },
  { value: "200+", label: "Development Hours" },
  { value: "99.7%", label: "Physics Accuracy" },
  { value: "6", label: "Environments" },
];

const scripts = [
  {
    filename: "moveplayer.cs",
    title: "Player Movement Controller",
    description: "Handles VR controller input for head-oriented horizontal movement, rotation via right joystick, and explicit vertical movement. Includes speed modifiers via button presses.",
    code: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ControllerScript : MonoBehaviour
{
    public Camera sceneCamera;
    private Vector3 targetPosition;
    private Quaternion targetRotation;
    private float step = 18.0f;
    private float move = 3.0f;

    void Start() { }

    void Update()
    {
        // Speed modifiers
        if (OVRInput.GetDown(OVRInput.Button.One, OVRInput.Controller.RTouch)) move = move * 0.67f;
        if (OVRInput.GetDown(OVRInput.Button.Two, OVRInput.Controller.RTouch)) move = move * 1.5f;

        // Define step value for animation
        if (step > 600f) step = 600f;
        if (step < 1f) step = 1f;
        if (move > 600f) move = 600f;
        if (move < 1f) move = 1f;

        float thisstep = step * Time.deltaTime;
        float thismove = move * Time.deltaTime;

        // --- ROTATION (Right Joystick Left/Right) ---
        if (OVRInput.Get(OVRInput.RawButton.RThumbstickLeft)) transform.Rotate(0, -5.0f * thisstep, 0);
        if (OVRInput.Get(OVRInput.RawButton.RThumbstickRight)) transform.Rotate(0, 5.0f * thisstep, 0);

        // --- HEAD-ORIENTED HORIZONTAL MOVEMENT ---
        Vector3 headForward = sceneCamera.transform.forward;
        Vector3 headRight = sceneCamera.transform.right;

        headForward.y = 0;
        headRight.y = 0;
        headForward.Normalize();
        headRight.Normalize();

        Vector3 moveDirection = Vector3.zero;

        if (OVRInput.Get(OVRInput.RawButton.LThumbstickUp)) moveDirection += headForward;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickDown)) moveDirection -= headForward;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickLeft)) moveDirection -= headRight;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickRight)) moveDirection += headRight;

        // --- EXPLICIT VERTICAL MOVEMENT ---
        if (OVRInput.Get(OVRInput.RawButton.RThumbstickUp)) moveDirection += Vector3.up;
        if (OVRInput.Get(OVRInput.RawButton.RThumbstickDown)) moveDirection -= Vector3.up;

        // --- APPLY FINAL MOVEMENT ---
        if (moveDirection != Vector3.zero)
        {
            transform.position += moveDirection.normalized * thismove;
        }
    }
}`,
  },
  {
    filename: "actualgravity.cs",
    title: "Artificial Gravity System",
    description: "Applies centripetal artificial gravity using the station\u2019s spin axis (a line, not a single point) for physically accurate force direction. Features smoothed thumbstick turning, a tilt-speed limiter to prevent disorienting flips, a zero-G deadzone near the axis, and Rigidbody interpolation for jitter-free visuals.",
    code: `using UnityEngine;

public class ArtificialGravity : MonoBehaviour
{
    [Header("Station Alignment")]
    public Transform stationCenter; 
    public Vector3 stationAxis = Vector3.up; 
    public float stationRadius = 7.5f; 

    [Header("Physics Settings")]
    public float gravityStrength = 9.81f; 
    public float turnSpeed = 100f; 
    public float maxTiltSpeed = 75f; // THE FIX: Speed limit for flipping (degrees per second)

    [Header("Stability Settings")]
    public float deadzoneRadius = 0.9f; 

    private Rigidbody rb;
    private Quaternion targetRotation; 

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rb.useGravity = false;
        rb.freezeRotation = true;
        
        // THE SMOOTHNESS FIX: This tells Unity's engine to do the visual smoothing automatically
        // between physics frames. This replaces the need for an Update() loop entirely!
        rb.interpolation = RigidbodyInterpolation.Interpolate;
        
        targetRotation = transform.rotation;
    }

    [Header("Turning Smoothness")]
    public float turnSmoothSpeed = 30f;
    private float currentTurnVelocity = 0f;

    void FixedUpdate()
    {
    if (stationCenter == null) return;

    // 1. STATION MATH - Uses axis LINE, not a single point
    Vector3 worldAxis = stationCenter.TransformDirection(stationAxis.normalized);
    Vector3 playerOffset = transform.position - stationCenter.position;
    float projectionDistance = Vector3.Dot(playerOffset, worldAxis);
    Vector3 closestPointOnAxis = stationCenter.position + (worldAxis * projectionDistance);
    
    Vector3 vectorFromAxis = transform.position - closestPointOnAxis;
    float distanceFromAxis = vectorFromAxis.magnitude;
    if (distanceFromAxis < 0.001f) return; 

    Vector3 stationUp = vectorFromAxis.normalized;

    // 2. APPLY GRAVITY FORCE
    if (distanceFromAxis > deadzoneRadius)
    {
        float gravityMultiplier = Mathf.Clamp01(distanceFromAxis / stationRadius);
        rb.AddForce(stationUp * (gravityStrength * gravityMultiplier), ForceMode.Acceleration);
    }

    // 3. CAPTURE TURNING INPUT (Smoothed)
    float targetTurnInput = 0f;
    if (OVRInput.Get(OVRInput.RawButton.RThumbstickLeft)) targetTurnInput = -turnSpeed;
    if (OVRInput.Get(OVRInput.RawButton.RThumbstickRight)) targetTurnInput = turnSpeed;

    currentTurnVelocity = Mathf.Lerp(currentTurnVelocity, targetTurnInput, turnSmoothSpeed * Time.fixedDeltaTime);

    // 4. CALCULATION OF THE TARGET ROTATION
    Quaternion yawRot = Quaternion.AngleAxis(currentTurnVelocity * Time.fixedDeltaTime, Vector3.up);
    
    if (distanceFromAxis > deadzoneRadius)
    {
        Vector3 targetUp = -stationUp;
        Quaternion tiltCorrection = Quaternion.FromToRotation(rb.rotation * Vector3.up, targetUp);
        Quaternion idealRotation = tiltCorrection * rb.rotation * yawRot;
        targetRotation = Quaternion.RotateTowards(rb.rotation, idealRotation, maxTiltSpeed * Time.fixedDeltaTime);
    }
    else
    {
        targetRotation = rb.rotation * yawRot;
        rb.angularVelocity *= 0.4f; 
    }

    rb.MoveRotation(targetRotation);
    }

    void Update()
    {
    if (stationCenter == null) return;

    Vector3 worldAxis = stationCenter.TransformDirection(stationAxis.normalized);
    Vector3 playerOffset = transform.position - stationCenter.position;
    float projectionDistance = Vector3.Dot(playerOffset, worldAxis);
    Vector3 closestPointOnAxis = stationCenter.position + (worldAxis * projectionDistance);
    
    Vector3 vectorFromAxis = transform.position - closestPointOnAxis;
    float distanceFromAxis = vectorFromAxis.magnitude;
    if (distanceFromAxis < 0.001f) return; 

    Vector3 stationUp = vectorFromAxis.normalized;

    if (distanceFromAxis > deadzoneRadius)
    {
        float gravityMultiplier = Mathf.Clamp01(distanceFromAxis / stationRadius);
        rb.AddForce(stationUp * (gravityStrength * gravityMultiplier), ForceMode.Acceleration);
    }

    float targetTurnInput = 0f;
    if (OVRInput.Get(OVRInput.RawButton.RThumbstickLeft)) targetTurnInput = -turnSpeed;
    if (OVRInput.Get(OVRInput.RawButton.RThumbstickRight)) targetTurnInput = turnSpeed;

    currentTurnVelocity = Mathf.Lerp(currentTurnVelocity, targetTurnInput, turnSmoothSpeed * Time.fixedDeltaTime);

    Quaternion yawRot = Quaternion.AngleAxis(currentTurnVelocity * Time.fixedDeltaTime, Vector3.up);
    
    if (distanceFromAxis > deadzoneRadius)
    {
        Vector3 targetUp = -stationUp;
        Quaternion tiltCorrection = Quaternion.FromToRotation(rb.rotation * Vector3.up, targetUp);
        Quaternion idealRotation = tiltCorrection * rb.rotation * yawRot;
        targetRotation = Quaternion.RotateTowards(rb.rotation, idealRotation, maxTiltSpeed * Time.fixedDeltaTime);
    }
    else
    {
        targetRotation = rb.rotation * yawRot;
        rb.angularVelocity *= 0.4f; 
    }

    rb.MoveRotation(targetRotation);
    }
}`,
  },
  {
    filename: "skyboxspin.cs",
    title: "Skybox Rotation Controller",
    description: "Drives a custom Shader Graph material to rotate the skybox cubemap in 3D space, simulating station roll from the player\u2019s perspective.",
    code: `using UnityEngine;

public class SkyboxSpinner : MonoBehaviour
{
    public Material skyboxMaterial;
    public Vector3 spinAxis = new Vector3(0, 1, 0);
    public float speed = 0.2f;
    private float currentRotation;

    void Update()
    {
        currentRotation += speed * Time.deltaTime;

        skyboxMaterial.SetVector("_rotationaxis", spinAxis.normalized);
        skyboxMaterial.SetFloat("_rotationammount", currentRotation);
    }
}`,
  },
  {
    filename: "movegravity.cs",
    title: "Gravity-Aware Movement",
    description: "Rigidbody-based movement with zero-G and 1G mode detection. Projects camera vectors onto the player\u2019s local \u201Cup\u201D plane, includes ladder-climbing logic, and switches between coasting (0G) and walking (1G) based on distance from the station\u2019s spin axis.",
    code: `using UnityEngine;

public class GravityMove : MonoBehaviour
{
    [Header("References")]
    public Camera sceneCamera;
    public Transform stationCenter;
    public Vector3 stationAxis = Vector3.up; 

    [Header("Movement Settings")]
    public float moveSpeed = 3.0f;
    public float climbSpeed = 2.0f; 

    [Header("Zero-G Settings")]
    public float deadzoneRadius = 0.9f; // MUST match ArtificialGravity!

    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    void FixedUpdate()
    {
        HandleMovement();
    }

    void HandleMovement()
    {
        if (stationCenter == null || sceneCamera == null) return;

        // 1. Calculate where "Forward" is based on where you are looking
        Vector3 forward = sceneCamera.transform.forward;
        Vector3 right = sceneCamera.transform.right;

        // Flatten the direction to the player's 'Up' so you don't fly into the floor
        forward = Vector3.ProjectOnPlane(forward, transform.up).normalized;
        right = Vector3.ProjectOnPlane(right, transform.up).normalized;

        Vector3 inputDir = Vector3.zero;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickUp)) inputDir += forward;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickDown)) inputDir -= forward;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickLeft)) inputDir -= right;
        if (OVRInput.Get(OVRInput.RawButton.LThumbstickRight)) inputDir += right;

        Vector3 climbDir = Vector3.zero;
        if (OVRInput.Get(OVRInput.RawButton.RThumbstickUp)) climbDir = transform.up * climbSpeed;
        if (OVRInput.Get(OVRInput.RawButton.RThumbstickDown)) climbDir = -transform.up * climbSpeed;

        // 2. CHECK IF WE ARE IN 0G OR GRAVITY
        Vector3 worldAxis = stationCenter.TransformDirection(stationAxis.normalized);
        Vector3 playerOffset = transform.position - stationCenter.position;
        float projectionDistance = Vector3.Dot(playerOffset, worldAxis);
        Vector3 closestPointOnAxis = stationCenter.position + (worldAxis * projectionDistance);
        
        float distanceFromAxis = Vector3.Distance(transform.position, closestPointOnAxis);
        bool inZeroG = distanceFromAxis <= deadzoneRadius;

        // 3. APPLY MOVEMENT
        if (inZeroG)
        {
            // === 0G MODE: Coasting ===
            if (inputDir != Vector3.zero || climbDir != Vector3.zero)
            {
                // Apply thrust when pressing the stick
                rb.linearVelocity = (inputDir.normalized * moveSpeed) + climbDir;
            }
            // Notice there is NO "else" statement here. 
            // If you let go of the stick, we do nothing. The physics engine lets you coast!
        }
        else
        {
            // === 1G MODE: Walking & Stopping ===
            if (inputDir != Vector3.zero || climbDir != Vector3.zero)
            {
                if (climbDir != Vector3.zero)
                {
                    rb.linearVelocity = (inputDir.normalized * moveSpeed) + climbDir;
                }
                else
                {
                    Vector3 verticalVelocity = Vector3.Project(rb.linearVelocity, transform.up);
                    rb.linearVelocity = (inputDir.normalized * moveSpeed) + verticalVelocity;
                }
            }
            else
            {
                // Brakes! Instantly stop horizontal walking, but keep falling/jumping
                rb.linearVelocity = Vector3.Project(rb.linearVelocity, transform.up);
            }
        }
    }
}`,
  },
  {
    filename: "objectgravity.cs",
    title: "Object Gravity (Throwables)",
    description: "Applies axis-aligned artificial gravity to physics objects (e.g. balls), pulling them toward the station\u2019s center pivot line rather than a single point. Includes performance optimizations like staggered axis recalculation, sqrMagnitude checks, and sleep detection. Automatically disengages when the object is grabbed.",
    code: `using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ObjectGravity : MonoBehaviour
{
    public Transform stationCenter; 
    public Vector3 stationAxis = Vector3.up; 
    public float gravityStrength = 9.81f; 
    public float deadzoneRadius = 0.9f;
    public float stationRadius = 7.5f;

    private Rigidbody rb;
    private OVRGrabbable grabbable;
    private Vector3 cachedWorldAxis;
    private int frameOffset;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        grabbable = GetComponent<OVRGrabbable>();
        
        // Offset the physics calculation so all 6 objects don't run heavy math 
        // on the exact same microsecond.
        frameOffset = Random.Range(0, 2); 
        
        if (stationCenter != null)
            cachedWorldAxis = stationCenter.TransformDirection(stationAxis.normalized);
    }

    void FixedUpdate()
    {
        // Optimization: If the object is sleeping (not moving) and not grabbed, 
        // don't run math. Gravity has already done its job.
        if (rb.IsSleeping() || (grabbable != null && grabbable.isGrabbed)) return;

        // Spread the load: Only update the world axis occasionally
        if (Time.frameCount % 20 == 0) 
            cachedWorldAxis = stationCenter.TransformDirection(stationAxis.normalized);

        Vector3 playerOffset = transform.position - stationCenter.position;
        float dot = Vector3.Dot(playerOffset, cachedWorldAxis);
        Vector3 closestPointOnAxis = stationCenter.position + (cachedWorldAxis * dot);
        
        Vector3 vectorFromAxis = transform.position - closestPointOnAxis;
        float distSq = vectorFromAxis.sqrMagnitude; // sqrMagnitude is faster than .magnitude

        if (distSq > (deadzoneRadius * deadzoneRadius))
        {
            float distance = Mathf.Sqrt(distSq);
            Vector3 gravityDirection = vectorFromAxis / distance;
            float multiplier = Mathf.Clamp01(distance / stationRadius);
            
            rb.AddForce(gravityDirection * (gravityStrength * multiplier), ForceMode.Acceleration);
        }
    }
}`,
  },
  {
    filename: "movestation.cs",
    title: "Station Spin (Visual)",
    description: "Simple continuous Y-axis rotation for the station model. Used in the \u201CStatic Station, Dynamic Skybox\u201D approach for visual effect without physics overhead.",
    code: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class stationspinscript : MonoBehaviour
{
    public Camera sceneCamera;
    private Vector3 targetPosition;
    private Quaternion targetRotation;
    private float station;

    void Start() { }

    void Update()
    {
        station = 1.0f * Time.deltaTime;
        transform.Rotate(0, 35.5f * station, 0);
    }
}`,
  },
  {
    filename: "moonspin.cs",
    title: "Moon Rotation (Environment)",
    description: "Rotates a moon model on the X-axis for ambient environmental animation in the space scene.",
    code: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class moonspinscript : MonoBehaviour
{
    public Camera sceneCamera;
    private Vector3 targetPosition;
    private Quaternion targetRotation;
    private float moonspin;

    void Start() { }

    void Update()
    {
        moonspin = 1.0f * Time.deltaTime;
        transform.Rotate(1.0f * moonspin, 0, 0);
    }
}`,
  },
];

// ============================================
// Component Code Below
// ============================================

const ScriptCard = ({ script }: { script: typeof scripts[0] }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-start gap-4 text-left hover:bg-primary/5 transition-colors"
      >
        <Code className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="font-display text-lg font-semibold">{script.title}</h3>
            <span className="text-xs font-mono bg-primary/15 text-primary px-2 py-0.5 rounded-full">{script.filename}</span>
          </div>
          <p className="text-sm text-muted-foreground">{script.description}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-border">
          <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
            <code className="text-muted-foreground">{script.code}</code>
          </pre>
        </div>
      )}
    </motion.div>
  );
};

const Project = () => {
  const getStatusIcon = (status: "complete" | "in-progress" | "upcoming") => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "upcoming":
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusStyle = (status: "complete" | "in-progress" | "upcoming") => {
    switch (status) {
      case "complete":
        return "bg-primary/20 border-primary/30";
      case "in-progress":
        return "bg-yellow-500/20 border-yellow-500/30 animate-pulse";
      case "upcoming":
        return "bg-muted border-muted-foreground/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
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
            <span className="text-primary font-medium mb-4 block">{projectOverview.subtitle}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {projectOverview.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {projectOverview.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <p className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
              Key <span className="gradient-text">Features</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 star-field opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
              Project <span className="gradient-text">Timeline</span>
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className={`glass-card p-6 border-l-4 ${getStatusStyle(milestone.status)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Script Documentation Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
              Script <span className="gradient-text">Documentation</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              All Unity C# scripts currently active in the simulation build. Click any script to expand its source code.
            </p>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {scripts.map((script) => (
                <ScriptCard key={script.filename} script={script} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Project;
