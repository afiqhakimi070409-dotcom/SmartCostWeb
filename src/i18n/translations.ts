export const SMARTCOST_SYSTEM_URL = 'https://smartcost.ai.studio';

export type Language = 'ms' | 'en';
export type PageId = 'utama' | 'perkhidmatan' | 'bantuan' | 'mengenai';

export interface MaterialRow {
  id: string;
  name: { ms: string; en: string };
  bulkPrice: number;
  bulkQuantity: number;
  unit: 'g' | 'ml' | 'unit';
  usedQuantity: number;
}

export interface RecipePreset {
  id: string;
  label: { ms: string; en: string };
  productName: { ms: string; en: string };
  batchYield: number;
  packagingCost: number;
  utilityLaborCost: number;
  profitMargin: number;
  materials: MaterialRow[];
}

export const RECIPE_PRESETS: RecipePreset[] = [
  {
    id: 'kek-coklat',
    label: { ms: 'Kek Coklat Moist', en: 'Moist Chocolate Cake' },
    productName: { ms: 'Kek Coklat Moist (Bekas)', en: 'Moist Chocolate Cake (Tub)' },
    batchYield: 10,
    packagingCost: 4.5,
    utilityLaborCost: 2.0,
    profitMargin: 40,
    materials: [
      {
        id: 'm1',
        name: { ms: 'Tepung Gandum', en: 'Wheat Flour' },
        bulkPrice: 3.8,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 500,
      },
      {
        id: 'm2',
        name: { ms: 'Mentega Tulen', en: 'Pure Butter' },
        bulkPrice: 12.5,
        bulkQuantity: 250,
        unit: 'g',
        usedQuantity: 200,
      },
      {
        id: 'm3',
        name: { ms: 'Susu Pekat Manis', en: 'Condensed Milk' },
        bulkPrice: 3.6,
        bulkQuantity: 500,
        unit: 'ml',
        usedQuantity: 250,
      },
      {
        id: 'm4',
        name: { ms: 'Serbuk Koko', en: 'Cocoa Powder' },
        bulkPrice: 16.0,
        bulkQuantity: 500,
        unit: 'g',
        usedQuantity: 120,
      },
    ],
  },
  {
    id: 'sambal-bilis',
    label: { ms: 'Sambal Bilis Rangup', en: 'Crispy Anchovy Sambal' },
    productName: {
      ms: 'Sambal Bilis Rangup (Balang 200g)',
      en: 'Crispy Anchovy Sambal (200g Jar)',
    },
    batchYield: 15,
    packagingCost: 18.0,
    utilityLaborCost: 12.0,
    profitMargin: 45,
    materials: [
      {
        id: 's1',
        name: { ms: 'Ikan Bilis Kopek', en: 'Peeled Anchovies' },
        bulkPrice: 42.0,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 1500,
      },
      {
        id: 's2',
        name: { ms: 'Cili Kering', en: 'Dried Chilies' },
        bulkPrice: 18.0,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 450,
      },
      {
        id: 's3',
        name: { ms: 'Bawang Merah', en: 'Shallots' },
        bulkPrice: 8.5,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 600,
      },
      {
        id: 's4',
        name: { ms: 'Minyak Masak', en: 'Cooking Oil' },
        bulkPrice: 31.0,
        bulkQuantity: 5000,
        unit: 'ml',
        usedQuantity: 900,
      },
    ],
  },
  {
    id: 'kopi-botol',
    label: { ms: 'Kopi Susu Botol', en: 'Bottled Latte' },
    productName: {
      ms: 'Kopi Susu Artisan (250ml)',
      en: 'Artisan Bottled Latte (250ml)',
    },
    batchYield: 20,
    packagingCost: 22.0,
    utilityLaborCost: 10.0,
    profitMargin: 50,
    materials: [
      {
        id: 'k1',
        name: { ms: 'Biji Kopi Arabica', en: 'Arabica Coffee Beans' },
        bulkPrice: 68.0,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 400,
      },
      {
        id: 'k2',
        name: { ms: 'Susu Segar Penuh Krim', en: 'Full Cream Fresh Milk' },
        bulkPrice: 7.9,
        bulkQuantity: 1000,
        unit: 'ml',
        usedQuantity: 3600,
      },
      {
        id: 'k3',
        name: { ms: 'Sirap Gula Melaka', en: 'Palm Sugar Syrup' },
        bulkPrice: 14.0,
        bulkQuantity: 1000,
        unit: 'ml',
        usedQuantity: 450,
      },
    ],
  },
  {
    id: 'sabun-herba',
    label: { ms: 'Sabun Herba Organik', en: 'Organic Herbal Soap' },
    productName: {
      ms: 'Sabun Herba Semula Jadi (100g)',
      en: 'Natural Herbal Soap (100g)',
    },
    batchYield: 12,
    packagingCost: 10.8,
    utilityLaborCost: 8.5,
    profitMargin: 55,
    materials: [
      {
        id: 'h1',
        name: { ms: 'Asas Sabun Gliserin', en: 'Glycerin Soap Base' },
        bulkPrice: 28.0,
        bulkQuantity: 1000,
        unit: 'g',
        usedQuantity: 1200,
      },
      {
        id: 'h2',
        name: { ms: 'Minyak Pati Serai', en: 'Lemongrass Essential Oil' },
        bulkPrice: 36.0,
        bulkQuantity: 100,
        unit: 'ml',
        usedQuantity: 30,
      },
      {
        id: 'h3',
        name: { ms: 'Serbuk Oat Halus', en: 'Fine Oat Powder' },
        bulkPrice: 12.0,
        bulkQuantity: 500,
        unit: 'g',
        usedQuantity: 80,
      },
    ],
  },
];

export const TRANSLATIONS = {
  ms: {
    metaTitle: 'SmartCost — Sistem Pengiraan Kos Produk Digital',
    metaDescription:
      'Sistem digital untuk membantu peniaga mengira kos barangan, mengawal perbelanjaan tersembunyi, dan menetapkan harga jualan yang tepat.',
    skipToContent: 'Langkau ke kandungan',
    nav: {
      mainAria: 'Navigasi Utama',
      mobileAria: 'Navigasi Mudah Alih',
      quickAria: 'Pautan Pantas',
      homeAria: 'SmartCost Halaman Utama',
      items: [
        { id: 'utama' as PageId, label: 'Halaman Utama' },
        { id: 'perkhidmatan' as PageId, label: 'Perkhidmatan' },
        { id: 'bantuan' as PageId, label: 'Bantuan' },
        { id: 'mengenai' as PageId, label: 'Mengenai Kami' },
      ],
      trySystem: 'Cuba Sistem',
      trySystemFull: 'Cuba Sistem Sekarang',
      openMenu: 'Buka menu navigasi',
      closeMenu: 'Tutup menu navigasi',
      langLabel: 'Bahasa',
    },
    home: {
      kicker: 'SISTEM PENGEKOSAN PRODUK PKS',
      headline: 'Kira Kos Produk Dengan Mudah, Perniagaan Lebih Untung.',
      subheadline:
        'Sistem digital untuk membantu peniaga mengira kos bahan mentah, mengawal perbelanjaan tersembunyi, dan menetapkan harga jualan yang tepat.',
      ctaPrimary: 'Cuba Sistem Sekarang',
      ctaSecondary: 'Terokai Perkhidmatan',
      calcCardLabel: 'KALKULATOR KOS LANGSUNG',
      calcCardTitle: 'Contoh Kiraan: Kek Coklat Moist',
      calcCardYield: 'Keluaran 10 unit',
      calcSteps: [
        {
          step: '01',
          label: 'Pembelian pukal (Serbuk Koko)',
          formula: 'RM 16.00 / 500g',
        },
        {
          step: '02',
          label: 'Guna resipi',
          formula: '120g = RM 3.84',
        },
        {
          step: '03',
          label: 'Jumlah bahan + kos tambahan (10 unit)',
          formula: 'RM 17.50 + RM 6.50',
        },
      ],
      calcUnitCostLabel: 'Kos pengeluaran seunit',
      calcMarginLabel: 'Margin sasaran',
      calcPriceLabel: 'Cadangan harga jualan',
      calcProfitNote: 'Untung bersih seunit',
      proofText:
        'Pencapaian Kami: Menerima pengiktirafan dan anugerah dalam pertandingan inovasi.',
      proofAction: 'Lihat Mengenai Kami',
      advantagesEyebrow: 'KELEBIHAN UTAMA',
      advantagesTitle: 'Pengurusan kos yang teratur untuk operasi harian.',
      advantagesSubtitle:
        'Menggantikan anggaran kasar dan pengiraan manual kepada sistem yang konsisten bagi peniaga kecil dan sederhana.',
      advantages: [
        {
          number: '01',
          title: 'Kiraan Pantas',
          description: 'Kiraan cepat mengikut sukatan kecil dalam gram atau mililiter.',
          detail: 'Penukaran automatik daripada harga belian pukal kepada kos sebenar resipi.',
        },
        {
          number: '02',
          title: 'Kawal Kos Tambahan',
          description:
            'Mengawal perbelanjaan tersembunyi seperti pembungkusan, sewa, upah, dan bil utiliti.',
          detail: 'Setiap kos operasi diagihkan supaya keuntungan bersih kekal tepat.',
        },
        {
          number: '03',
          title: 'Cadangan Harga Automatik',
          description:
            'Tetapkan peratusan keuntungan dan sistem mengira harga jualan secara automatik.',
          detail: 'Membantu peniaga menetapkan harga pasaran yang konsisten dan terjamin.',
        },
      ],
      architectureEyebrow: 'SENI BINA PENGEKOSAN',
      architectureTitle: 'Tiga peringkat pengiraan daripada bahan mentah kepada harga jualan.',
      architectureSubtitle:
        'Aliran data tersusun memastikan setiap sen kos langsung dan kos operasi diambil kira sebelum harga ditetapkan.',
      architectureSteps: [
        {
          step: '01',
          tag: 'INPUT PUKAL',
          title: 'Bahan Mentah',
          description:
            'Masukkan harga belian pukal pembekal dan kuantiti sukatan yang digunakan bagi setiap resipi.',
          metrics: [
            { label: 'Belian pukal', value: 'RM 16.00 / 500g' },
            { label: 'Guna resipi', value: '120g = RM 3.84' },
          ],
        },
        {
          step: '02',
          tag: 'KOS OPERASI',
          title: 'Kos Tambahan',
          description:
            'Rekod perbelanjaan pembungkusan, label, bil utiliti, sewa, dan upah pekerja mengikut kelompok.',
          metrics: [
            { label: 'Pembungkusan', value: 'RM 4.50 / kelompok' },
            { label: 'Utiliti & upah', value: 'RM 2.00 / kelompok' },
          ],
        },
        {
          step: '03',
          tag: 'PENETAPAN HARGA',
          title: 'Harga Jualan',
          description:
            'Sistem membahagikan jumlah kos mengikut bilangan unit dan mencadangkan harga jualan berdasarkan margin sasaran.',
          metrics: [
            { label: 'Kos seunit', value: 'RM 2.40' },
            { label: 'Cadangan jualan', value: 'RM 4.00 (40%)' },
          ],
        },
      ],
    },
    services: {
      breadcrumb: 'SmartCost / Perkhidmatan',
      title: 'Perkhidmatan SmartCost',
      subtitle:
        'Empat modul teras untuk mengira kos bahan mentah, mengurus kos tambahan, dan menetapkan harga jualan dengan tepat.',
      items: [
        {
          id: 'bahan-mentah',
          number: '01',
          title: 'Kira Kos Bahan Mentah',
          description:
            'Menukar harga belian pukal kepada kos penggunaan sebenar untuk setiap produk. Pengiraan menyokong sukatan kecil dalam gram, mililiter, atau unit.',
          specs: [
            'Penukaran unit automatik daripada belian pukal',
            'Kiraan semula serta-merta apabila harga bahan berubah',
            'Sokongan pelbagai bahan dalam satu resipi',
          ],
          iconName: 'scale' as const,
        },
        {
          id: 'kos-tambahan',
          number: '02',
          title: 'Urus Kos Tambahan',
          description:
            'Merekod kos utiliti, pembungkusan, sewa, dan upah pekerja dengan teratur. Setiap perbelanjaan tersembunyi diagihkan tepat kepada kos seunit produk.',
          specs: [
            'Kawalan kos pembungkusan dan label produk',
            'Agihan bil utiliti dan upah mengikut kelompok pengeluaran',
            'Mengelakkan ketirisan keuntungan akibat kos tidak direkod',
          ],
          iconName: 'receipt' as const,
        },
        {
          id: 'cadangan-harga',
          number: '03',
          title: 'Cadangan Harga Jualan',
          description:
            'Menetapkan margin keuntungan untuk mendapatkan harga pasaran yang sesuai. Peniaga dapat menilai anggaran untung bersih sebelum menjual.',
          specs: [
            'Pelarasan margin sasaran daripada 10% hingga 95%',
            'Unjuran untung bersih bagi skala 10 hingga 500 unit',
          ],
          iconName: 'trending' as const,
        },
        {
          id: 'muat-turun-laporan',
          number: '04',
          title: 'Muat Turun Laporan',
          description:
            'Menyimpan dan mencetak maklumat pengekosan dalam bentuk fail PDF atau Excel. Rekod tersusun memudahkan semakan kewangan perniagaan.',
          specs: [
            'Eksport fail CSV yang serasi dengan Microsoft Excel',
            'Format cetakan rasmi sedia untuk simpanan fail PDF',
          ],
          iconName: 'file' as const,
        },
      ],
      testAction: 'Uji Modul Dalam Sistem',
      downloadAction: 'Muat Turun Contoh Laporan (CSV)',
      visualizerEyebrow: 'PRATONTON SISTEM',
      visualizerTitle: 'Visualisasi Komposisi Kos',
      visualizerBody:
        'Lihat pecahan kos bahan mentah, pembungkusan, utiliti, serta untung bersih dalam satu paparan jadual dan carta interaktif sebelum menetapkan harga jualan.',
      visualizerSampleProduct: 'Kek Coklat Moist (10 unit)',
      unitSingular: 'unit',
      visualizerCta: 'Cuba Sistem',
    },
    help: {
      breadcrumb: 'SmartCost / Bantuan',
      title: 'Pusat Bantuan',
      subtitle:
        'Ikuti panduan tiga langkah penggunaan sistem, semak soalan lazim, atau hubungi pasukan sokongan kami.',
      stepsEyebrow: 'PANDUAN PENGGUNAAN',
      stepsTitle: 'Cara Guna - 3 Langkah Mudah',
      steps: [
        {
          stepLabel: 'Langkah 01',
          title: 'Senarai Bahan Mentah',
          description: 'Masukkan senarai harga belian pukal bahan mentah dan sukatan.',
        },
        {
          stepLabel: 'Langkah 02',
          title: 'Maklumat Produk & Resipi',
          description: 'Masukkan kuantiti penggunaan resipi, kos tambahan, dan bilangan unit.',
        },
        {
          stepLabel: 'Langkah 03',
          title: 'Jumlah Kos & Harga Jualan',
          description: 'Dapatkan kos seunit dan cadangan harga jualan mengikut margin.',
        },
      ],
      faqEyebrow: 'SOALAN LAZIM',
      faqTitle: 'Jawapan kepada persoalan utama pengguna.',
      faqs: [
        {
          id: 'faq-1',
          question: 'Adakah sistem ini boleh digunakan melalui telefon pintar?',
          answer: 'Ya, sistem ini mesra peranti mudah alih dan komputer.',
        },
        {
          id: 'faq-2',
          question: 'Bagaimana jika harga bahan mentah di pasaran berubah?',
          answer:
            'Anda hanya perlu kemas kini harga bahan tersebut, dan kos produk akan dikira semula secara automatik.',
        },
        {
          id: 'faq-3',
          question: 'Adakah maklumat perniagaan saya selamat?',
          answer: 'Ya, semua rekod disimpan dengan kawalan privasi yang terjamin.',
        },
      ],
      contactTitle: 'Hubungi Kami',
      contactSubtitle:
        'Hantarkan pertanyaan anda kepada pasukan SmartCost untuk bantuan lanjut.',
      fieldName: 'Nama',
      fieldNamePlaceholder: 'Masukkan nama penuh anda',
      fieldContact: 'E-mel / No. Telefon',
      fieldContactPlaceholder: 'Contoh: nama@perniagaan.my atau 0123456789',
      fieldMessage: 'Mesej',
      fieldMessagePlaceholder: 'Nyatakan pertanyaan atau keperluan sokongan anda',
      submitBtn: 'Hantar Pertanyaan',
      submittingBtn: 'Menghantar...',
      honeypotLabel: 'Tinggalkan ruangan ini kosong',
      errEmpty: 'Sila lengkapkan semua ruangan sebelum menghantar.',
      errNameRequired: 'Sila masukkan nama penuh anda.',
      errInvalidContact:
        'Sila masukkan alamat e-mel yang sah (contoh: nama@domain.com) atau nombor telefon yang lengkap.',
      errMessageMin: 'Mesej hendaklah sekurang-kurangnya 10 aksara.',
      errCooldown:
        'Sila tunggu beberapa saat sebelum menghantar pertanyaan seterusnya.',
      errBackendUnavailable:
        'Penghantaran pertanyaan tidak dapat diselesaikan kerana pelayan e-mel/pangkalan data belum disambungkan. Data yang anda taip dikekalkan supaya anda tidak kehilangan maklumat.',
      successTitle: 'Pertanyaan Berjaya Dihantar',
      successBodyPrefix: 'Terima kasih,',
      successBodyMiddle: 'Mesej anda telah direkodkan dan pasukan kami akan menghubungi anda melalui',
      successBodySuffix: 'dalam tempoh hari bekerja.',
      sendAnother: 'Hantar Pertanyaan Lain',
    },
    about: {
      breadcrumb: 'SmartCost / Mengenai Kami',
      title: 'Mengenai Kami',
      subtitle:
        'Dibangunkan oleh pelajar bidang perakaunan untuk membantu peniaga kecil mengurus kos operasi dengan sistematik.',
      goalEyebrow: 'MATLAMAT KAMI',
      goalTitle: 'Matlamat',
      goalBody:
        'Membantu usahawan kecil beralih daripada kaedah pengiraan manual kepada sistem digital yang lebih tepat dan menjimatkan masa.',
      teamRoleLabel: 'Bidang Pengajian',
      teamRoleValue: 'Perakaunan',
      focusLabel: 'Fokus Utama',
      focusValue: 'Ketepatan Kos & Margin',
      audienceLabel: 'Pengguna Sasaran',
      audienceValue: 'Peniaga & Usahawan PKS',
      teamEyebrow: 'PASUKAN PEMBANGUN',
      teamTitle: 'Pasukan Kami',
      teamBody:
        'Kami adalah pelajar dalam bidang perakaunan yang meminati pembangunan teknologi perniagaan dan inovasi digital. Projek SmartCost ini dibangunkan khusus untuk memudahkan peniaga kecil menguruskan kos operasi harian dengan lebih cekap dan praktikal.',
      teamPhotoAlt: 'Foto rasmi dua pembangun projek SmartCost berpakaian sut formal',
      principlesEyebrow: 'PRINSIP KEJURUTERAAN',
      principlesTitle: 'Teras pembangunan sistem SmartCost.',
      principles: [
        {
          code: '01',
          title: 'Ketepatan Matematik',
          body: 'Formula penukaran unit dan margin keuntungan menggunakan pengiraan perpuluhan yang konsisten.',
        },
        {
          code: '02',
          title: 'Antara Muka Ringkas',
          body: 'Direka agar mudah difahami oleh peniaga tanpa memerlukan latar belakang perakaunan.',
        },
        {
          code: '03',
          title: 'Kebolehcapaian Pelbagai Peranti',
          body: 'Berfungsi dengan lancar di desktop, tablet, dan telefon pintar pada bila-bila masa.',
        },
      ],
    },
    footer: {
      tagline:
        'Sistem pengiraan kos produk digital yang membantu usahawan menguruskan kos bahan mentah, kos tambahan, dan harga jualan dengan lebih tepat.',
      copyrightSuffix: 'SmartCost. Hak Cipta Terpelihara.',
      subnote: 'Sistem Pengekosan Produk Digital untuk Usahawan Malaysia',
    },
    simulator: {
      title: 'Kalkulator Kos Produk SmartCost',
      subtitle:
        'Kira kos bahan mentah mengikut sukatan kecil, kos tambahan, unjuran keuntungan, dan harga jualan automatik.',
      presetsLabel: 'Templat Contoh Perniagaan:',
      productNameLabel: 'Nama Produk / Resipi',
      batchYieldLabel: 'Bilangan Unit Dihasilkan',
      materialsHeading: '1. Senarai Kos Bahan Mentah',
      addMaterial: 'Tambah Bahan',
      colName: 'Nama Bahan',
      colBulkPrice: 'Harga Pukal (RM)',
      colBulkQty: 'Kuantiti Pukal',
      colUnit: 'Unit',
      colUsedQty: 'Sukatan Guna',
      colCost: 'Kos (RM)',
      colAction: 'Padam',
      newMaterialName: 'Bahan Baharu',
      packagingLabel: 'Kos Pembungkusan (RM)',
      utilityLabel: 'Kos Utiliti & Upah (RM)',
      marginLabel: 'Sasaran Margin Untung (%)',
      chartTitle: 'Pecahan Komposisi Harga Seunit',
      chartCenterUnit: 'RM / unit',
      legendMaterials: 'Bahan Mentah',
      legendPackaging: 'Pembungkusan',
      legendUtility: 'Utiliti & Upah',
      legendProfit: 'Untung Bersih',
      totalBatchCost: 'Jumlah Kos Kelompok',
      unitCost: 'Kos Seunit',
      unitSuffix: 'unit',
      unitProfit: 'Untung Bersih / Unit',
      sellingPrice: 'Cadangan Harga Jualan',
      projectionTitle: 'Unjuran Skala Keuntungan Mengikut Jumlah Jualan',
      projUnits: 'Jumlah Jualan',
      projRevenue: 'Hasil Jualan',
      projCost: 'Jumlah Kos',
      projProfit: 'Untung Bersih',
      resetBtn: 'Set Semula',
      calculateBtn: 'Kira Kos & Harga',
      calcSuccessMsg: 'Kiraan selesai dan harga jualan telah dikemas kini.',
      printBtn: 'Cetak / PDF',
      exportBtn: 'Muat Turun Excel (CSV)',
      closeAria: 'Tutup kalkulator',
    },
  },
  en: {
    metaTitle: 'SmartCost — Digital Product Costing System',
    metaDescription:
      'A digital system designed to help business owners calculate raw material costs, control hidden expenses, and set accurate selling prices.',
    skipToContent: 'Skip to content',
    nav: {
      mainAria: 'Main Navigation',
      mobileAria: 'Mobile Navigation',
      quickAria: 'Quick Links',
      homeAria: 'SmartCost Homepage',
      items: [
        { id: 'utama' as PageId, label: 'Homepage' },
        { id: 'perkhidmatan' as PageId, label: 'Services' },
        { id: 'bantuan' as PageId, label: 'Help' },
        { id: 'mengenai' as PageId, label: 'About Us' },
      ],
      trySystem: 'Try System',
      trySystemFull: 'Try System Now',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      langLabel: 'Language',
    },
    home: {
      kicker: 'SME PRODUCT COSTING SYSTEM',
      headline: 'Calculate Product Costs Easily, Grow Business Profits.',
      subheadline:
        'A digital system designed to help business owners calculate raw material costs, control hidden expenses, and set accurate selling prices.',
      ctaPrimary: 'Try System Now',
      ctaSecondary: 'Explore Services',
      calcCardLabel: 'LIVE COST CALCULATOR',
      calcCardTitle: 'Sample Calculation: Moist Chocolate Cake',
      calcCardYield: 'Batch of 10 units',
      calcSteps: [
        {
          step: '01',
          label: 'Bulk purchase (Cocoa Powder)',
          formula: 'RM 16.00 / 500g',
        },
        {
          step: '02',
          label: 'Recipe usage',
          formula: '120g = RM 3.84',
        },
        {
          step: '03',
          label: 'Materials + overhead (10 units)',
          formula: 'RM 17.50 + RM 6.50',
        },
      ],
      calcUnitCostLabel: 'Production cost per unit',
      calcMarginLabel: 'Target margin',
      calcPriceLabel: 'Suggested selling price',
      calcProfitNote: 'Net profit per unit',
      proofText:
        'Our Achievement: Recognized and awarded in innovation competitions.',
      proofAction: 'View About Us',
      advantagesEyebrow: 'KEY ADVANTAGES',
      advantagesTitle: 'Structured cost control for daily business operations.',
      advantagesSubtitle:
        'Replacing rough estimates and manual spreadsheets with a consistent costing workflow for small and medium businesses.',
      advantages: [
        {
          number: '01',
          title: 'Fast Calculation',
          description: 'Rapid costing down to small measurements in grams or milliliters.',
          detail: 'Automatic conversion from bulk purchase price to exact recipe cost.',
        },
        {
          number: '02',
          title: 'Control Hidden Costs',
          description:
            'Track hidden operational expenses such as packaging, rent, labor, and utility bills.',
          detail: 'Every operational expense is allocated so net profit remains accurate.',
        },
        {
          number: '03',
          title: 'Automatic Price Suggestion',
          description:
            'Set your target profit percentage and the system calculates the selling price automatically.',
          detail: 'Helps merchants set consistent, margin-protected market prices.',
        },
      ],
      architectureEyebrow: 'COSTING ARCHITECTURE',
      architectureTitle: 'Three calculation stages from raw materials to selling price.',
      architectureSubtitle:
        'A structured data flow ensures every cent of direct materials and operating overhead is accounted for before pricing.',
      architectureSteps: [
        {
          step: '01',
          tag: 'BULK INPUT',
          title: 'Raw Materials',
          description:
            'Enter supplier bulk purchase prices and exact recipe measurement quantities.',
          metrics: [
            { label: 'Bulk purchase', value: 'RM 16.00 / 500g' },
            { label: 'Recipe usage', value: '120g = RM 3.84' },
          ],
        },
        {
          step: '02',
          tag: 'OPERATING OVERHEAD',
          title: 'Additional Costs',
          description:
            'Record packaging, labels, utility bills, rental, and labor expenses per production batch.',
          metrics: [
            { label: 'Packaging', value: 'RM 4.50 / batch' },
            { label: 'Utilities & labor', value: 'RM 2.00 / batch' },
          ],
        },
        {
          step: '03',
          tag: 'PRICING OUTPUT',
          title: 'Selling Price',
          description:
            'The system divides total cost by batch yield and suggests a selling price from your target margin.',
          metrics: [
            { label: 'Cost per unit', value: 'RM 2.40' },
            { label: 'Suggested price', value: 'RM 4.00 (40%)' },
          ],
        },
      ],
    },
    services: {
      breadcrumb: 'SmartCost / Services',
      title: 'SmartCost Services',
      subtitle:
        'Four core modules to calculate raw material costs, manage additional expenses, and set accurate selling prices.',
      items: [
        {
          id: 'bahan-mentah',
          number: '01',
          title: 'Calculate Raw Material Cost',
          description:
            'Convert bulk purchase prices into actual ingredient usage cost for each product. Calculations support small measurements in grams, milliliters, or units.',
          specs: [
            'Automatic unit conversion from bulk purchases',
            'Instant recalculation when supplier prices change',
            'Multi-ingredient support within a single recipe',
          ],
          iconName: 'scale' as const,
        },
        {
          id: 'kos-tambahan',
          number: '02',
          title: 'Manage Additional Costs',
          description:
            'Record utility bills, packaging, rental, and labor costs systematically. Every hidden expense is accurately allocated to each unit cost.',
          specs: [
            'Track packaging and product label costs',
            'Allocate utilities and labor per production batch',
            'Prevents silent profit loss from unrecorded overhead',
          ],
          iconName: 'receipt' as const,
        },
        {
          id: 'cadangan-harga',
          number: '03',
          title: 'Selling Price Suggestion',
          description:
            'Configure your desired profit margin to generate competitive market pricing. Merchants can review projected net profit before selling.',
          specs: [
            'Target margin adjustment from 10% to 95%',
            'Net profit projections across 10 to 500 unit volumes',
          ],
          iconName: 'trending' as const,
        },
        {
          id: 'muat-turun-laporan',
          number: '04',
          title: 'Download Reports',
          description:
            'Save and print complete costing records as PDF or Excel-compatible files. Structured outputs simplify ongoing financial bookkeeping.',
          specs: [
            'One-click CSV export compatible with Microsoft Excel',
            'Clean print-ready layout for formal PDF records',
          ],
          iconName: 'file' as const,
        },
      ],
      testAction: 'Test Module in System',
      downloadAction: 'Download Sample Report (CSV)',
      visualizerEyebrow: 'SYSTEM PREVIEW',
      visualizerTitle: 'Cost Composition Visualization',
      visualizerBody:
        'Inspect the exact breakdown of raw materials, packaging, utilities, and net profit in one combined table and chart view before setting your market price.',
      visualizerSampleProduct: 'Moist Chocolate Cake (10 units)',
      unitSingular: 'unit',
      visualizerCta: 'Try System',
    },
    help: {
      breadcrumb: 'SmartCost / Help',
      title: 'Help Center',
      subtitle:
        'Follow our three-step usage guide, browse frequently asked questions, or contact our support team.',
      stepsEyebrow: 'USAGE GUIDE',
      stepsTitle: 'How to Use - 3 Simple Steps',
      steps: [
        {
          stepLabel: 'Step 01',
          title: 'Raw Material Price List',
          description: 'Enter bulk supplier purchase prices and package quantities.',
        },
        {
          stepLabel: 'Step 02',
          title: 'Product or Recipe Details',
          description: 'Enter recipe usage amounts, additional overhead, and batch yield.',
        },
        {
          stepLabel: 'Step 03',
          title: 'Total Cost & Selling Price',
          description: 'Get your exact unit cost and margin-based selling price.',
        },
      ],
      faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
      faqTitle: 'Answers to common user questions.',
      faqs: [
        {
          id: 'faq-1',
          question: 'Can this system be used on a smartphone?',
          answer:
            'Yes, the system is fully responsive for both mobile devices and desktop computers.',
        },
        {
          id: 'faq-2',
          question: 'What happens if market raw material prices change?',
          answer:
            'Simply update the price of that material, and your product cost is recalculated automatically.',
        },
        {
          id: 'faq-3',
          question: 'Is my business information secure?',
          answer: 'Yes, all records are handled with strict privacy controls.',
        },
      ],
      contactTitle: 'Contact Us',
      contactSubtitle:
        'Send your inquiry to the SmartCost team for further assistance.',
      fieldName: 'Name',
      fieldNamePlaceholder: 'Enter your full name',
      fieldContact: 'Email / Phone Number',
      fieldContactPlaceholder: 'e.g. name@business.my or 0123456789',
      fieldMessage: 'Message',
      fieldMessagePlaceholder: 'Describe your inquiry or support request',
      submitBtn: 'Submit Inquiry',
      submittingBtn: 'Submitting...',
      honeypotLabel: 'Leave this field blank',
      errEmpty: 'Please complete all fields before submitting.',
      errNameRequired: 'Please enter your full name.',
      errInvalidContact:
        'Please enter a valid email address (e.g. name@domain.com) or complete phone number.',
      errMessageMin: 'Message must be at least 10 characters long.',
      errCooldown:
        'Please wait a few seconds before submitting another inquiry.',
      errBackendUnavailable:
        'Your inquiry could not be transmitted because no backend email or database endpoint is currently configured. Your typed input has been preserved.',
      successTitle: 'Inquiry Submitted Successfully',
      successBodyPrefix: 'Thank you,',
      successBodyMiddle: 'Your message has been recorded and our team will reach out via',
      successBodySuffix: 'within business hours.',
      sendAnother: 'Send Another Inquiry',
    },
    about: {
      breadcrumb: 'SmartCost / About Us',
      title: 'About Us',
      subtitle:
        'Built by accounting students to help small business owners manage daily operational costs systematically.',
      goalEyebrow: 'OUR GOAL',
      goalTitle: 'Goal',
      goalBody:
        'Helping small entrepreneurs transition from manual spreadsheets and guesswork to an accurate, time-saving digital system.',
      teamRoleLabel: 'Field of Study',
      teamRoleValue: 'Accounting',
      focusLabel: 'Core Focus',
      focusValue: 'Cost & Margin Precision',
      audienceLabel: 'Target Users',
      audienceValue: 'Merchants & SME Entrepreneurs',
      teamEyebrow: 'DEVELOPMENT TEAM',
      teamTitle: 'Our Team',
      teamBody:
        'We are accounting students with a strong passion for business technology development and digital innovation. The SmartCost project was built specifically to help small business owners manage their daily operational costs more efficiently and practically.',
      teamPhotoAlt: 'Formal corporate portrait of the two SmartCost developers in suits',
      principlesEyebrow: 'ENGINEERING PRINCIPLES',
      principlesTitle: 'Core foundations of the SmartCost system.',
      principles: [
        {
          code: '01',
          title: 'Mathematical Precision',
          body: 'Unit conversions and margin formulas execute with consistent decimal accuracy.',
        },
        {
          code: '02',
          title: 'Accessible Simplicity',
          body: 'Designed for everyday business owners with zero accounting jargon required.',
        },
        {
          code: '03',
          title: 'Cross-Device Reliability',
          body: 'Operates smoothly across desktop workstations, tablets, and smartphones.',
        },
      ],
    },
    footer: {
      tagline:
        'A digital product costing system helping entrepreneurs manage raw material expenses, operational overhead, and selling prices accurately.',
      copyrightSuffix: 'SmartCost. All Rights Reserved.',
      subnote: 'Digital Product Costing System for Entrepreneurs',
    },
    simulator: {
      title: 'SmartCost Product Costing Calculator',
      subtitle:
        'Calculate raw material costs by small units, operational overhead, profit projections, and automated selling prices.',
      presetsLabel: 'Business Recipe Templates:',
      productNameLabel: 'Product / Recipe Name',
      batchYieldLabel: 'Units Produced per Batch',
      materialsHeading: '1. Raw Material Cost Breakdown',
      addMaterial: 'Add Material',
      colName: 'Material Name',
      colBulkPrice: 'Bulk Price (RM)',
      colBulkQty: 'Bulk Qty',
      colUnit: 'Unit',
      colUsedQty: 'Used Qty',
      colCost: 'Cost (RM)',
      colAction: 'Remove',
      newMaterialName: 'New Material',
      packagingLabel: 'Packaging Cost (RM)',
      utilityLabel: 'Utilities & Labor (RM)',
      marginLabel: 'Target Profit Margin (%)',
      chartTitle: 'Unit Price Composition Breakdown',
      chartCenterUnit: 'RM / unit',
      legendMaterials: 'Raw Materials',
      legendPackaging: 'Packaging',
      legendUtility: 'Utilities & Labor',
      legendProfit: 'Net Profit',
      totalBatchCost: 'Total Batch Cost',
      unitCost: 'Cost per Unit',
      unitSuffix: 'units',
      unitProfit: 'Net Profit / Unit',
      sellingPrice: 'Suggested Selling Price',
      projectionTitle: 'Profit Scale Projection by Sales Volume',
      projUnits: 'Sales Volume',
      projRevenue: 'Total Revenue',
      projCost: 'Total Cost',
      projProfit: 'Net Profit',
      resetBtn: 'Reset',
      calculateBtn: 'Calculate Cost & Price',
      calcSuccessMsg: 'Calculation complete and selling price updated.',
      printBtn: 'Print / PDF',
      exportBtn: 'Download Excel (CSV)',
      closeAria: 'Close calculator',
    },
  },
} as const;
