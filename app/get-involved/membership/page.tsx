"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe, BookOpen, Calendar, Mail, Check, Star, Crown, ArrowRight, ExternalLink } from "lucide-react";

export default function MembershipPage() {
  const membershipTiers = [
    {
      id: 1,
      name: "Individual Member",
      price: "Free",
      period: "Annual",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
      description: "Perfect for individuals interested in governance and policy research",
      features: [
        "Access to CEPA publications and research",
        "Monthly newsletter and updates",
        "Invitation to public events and webinars",
        "Networking opportunities",
        "Access to online resources library",
        "Participation in policy discussions"
      ],
      isPopular: false,
      isRecommended: false
    },
    {
      id: 2,
      name: "Professional Member",
      price: "$50",
      period: "Annual",
      icon: Award,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200",
      description: "Ideal for professionals working in governance, policy, and development",
      features: [
        "All Individual Member benefits",
        "Priority access to research reports",
        "Exclusive professional development workshops",
        "Mentorship opportunities",
        "Access to member-only events",
        "Research collaboration opportunities",
        "Policy brief distribution",
        "Professional networking directory"
      ],
      isPopular: true,
      isRecommended: false
    },
    {
      id: 3,
      name: "Institutional Member",
      price: "$200",
      period: "Annual",
      icon: Globe,
      color: "bg-yellow-100 text-yellow-600",
      borderColor: "border-yellow-200",
      description: "Designed for organizations, NGOs, and academic institutions",
      features: [
        "All Professional Member benefits",
        "Up to 5 staff members included",
        "Custom research and policy analysis",
        "Institutional partnership opportunities",
        "Co-branded publications and events",
        "Priority consultation services",
        "Access to CEPA's expert network",
        "Collaborative research projects",
        "Policy advocacy support"
      ],
      isPopular: false,
      isRecommended: true
    }
  ];

  const membershipBenefits = [
    {
      icon: BookOpen,
      title: "Research Access",
      description: "Get early access to our latest research publications, policy briefs, and analysis reports.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with like-minded professionals, researchers, and policy makers across East Africa.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Calendar,
      title: "Events & Workshops",
      description: "Attend exclusive events, workshops, and training sessions on governance and policy.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Globe,
      title: "Regional Impact",
      description: "Contribute to policy development and governance strengthening across the region.",
      color: "bg-red-100 text-red-600"
    }
  ];

  const membershipStats = [
    {
      number: "500+",
      label: "Active Members",
      description: "Individuals and organizations"
    },
    {
      number: "25+",
      label: "Countries",
      description: "Across East Africa and beyond"
    },
    {
      number: "100+",
      label: "Events",
      description: "Workshops and conferences annually"
    },
    {
      number: "50+",
      label: "Publications",
      description: "Research reports and policy briefs"
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
              Join CEPA Membership
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Become part of our community of governance professionals, researchers, and policy advocates working to strengthen democracy across East Africa.
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
                  Join Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-900 border border-green-500/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Membership Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community</h2>
            <p className="text-lg text-gray-600">Join a growing network of governance professionals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {membershipStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Benefits</h2>
            <p className="text-lg text-gray-600">What you get as a CEPA member</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {membershipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <benefit.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Membership</h2>
            <p className="text-lg text-gray-600">Select the membership tier that best fits your needs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                {tier.isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Recommended
                    </Badge>
                  </div>
                )}
                <Card className={`bg-white/20 border ${tier.borderColor} backdrop-blur-sm hover:bg-white/30 transition-all duration-300 h-full ${
                  tier.isPopular ? 'ring-2 ring-green-200' : ''
                }`}>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <tier.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                        <span className="text-gray-600 ml-2">/{tier.period}</span>
                      </div>
                      <p className="text-gray-600">{tier.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                        tier.isPopular 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : tier.isRecommended
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {tier.price === "Free" ? "Join Free" : "Join Now"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Join</h2>
            <p className="text-lg text-gray-600">Simple steps to become a CEPA member</p>
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
                title: "Choose Membership",
                description: "Select the membership tier that best fits your needs and interests."
              },
              {
                step: "02",
                title: "Complete Application",
                description: "Fill out the membership application form with your details and interests."
              },
              {
                step: "03",
                title: "Review & Approval",
                description: "Our team will review your application and notify you of the status."
              },
              {
                step: "04",
                title: "Welcome & Access",
                description: "Once approved, you'll receive welcome materials and access to member benefits."
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

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Common questions about CEPA membership</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                question: "What is the difference between membership tiers?",
                answer: "Individual membership is free and provides basic access to publications and events. Professional membership offers additional benefits like workshops and networking. Institutional membership is designed for organizations and includes custom research services."
              },
              {
                question: "How long does the membership last?",
                answer: "All memberships are annual and renew automatically. You can cancel or change your membership tier at any time."
              },
              {
                question: "Can I upgrade my membership later?",
                answer: "Yes, you can upgrade your membership at any time. The difference in fees will be prorated based on the remaining time in your current membership period."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit cards, bank transfers, and mobile money payments. All transactions are secure and processed through our payment partners."
              },
              {
                question: "Is there a student discount?",
                answer: "Yes, we offer a 50% discount on Professional membership for full-time students. Please provide your student ID during the application process."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/20 border border-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
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
              Ready to Join Our Community?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Become part of a network of professionals working to strengthen governance and democracy across East Africa.
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
                  Start Free Membership
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
