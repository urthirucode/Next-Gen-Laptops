import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [workload, setWorkload] = useState('AI / ML Local LLM Workstation');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer className="py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-2">
              TECHNICAL CONSULTATION & B2B
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
              Speak With a Systems Architect
            </h1>
            <p className="text-sm text-[#A3A3A3] mt-3 leading-relaxed">
              Need custom RAM/NVMe RAID upgrades, Ubuntu Linux pre-installation, or bulk enterprise fleet pricing? Our hardware engineers respond within 4 business hours.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#2A2A2A] text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#F5F5F5]">Bengaluru Flagship Lab & Showroom</div>
                <div className="text-xs text-[#A3A3A3] mt-0.5">
                  Level 4, Lavelle Road Hardware Studio, Bengaluru, KA 560001
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#00E5FF] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#F5F5F5]">Direct Technical Desk</div>
                <div className="text-xs font-mono-tech text-[#A3A3A3] mt-0.5">
                  +91 (080) 4892-6600 · Mon–Sat, 10:00–20:00 IST
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#00E5FF] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#F5F5F5]">Enterprise Procurement</div>
                <div className="text-xs font-mono-tech text-[#A3A3A3] mt-0.5">
                  architects@nextgenlaptops.in
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto" />
              <h2 className="text-xl font-bold text-[#F5F5F5]">
                Consultation Request Logged
              </h2>
              <p className="text-sm text-[#A3A3A3] max-w-md mx-auto">
                Thank you, {name}. A Senior Hardware Engineer has been assigned to your inquiry ({workload}) and will reach out to {email}.
              </p>
              <Button variant="secondary" onClick={() => setSubmitted(false)}>
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-[#F5F5F5] pb-2 border-b border-[#2A2A2A]">
                Request Custom Quote or Architecture Advice
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-[#A3A3A3] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vikram Rao"
                    className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-[#A3A3A3] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@company.com"
                    className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-workload" className="block text-xs text-[#A3A3A3] mb-1.5">
                  Primary Workload / Inquiry Type
                </label>
                <select
                  id="contact-workload"
                  value={workload}
                  onChange={(e) => setWorkload(e.target.value)}
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
                >
                  <option>AI / ML Local LLM Workstation</option>
                  <option>AAA Gaming & High-Refresh Esports</option>
                  <option>Linux / Full-Stack Development</option>
                  <option>Enterprise Fleet Bulk Procurement (5+ Units)</option>
                  <option>Warranty & Order Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-[#A3A3A3] mb-1.5">
                  Technical Requirements & Target Budget *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your required VRAM, memory capacity, Linux compatibility, or fleet size..."
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
                />
              </div>

              <Button type="submit" variant="primary" size="lg">
                Submit Technical Inquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Contact;
