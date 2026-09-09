// Centralized Trade Categories Registry for KaamChahiye Local Worker Marketplace

export const TRADE_CATEGORIES = [
  {
    id: 'carpentry',
    name: 'Carpentry',
    label: 'Carpenter / कारपेंटर',
    icon: 'handyman',
    count: '45+ Available',
    type: 'Local Trade',
    popular: true,
    description: 'Modular furniture, door/window frames, cabinet fitting, and structural woodwork.'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    label: 'Electrician / बिजली मिस्त्री',
    icon: 'electrical_services',
    count: '62+ Available',
    type: 'Technical Trade',
    popular: true,
    description: 'Residential & industrial wiring, DB box setup, invertors, and MCB installation.'
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    label: 'Plumber / प्लंबर',
    icon: 'plumbing',
    count: '38+ Available',
    type: 'Local Trade',
    popular: true,
    description: 'Sanitary line installation, leak repairs, CPVC piping, and water pump fittings.'
  },
  {
    id: 'masonry',
    name: 'Masonry',
    label: 'Mason / राजमिस्त्री',
    icon: 'foundation',
    count: '80+ Available',
    type: 'Local Trade',
    popular: true,
    description: 'Brickwork, concrete casting, wall plastering, foundation layout, and masonry.'
  },
  {
    id: 'helper',
    name: 'Helper',
    label: 'Labour Helper / हेल्पर',
    icon: 'group',
    count: '120+ Available',
    type: 'General Trade',
    popular: true,
    description: 'Site cleanup, material handling, excavation support, and general site assistance.'
  },
  {
    id: 'painting',
    name: 'Painting',
    label: 'Painter / पेंटर',
    icon: 'format_paint',
    count: '55+ Available',
    type: 'Local Trade',
    popular: true,
    description: 'Interior & exterior painting, texture coating, wall putty, and waterproof painting.'
  },
  {
    id: 'welding',
    name: 'Welding & Fabrication',
    label: 'Welder & Fabricator / वेल्डर व फैब्रिकेटर',
    icon: 'hardware',
    count: '42+ Available',
    type: 'Higher Trade',
    popular: true,
    description: 'Arc & MIG welding, MS grill/gate fabrication, structural steel work, and iron framing.'
  },
  {
    id: 'tile_marble',
    name: 'Tile & Marble',
    label: 'Tile & Marble Fitter / टाइल व मार्बल कारीगर',
    icon: 'grid_view',
    count: '34+ Available',
    type: 'Local Trade',
    popular: true,
    description: 'Vitrified floor tiling, granite kitchen slabs, marble polishing, and wall dado fitting.'
  },
  {
    id: 'pop_plastering',
    name: 'POP & Plastering',
    label: 'POP & Plaster Karigar / पीओपी मिस्त्री',
    icon: 'view_compact',
    count: '29+ Available',
    type: 'Local Trade',
    popular: true,
    description: 'Gypsum false ceiling, POP molding design, wall punning, and smooth finishing.'
  },
  {
    id: 'ac_hvac',
    name: 'AC & HVAC',
    label: 'AC & Fridge Technician / एसी टेक्नीशियन',
    icon: 'hvac',
    count: '28+ Available',
    type: 'Higher Technical Trade',
    popular: true,
    description: 'Split & cassette AC installation, compressor repairs, gas charging, and ducting.'
  },
  {
    id: 'fitter_machinist',
    name: 'Fitter & Machinist',
    label: 'Fitter & Turner / फिटर व टर्नर',
    icon: 'precision_manufacturing',
    count: '20+ Available',
    type: 'Higher Technical Trade',
    popular: false,
    description: 'Industrial machinery fitting, lathe machine operation, mechanical alignment, and lathe turning.'
  },
  {
    id: 'bar_bending',
    name: 'Bar Bending',
    label: 'Bar Bender & Steel Fixer / सरिया मिस्त्री',
    icon: 'line_weight',
    count: '48+ Available',
    type: 'Heavy Trade',
    popular: false,
    description: 'RCC pillar bar bending, beam mesh tying, slab reinforcement, and steel cutting.'
  },
  {
    id: 'aluminium_glass',
    name: 'Aluminium & Glass',
    label: 'Aluminium & Glass Fabricator / एल्युमिनियम कारीगर',
    icon: 'window',
    count: '24+ Available',
    type: 'Higher Trade',
    popular: false,
    description: 'Aluminium sliding window, glass partitions, structural glazing, and toughened glass.'
  },
  {
    id: 'solar_pump',
    name: 'Solar & Pump',
    label: 'Solar & Pump Technician / सोलर व पंप मिस्त्री',
    icon: 'solar_power',
    count: '16+ Available',
    type: 'Higher Technical Trade',
    popular: false,
    description: 'Rooftop solar panel installation, inverter wiring, submersible pump setup, and maintenance.'
  }
];

export const CATEGORY_NAMES = ['All', ...TRADE_CATEGORIES.map(t => t.name)];
