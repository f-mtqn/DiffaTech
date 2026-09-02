export const jobsData = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'Lui Company',
    companyLogo: 'L',
    location: 'Jakarta Selatan',
    workType: 'Remote (WFH)',
    salary: 'Rp 12.000.000 / bln',
    salaryRaw: 12000000,
    jobType: 'Full-Time',
    category: 'Design',
    disabilitySupport: 'Ramah Tunarungu & Tunadaksa',
    postedDate: '2 hari yang lalu',
    deadline: '20 September 2025',
    experience: '1 - 3 Tahun',
    education: 'D3 / S1 (Semua Jurusan)',
    quota: '3 Orang',
    description:
      'Kami mencari UI/UX Designer berbakat yang berdedikasi untuk merancang antarmuka produk digital yang inklusif, mudah diakses, dan human-centric. Anda akan berkolaborasi langsung dengan tim Product dan Engineering untuk menciptakan desain yang mematuhi standar aksesibilitas WCAG 2.1.',
    responsibilities: [
      'Merancang wireframe, user flow, dan interactive prototype menggunakan Figma.',
      'Melakukan riset pengguna dan usability testing bersama rekan-rekan disabilitas.',
      'Memastikan kontras warna, ukuran target sentuh (touch target), dan navigasi keyboard sesuai pedoman WCAG 2.1 AA.',
      'Mengembangkan dan memelihara Inklusif Design System perusahaan.',
      'Bekerja sama secara asinkron (remote-first) bersama tim developer frontend.'
    ],
    requirements: [
      'Pengalaman minimal 1 tahun di bidang UI/UX Design atau Product Design.',
      'Menguasai Figma, FigJam, dan tools prototyping modern.',
      'Memiliki pemahaman mengenai prinsip Accessibility (A11y) dan WCAG.',
      'Komunikasi tertulis yang baik dan mampu bekerja mandiri secara remote.',
      'Portofolio yang menunjukkan proses berpikir desain dan kepedulian terhadap kemudahan akses pengguna.'
    ],
    accessibilityPerks: [
      'Lingkungan kerja 100% Remote / Work From Anywhere (WFA).',
      'Disediakan live-captioning otomatis dan notifikasi berbasis visual dalam setiap meeting online.',
      'Tunjangan perlengkapan kerja ergonomis (kursi ortopedi, mouse vertikal, monitor khusus).',
      'Jam kerja fleksibel yang menyesuaikan waktu terapi atau istirahat medis.',
      'Budaya komunikasi berbasis teks (Slack/Notion) yang ramah tunarungu.'
    ],
    companyInfo: {
      name: 'Lui Company',
      industry: 'Teknologi & Produk Digital',
      size: '50 - 150 Karyawan',
      website: 'https://lui-company.tech',
      address: 'Cyber 2 Tower Lt. 18, Jl. H.R. Rasuna Said, Jakarta Selatan',
      verified: true
    }
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Tech Inklusif',
    companyLogo: 'T',
    location: 'Bandung',
    workType: 'Remote',
    salary: 'Rp 15.000.000 / bln',
    salaryRaw: 15000000,
    jobType: 'Full-Time',
    category: 'Engineering',
    disabilitySupport: 'Ramah Disleksia & Tunadaksa',
    postedDate: '1 hari yang lalu',
    deadline: '25 September 2025',
    experience: '2 - 4 Tahun',
    education: 'SMA / SMK / D3 / S1',
    quota: '2 Orang',
    description:
      'Tech Inklusif membuka kesempatan bagi Frontend Developer yang ingin berkontribusi langsung pada platform edukasi dan karier digital terbesar bagi penyandang disabilitas di Indonesia. Posisi ini terbuka lebar bagi talenta disabilitas dengan passion tinggi di bidang web development.',
    responsibilities: [
      'Membangun antarmuka web modern yang responsif dan cepat menggunakan React.js dan Tailwind CSS.',
      'Menerapkan semantic HTML5, ARIA roles, dan navigasi ramah screen reader.',
      'Mengoptimalkan performa halaman (Core Web Vitals) untuk aksesibilitas di berbagai koneksi internet.',
      'Melakukan code review dan pengujian aksesibilitas menggunakan axe-core atau Chrome Lighthouse.'
    ],
    requirements: [
      'Menguasai JavaScript / TypeScript, React.js, dan modern CSS (Tailwind).',
      'Paham implementasi WAI-ARIA dan pengujian dengan screen reader (NVDA / VoiceOver).',
      'Terbiasa dengan version control Git dan alur kerja CI/CD.',
      'Terbuka untuk penyandang disleksia (tersedia font dan tooling ramah disleksia seperti OpenDyslexic).'
    ],
    accessibilityPerks: [
      'Tooling kerja adaptif (lisensi software pembaca layar, keyboard mekanik khusus).',
      'Pilihan sistem kerja Full Remote atau Hybrid di kantor yang ramah kursi roda.',
      'Asuransi kesehatan komprehensif termasuk klaim alat bantu fisik.',
      'Mentor profesional yang siap mendampingi adaptasi teknologi kerja.'
    ],
    companyInfo: {
      name: 'Tech Inklusif',
      industry: 'Software & IT Services',
      size: '20 - 50 Karyawan',
      website: 'https://techinklusif.id',
      address: 'Dago Tech Park Kav. 4, Coblong, Bandung',
      verified: true
    }
  },
  {
    id: 3,
    title: 'Quality Assurance Specialist',
    company: 'Blibli Inklusi',
    companyLogo: 'B',
    location: 'Jakarta Barat',
    workType: 'Full Remote',
    salary: 'Rp 10.500.000 / bln',
    salaryRaw: 10500000,
    jobType: 'Full-Time',
    category: 'Quality Assurance',
    disabilitySupport: 'Ramah Tunarungu & Netra Ringan',
    postedDate: '3 hari yang lalu',
    deadline: '28 September 2025',
    experience: '1 - 2 Tahun',
    education: 'D3 / S1',
    quota: '2 Orang',
    description:
      'Bertanggung jawab memastikan kualitas produk aplikasi web dan mobile kami berjalan tanpa kendala, dengan fokus khusus pada fungsionalitas dan pengujian aksesibilitas bagi pengguna berkebutuhan khusus.',
    responsibilities: [
      'Menyusun test cases, test scenarios, dan melakukan manual testing pada fitur baru.',
      'Mengidentifikasi dan melaporkan bug serta kendala aksesibilitas ke tim engineer.',
      'Memverifikasi kepatuhan aplikasi terhadap standar inklusi digital nasional.'
    ],
    requirements: [
      'Memahami metodologi software testing (black box / white box).',
      'Mampu menyusun dokumentasi bug report yang terstruktur dan detail.',
      'Familiar dengan tools seperti Jira, Postman, dan Browser DevTools.'
    ],
    accessibilityPerks: [
      'Komunikasi tim 100% tertulis dan didokumentasikan di platform kolaborasi.',
      'Fasilitas monitor ukuran besar dan kontras tinggi bagi talenta low-vision.',
      'Tunjangan koneksi internet rumah dan perangkat laptop standar enterprise.'
    ],
    companyInfo: {
      name: 'Blibli Inklusi',
      industry: 'E-Commerce & Logistik',
      size: '1000+ Karyawan',
      website: 'https://blibli.com',
      address: 'Jl. Palmerah Barat No. 32, Jakarta Barat',
      verified: true
    }
  },
  {
    id: 4,
    title: 'Content Specialist & Copywriter',
    company: 'Bukalapak',
    companyLogo: 'B',
    location: 'Jakarta Selatan',
    workType: 'Remote',
    salary: 'Rp 9.000.000 / bln',
    salaryRaw: 9000000,
    jobType: 'Full-Time',
    category: 'Marketing',
    disabilitySupport: 'Ramah Tunadaksa & Sensorik',
    postedDate: '4 hari yang lalu',
    deadline: '30 September 2025',
    experience: '1 - 3 Tahun',
    education: 'Semua Latar Belakang',
    quota: '1 Orang',
    description:
      'Menulis konten artikel, copywriting kampanye inklusi, serta mikro-kopi produk aplikasi yang ramah dan mudah dipahami oleh seluruh segmen pengguna di Indonesia.',
    responsibilities: [
      'Menulis teks antarmuka (UX writing) yang inklusif dan tidak menggunakan bahasa yang mendiskriminasi.',
      'Memproduksi konten media sosial dan newsletter seputar edukasi disabilitas dan teknologi.',
      'Bekerjasama dengan tim desain grafis untuk menyusun teks alternatif (Alt Text) yang deskriptif.'
    ],
    requirements: [
      'Kemampuan menulis Bahasa Indonesia dan Inggris yang baik, empati tinggi.',
      'Memahami kaidah penulisan Alt Text ramah screen reader.',
      'Mampu mengelola jadwal publikasi konten mandiri.'
    ],
    accessibilityPerks: [
      'Kerja fleksibel tanpa kewajiban jam kantor tetap.',
      'Dukungan perangkat lunak voice-to-text atau asisten ketik bagi tunadaksa.',
      'Akses ke kursus kepenulisan dan sertifikasi komunikasi inklusif gratis.'
    ],
    companyInfo: {
      name: 'Bukalapak',
      industry: 'E-Commerce & Tech Marketplace',
      size: '500 - 1000 Karyawan',
      website: 'https://bukalapak.com',
      address: 'Metropolitan Tower, Cilandak Barat, Jakarta Selatan',
      verified: true
    }
  },
  {
    id: 5,
    title: 'Junior Data Analyst',
    company: 'Gojek Nusantara',
    companyLogo: 'G',
    location: 'Jakarta Selatan',
    workType: 'WFH Fleksibel',
    salary: 'Rp 13.000.000 / bln',
    salaryRaw: 13000000,
    jobType: 'Full-Time',
    category: 'Data',
    disabilitySupport: 'Akses Kursi Roda & Lift Khusus',
    postedDate: '5 hari yang lalu',
    deadline: '15 September 2025',
    experience: 'Fresh Graduate / 1 Tahun',
    education: 'D3 / S1 Jurusan Terkait',
    quota: '1 Orang',
    description:
      'Menganalisis tren data operasional dan perilaku pengguna untuk menghasilkan wawasan strategis dalam pengambilan keputusan produk dan perluasan akses layanan bagi mitra disabilitas.',
    responsibilities: [
      'Mengekstrak dan membersihkan data menggunakan SQL dan Python/R.',
      'Membangun dashboard visualisasi data interaktif menggunakan Tableau / Google Looker Studio.',
      'Menyajikan laporan temuan data kepada tim manajemen produk.'
    ],
    requirements: [
      'Mahir menggunakan SQL dan spreadsheet (Excel / Google Sheets).',
      'Memahami dasar-dasar visualisasi data dan statistik bisnis.',
      'Ketelitian tinggi dan kemampuan memecahkan masalah berbasis data.'
    ],
    accessibilityPerks: [
      'Gedung kantor Gojek berstandar aksesibilitas internasional (ramp landai, pintu otomatis, toilet disabilitas).',
      'Disediakan shuttle jemputan khusus atau tunjangan transportasi ramah disabilitas.',
      'Asuransi kesehatan lengkap bagi karyawan dan keluarga.'
    ],
    companyInfo: {
      name: 'Gojek Nusantara',
      industry: 'Ride-Hailing & On-Demand Services',
      size: '1000+ Karyawan',
      website: 'https://gojek.com',
      address: 'Pasaraya Grande Blok M Lt. 6-7, Jakarta Selatan',
      verified: true
    }
  }
];
