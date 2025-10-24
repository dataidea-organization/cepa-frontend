"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Target, Users, Calendar, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";

interface FocusAreaDetailProps {
  params: {
    slug: string;
  };
}

const focusAreasData = [
  {
    id: "parliament-watch",
    title: "Parliament Watch",
    image: "/focus-areas/parliament.jpg",
    description: "Monitoring parliamentary proceedings and ensuring accountability in legislative processes.",
    overview: {
      summary: "Our Parliament Watch program is dedicated to promoting transparency, accountability, and citizen engagement in Uganda's legislative process. We monitor parliamentary sessions, analyze voting patterns, and provide detailed reports on legislative activities.",
      objectives: [
        "Enhance transparency in parliamentary proceedings",
        "Promote accountability among members of parliament",
        "Increase citizen awareness and participation in legislative processes",
        "Strengthen oversight mechanisms"
      ],
      activities: [
        "Real-time monitoring of parliamentary sessions",
        "Analysis of voting patterns and attendance",
        "Committee oversight and reporting",
        "Legislative impact assessments"
      ]
    },
    outcomes: [
      {
        title: "Increased Parliamentary Transparency",
        description: "Published over 50 detailed reports on parliamentary proceedings, reaching 100,000+ citizens",
        metric: "50+ Reports"
      },
      {
        title: "Enhanced Public Engagement",
        description: "Facilitated dialogue between citizens and MPs through town halls and online platforms",
        metric: "20+ Town Halls"
      },
      {
        title: "Policy Influence",
        description: "Our research has informed 15+ policy reforms and legislative amendments",
        metric: "15+ Reforms"
      }
    ],
    partners: [
      {
        name: "Parliament of Uganda",
        type: "Government",
        role: "Data sharing and collaboration on transparency initiatives"
      },
      {
        name: "Democratic Governance Facility",
        type: "Donor",
        role: "Financial support and capacity building"
      },
      {
        name: "Civil Society Organizations",
        type: "NGO Partners",
        role: "Joint advocacy and grassroots mobilization"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "January 2020",
      milestones: [
        { year: "2020", event: "Program launch and initial monitoring framework" },
        { year: "2021", event: "Expanded coverage to all parliamentary committees" },
        { year: "2022", event: "Launched digital platform for citizen engagement" },
        { year: "2023", event: "Introduced AI-powered analysis tools" },
        { year: "2024", event: "Partnership expansion and regional impact" }
      ]
    }
  },
  {
    id: "democracy",
    title: "Parliamentary Democracy and Governance",
    image: "/focus-areas/democracy.jpg",
    description: "Strengthening democratic institutions and promoting good governance practices.",
    overview: {
      summary: "We work to enhance democratic processes, improve institutional capacity, and promote participatory governance at all levels of government. Our approach combines research, advocacy, and capacity building to strengthen Uganda's democratic foundations.",
      objectives: [
        "Strengthen democratic institutions and processes",
        "Promote inclusive and participatory governance",
        "Enhance electoral integrity",
        "Build capacity of democratic actors"
      ],
      activities: [
        "Democratic institution strengthening",
        "Electoral process monitoring",
        "Governance capacity building",
        "Citizen participation enhancement"
      ]
    },
    outcomes: [
      {
        title: "Institutional Capacity Building",
        description: "Trained 500+ government officials and civil society leaders on democratic governance",
        metric: "500+ Trained"
      },
      {
        title: "Electoral Reforms",
        description: "Contributed to electoral law reforms through evidence-based advocacy",
        metric: "5 Key Reforms"
      },
      {
        title: "Civic Participation",
        description: "Increased citizen participation in governance processes by 40%",
        metric: "+40% Engagement"
      }
    ],
    partners: [
      {
        name: "Electoral Commission",
        type: "Government",
        role: "Electoral process monitoring and capacity building"
      },
      {
        name: "International IDEA",
        type: "International Partner",
        role: "Technical support and knowledge sharing"
      },
      {
        name: "Local Government Networks",
        type: "Government Partners",
        role: "Implementation of governance initiatives"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "March 2019",
      milestones: [
        { year: "2019", event: "Program establishment and baseline research" },
        { year: "2020", event: "First cohort of governance training programs" },
        { year: "2021", event: "Electoral process monitoring during general elections" },
        { year: "2022", event: "Policy advocacy for governance reforms" },
        { year: "2024", event: "Scaling impact to regional level" }
      ]
    }
  },
  {
    id: "transparency",
    title: "Transparency and Accountability",
    image: "/focus-areas/transparency.jpg",
    description: "Advocating for open government and holding leaders accountable to citizens.",
    overview: {
      summary: "We promote transparency in government operations, advocate for access to information, and work to ensure public officials are held accountable for their actions. Our work focuses on public expenditure tracking, anti-corruption initiatives, and government transparency monitoring.",
      objectives: [
        "Promote transparency in government operations",
        "Strengthen access to information frameworks",
        "Combat corruption through evidence-based advocacy",
        "Enhance accountability mechanisms"
      ],
      activities: [
        "Access to information advocacy",
        "Public expenditure tracking",
        "Anti-corruption initiatives",
        "Government transparency monitoring"
      ]
    },
    outcomes: [
      {
        title: "Budget Transparency",
        description: "Successfully tracked UGX 500B+ in public expenditure, identifying efficiency gaps",
        metric: "UGX 500B+ Tracked"
      },
      {
        title: "Information Access",
        description: "Supported 200+ citizens in accessing government information through legal aid",
        metric: "200+ Cases"
      },
      {
        title: "Anti-Corruption Impact",
        description: "Our reports led to investigations of 10+ corruption cases",
        metric: "10+ Investigations"
      }
    ],
    partners: [
      {
        name: "Transparency International",
        type: "International Partner",
        role: "Technical support and global advocacy coordination"
      },
      {
        name: "Auditor General's Office",
        type: "Government",
        role: "Data collaboration and joint accountability initiatives"
      },
      {
        name: "Media Houses",
        type: "Media Partners",
        role: "Dissemination of research findings"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "July 2018",
      milestones: [
        { year: "2018", event: "Transparency program launch" },
        { year: "2019", event: "First public expenditure tracking report" },
        { year: "2020", event: "Access to information legal aid clinic established" },
        { year: "2022", event: "Launch of digital transparency platform" },
        { year: "2024", event: "Expanded anti-corruption monitoring" }
      ]
    }
  },
  {
    id: "human-rights",
    title: "Human Rights",
    image: "/focus-areas/human-rights.jpg",
    description: "Protecting and promoting fundamental human rights and freedoms.",
    overview: {
      summary: "We monitor human rights violations, advocate for policy reforms, and work to ensure that all Ugandans can enjoy their fundamental rights and freedoms. Our approach combines documentation, legal support, and policy advocacy.",
      objectives: [
        "Monitor and document human rights violations",
        "Provide legal aid and support to victims",
        "Advocate for human rights policy reforms",
        "Raise awareness on human rights issues"
      ],
      activities: [
        "Human rights monitoring and reporting",
        "Policy advocacy for rights protection",
        "Legal aid and support services",
        "Rights awareness campaigns"
      ]
    },
    outcomes: [
      {
        title: "Rights Documentation",
        description: "Documented and reported 100+ human rights violations to relevant authorities",
        metric: "100+ Cases"
      },
      {
        title: "Legal Support",
        description: "Provided legal aid to 150+ individuals facing rights violations",
        metric: "150+ Supported"
      },
      {
        title: "Policy Impact",
        description: "Contributed to 8 human rights policy reforms at national level",
        metric: "8 Reforms"
      }
    ],
    partners: [
      {
        name: "Uganda Human Rights Commission",
        type: "Government",
        role: "Joint monitoring and advocacy initiatives"
      },
      {
        name: "International Human Rights Organizations",
        type: "International Partners",
        role: "Capacity building and resource support"
      },
      {
        name: "Legal Aid Service Providers",
        type: "NGO Partners",
        role: "Legal support and representation"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "September 2017",
      milestones: [
        { year: "2017", event: "Human rights program established" },
        { year: "2018", event: "First comprehensive rights monitoring report" },
        { year: "2020", event: "Legal aid clinic opened" },
        { year: "2022", event: "Digital rights monitoring system launched" },
        { year: "2024", event: "Expanded coverage to marginalized communities" }
      ]
    }
  },
  {
    id: "health",
    title: "Public Health and Road Safety",
    image: "/focus-areas/health.jpg",
    description: "Improving public health outcomes and road safety across Uganda.",
    overview: {
      summary: "We conduct research on public health issues, advocate for better healthcare policies, and work to improve road safety through evidence-based interventions. Our focus is on policy research, advocacy, and community awareness.",
      objectives: [
        "Improve public health policy and implementation",
        "Reduce road traffic accidents and fatalities",
        "Enhance healthcare system accountability",
        "Promote health awareness and education"
      ],
      activities: [
        "Public health policy research",
        "Healthcare system analysis",
        "Road safety advocacy",
        "Health awareness campaigns"
      ]
    },
    outcomes: [
      {
        title: "Policy Influence",
        description: "Our research informed 10+ health policy reforms at national and district levels",
        metric: "10+ Reforms"
      },
      {
        title: "Road Safety Impact",
        description: "Advocacy contributed to 25% reduction in road accidents in targeted districts",
        metric: "-25% Accidents"
      },
      {
        title: "Community Reach",
        description: "Health awareness campaigns reached 200,000+ individuals",
        metric: "200K+ Reached"
      }
    ],
    partners: [
      {
        name: "Ministry of Health",
        type: "Government",
        role: "Policy collaboration and data sharing"
      },
      {
        name: "WHO Country Office",
        type: "International Partner",
        role: "Technical support and capacity building"
      },
      {
        name: "Traffic Police",
        type: "Government",
        role: "Road safety initiatives and enforcement"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "May 2019",
      milestones: [
        { year: "2019", event: "Health and road safety program launch" },
        { year: "2020", event: "COVID-19 policy response research" },
        { year: "2021", event: "Road safety campaign in 5 districts" },
        { year: "2023", event: "Healthcare accountability framework developed" },
        { year: "2024", event: "Scaling health initiatives nationally" }
      ]
    }
  },
  {
    id: "climate",
    title: "Climate Justice",
    image: "/focus-areas/climate.jpg",
    description: "Addressing climate change impacts and promoting environmental sustainability.",
    overview: {
      summary: "We research climate change impacts on Uganda, advocate for sustainable policies, and work with communities to build resilience against climate-related challenges. Our approach integrates research, advocacy, and community action.",
      objectives: [
        "Document climate change impacts on communities",
        "Advocate for climate-responsive policies",
        "Build community resilience to climate change",
        "Promote sustainable development practices"
      ],
      activities: [
        "Climate impact assessments",
        "Environmental policy advocacy",
        "Community resilience building",
        "Sustainable development promotion"
      ]
    },
    outcomes: [
      {
        title: "Research Impact",
        description: "Published 20+ research reports on climate impacts informing national policy",
        metric: "20+ Reports"
      },
      {
        title: "Community Resilience",
        description: "Built climate resilience in 50+ communities through adaptation programs",
        metric: "50+ Communities"
      },
      {
        title: "Policy Advocacy",
        description: "Contributed to 6 climate-related policy reforms",
        metric: "6 Reforms"
      }
    ],
    partners: [
      {
        name: "Ministry of Water and Environment",
        type: "Government",
        role: "Policy collaboration and implementation"
      },
      {
        name: "Climate Action Network",
        type: "NGO Partners",
        role: "Joint advocacy and knowledge sharing"
      },
      {
        name: "International Climate Funds",
        type: "Donors",
        role: "Financial support for climate programs"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "January 2020",
      milestones: [
        { year: "2020", event: "Climate justice program established" },
        { year: "2021", event: "First climate vulnerability assessment" },
        { year: "2022", event: "Community resilience programs launched" },
        { year: "2023", event: "Climate policy advocacy campaigns" },
        { year: "2024", event: "Scaling climate action initiatives" }
      ]
    }
  },
  {
    id: "ai",
    title: "Artificial Intelligence (AI)",
    image: "/focus-areas/artificial-intelligence.jpg",
    description: "Leveraging technology and AI for better governance and policy outcomes.",
    overview: {
      summary: "We explore how AI and technology can improve governance, enhance service delivery, and support evidence-based policy making in Uganda. Our work focuses on AI policy research, digital rights advocacy, and innovation in public services.",
      objectives: [
        "Research AI policy frameworks for Uganda",
        "Advocate for ethical AI governance",
        "Promote digital rights and data protection",
        "Support innovation in public service delivery"
      ],
      activities: [
        "AI policy research and analysis",
        "Technology governance frameworks",
        "Digital rights advocacy",
        "Innovation in public service delivery"
      ]
    },
    outcomes: [
      {
        title: "Policy Development",
        description: "Contributed to draft AI governance framework for Uganda",
        metric: "1 Framework"
      },
      {
        title: "Capacity Building",
        description: "Trained 100+ government officials on AI and digital governance",
        metric: "100+ Trained"
      },
      {
        title: "Innovation Support",
        description: "Supported 15+ government AI pilot projects",
        metric: "15+ Projects"
      }
    ],
    partners: [
      {
        name: "Ministry of ICT",
        type: "Government",
        role: "Policy development and implementation"
      },
      {
        name: "Tech Companies",
        type: "Private Sector",
        role: "Technical expertise and innovation support"
      },
      {
        name: "Academic Institutions",
        type: "Research Partners",
        role: "Joint research and capacity building"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "October 2021",
      milestones: [
        { year: "2021", event: "AI governance program launched" },
        { year: "2022", event: "First AI policy research report published" },
        { year: "2023", event: "Digital rights advocacy campaign" },
        { year: "2024", event: "AI governance framework development" }
      ]
    }
  },
  {
    id: "scrutiny",
    title: "Post Legislative Scrutiny",
    image: "/focus-areas/democracy.jpg",
    description: "Assessing the effectiveness of laws and policies after implementation.",
    overview: {
      summary: "We conduct systematic reviews of implemented policies and laws to assess their effectiveness, identify gaps, and recommend improvements for better outcomes. Our approach combines rigorous evaluation with stakeholder engagement.",
      objectives: [
        "Evaluate effectiveness of implemented legislation",
        "Identify implementation gaps and challenges",
        "Recommend evidence-based improvements",
        "Promote learning and policy adaptation"
      ],
      activities: [
        "Policy effectiveness evaluations",
        "Legislative impact assessments",
        "Implementation monitoring",
        "Policy improvement recommendations"
      ]
    },
    outcomes: [
      {
        title: "Policy Evaluations",
        description: "Completed 25+ comprehensive post-legislative scrutiny reviews",
        metric: "25+ Reviews"
      },
      {
        title: "Policy Improvements",
        description: "Recommendations led to amendments of 12 laws and policies",
        metric: "12 Amendments"
      },
      {
        title: "Stakeholder Engagement",
        description: "Engaged 500+ stakeholders in scrutiny processes",
        metric: "500+ Engaged"
      }
    ],
    partners: [
      {
        name: "Parliament of Uganda",
        type: "Government",
        role: "Collaboration on legislative review processes"
      },
      {
        name: "Policy Research Institutes",
        type: "Research Partners",
        role: "Joint evaluation studies"
      },
      {
        name: "Line Ministries",
        type: "Government",
        role: "Implementation data and stakeholder engagement"
      }
    ],
    timeline: {
      status: "Active",
      startDate: "June 2020",
      milestones: [
        { year: "2020", event: "Post-legislative scrutiny program launched" },
        { year: "2021", event: "First batch of policy evaluations completed" },
        { year: "2022", event: "Scrutiny framework adopted by Parliament" },
        { year: "2023", event: "Expanded scope to include regulatory reviews" },
        { year: "2024", event: "Digital monitoring systems implemented" }
      ]
    }
  }
];

const FocusAreaDetail: React.FC<FocusAreaDetailProps> = ({ params }) => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const focusArea = focusAreasData.find((area) => area.id === params.slug);

  if (!focusArea) {
    notFound();
  }

  const sections = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "outcomes", label: "Outcomes", icon: TrendingUp },
    { id: "partners", label: "Partners", icon: Users },
    { id: "timeline", label: "Timeline", icon: Calendar }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 180;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={focusArea.image}
          alt={focusArea.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                asChild
                variant="ghost"
                className="text-white hover:text-white/80 mb-6"
              >
                <Link href="/focus-areas">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Focus Areas
                </Link>
              </Button>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {focusArea.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl">
                {focusArea.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Navigation Bar */}
      <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto py-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeSection === section.id
                      ? "bg-[#800020] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Section */}
          <section id="overview" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Overview</h2>

              <Card className="p-8 mb-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {focusArea.overview.summary}
                </p>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Objectives</h3>
                  <ul className="space-y-3">
                    {focusArea.overview.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Key Activities</h3>
                  <ul className="space-y-3">
                    {focusArea.overview.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </motion.div>
          </section>

          {/* Outcomes Section */}
          <section id="outcomes" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Outcomes & Impact</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {focusArea.outcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full bg-white/40 border border-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {outcome.metric}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{outcome.title}</h3>
                      <p className="text-muted-foreground">{outcome.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Partners Section */}
          <section id="partners" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Our Partners</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {focusArea.partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full bg-white/40 border border-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <Users className="h-8 w-8 text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-foreground">{partner.name}</h3>
                          <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {partner.type}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{partner.role}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Timeline & Status</h2>

              <Card className="p-8 mb-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Program Status</h3>
                    <p className="text-muted-foreground">Started: {focusArea.timeline.startDate}</p>
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-500 text-lg px-6 py-2 mt-4 md:mt-0">
                    {focusArea.timeline.status}
                  </Badge>
                </div>

                <div className="relative pl-8 border-l-4 border-[#800020]">
                  {focusArea.timeline.milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="mb-8 relative"
                    >
                      <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-[#800020] border-4 border-white shadow"></div>
                      <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm">
                        <span className="text-sm font-bold text-[#800020] mb-1 block">{milestone.year}</span>
                        <p className="text-foreground">{milestone.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Want to Learn More?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Explore our other focus areas or get in touch to discuss collaboration opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-white text-[#800020] hover:bg-white/90">
              <Link href="/focus-areas">
                View All Focus Areas
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/get-involved/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FocusAreaDetail;
