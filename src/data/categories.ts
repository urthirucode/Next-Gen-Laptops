export interface CategorySpotlight {
  id: string;
  title: string;
  subtitle: string;
  metrics: string;
  queryParams: string;
  featuredSpec: string;
}

export const CATEGORY_SPOTLIGHTS: CategorySpotlight[] = [
  {
    id: 'gaming',
    title: 'Esports & AAA Gaming',
    subtitle: 'Full-TGP RTX 40-Series GPUs with MUX Switches, liquid metal cooling, and 240Hz OLED/Mini-LED panels.',
    metrics: 'Up to 175W TGP · 240Hz G-SYNC',
    queryParams: '?useCase=gaming',
    featuredSpec: 'RTX 4060 – RTX 4090'
  },
  {
    id: 'ai-ml',
    title: 'AI & Neural Engineering',
    subtitle: 'High-VRAM CUDA architectures and dedicated NPU silicon engineered for local LLM quantization and training.',
    metrics: 'Up to 686 AI TOPS · 64GB DDR5',
    queryParams: '?useCase=ai-ml',
    featuredSpec: '12GB–16GB VRAM + NPU'
  },
  {
    id: 'development',
    title: 'Software Architecture',
    subtitle: 'Linux-certified workstations with 16:10 high-DPI displays, tactile keyboards, and multi-core compilation throughput.',
    metrics: 'Up to 24 Cores · 19h Battery',
    queryParams: '?useCase=development',
    featuredSpec: '32GB–64GB LPDDR5X'
  },
  {
    id: 'business',
    title: 'Executive & Enterprise',
    subtitle: 'Featherweight CNC aluminum and carbon-fiber ultrabooks with hardware security and multi-day endurance.',
    metrics: 'From 1.20 kg · MIL-STD-810H',
    queryParams: '?useCase=business',
    featuredSpec: 'Thunderbolt 4 · OLED'
  }
];
