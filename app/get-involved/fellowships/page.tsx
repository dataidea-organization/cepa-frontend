"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Award, BookOpen, Globe, ArrowRight, ExternalLink } from "lucide-react";

export default function FellowshipsPage() {
  const fellowshipPrograms: any[] = [
    // {
    //   id: 1,
    //   title: "Policy Research Fellowship",
    //   duration: "12 months",
    //   location: "Kampala, Uganda",
    //   type: "Research",
    //   description: "Join our flagship fellowship program for emerging policy researchers. Work on cutting-edge governance research projects and contribute to policy development across East Africa.",
    //   benefits: [
    //     "Monthly stipend of $1,500",
    //     "Research mentorship from senior experts",
    //     "Access to CEPA's research network",
    //     "Publication opportunities",
    //     "Conference presentation support"
    //   ],
    //   requirements: [
    //     "Master's degree in relevant field",
    //     "2+ years research experience",
    //     "Strong analytical skills",
    //     "Commitment to governance research"
    //   ],
    //   applicationDeadline: "March 15, 2024",
    //   startDate: "June 1, 2024",
    //   isOpen: true
    // },
  ];

  const fellowshipTypes = [
    {
      icon: BookOpen,
      title: "Research Fellowships",
      description: "Deep dive into policy research and analysis",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Community Fellowships",
      description: "Work directly with communities and civil society",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Globe,
      title: "Regional Fellowships",
      description: "Cross-border policy and governance work",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Award,
      title: "Leadership Fellowships",
      description: "Advanced programs for experienced professionals",
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Fellowship Programs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Join our fellowship programs and contribute to strengthening governance and democracy across East Africa. Work with leading experts and make a lasting impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-900 border border-yellow-500/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  View Open Programs
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-900 border border-green-500/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  Application Guide
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fellowship Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Fellowships</h2>
            <p className="text-lg text-gray-600">Choose the fellowship that aligns with your interests and career goals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {fellowshipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <type.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Current Programs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Fellowship Programs</h2>
            <p className="text-lg text-gray-600">Explore our available fellowship opportunities</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {fellowshipPrograms.length > 0 ? fellowshipPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                          <Badge 
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              program.isOpen 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            {program.isOpen ? 'Open' : 'Closed'}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                            {program.type}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-6 text-lg">{program.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                            <ul className="space-y-2">
                              {program.benefits.length > 0 ? program.benefits.map((benefit: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                  <span className="text-green-500 mt-1">•</span>
                                  {benefit}
                                </li>
                              )) : (
                                <li className="flex items-start gap-2 text-gray-600">
                                  <span className="text-green-500 mt-1">•</span>
                                  No benefits available at the moment.
                                </li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {program.requirements.length > 0 ? program.requirements.map((requirement: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                  <span className="text-blue-500 mt-1">•</span>
                                  {requirement}
                                </li>
                              )) : (
                                <li className="flex items-start gap-2 text-gray-600">
                                  <span className="text-blue-500 mt-1">•</span>
                                  No requirements available at the moment.
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:w-80">
                        <div className="bg-white/30 border border-white/40 backdrop-blur-sm rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Program Details</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium text-gray-900">{program.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-medium text-gray-900">{program.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Application Deadline</p>
                                <p className="font-medium text-gray-900">{program.applicationDeadline}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="text-sm text-gray-500">Start Date</p>
                                <p className="font-medium text-gray-900">{program.startDate}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            {program.isOpen ? (
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
                                Apply Now
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button 
                                disabled
                                className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-md cursor-not-allowed"
                              >
                                Applications Closed
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="text-center text-gray-600">
                No fellowship programs available at the moment.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600">Follow these steps to apply for a fellowship</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                step: "01",
                title: "Review Programs",
                description: "Explore available fellowship programs and identify the best fit for your interests and qualifications."
              },
              {
                step: "02",
                title: "Prepare Application",
                description: "Gather required documents including CV, cover letter, research proposal, and references."
              },
              {
                step: "03",
                title: "Submit Application",
                description: "Complete the online application form and upload all required documents before the deadline."
              },
              {
                step: "04",
                title: "Interview & Selection",
                description: "Shortlisted candidates will be invited for interviews with our selection committee."
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-yellow-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
            >
              Ready to Start Your Fellowship Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Join our community of fellows and contribute to strengthening governance and democracy across East Africa.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  View Application Guide
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/get-involved/contact">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                  >
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
