import React from 'react';
import { Users, Target, Award, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  const stats = [
    { label: 'Active Job Seekers', value: '50,000+', icon: Users },
    { label: 'Jobs Posted Monthly', value: '10,000+', icon: Target },
    { label: 'Successful Placements', value: '25,000+', icon: Award },
    { label: 'Company Partners', value: '5,000+', icon: Heart },
  ];

  const values = [
    {
      title: 'Flexibility First',
      description: 'We believe work should fit your life, not the other way around. Our platform connects you with opportunities that respect your schedule and priorities.',
      icon: '🕐'
    },
    {
      title: 'Quality Connections',
      description: 'We carefully vet employers and opportunities to ensure you find meaningful work with companies that value part-time talent.',
      icon: '🤝'
    },
    {
      title: 'Career Growth',
      description: 'Part-time doesn\'t mean limited potential. We help you build skills, gain experience, and advance your career on your terms.',
      icon: '📈'
    },
    {
      title: 'Community Support',
      description: 'Join a community of like-minded professionals who understand the unique challenges and opportunities of flexible work.',
      icon: '🌟'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former HR executive with 15+ years experience in talent acquisition and workplace flexibility.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Tech veteran who built scalable platforms at Fortune 500 companies, passionate about connecting talent with opportunity.',
      image: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Partnerships',
      bio: 'Relationship builder who works with companies to create inclusive, flexible work opportunities.',
      image: '👩‍🤝‍👨'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'UX expert focused on creating intuitive experiences that make job searching and hiring effortless.',
      image: '👨‍🎨'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Redefining Work
              <span className="block text-yellow-300">For Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              We're on a mission to make flexible, part-time work accessible to everyone. 
              Because great talent shouldn't be limited by traditional 9-to-5 constraints.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in 2020 by a team of HR professionals and tech innovators who experienced 
                firsthand the challenges of finding quality part-time work.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem We Saw</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Traditional job boards were built for full-time positions. Part-time workers faced 
                  limited options, unclear expectations, and employers who didn't understand the value 
                  of flexible talent. We knew there had to be a better way.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  We created a platform specifically designed for part-time work, where flexibility 
                  is celebrated, not compromised. Every feature is built with the unique needs of 
                  part-time workers and forward-thinking employers in mind.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">What Makes Us Different</h4>
                <ul className="space-y-3">
                  {[
                    'Exclusively focused on part-time and flexible opportunities',
                    'Transparent salary ranges and time commitments',
                    'Employer verification and quality standards',
                    'Career development resources for part-time professionals',
                    'Community support and networking opportunities'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we do, from product development to customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-8">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse group of professionals united by our passion for creating 
              better work opportunities for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Whether you're looking for flexible work or seeking talented part-time professionals, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="inline-flex items-center">
              Find Your Next Opportunity
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Post a Job
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;