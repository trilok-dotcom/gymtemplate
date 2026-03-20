import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Dumbbell, User, Flame, Activity, HeartPulse, Star, ArrowRight, CheckCircle2, MapPin, Phone, MessageCircle } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from "@/lib/utils";

// --- HERO SECTION ---
import { Hero3D } from "./hero-3d";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <img 
        src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
        alt="Hero background" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
      <Hero3D />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest mb-6">
            WELCOME TO THE NEXT LEVEL
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
            TRANSFORM YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">BODY</span><br />
            ELEVATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">LIFE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 font-medium">
            Train with experts. Build strength. Become unstoppable. Join the most elite fitness community in South Goa.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg bg-primary text-black hover:bg-primary/90 hover:scale-105 transition-all duration-300 box-glow"
            >
              Join Now
            </a>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg glass-panel hover:bg-white/5 hover:scale-105 transition-all duration-300"
            >
              Book Free Trial
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- ABOUT SECTION ---
export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "4.8★", label: "Rating" },
    { value: "150+", label: "Reviews" },
    { value: "1000+", label: "Members" },
  ];

  return (
    <section id="about" className="py-24 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              MORE THAN JUST A <span className="text-primary">GYM</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg">
              <p>
                At Fat 2 Fit Gym, we provide a premium fitness environment designed to push you beyond your limits. We believe in building not just muscle, but resilience and character.
              </p>
              <ul className="space-y-4">
                {[
                  "Premium state-of-the-art equipment",
                  "Certified and passionate trainers",
                  "Community-driven supportive atmosphere"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                    <span className="font-medium text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl text-center hover:border-primary/50 transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">{stat.value}</div>
                <div className="text-primary font-bold uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- TRAINERS SECTION ---
function Trainer3DCard({ trainer }: { trainer: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
      <img 
        src={trainer.image} 
        alt={trainer.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div 
        className="absolute inset-0 z-20 p-6 flex flex-col justify-end"
        style={{ transform: "translateZ(50px)" }} // Pop out effect
      >
        <div className="text-primary font-bold text-sm mb-1 tracking-widest uppercase">{trainer.exp}</div>
        <h3 className="text-3xl font-display font-bold text-white mb-1">{trainer.name}</h3>
        <p className="text-white/80 font-medium mb-4">{trainer.role}</p>
        <p className="text-sm text-white/60 italic border-l-2 border-primary pl-3">"{trainer.quote}"</p>
      </div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-inset ring-2 ring-primary rounded-3xl box-glow-strong" />
    </motion.div>
  );
}

export function TrainersSection() {
  const trainers = [
    {
      name: "Sunil",
      role: "Strength & Rehab Specialist",
      exp: "8+ Years Exp",
      quote: "Rebuild stronger, move better.",
      image: `${import.meta.env.BASE_URL}images/trainer-1.png`
    },
    {
      name: "Satish",
      role: "Weight Training Expert",
      exp: "6+ Years Exp",
      quote: "Lift heavy, live healthy.",
      image: `${import.meta.env.BASE_URL}images/trainer-2.png`
    },
    {
      name: "Tushar",
      role: "General Fitness Coach",
      exp: "5+ Years Exp",
      quote: "Fitness for every body.",
      image: `${import.meta.env.BASE_URL}images/trainer-3.png`
    }
  ];

  return (
    <section id="trainers" className="py-24 relative z-10 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">MEET YOUR <span className="text-primary">COACHES</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Expert guidance to help you smash your goals.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          {trainers.map((trainer, idx) => (
            <Trainer3DCard key={idx} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SERVICES SECTION ---
export function ServicesSection() {
  const services = [
    { title: "Strength Training", icon: Dumbbell, desc: "Build raw power and muscle density." },
    { title: "Personal Training", icon: User, desc: "1-on-1 coaching tailored to your body." },
    { title: "Weight Loss", icon: Flame, desc: "High-intensity programs to burn fat." },
    { title: "Muscle Building", icon: Activity, desc: "Hypertrophy focused workout plans." },
    { title: "Rehab Training", icon: HeartPulse, desc: "Recover safely and rebuild mobility." }
  ];

  return (
    <section id="services" className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">OUR <span className="text-primary">SERVICES</span></h2>
            <p className="text-white/60 max-w-xl">Everything you need to sculpt your ultimate physique.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/60">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- EXPERIENCE SECTION ---
export function ExperienceSection() {
  const images = [
    { src: `${import.meta.env.BASE_URL}images/gym-1.png`, label: "State of the Art Equipment" },
    { src: `${import.meta.env.BASE_URL}images/gym-2.png`, label: "Spacious Training Floor" },
    { src: `${import.meta.env.BASE_URL}images/gym-3.png`, label: "Modern Locker Rooms" },
    { src: `${import.meta.env.BASE_URL}images/gym-4.png`, label: "Pro Cardio Zone" },
    { src: `${import.meta.env.BASE_URL}images/gym-5.png`, label: "Free Weights Area" },
  ];

  return (
    <section id="experience" className="py-24 relative z-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">THE <span className="text-primary">EXPERIENCE</span></h2>
      </div>
      
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-8 pb-12 hide-scrollbar snap-x snap-mandatory">
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[40vw] aspect-video relative rounded-2xl overflow-hidden snap-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img 
              src={img.src} 
              alt={img.label} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary box-glow" />
                {img.label}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- TESTIMONIALS SECTION ---
export function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const testimonials = [
    { text: "Very friendly trainers and great environment. Best gym in South Goa!", author: "Priya S." },
    { text: "Affordable and well equipped gym. Highly recommend!", author: "Rahul M." },
    { text: "Trainer Sunil is highly knowledgeable and motivating!", author: "Anjali K." }
  ];

  return (
    <section id="testimonials" className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Star className="w-12 h-12 text-primary mx-auto mb-8 fill-primary drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
        
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0">
                <p className="text-2xl md:text-4xl font-medium text-white/90 leading-tight mb-8">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <div className="text-lg font-bold text-white tracking-wide">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PRICING SECTION ---
export function PricingSection() {
  const plans = [
    { name: "Daily Pass", price: "100", period: "day", desc: "Perfect for drop-ins", features: ["Full gym access", "Locker room use"], highlighted: false },
    { name: "Weekly Plan", price: "500", period: "week", desc: "Short term commitment", features: ["Full gym access", "1 Personal training session", "Locker room use"], highlighted: true, badge: "POPULAR" },
    { name: "Monthly Membership", price: "1200", period: "month", desc: "Best value for locals", features: ["Full gym access", "Diet consultation", "2 Personal training sessions", "Priority locker access"], highlighted: false, badge: "BEST VALUE" }
  ];

  return (
    <section id="pricing" className="py-24 relative z-10 bg-background border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">MEMBERSHIP <span className="text-primary">PLANS</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">No hidden fees. Just results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={cn(
                "rounded-2xl p-8 relative transition-all duration-300",
                plan.highlighted 
                  ? "bg-gradient-to-b from-primary/20 to-black border-2 border-primary box-glow scale-105 z-10 shadow-2xl shadow-black" 
                  : "glass-panel"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest box-glow">
                    {plan.badge}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-white/50 mb-6">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-black text-white">₹{plan.price}</span>
                <span className="text-white/50">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className={cn("w-5 h-5", plan.highlighted ? "text-primary" : "text-white/30")} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="#contact"
                className={cn(
                  "block w-full py-4 rounded-xl font-bold text-center transition-all",
                  plan.highlighted 
                    ? "bg-primary text-black hover:bg-white" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                Choose Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CONTACT SECTION ---
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">START YOUR <span className="text-primary">TRANSFORMATION</span> TODAY</h2>
            <p className="text-white/60 mb-10 text-lg">Visit us or drop a message. Let's build your custom fitness plan.</p>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Location</h4>
                  <p className="text-white/60">Benaulim, South Goa<br/>Goa, India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Call Us</h4>
                  <p className="text-white/60">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#128C7E] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <textarea 
                  required
                  rows={4}
                  placeholder="How can we help you?" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-black bg-primary hover:bg-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Map */}
        <div className="mt-16 w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15403.49167389857!2d73.92134595!3d15.2743516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb6d3ccbd6c9b%3A0xc344e13ec920b777!2sBenaulim%2C%20Goa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

// --- FOOTER ---
export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Dumbbell className="w-8 h-8 text-primary/50 mx-auto mb-6" />
        <div className="font-display font-bold text-xl tracking-wider text-white mb-6">
          FAT 2 <span className="text-primary">FIT</span>
        </div>
        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Fat 2 Fit Gym. All rights reserved.<br/>
          Benaulim, South Goa.
        </p>
      </div>
    </footer>
  );
}
