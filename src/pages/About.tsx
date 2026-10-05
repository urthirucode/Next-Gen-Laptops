import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Gauge, Award, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';

export const About: React.FC = () => {
  return (
    <PageContainer className="py-12 lg:py-20 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider">
          ABOUT NEXTGEN LAPTOPS
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F5F5]">
          Hardware Curated by Engineers, Not Algorithms.
        </h1>
        <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
          Most consumer marketplaces list laptops with ambiguous specification sheets—hiding GPU Total Graphics Power (TGP), display color gamut, and memory channel topology. NextGen Laptops was built to give gaming enthusiasts, AI researchers, and software architects full transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Gauge className="w-5 h-5 text-[#00E5FF]" />,
            title: 'Unthrottled TGP Disclosure',
            desc: 'Every GPU listing specifies exact wattage limits (up to 175W Dynamic Boost) and MUX switch routing.'
          },
          {
            icon: <Cpu className="w-5 h-5 text-[#00E5FF]" />,
            title: '48-Point Thermal QC',
            desc: 'Before dispatch, systems undergo sustained Cinebench R23 and 3DMark Time Spy stress verification.'
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />,
            title: 'Zero Dead-Pixel Guarantee',
            desc: 'All OLED and Mini-LED panels are color-verified with X-Rite spectrophotometers prior to shipping.'
          },
          {
            icon: <Award className="w-5 h-5 text-[#00E5FF]" />,
            title: 'Direct OEM Enterprise Support',
            desc: 'Authorized tier-1 partner for ASUS ROG, Lenovo ThinkPad/Legion, MSI, HP ZBook, Dell XPS, and Acer Predator.'
          }
        ].map((item) => (
          <div
            key={item.title}
            className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 space-y-3"
          >
            <div className="w-10 h-10 rounded-md bg-[#181818] border border-[#2A2A2A] flex items-center justify-center">
              {item.icon}
            </div>
            <h2 className="text-base font-bold text-[#F5F5F5]">{item.title}</h2>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="font-display text-2xl font-bold text-[#F5F5F5]">
            Ready to benchmark your next machine?
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            Use our side-by-side specification matrix to compare up to 4 workstation or gaming laptops simultaneously.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#00E5FF] text-[#121212] text-sm font-semibold rounded-md hover:bg-[#33ECFF] transition-colors"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/compare"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#202020] text-[#F5F5F5] border border-[#2A2A2A] text-sm font-medium rounded-md hover:border-[#00E5FF] transition-colors"
          >
            <span>Open Spec Matrix</span>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default About;
