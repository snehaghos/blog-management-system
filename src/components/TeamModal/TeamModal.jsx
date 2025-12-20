import React from "react";
import { Linkedin, Twitter, Github, Mail, X } from "lucide-react";

const TeamModal = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Photo & Basic Info */}
              <div className="md:w-1/3">
                <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {member.name}
                  </h2>
                  <p className="text-primary font-medium mb-4">
                    {Array.isArray(member.expertise)
                      ? member.expertise.join(", ")
                      : member.expertise}
                  </p>
                  <div className="flex flex-col items-center space-y-1 mb-4">
                    <span className="text-muted-foreground text-sm">
                      {member.role}
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 mb-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-muted rounded-full text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 hover:bg-muted rounded-full text-primary transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="md:w-2/3">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    About
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Expertise */}
                {member.expertise && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(member.expertise)
                        ? member.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))
                        : (
                            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                              {member.expertise}
                            </span>
                          )}
                    </div>
                  </div>
                )}

                {/* Skills Grid */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {member.languages && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.frameworks && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {member.frameworks.map((fw, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {member.databases && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Databases
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {member.databases.map((db, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {db}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.tools && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {member.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
