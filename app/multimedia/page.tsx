import React from "react";
import Link from "next/link";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";

const Multimedia: React.FC = () => {
  const multimediaContent = [
    {
      id: "podcasts",
      title: "Podcasts",
      icon: "🎧",
      description: "Listen to our policy discussions, interviews with experts, and analysis of current governance issues.",
      items: [
        { title: "Parliamentary Watch Weekly", date: "December 15, 2024", duration: "45 min" },
        { title: "Climate Justice in Uganda", date: "December 10, 2024", duration: "32 min" },
        { title: "AI and Governance", date: "December 5, 2024", duration: "38 min" }
      ]
    },
    {
      id: "videos",
      title: "Videos",
      icon: "🎥",
      description: "Watch our conference recordings, policy briefings, and educational content on governance issues.",
      items: [
        { title: "Governance Forum 2024 Highlights", date: "November 2024", duration: "2:15:30" },
        { title: "Transparency in Government", date: "October 2024", duration: "1:45:20" },
        { title: "Human Rights Advocacy Training", date: "September 2024", duration: "1:20:15" }
      ]
    },
    {
      id: "gallery",
      title: "Gallery",
      icon: "📸",
      description: "Photos from our events, activities, and field work across Uganda.",
      items: [
        { title: "Parliamentary Monitoring Session", date: "December 2024", type: "Event Photos" },
        { title: "Community Engagement Workshop", date: "November 2024", type: "Workshop Photos" },
        { title: "Policy Research Field Work", date: "October 2024", type: "Field Photos" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section background="blue" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Multimedia
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            Explore our podcasts, videos, and photo galleries to learn more about our work and impact.
          </p>
        </div>
      </Section>

      {/* Multimedia Content */}
      <Section>
        <div className="space-y-16">
          {multimediaContent.map((category, index) => (
            <div key={category.id} id={category.id} className="scroll-mt-20">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-5xl mr-4">{category.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} hover className="p-6 bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {(item as any).duration || (item as any).type}
                      </span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.title}</h3>
                    <Button variant="outline" size="sm" className="w-full bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                      {category.id === 'gallery' ? 'View Gallery' : 'Watch/Listen'}
                    </Button>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="primary">
                  View All {category.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Content */}
      <Section background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Featured Content
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't miss our most popular and impactful multimedia content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 bg-white/20 border border-white/30 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">🎧</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Featured Podcast</h3>
                <p className="text-sm text-gray-500">Most Popular Episode</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              &ldquo;The Future of Democracy in Uganda&rdquo;
            </h4>
            <p className="text-gray-600 mb-4">
              An in-depth discussion with leading experts on the challenges and opportunities facing Uganda's democratic institutions.
            </p>
            <Button variant="primary" size="sm">
              Play Now
            </Button>
          </Card>
          
          <Card className="p-8 bg-white/20 border border-white/30 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">🎥</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Featured Video</h3>
                <p className="text-sm text-gray-500">Most Watched</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              &ldquo;Parliamentary Oversight in Action&rdquo;
            </h4>
            <p className="text-gray-600 mb-4">
              A comprehensive look at how parliamentary oversight mechanisms work in practice and their impact on governance.
            </p>
            <Button variant="primary" size="sm">
              Watch Now
            </Button>
          </Card>
        </div>
      </Section>

      {/* Call to Action */}
      <section className="py-20 text-white text-center" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Subscribe to our channels to get notified about new multimedia content and stay updated with our latest work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources#newsletters">
              <Button size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
                Subscribe to Newsletter
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Multimedia;