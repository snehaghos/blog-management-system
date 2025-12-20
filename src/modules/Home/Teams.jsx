import React, { useState } from "react";
import { Linkedin, Github, Mail, Eye } from "lucide-react";
import TeamModal from "../../components/TeamModal/TeamModal";
import { Button } from "../../components/ui/button";

const teamMembers = [
  
 

  {
    id: 1,
    name: "Sanvi Chakraborty",
    role: "Full Stack Web Developer",
    image: "/images/sanvi.jpg",
    expertise: ["Web Development"],
    bio: "Full-stack web developer with expertise in React.js and Next.js. Focused on building responsive web applications. Passionate about creating inclusive digital solutions, especially targeting underserved communities.",
    languages: ["C", "C++", "Python", "SQL", "JavaScript", "R"],
    frameworks: ["React.js", "Next.js"],
    databases: ["MySQL"],
    tools: ["VS Code", "Git", "GitHub"],
    linkedin: null,
    github: null,
    email: null,
    degree: "BCA(H)",
    college: "Techno India University",
    joinedDate: "Sept 2025",
    connectedSince: "Since the beginning",
    projects: ["E-commerce website (in progress)", "WellnessWave (online doctor booking and consulting website) (in progress)"],
  },
    {
    id: 2,
    name: "Mrittika Nath",
    role: "Full Stack Web Developer",
    image: "/images/mriti.jpg",
    expertise: ["Web Development", "Frontend and Backend (beginner)"],
    bio: "Full-stack developer with expertise in React.js, Next, and Express with TypeScript. Experienced in both MySQL and MongoDB. Passionate about creating beautiful web applications with modern technologies.",
    languages: ["C", "C++", "Python", "JavaScript", "R"],
    frameworks: ["React.js", "Next", "Express With TS"],
    databases: ["MySQL", "MongoDB"],
    tools: ["VS Code", "Git", "GitHub"],
    linkedin: null,
    github: null,
    email: null,
    degree: "BCA(H)",
    college: "Techno India University",
    joinedDate: "Sept 2025",
    connectedSince: "Very Beginning",
    projects: ["To-Do list application", "ECommerce product page", "CureDirect (medicine based website) (in progress)"],
  },
  {
    id: 3,
    name: "Sneha Ghoshal",
    role: "Full Stack Developer & Designer",
    image: "/images/sneha.jpg",
    expertise: ["Web Development", "Design"],
    bio: "Full-stack developer and designer with expertise in React.js, Next.js, and Express.js. Creative designer with strong UI/UX fundamentals using Figma and Adobe tools. Passionate about building scalable applications.",
    languages: ["C", "C++", "Python", "SQL", "JavaScript", "R"],
    frameworks: ["React.js", "Next.js", "Express.js"],
    databases: ["MySQL", "MongoDB"],
    tools: ["Figma", "Adobe Photoshop", "Blender", "VS Code", "Git"],
    linkedin: null,
    github: null,
    email: null,
    degree: "BCA(H)",
    college: "Techno India University",
    joinedDate: "Sept 2025",
    connectedSince: "Since the beginning",
    projects: ["Jobsite (in progress)", "POPO (in progress)", "Biodata Maker", "Games (Minesweeper, Reversi, BlockBurst, ColorClash, Checkers)"],
  },
   {
    id: 4,
    name: "Krishanu Dey",
    role: "Full Stack Developer",
    image: "/images/krishanu.jpg",
    expertise: ["Web Development", "Frontend and Backend"],
    bio: "Full-stack developer with expertise in React.js, Next.js, and Express with TypeScript. Skilled in both MySQL and MongoDB. Dedicated to building scalable web applications with modern tech stacks.",
    languages: ["C", "C++", "Python", "JavaScript", "R"],
    frameworks: ["React.js", "Next", "Express With TS"],
    databases: ["MySQL", "MongoDB"],
    tools: ["VS Code", "Git", "GitHub"],
    linkedin: null,
    github: null,
    email: null,
    degree: "BCA(H)",
    college: "Techno India University",
    joinedDate: "Sept 2025",
    connectedSince: "Very Beginning",
    projects: ["Jobsite", "Library management system (in progress)", "Multiple Games"],
  },
  {
    id: 5,
    name: "Soumyodipto Pal",
    role: "Full Stack Web Developer",
    image: "/images/soumyo.png",
    expertise: ["Web Development"],
    bio: "Full-stack web developer with strong expertise in React.js, Angular.js, and Express.js. Proficient in building scalable applications with both SQL and NoSQL databases. Passionate about creating real-time applications.",
    languages: ["Java", "Python", "SQL", "JavaScript", "R"],
    frameworks: ["Angular.js", "React.js", "Express.js"],
    databases: ["MySQL", "MongoDB"],
    tools: ["Visual Studio Code", "Git", "GitHub"],
    linkedin: null,
    github: null,
    email: null,
    degree: "BCA(H)",
    college: "Techno India University, WB",
    joinedDate: "Sept 2025",
    connectedSince: "Since the Beginning",
    projects: ["Notes Taking Application", "Real Time Chat Application (in progress)"],
  }

];

export default function Teams() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Talented developers and designers working together to build amazing
            solutions for the blog management system. Each team member brings unique
            skills and expertise to the table.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button
                      onClick={() => openModal(member)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3 text-sm">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {Array.isArray(member.expertise)
                      ? member.expertise.join(" • ")
                      : member.expertise}
                  </p>

                  {/* Languages & Frameworks Preview */}
                  <div className="mb-4 space-y-2">
                    {member.languages && (
                      <div className="flex flex-wrap gap-1">
                        {member.languages.slice(0, 3).map((lang, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {lang}
                          </span>
                        ))}
                        {member.languages.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                            +{member.languages.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openModal(member)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    {member.email && (
                      <Button
                        variant="outline"
                        className="p-2"
                        onClick={() =>
                          (window.location.href = `mailto:${member.email}`)
                        }
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2 mt-4">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Join Our Growing Team
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented developers and designers. If you're
            interested in collaborating with us, reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Team Modal */}
      <TeamModal member={selectedMember} isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
