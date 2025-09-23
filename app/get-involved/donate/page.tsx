"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Users, 
  BookOpen, 
  Shield, 
  Globe,
  ArrowRight,
  Check,
  Star,
  Gift
} from "lucide-react";

export default function DonatePage() {
  const donationAmounts = [50000, 100000, 250000, 500000, 1000000];
  const impactAreas = [
    {
      icon: Building2,
      title: "Democracy & Governance",
      description: "Support research and advocacy for stronger democratic institutions",
      impact: "Your donation helps fund policy research, civic education, and governance reforms"
    },
    {
      icon: Users,
      title: "Youth Development",
      description: "Empower young people to engage in policy and governance",
      impact: "Funds youth parliament programs, leadership training, and civic engagement initiatives"
    },
    {
      icon: BookOpen,
      title: "Research & Publications",
      description: "Advance evidence-based policy research and analysis",
      impact: "Support publication of policy briefs, research reports, and academic papers"
    },
    {
      icon: Shield,
      title: "Human Rights Advocacy",
      description: "Protect and promote human rights across Uganda",
      impact: "Fund legal aid, rights monitoring, and advocacy campaigns"
    },
    {
      icon: Globe,
      title: "Regional Impact",
      description: "Extend CEPA's influence across East Africa",
      impact: "Support regional policy initiatives and cross-border collaboration"
    }
  ];

  const paymentMethods = [
    {
      icon: CreditCard,
      title: "Bank Transfer",
      description: "Direct bank transfer to CEPA account",
      details: "Account: 1234567890\nBank: Centenary Bank\nBranch: Kampala"
    },
    {
      icon: Smartphone,
      title: "Mobile Money",
      description: "Quick and secure mobile payments",
      details: "MTN: 0772 123 456\nAirtel: 0756 789 012\nEquity: 0789 456 123"
    },
    {
      icon: Building2,
      title: "Corporate Partnership",
      description: "Long-term partnership opportunities",
      details: "Contact us for corporate sponsorship and partnership programs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/donate-hero.jpg" 
          alt="Support CEPA - Donate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Support Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              Your donation helps CEPA strengthen governance, promote democracy, and advance human rights across Uganda and East Africa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Methods</h2>
            <p className="text-lg text-gray-600">Choose your preferred way to donate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{method.details}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Impact Areas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Where Your Donation Goes</h2>
            <p className="text-lg text-gray-600">Support specific areas of CEPA's work</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {impactAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <area.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm text-green-800 font-medium">{area.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Join thousands of supporters who are helping CEPA strengthen governance and promote democracy across Uganda and East Africa.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg cursor-pointer"
              onClick={() => {
                window.location.href = '/get-involved/contact';
              }}
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
