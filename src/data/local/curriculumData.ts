import { Category, Lesson } from '../../domain/model/models';

export const CATEGORIES: Category[] = [
  {
    id: 'cat_licensing',
    number: '01',
    title: {
      en: 'Licensing Information',
      fil: 'Impormasyon sa Lisensya',
    },
    description: {
      en: 'Driver’s license classifications, Student Permit rules, DL codes, validity periods, and core responsibilities under RA 4136 and RA 10930.',
      fil: 'Mga uri ng lisensya, patakaran sa Student Permit, DL codes, bisa ng lisensya, at tungkulin ng drayber sa ilalim ng RA 4136 at RA 10930.',
    },
    icon: 'IdCard',
    topics: [
      { en: "Driver's license classifications", fil: 'Mga klasipikasyon ng lisensya' },
      { en: 'Student permit', fil: 'Student permit' },
      { en: "Non-professional driver's license", fil: "Non-professional driver's license" },
      { en: "Professional driver's license", fil: "Professional driver's license" },
      { en: 'General licensing requirements', fil: 'Pangkalahatang kailangan sa lisensya' },
      { en: 'Driver responsibilities', fil: 'Mga tungkulin ng drayber' },
    ],
    recommendedTracks: ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_getting_ready',
    number: '02',
    title: {
      en: 'Getting Ready to Drive',
      fil: 'Paghahanda Bago Magmaneho',
    },
    description: {
      en: 'Pre-drive BLOWBAGETS vehicle inspection, physical and mental readiness, mirror adjustments, and seatbelt safety precautions.',
      fil: 'BLOWBAGETS pagsusuri ng sasakyan bago bumiyahe, kahandaan ng katawan at isip, pag-aayos ng salamin, at paggamit ng seatbelt.',
    },
    icon: 'ShieldCheck',
    topics: [
      { en: 'Preparing to drive', fil: 'Paghahanda sa pagmamaneho' },
      { en: 'Vehicle safety checks', fil: 'Pagsusuri sa kaligtasan ng sasakyan' },
      { en: 'Driver readiness', fil: 'Kahandaan ng drayber' },
      { en: 'Basic safety precautions', fil: 'Pangunahing pag-iingat sa kaligtasan' },
    ],
    recommendedTracks: ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_fundamentals',
    number: '03',
    title: {
      en: 'Driving Fundamentals',
      fil: 'Mga Batayang Kasanayan sa Pagmamaneho',
    },
    description: {
      en: 'Steering control, statutory speed limits, the 3-second following rule, intersections, overtaking, legal parking, and defensive driving.',
      fil: 'Tamang pagkontrol sa manibela, speed limit, 3-second rule, interseksyon, ligtas na pag-overtake, tamang pagparada, at defensive driving.',
    },
    icon: 'Compass',
    topics: [
      { en: 'Basic driving principles', fil: 'Batayang prinsipyo sa pagmamaneho' },
      { en: 'Steering and vehicle control', fil: 'Pagkontrol sa manibela at sasakyan' },
      { en: 'Speed management', fil: 'Pamamahala ng bilis' },
      { en: 'Safe following distance', fil: 'Ligtas na distansya sa sinusundan' },
      { en: 'Intersections & Overtaking', fil: 'Interseksyon at Pag-overtake' },
      { en: 'Parking & Defensive driving', fil: 'Pagparada at Defensive driving' },
    ],
    recommendedTracks: ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_courtesy_safety',
    number: '04',
    title: {
      en: 'Road Courtesy and Safety',
      fil: 'Paggalang at Kaligtasan sa Kalsada',
    },
    description: {
      en: 'Sharing the road with pedestrians, cyclists, and motorcycles; child restraint systems; passenger safety; and handling road emergencies.',
      fil: 'Pakikibahagi ng kalsada sa mga pedestrian, siklista, at motorsiklo; kaligtasan ng pasahero at bata; at pagharap sa emergency.',
    },
    icon: 'HeartHandshake',
    topics: [
      { en: 'Road courtesy & Sharing the road', fil: 'Paggalang at Pakikibahagi sa kalsada' },
      { en: 'Pedestrian safety', fil: 'Kaligtasan ng tumatawid' },
      { en: 'Motorcycle safety', fil: 'Kaligtasan sa motorsiklo' },
      { en: 'Passenger safety', fil: 'Kaligtasan ng pasahero' },
      { en: 'Emergency situations & Accident prevention', fil: 'Sitwasyong emergency at Pag-iwas sa aksidente' },
    ],
    recommendedTracks: ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_rights_duties',
    number: '05',
    title: {
      en: 'Rights, Duties and Responsibilities',
      fil: 'Karapatan, Tungkulin at Pananagutan',
    },
    description: {
      en: 'Right-of-way hierarchy at intersections and rotundas, yielding to emergency vehicles, and proper conduct during traffic stops.',
      fil: 'Panuntunan sa right-of-way sa interseksyon at rotunda, pagbibigay-daan sa emergency vehicles, at tamang asal kapag pinara.',
    },
    icon: 'Scale',
    topics: [
      { en: 'Driver obligations', fil: 'Obligasyon ng drayber' },
      { en: 'Right of way', fil: 'Right of way (Karapatan sa daan)' },
      { en: 'Responsible driving', fil: 'Responsableng pagmamaneho' },
      { en: 'Road-user responsibilities', fil: 'Pananagutan ng gumagamit ng kalsada' },
    ],
    recommendedTracks: ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_registration',
    number: '06',
    title: {
      en: 'Motor Vehicle Registration',
      fil: 'Rehistro ng Sasakyan',
    },
    description: {
      en: 'Certificate of Registration (CR), Official Receipt (OR), renewal schedules by plate digits, emission/roadworthiness checks, and TPL insurance.',
      fil: 'Certificate of Registration (CR), Official Receipt (OR), iskedyul ng renewal ayon sa plaka, pagsusuri ng sasakyan, at TPL insurance.',
    },
    icon: 'FileText',
    topics: [
      { en: 'Vehicle registration', fil: 'Pagpaparehistro ng sasakyan' },
      { en: 'Registration requirements', fil: 'Mga kailangan sa rehistro' },
      { en: 'Basic vehicle documentation', fil: 'Mahahalagang dokumento ng sasakyan' },
    ],
    recommendedTracks: ['NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_laws',
    number: '07',
    title: {
      en: 'Land Transportation Laws',
      fil: 'Mga Batas sa Transportasyong Panlupa',
    },
    description: {
      en: 'Key Philippine statutes including RA 4136, RA 10913 (Anti-Distracted Driving), RA 10586 (Anti-Drunk/Drugged Driving), RA 10054, and RA 11229.',
      fil: 'Mahahalagang batas trapiko gaya ng RA 4136, RA 10913 (Anti-Distracted Driving), RA 10586 (Anti-Drunk/Drugged Driving), RA 10054, at RA 11229.',
    },
    icon: 'Landmark',
    topics: [
      { en: 'Applicable Philippine traffic laws', fil: 'Umiiral na batas trapiko sa Pilipinas' },
      { en: 'Road regulations', fil: 'Mga regulasyon sa kalsada' },
      { en: 'Responsible road use', fil: 'Responsableng paggamit ng kalsada' },
      { en: 'Driver obligations under special laws', fil: 'Tungkulin sa ilalim ng espesyal na batas' },
    ],
    recommendedTracks: ['STUDENT_PERMIT', 'NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
  {
    id: 'cat_fines_penalties',
    number: '08',
    title: {
      en: 'Fines and Penalties',
      fil: 'Mga Multa at Kaparusahan',
    },
    description: {
      en: 'LTO demerit point system under RA 10930, administrative violations, license suspension grounds, and legal duties after road incidents.',
      fil: 'Demerit point system ng LTO sa ilalim ng RA 10930, mga paglabag, batayan ng suspensyon ng lisensya, at pananagutan sa aksidente.',
    },
    icon: 'AlertTriangle',
    topics: [
      { en: 'Traffic violations', fil: 'Mga paglabag sa batas trapiko' },
      { en: 'Applicable penalties & demerit system', fil: 'Kaukulang parusa at demerit system' },
      { en: 'Legal responsibilities', fil: 'Legal na pananagutan' },
      { en: 'Road safety compliance', fil: 'Pagsunod sa kaligtasan sa kalsada' },
    ],
    recommendedTracks: ['NON_PROFESSIONAL', 'PROFESSIONAL'],
  },
];

export const LESSONS: Lesson[] = [
  // CATEGORY 1: LICENSING INFORMATION
  {
    id: 'les_1_1',
    categoryId: 'cat_licensing',
    title: {
      en: 'Student Permit, Non-Professional & Professional Classifications',
      fil: 'Student Permit, Non-Professional at Professional na Klasipikasyon',
    },
    introduction: {
      en: 'Operating a motor vehicle on Philippine public roads is a privilege granted by the state—not an absolute right. Understanding which authorization matches your purpose prevents unlicensed driving violations.',
      fil: 'Ang pagmamaneho sa pampublikong kalsada sa Pilipinas ay isang pribilehiyong ipinagkakaloob ng batas—hindi isang karapatan. Mahalagang malaman ang tamang uri ng lisensya para sa iyong layunin.',
    },
    objectives: [
      {
        en: 'Distinguish between a Student Permit (SP), Non-Professional Driver’s License (NPDL), and Professional Driver’s License (PDL).',
        fil: 'Matukoy ang pagkakaiba ng Student Permit (SP), Non-Professional Driver’s License (NPDL), at Professional Driver’s License (PDL).',
      },
      {
        en: 'Identify the mandatory Theoretical Driving Course (TDC) and Practical Driving Course (PDC) prerequisites.',
        fil: 'Malaman ang kinakailangang Theoretical Driving Course (TDC) at Practical Driving Course (PDC).',
      },
    ],
    explanations: [
      {
        heading: { en: '1. Student Permit (SP)', fil: '1. Student Permit (SP)' },
        body: {
          en: 'Issued to Filipino citizens at least 16 years old (or 17 for foreigners) who have completed the 15-hour Theoretical Driving Course (TDC). A Student Permit holder may ONLY drive when accompanied by a duly licensed Non-Professional or Professional driver holding the appropriate DL code for the vehicle being operated.',
          fil: 'Ibinibigay sa mamamayang Pilipino na hindi bababa sa 16 taong gulang (17 para sa dayuhan) matapos makumpleto ang 15-oras na Theoretical Driving Course (TDC). Maaari lamang magmaneho ang may hawak ng SP kung may kasamang lisensyadong drayber na may tamang DL code.',
        },
      },
      {
        heading: { en: '2. Non-Professional Driver’s License (NPDL)', fil: '2. Non-Professional Driver’s License (NPDL)' },
        body: {
          en: 'Available to applicants at least 17 years old who have held a valid Student Permit for at least one (1) month and completed an accredited Practical Driving Course (PDC). It authorizes driving private vehicles only—not for compensation or public hire.',
          fil: 'Para sa edad 17 pataas na may hawak ng Student Permit nang hindi bababa sa isang (1) buwan at nakatapos ng Practical Driving Course (PDC). Ito ay para sa pribadong sasakyan lamang at hindi maaaring ipamasada o gawing hanapbuhay.',
        },
      },
      {
        heading: { en: '3. Professional Driver’s License (PDL)', fil: '3. Professional Driver’s License (PDL)' },
        body: {
          en: 'Required for any person at least 18 years old who drives a motor vehicle for a livelihood, compensation, or public transport, or operates heavy commercial vehicles corresponding to specialized DL codes.',
          fil: 'Kinakailangan para sa edad 18 pataas na nagmamaneho bilang hanapbuhay, may bayad, pampublikong sasakyan, o mabibigat na sasakyang pang-komersyo.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Always carry your physical LTO-issued driver’s license (or official LTMS digital credential where recognized) whenever operating a motor vehicle.',
        fil: 'Laging dalhin ang iyong lisensya sa pagmamaneho tuwing nagmamaneho ng sasakyan.',
      },
      {
        en: 'A Student Permit never authorizes solo driving on public roads, even on short neighborhood errands.',
        fil: 'Hindi kailanman pinapayagang magmaneho nang mag-isa sa pampublikong kalsada ang may Student Permit lamang.',
      },
    ],
    examples: [
      {
        en: 'Carlo holds a Student Permit and wants to practice driving the family sedan along a municipal road. His father, who holds a valid Non-Professional license with DL Code B, sits in the front passenger seat.',
        fil: 'May Student Permit si Carlo at nais magsanay magmaneho ng kotse. Kasama niya sa harapang upuan ang kanyang ama na may valid Non-Professional license na may DL Code B.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Who must accompany a Student Permit holder while practicing on a public road?',
        fil: 'Sino ang dapat kasama ng may hawak ng Student Permit habang nagsasanay sa pampublikong kalsada?',
      },
      choices: [
        { id: 'a', text: { en: 'Any adult relative over 21 years old', fil: 'Sinumang kamag-anak na higit 21 taong gulang' } },
        { id: 'b', text: { en: 'A duly licensed driver authorized for the specific vehicle category', fil: 'Isang lisensyadong drayber na awtorisado sa uri ng sasakyang minamaneho' } },
        { id: 'c', text: { en: 'Another Student Permit holder with TDC completion', fil: 'Isa pang may Student Permit na tapos na sa TDC' } },
        { id: 'd', text: { en: 'No companion is needed during daytime hours', fil: 'Walang kailangang kasama kung araw naman' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'Under RA 4136 and LTO licensing rules, a Student Permit holder must always be accompanied by a duly licensed driver possessing the proper DL code for that vehicle.',
        fil: 'Ayon sa RA 4136 at alituntunin ng LTO, dapat laging may kasamang lisensyadong drayber na may tamang DL code para sa minamanehong sasakyan.',
      },
    },
    sourceReferences: ['RA 4136 (Land Transportation and Traffic Code)', 'LTO Memorandum Circular 2021-2284', 'LTO Driver’s Manual Vol. 1'],
    estimatedMinutes: 7,
  },
  {
    id: 'les_1_2',
    categoryId: 'cat_licensing',
    title: {
      en: 'DL Codes, License Validity & Renewal Under RA 10930',
      fil: 'Mga DL Code, Bisa ng Lisensya at Renewal sa Ilalim ng RA 10930',
    },
    introduction: {
      en: 'Modern Philippine driver’s licenses use alphanumeric Driver’s License (DL) Codes indicating exact vehicle categories and transmission types (MT or AT), alongside incentive-based 5-year and 10-year validity terms.',
      fil: 'Gumagamit na ngayon ang LTO ng Driver’s License (DL) Codes na tumutukoy sa eksaktong uri ng sasakyan at transmisyon (MT o AT), pati na rin ang 5-taon at 10-taong bisa sa ilalim ng RA 10930.',
    },
    objectives: [
      {
        en: 'Recognize common DL Codes (A, A1, B, B1, B2, C, D) and transmission conditions.',
        fil: 'Makilala ang karaniwang DL Codes (A, A1, B, B1, B2, C, D) at kondisyon sa transmisyon.',
      },
      {
        en: 'Understand the 5-year initial validity and how zero traffic violations qualify a driver for 10-year license validity.',
        fil: 'Maunawaan ang 5-taong bisa at kung paano makakakuha ng 10-taong bisa kapag walang naitalang paglabag.',
      },
    ],
    explanations: [
      {
        heading: { en: 'Common LTO DL Codes', fil: 'Mga Karaniwang DL Code ng LTO' },
        body: {
          en: 'Code A covers motorcycles; Code A1 covers tricycles. Code B covers passenger cars up to 8 seats and up to 5,000 kg GVW; B1 covers passenger vans/vehicles with 9+ seats up to 5,000 kg GVW; B2 covers light commercial goods vehicles up to 3,500 kg GVW. Codes C and D cover heavy trucks and buses.',
          fil: 'Ang Code A ay para sa motorsiklo; Code A1 para sa traysikel. Ang Code B ay para sa sasakyang pampasahero hanggang 8 upuan; B1 para sa 9 pataas na upuan hanggang 5,000 kg GVW; B2 para sa magagaan na sasakyang pangkargamento hanggang 3,500 kg GVW.',
        },
      },
      {
        heading: { en: '5-Year and 10-Year Validity (RA 10930)', fil: '5-Taon at 10-Taong Bisa (RA 10930)' },
        body: {
          en: 'Under Republic Act No. 10930, a newly issued driver’s license is valid for five (5) years. Upon renewal, drivers who have accumulated zero traffic violations in the LTO demerit system are granted a ten (10) year validity license, plus completion of the Comprehensive Driver’s Education (CDE) exam.',
          fil: 'Sa ilalim ng RA 10930, may limang (5) taong bisa ang bagong lisensya. Sa renewal, ang mga drayber na walang naitalang paglabag ay pagkakalooban ng sampung (10) taong bisa matapos maipasa ang Comprehensive Driver’s Education (CDE).',
        },
      },
    ],
    importantReminders: [
      {
        en: 'A driver licensed strictly for Automatic Clutch (AT) is prohibited from driving a Manual Transmission (MT) vehicle, whereas MT authorization covers both MT and AT within the same DL code.',
        fil: 'Ang drayber na pang-Automatic (AT) lamang ang lisensya ay bawal magmaneho ng Manual (MT), ngunit ang may MT ay maaaring magmaneho ng parehong MT at AT sa parehong DL code.',
      },
    ],
    examples: [
      {
        en: 'Maria maintained a clean driving record for five years. After completing her online CDE validation exam and medical check, she receives a 10-year validity license.',
        fil: 'Walang naging traffic violation si Maria sa loob ng limang taon. Matapos ang CDE exam at medical check, nabigyan siya ng lisensyang may 10-taong bisa.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Under RA 10930, how can a driver qualify for a 10-year validity driver’s license upon renewal?',
        fil: 'Sa ilalim ng RA 10930, paano makakakuha ng 10-taong bisa ng lisensya sa pag-renew?',
      },
      choices: [
        { id: 'a', text: { en: 'By paying double the standard renewal fee', fil: 'Sa pagbabayad ng dobleng renewal fee' } },
        { id: 'b', text: { en: 'By having zero recorded traffic violations during the preceding validity period and completing CDE', fil: 'Sa pagkakaroon ng zero traffic violation sa nakalipas na bisa at pagkumpleto ng CDE' } },
        { id: 'c', text: { en: 'Only Professional license holders qualify for 10-year validity', fil: 'Mga Professional license holder lamang ang kwalipikado' } },
        { id: 'd', text: { en: 'By owning a brand-new motor vehicle', fil: 'Sa pagmamay-ari ng bagong sasakyan' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'RA 10930 rewards safe, law-abiding drivers who have no recorded violations with a 10-year validity period upon renewal.',
        fil: 'Ginagantimpalaan ng RA 10930 ng 10-taong bisa ang mga ligtas at masunuring drayber na walang naitalang paglabag.',
      },
    },
    sourceReferences: ['RA 10930', 'LTO Supplemental IRR on DL Codes'],
    estimatedMinutes: 8,
  },

  // CATEGORY 2: GETTING READY TO DRIVE
  {
    id: 'les_2_1',
    categoryId: 'cat_getting_ready',
    title: {
      en: 'BLOWBAGETS Pre-Drive Inspection & Vehicle Readiness',
      fil: 'BLOWBAGETS Pagsusuri ng Sasakyan Bago Magmaneho',
    },
    introduction: {
      en: 'Mechanical failures on highways—such as overheated engines, brake loss, or tire blowouts—are largely preventable through a 3-minute pre-trip inspection before turning the ignition key.',
      fil: 'Karamihan sa pagtirik at aberya sa daan gaya ng overheating, pagpalya ng preno, at pagsabog ng gulong ay maiiwasan sa pamamagitan ng masusing BLOWBAGETS inspection bago bumiyahe.',
    },
    objectives: [
      {
        en: 'Apply every step of the LTO BLOWBAGETS pre-driving checklist.',
        fil: 'Maisagawa ang bawat hakbang ng BLOWBAGETS checklist ng LTO.',
      },
      {
        en: 'Evaluate driver physical and mental fitness (“Self”) prior to operating any vehicle.',
        fil: 'Masuri ang sariling kahandaang pisikal at mental (“Self”) bago humawak ng manibela.',
      },
    ],
    illustrationPng: '/assets/png/lessons/blowbagets.png',
    explanations: [
      {
        heading: { en: 'Vehicle Walkaround & Fluid Checks', fil: 'Pag-ikot sa Sasakyan at Pagsusuri ng Fluids' },
        body: {
          en: 'Inspect Battery terminals and charge, Lights (headlights, brake lights, turn signals, hazard lights), Oil level on a level surface, Water/radiator coolant (never open a hot radiator cap!), Brakes (pedal firmness and fluid reservoir), Air pressure and Tire condition (tread depth and spare tire), Gas/fuel supply, and Engine leaks or unusual noises.',
          fil: 'Suriin ang Battery, Lights (headlight, signal, preno), Oil level, Water/coolant (huwag buksan ang takip ng radiator kapag mainit!), Brakes, Air pressure ng gulong, Gas, Engine, at Tires kasama ang reserbang gulong at early warning device (EWD).',
        },
      },
      {
        heading: { en: '“S” Stands for Self (Driver Readiness)', fil: 'Ang “S” ay Self (Kahandaan ng Drayber)' },
        body: {
          en: 'Fatigue, drowsiness, extreme anger, illness, alcohol, or sedating medications severely slow reaction time. If you are drowsy or unwell, postpone driving or let a qualified companion take the wheel.',
          fil: 'Ang antok, matinding pagod, galit, sakit, alak, o gamot na nakakaantok ay nagpapabagal ng reaksyon. Huwag magmaneho kung hindi handa ang katawan at isipan.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Always carry a pair of LTO-compliant Early Warning Devices (red and yellow reflective triangles) in four-wheeled vehicles in case of roadside breakdown.',
        fil: 'Laging magdala ng Early Warning Device (pula at dilaw na reflective triangle) sa sasakyan para sa biglaang pagkasira sa kalsada.',
      },
    ],
    examples: [
      {
        en: 'Before driving to Pampanga via NLEX, Anna notices her left rear tire looks slightly underinflated during her BLOWBAGETS check and inflates it to the manufacturer’s recommended PSI at the nearest station.',
        fil: 'Bago bumiyahe sa expressway, napansin ni Anna sa BLOWBAGETS check na malambot ang likurang gulong kaya pinahanginan muna niya ito sa tamang PSI.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Why must you NEVER remove the radiator cap while the engine is still hot?',
        fil: 'Bakit HINDI dapat buksan agad ang takip ng radiator habang mainit pa ang makina?',
      },
      choices: [
        { id: 'a', text: { en: 'It drains the car battery immediately', fil: 'Mabilis nitong mauubos ang karga ng baterya' } },
        { id: 'b', text: { en: 'Pressurized boiling coolant and steam can erupt and cause severe burns', fil: 'Maaaring sumirit ang kumukulong tubig at singaw na magdudulot ng matinding paso' } },
        { id: 'c', text: { en: 'It resets the odometer reading', fil: 'Mare-reset nito ang milyahe ng sasakyan' } },
        { id: 'd', text: { en: 'It locks the steering column', fil: 'Mala-lock nito ang manibela' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'Cooling systems operate under high pressure when hot; opening the cap releases scalding steam and coolant.',
        fil: 'Mataas ang presyon sa loob ng mainit na radiator kaya delikadong sumirit ang kumukulong coolant.',
      },
    },
    sourceReferences: ['LTO Driver’s Manual: Getting Ready to Drive', 'LTO CDE Module'],
    estimatedMinutes: 6,
  },
  {
    id: 'les_2_2',
    categoryId: 'cat_getting_ready',
    title: {
      en: 'Cabin Ergonomics, Mirrors, Blind Spots & Seatbelts (RA 8750)',
      fil: 'Tamang Posisyon sa Upuan, Salamin, Blind Spots at Seatbelt (RA 8750)',
    },
    introduction: {
      en: 'Proper seating posture, calibrated side and rearview mirrors, and mandatory seatbelt use protect occupants before the vehicle even moves.',
      fil: 'Ang tamang ayos ng upuan, salamin, at pagsusuot ng seatbelt ay unang depensa ng drayber at mga pasahero bago pa man umandar ang sasakyan.',
    },
    objectives: [
      {
        en: 'Comply with Republic Act No. 8750 (Seat Belts Use Act) and RA 11229 (Child Safety in Motor Vehicles Act).',
        fil: 'Sumunod sa RA 8750 (Seat Belts Use Act) at RA 11229 (Child Safety in Motor Vehicles Act).',
      },
      {
        en: 'Eliminate avoidable blind spots using mirror alignment and shoulder checks.',
        fil: 'Mabawasan ang blind spots sa tamang pag-aayos ng salamin at paglingon bago lumipat ng linya.',
      },
    ],
    explanations: [
      {
        heading: { en: 'Mandatory Seatbelt & Child Restraint Compliance', fil: 'Pagsusuot ng Seatbelt at Child Restraint System' },
        body: {
          en: 'Under RA 8750, the driver and front-seat passengers (and rear passengers where required) must wear seatbelts at all times. Under RA 11229, children 12 years old and below who are shorter than 150 cm (4’11”) must use an appropriate Child Restraint System (CRS) and must NEVER sit in the front passenger seat.',
          fil: 'Sa ilalim ng RA 8750, obligadong magsuot ng seatbelt ang drayber at mga pasahero sa harap. Sa RA 11229, ang batang 12 taong gulang pababa na mas mababa sa 150 cm ay dapat gumamit ng Child Restraint System at bawal maupo sa harapan.',
        },
      },
      {
        heading: { en: 'Checking Blind Spots Before Pulling Out', fil: 'Pagsusuri sa Blind Spot Bago Umandar' },
        body: {
          en: 'Mirrors alone cannot cover the rear quarter areas beside your vehicle. Always signal early, check rearview and side mirrors, and perform a brief shoulder check before pulling away from a curb or changing lanes.',
          fil: 'Hindi sakop ng salamin ang lahat ng anggulo sa gilid ng sasakyan. Laging mag-signal nang maaga, tumingin sa salamin, at sumulyap sa balikat (head check) bago lumipat ng linya.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Never adjust your seat or mirrors while the vehicle is already moving in traffic.',
        fil: 'Huwag kailanman mag-adjust ng upuan o salamin habang umaandar na ang sasakyan.',
      },
    ],
    examples: [
      {
        en: 'Before merging from a roadside parking slot in Cebu City, Marco fastens his seatbelt, activates his left turn signal, checks his left side mirror, and glances over his left shoulder to spot an approaching motorcycle.',
        fil: 'Bago lumabas mula sa paradahan, nag-seatbelt si Marco, nag-signal pakaliwa, tumingin sa side mirror, at lumingon nang bahagya upang matiyak na walang paparating na motorsiklo.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Under RA 11229, where should a 7-year-old child measuring 122 cm be seated inside a private car?',
        fil: 'Sa ilalim ng RA 11229, saan dapat maupo ang 7-taong-gulang na batang may taas na 122 cm sa pribadong kotse?',
      },
      choices: [
        { id: 'a', text: { en: 'On an adult’s lap in the front passenger seat', fil: 'Kandong ng matanda sa harapang upuan' } },
        { id: 'b', text: { en: 'In the rear seat secured in an appropriate Child Restraint System', fil: 'Sa likurang upuan gamit ang angkop na Child Restraint System' } },
        { id: 'c', text: { en: 'In the front seat wearing an adult shoulder belt', fil: 'Sa harapang upuan gamit ang adult seatbelt' } },
        { id: 'd', text: { en: 'Standing between the two front seats', fil: 'Nakatayo sa pagitan ng dalawang upuan sa harap' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'RA 11229 prohibits children 12 and under (below 150 cm) from sitting in the front seat and requires a certified Child Restraint System in the rear seat.',
        fil: 'Ipinagbabawal ng RA 11229 ang pag-upo sa harap ng batang 12 pababa (mas mababa sa 150 cm) at inaatasan ang paggamit ng Child Restraint System sa likod.',
      },
    },
    sourceReferences: ['RA 8750 (Seat Belts Use Act)', 'RA 11229 (Child Safety in Motor Vehicles Act)'],
    estimatedMinutes: 6,
  },

  // CATEGORY 3: DRIVING FUNDAMENTALS
  {
    id: 'les_3_1',
    categoryId: 'cat_fundamentals',
    title: {
      en: 'Speed Management, Following Distance & Defensive Driving',
      fil: 'Pamamahala ng Bilis, Ligtas na Distansya at Defensive Driving',
    },
    introduction: {
      en: 'Safe speed is determined not only by posted speed limit signs but also by visibility, road surface, traffic density, and stopping distance.',
      fil: 'Ang ligtas na bilis ay hindi lamang nakabatay sa nakapaskil na speed limit kundi pati sa lagay ng panahon, bigat ng trapiko, at kakayahang huminto nang ligtas.',
    },
    objectives: [
      {
        en: 'Recall statutory speed limits under RA 4136 when no specific speed sign is posted.',
        fil: 'Matandaan ang mga speed limit sa ilalim ng RA 4136 kapag walang nakapaskil na karatula.',
      },
      {
        en: 'Use the 3-second safe following distance rule in dry conditions and increase margin in rain or night driving.',
        fil: 'Magamit ang 3-second rule sa tuyong kalsada at dagdagan ang agwat kapag umuulan o gabi.',
      },
    ],
    illustrationPng: '/assets/png/lessons/following_distance.png',
    explanations: [
      {
        heading: { en: 'Statutory Speed Limits (RA 4136 Section 35)', fil: 'Bilis sa Ilalim ng RA 4136 Seksyon 35' },
        body: {
          en: 'Unless otherwise posted by local or expressway authorities: Crowded streets, school zones, intersections, and stationary hazards = 20 km/h (passenger cars & trucks). City and municipal streets with light traffic = 30 km/h. Through streets / boulevards clear of traffic = 40 km/h (cars/motorcycles) and 30 km/h (trucks/buses). Open country roads with no blind corners = 80 km/h (cars/motorcycles) and 50 km/h (trucks/buses).',
          fil: 'Kung walang ibang nakapaskil na karatula: Mataong kalsada at school zone = 20 km/h. Kalsada sa lungsod o bayan = 30 km/h. Maluluwag na boulevard/through streets = 40 km/h (kotse/motor) at 30 km/h (truck/bus). Open country roads = 80 km/h (kotse/motor) at 50 km/h (truck/bus).',
        },
      },
      {
        heading: { en: 'The Three-Second Following Rule', fil: 'Ang Three-Second Following Rule' },
        body: {
          en: 'Pick a fixed roadside object (such as a lamp post or sign). When the rear bumper of the vehicle ahead passes it, count “one-thousand-one, one-thousand-two, one-thousand-three.” If you reach the marker before finishing three seconds, you are following too closely—ease off the accelerator. Increase to 4–6 seconds in rain, fog, or behind heavy trucks.',
          fil: 'Pumili ng nakapirming palatandaan sa gilid ng daan. Kapag nilampasan ito ng sinusundang sasakyan, bumilang ng tatlong segundo. Kung maabot mo agad ang palatandaan bago matapos ang tatlong segundo, masyado kang malapit. Gawing 4–6 segundo kapag maulan o gabi.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Posted speed limits indicate the MAXIMUM speed under ideal dry conditions—never a target speed during heavy rain or poor visibility.',
        fil: 'Ang nakapaskil na speed limit ay pinakamataas na bilis sa magandang panahon—dapat magmenor kapag madulas ang kalsada o malakas ang ulan.',
      },
    ],
    examples: [
      {
        en: 'During a sudden downpour on EDSA, oil residue mixes with rainwater, making asphalt slick. Defensive drivers slow down smoothly and double their following gap.',
        fil: 'Sa biglaang buhos ng ulan, nagiging madulas ang aspalto dahil sa langis. Nagmemenor ang maingat na drayber at dinodoble ang agwat sa sinusundan.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Under RA 4136, what is the maximum speed limit when passing through a designated school zone or crowded street?',
        fil: 'Sa ilalim ng RA 4136, ano ang pinakamataas na speed limit kapag dumaraan sa school zone o mataong kalsada?',
      },
      choices: [
        { id: 'a', text: { en: '20 km/h', fil: '20 km/h' } },
        { id: 'b', text: { en: '40 km/h', fil: '40 km/h' } },
        { id: 'c', text: { en: '60 km/h', fil: '60 km/h' } },
        { id: 'd', text: { en: '80 km/h', fil: '80 km/h' } },
      ],
      correctChoiceId: 'a',
      explanation: {
        en: 'Section 35 of RA 4136 sets a 20 km/h maximum speed on crowded streets, approaching intersections at blind corners, and passing school zones.',
        fil: 'Itinatakda ng Seksyon 35 ng RA 4136 ang 20 km/h na pinakamataas na bilis sa mataong kalsada at school zone.',
      },
    },
    sourceReferences: ['RA 4136 Sec. 35', 'LTO Defensive Driving Manual'],
    estimatedMinutes: 8,
  },
  {
    id: 'les_3_2',
    categoryId: 'cat_fundamentals',
    title: {
      en: 'Safe Overtaking, Lane Discipline & Legal Parking Rules',
      fil: 'Ligtas na Pag-overtake, Disiplina sa Linya at Tamang Pagparada',
    },
    introduction: {
      en: 'Improper overtaking on curves or bridges and illegal roadside parking are leading causes of head-on collisions and urban congestion.',
      fil: 'Ang maling pag-overtake sa kurbada o tulay at ilegal na pagparada ay pangunahing sanhi ng banggaan at sikip ng trapiko.',
    },
    objectives: [
      {
        en: 'Identify locations where overtaking is strictly prohibited by law.',
        fil: 'Matukoy ang mga lugar kung saan mahigpit na ipinagbabawal ang pag-overtake.',
      },
      {
        en: 'Apply legal parking restrictions and uphill/downhill wheel-turning techniques.',
        fil: 'Masunod ang mga bawal paradahan at tamang pagpihit ng gulong kapag nakaparada sa matarik na daan.',
      },
    ],
    explanations: [
      {
        heading: { en: 'When Overtaking is Strictly Prohibited', fil: 'Kailan Mahigpit na Bawal Mag-overtake' },
        body: {
          en: 'Never overtake on the left of the center line unless the oncoming lane is clearly visible and free of traffic for a sufficient distance. Overtaking is strictly prohibited at crests of grades (uphill blind spots), curves, bridges, railway crossings, intersections, pedestrian crosswalks, and wherever solid yellow/double yellow lines are painted.',
          fil: 'Mahigpit na ipinagbabawal ang pag-overtake sa kurbada, paahon na hindi kita ang kasalubong, tulay, tawiran ng tren, interseksyon, pedestrian lane, at sa may solid yellow o double yellow line.',
        },
      },
      {
        heading: { en: 'Prohibited Parking Zones (RA 4136 Sec. 46)', fil: 'Mga Lugar na Bawal Paradahan (RA 4136 Sek. 46)' },
        body: {
          en: 'Do not park within an intersection, on a crosswalk, within 6 meters of the intersection of curb lines, within 4 meters of a driveway entrance to any fire station or fire hydrant, in front of a private driveway, or abreast of another parked vehicle (double parking). When parking uphill with a curb, turn front wheels AWAY from the curb; downhill (or uphill without a curb), turn front wheels TOWARD the curb/road edge and engage the parking brake.',
          fil: 'Bawal pumarada sa loob ng interseksyon, sa pedestrian lane, sa loob ng 6 metro mula sa kanto ng interseksyon, sa loob ng 4 metro mula sa fire hydrant o pasukan ng fire station, sa tapat ng pribadong driveway, at double parking.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Pass on the left on two-lane highways; never use the unpaved road shoulder to overtake.',
        fil: 'Umovertake sa kaliwa nang may pag-iingat; huwag kailanman gamitin ang shoulder ng kalsada upang umovertake.',
      },
    ],
    examples: [
      {
        en: 'Approaching a blind mountain curve in Benguet marked with a solid double yellow line, Noel stays patiently behind a slow truck until the road straightens and the center line changes to broken lines.',
        fil: 'Sa isang blind curve na may double yellow line, nanatili muna si Noel sa likod ng mabagal na trak hanggang maging ligtas at putol-putol na ang linya.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Within how many meters of a fire hydrant is parking strictly prohibited under RA 4136?',
        fil: 'Sa loob ng ilang metro mula sa fire hydrant mahigpit na ipinagbabawal ang pagparada ayon sa RA 4136?',
      },
      choices: [
        { id: 'a', text: { en: 'Within 1 meter only', fil: 'Sa loob ng 1 metro lamang' } },
        { id: 'b', text: { en: 'Within 4 meters', fil: 'Sa loob ng 4 na metro' } },
        { id: 'c', text: { en: 'Within 15 meters', fil: 'Sa loob ng 15 metro' } },
        { id: 'd', text: { en: 'Parking beside fire hydrants is allowed if hazards are on', fil: 'Pinapayagan basta naka-hazard light' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'RA 4136 Section 46 prohibits parking within four (4) meters of a fire hydrant or fire station driveway entrance so emergency crews have unobstructed access.',
        fil: 'Ipinagbabawal ng Seksyon 46 ng RA 4136 ang pagparada sa loob ng apat (4) na metro mula sa fire hydrant.',
      },
    },
    sourceReferences: ['RA 4136 Sec. 41 & Sec. 46', 'LTO Driver’s Manual'],
    estimatedMinutes: 8,
  },

  // CATEGORY 4: ROAD COURTESY AND SAFETY
  {
    id: 'les_4_1',
    categoryId: 'cat_courtesy_safety',
    title: {
      en: 'Pedestrian Priority, Cyclists & Motorcycle Safety Laws',
      fil: 'Prayoridad sa Tumatawid, Siklista at Batas sa Kaligtasan sa Motorsiklo',
    },
    introduction: {
      en: 'Vulnerable road users—pedestrians, children, persons with disabilities, cyclists, and motorcycle riders—lack a steel cabin around them and require extra space and courtesy.',
      fil: 'Ang mga pedestrian, bata, matatanda, siklista, at nagmomotorsiklo ay mas bulnerable sa kalsada kaya nangangailangan ng ibayong pag-iingat at pagbibigay-daan.',
    },
    objectives: [
      {
        en: 'Yield properly to pedestrians on crosswalks and observe bike lane protections.',
        fil: 'Magbigay-daan sa mga tumatawid sa pedestrian lane at igalang ang mga bike lane.',
      },
      {
        en: 'Follow RA 10054 (Motorcycle Helmet Act) and RA 10666 (Children’s Safety on Motorcycles Act).',
        fil: 'Masunod ang RA 10054 (Motorcycle Helmet Act) at RA 10666 (Children’s Safety on Motorcycles Act).',
      },
    ],
    explanations: [
      {
        heading: { en: 'Pedestrian Crossings & Vulnerable Users', fil: 'Tawiran ng Tao at Bulnerableng Gumagamit ng Daan' },
        body: {
          en: 'Under RA 4136 Section 42(c), drivers within business or residential districts must yield the right of way to pedestrians crossing within a crosswalk. Never overtake another vehicle that has stopped at a crosswalk—a pedestrian may be crossing hidden from your view.',
          fil: 'Sa ilalim ng RA 4136 Seksyon 42(c), dapat magbigay-daan sa tumatawid sa pedestrian lane. Huwag kailanman umovertake sa sasakyang huminto sa tapat ng tawiran dahil maaaring may tumatawid na tao.',
        },
      },
      {
        heading: { en: 'Motorcycle Safety (RA 10054 & RA 10666)', fil: 'Kaligtasan sa Motorsiklo (RA 10054 at RA 10666)' },
        body: {
          en: 'RA 10054 requires both motorcycle riders and back-riders to wear standard protective motorcycle helmets bearing the ICC/BPS mark on all roads. Under RA 10666, a child may only ride on high-speed/high-density public roads if their feet can comfortably reach the standard foot pegs, their arms can wrap around the rider’s waist, and they wear a standard protective helmet.',
          fil: 'Inaatasan ng RA 10054 ang drayber at angkas ng motorsiklo na magsuot ng standard protective helmet na may ICC/BPS sticker. Sa RA 10666, maaari lamang umangkas ang bata kung abot ng paa ang foot peg, kayang yumakap sa baywang ng nagmamaneho, at may suot na tamang helmet.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Give cyclists and two-wheelers at least 1.5 meters of lateral clearance when passing.',
        fil: 'Magbigay ng sapat na espasyo sa gilid (hindi bababa sa 1.5 metro) kapag nilalampasan ang siklista.',
      },
    ],
    examples: [
      {
        en: 'Seeing a jeepney stopped ahead at a zebra crossing, Liza slows down and stops in the adjacent lane instead of swerving past it—allowing an elderly pedestrian to finish crossing safely.',
        fil: 'Nang makita ni Liza na huminto ang jeep sa tapat ng zebra crossing, huminto rin siya sa katabing linya sa halip na lumusot.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Under RA 10054, who is required to wear a standard protective motorcycle helmet with an ICC/BPS mark?',
        fil: 'Sa ilalim ng RA 10054, sino ang obligadong magsuot ng standard protective motorcycle helmet na may ICC/BPS sticker?',
      },
      choices: [
        { id: 'a', text: { en: 'Only the rider on expressways', fil: 'Ang drayber lamang kapag nasa expressway' } },
        { id: 'b', text: { en: 'Both the motorcycle rider and the back-rider on both short and long trips', fil: 'Parehong drayber at angkas sa malapit man o malayong biyahe' } },
        { id: 'c', text: { en: 'Only riders below 25 years old', fil: 'Mga nagmomotorsiklo lamang na wala pang 25 taong gulang' } },
        { id: 'd', text: { en: 'Construction hard hats are acceptable substitutes', fil: 'Maaaring pamalit ang construction hard hat' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'RA 10054 mandates standard protective motorcycle helmets for all motorcycle drivers and back-riders at all times, whether on short or long drives.',
        fil: 'Inaatasan ng RA 10054 ang parehong drayber at angkas na magsuot ng standard helmet sa lahat ng biyahe.',
      },
    },
    sourceReferences: ['RA 4136 Sec. 42(c)', 'RA 10054', 'RA 10666'],
    estimatedMinutes: 7,
  },
  {
    id: 'les_4_2',
    categoryId: 'cat_courtesy_safety',
    title: {
      en: 'Handling Road Emergencies: Tire Blowout, Skidding & Brake Failure',
      fil: 'Pagharap sa Emergency: Pagsabog ng Gulong, Pagdulas at Pagpalya ng Preno',
    },
    introduction: {
      en: 'Panic reactions—especially slamming the brakes during a tire blowout—often turn recoverable mechanical emergencies into rollovers.',
      fil: 'Ang biglaang pagtaranta—lalo na ang mariing pagtapak sa preno kapag sumabog ang gulong—ay maaaring magdulot ng pagbaliktad ng sasakyan.',
    },
    objectives: [
      {
        en: 'Respond calmly and accurately to a sudden tire blowout or hydroplaning skid.',
        fil: 'Makatugon nang mahinahon at tama sa pagsabog ng gulong o hydroplaning.',
      },
      {
        en: 'Deploy Early Warning Devices (EWD) at the proper distance during roadside breakdowns.',
        fil: 'Mailagay sa tamang distansya ang Early Warning Device (EWD) kapag nasiraan sa daan.',
      },
    ],
    explanations: [
      {
        heading: { en: 'Tire Blowout Response', fil: 'Kapag Sumabog ang Gulong Habang Umaandar' },
        body: {
          en: 'Grip the steering wheel firmly with both hands to keep the vehicle straight, DO NOT slam on the brakes, ease your foot off the accelerator gradually, let the vehicle slow down under control, activate hazard/turn signals, and steer smoothly onto a safe shoulder.',
          fil: 'Hawakan nang mahigpit ang manibela gamit ang dalawang kamay, HUWAG biglang tapakan ang preno, dahan-dahang bitawan ang silinyador, hayaang bumagal nang kusa ang sasakyan, at maingat na tumabi sa ligtas na lugar.',
        },
      },
      {
        heading: { en: 'Brake Failure & EWD Placement', fil: 'Pagpalya ng Preno at Paglalagay ng EWD' },
        body: {
          en: 'If service brakes fail, pump the brake pedal rapidly (on older hydraulic systems), downshift progressively to lower gears to use engine braking, and apply the parking/handbrake gradually while holding the release button to avoid locking the rear wheels. Once stopped safely on the shoulder, switch on hazard lights and place your Early Warning Devices at least 4 meters (and further back on high-speed highways) behind and in front/angled toward approaching traffic.',
          fil: 'Kapag pumalya ang preno, mag-downshift sa mas mababang kambyo (engine braking) at dahan-dahang gamitin ang handbrake. Kapag nakatabi na, buksan ang hazard light at maglagay ng Early Warning Device nang hindi bababa sa 4 na metro mula sa sasakyan (mas malayo pa kung nasa highway).',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Never use stones, tree branches, or plastic chairs as permanent substitutes for reflective Early Warning Devices at night.',
        fil: 'Huwag gumamit ng bato o sanga ng kahoy bilang kapalit ng reflective Early Warning Device lalo na sa gabi.',
      },
    ],
    examples: [
      {
        en: 'When his front right tire blows out on TPLEX, Ramon resists slamming the brake pedal, holds the wheel straight, coasts down to 20 km/h, and pulls safely onto the outer shoulder.',
        fil: 'Nang pumutok ang gulong sa harap, hindi biglang nagpreno si Ramon; hinawakan niya nang tuwid ang manibela at dahan-dahang tumabi sa shoulder.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'What is the FIRST and safest action if your tire suddenly blows out at highway speed?',
        fil: 'Ano ang UNA at pinakaligtas na dapat gawin kung biglang sumabog ang gulong sa highway?',
      },
      choices: [
        { id: 'a', text: { en: 'Slam the foot brake as hard as possible', fil: 'Tapakan nang todo at biglaan ang preno' } },
        { id: 'b', text: { en: 'Grip the steering wheel firmly, avoid sudden braking, and ease off the accelerator', fil: 'Hawakan nang mahigpit ang manibela, iwasan ang biglang preno, at bitawan nang dahan-dahan ang silinyador' } },
        { id: 'c', text: { en: 'Pull the handbrake all the way up immediately', fil: 'Hilahin agad nang todo ang handbrake' } },
        { id: 'd', text: { en: 'Turn the steering wheel sharply toward the center island', fil: 'Ikabig nang bigla ang manibela papunta sa gitna' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'Hard braking during a blowout shifts weight violently and can cause loss of control or rollover; keeping a firm grip and decelerating smoothly preserves stability.',
        fil: 'Ang biglaang pagpreno kapag sumabog ang gulong ay maaaring magdulot ng pagkawala ng kontrol o pagbaliktad ng sasakyan.',
      },
    },
    sourceReferences: ['LTO Driver’s Manual: Handling Emergencies', 'LOI No. 229 (Early Warning Device)'],
    estimatedMinutes: 7,
  },

  // CATEGORY 5: RIGHTS, DUTIES AND RESPONSIBILITIES
  {
    id: 'les_5_1',
    categoryId: 'cat_rights_duties',
    title: {
      en: 'Right-of-Way Rules at Intersections, Rotundas & Emergency Vehicles',
      fil: 'Panuntunan sa Right-of-Way sa Interseksyon, Rotunda at Emergency Vehicles',
    },
    introduction: {
      en: 'Right of way is never something to “insist on” at the cost of a crash—it is a clear legal rule telling drivers who must yield first so traffic flows predictably.',
      fil: 'Ang right-of-way ay malinaw na pamantayan kung sino ang dapat magbigay-daan upang maiwasan ang kalituhan at banggaan sa interseksyon.',
    },
    objectives: [
      {
        en: 'Apply RA 4136 Section 42–43 right-of-way rules at uncontrolled intersections, T-intersections, rotundas, and private driveways.',
        fil: 'Maisabuhay ang Seksyon 42–43 ng RA 4136 sa interseksyon, T-junction, rotunda, at paglabas ng driveway.',
      },
      {
        en: 'Yield immediately and safely to emergency vehicles sounding sirens and flashing lights.',
        fil: 'Agad at ligtas na makapagbigay-daan sa mga ambulansya, bumbero, at pulis na rumeresponde.',
      },
    ],
    illustrationPng: '/assets/png/lessons/right_of_way.png',
    explanations: [
      {
        heading: { en: 'Uncontrolled Intersections & T-Junctions', fil: 'Interseksyong Walang Traffic Light at T-Junction' },
        body: {
          en: '1) First to arrive: A vehicle that has already entered an intersection first has the right of way over one just approaching. 2) Simultaneous arrival: When two vehicles approach or enter an uncontrolled intersection at the same time, the driver on the LEFT shall yield the right of way to the vehicle on the RIGHT. 3) T-Intersection: Vehicles on the terminating road must yield to vehicles traveling on the continuing through-road. 4) Rotunda/Roundabout: Vehicles approaching to enter a rotunda must yield to vehicles already circulating inside the rotunda.',
          fil: '1) Unang nakapasok: Pagbigyan ang sasakyang nauna nang pumasok sa interseksyon. 2) Sabay na dumating: Ang sasakyan sa KALIWA ay dapat magbigay-daan sa sasakyang nasa KANAN. 3) T-Intersection: Ang nasa dulo ng kalsadang nagtatapos ay dapat magbigay sa nasa tuloy-tuloy na daan. 4) Rotunda: Magbigay-daan sa mga sasakyang umiikot na sa loob ng rotunda.',
        },
      },
      {
        heading: { en: 'Emergency Vehicles & Private Driveways', fil: 'Emergency Vehicles at Pribadong Driveway' },
        body: {
          en: 'Drivers exiting a private road, alley, parking lot, or driveway must yield to all pedestrians on the sidewalk and vehicles on the public highway. Upon hearing the siren or seeing flashing beacons of an ambulance, fire truck, or police patrol responding to an emergency, pull as close as safe to the right-hand curb clear of any intersection and stop until it passes.',
          fil: 'Ang lumalabas mula sa pribadong garahe o parking lot ay dapat magbigay sa lahat ng tumatawid at sasakyan sa pangunahing daan. Kapag may rumerespondeng ambulansya o bumbero, tumabi sa kanang gilid nang malayo sa interseksyon at huminto hanggang makalampas ito.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Never tailgate or follow closely behind a responding ambulance to cut through heavy traffic—that is both illegal and dangerous.',
        fil: 'Mahigpit na ipinagbabawal ang pagbuntot sa likod ng ambulansya upang makalusot sa trapik.',
      },
    ],
    examples: [
      {
        en: 'Two cars reach a quiet subdivision four-way intersection without signs at the exact same moment. Car A sees Car B immediately to its right, so Car A yields and lets Car B proceed first.',
        fil: 'Sabay na dumating ang Kotse A at Kotse B sa interseksyong walang karatula. Dahil nasa kanan ni Kotse A ang Kotse B, nagbigay-daan muna ang Kotse A.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Two vehicles arrive at an uncontrolled 4-way intersection at the exact same time. Which driver must yield the right of way?',
        fil: 'Dalawang sasakyan ang sabay na dumating sa interseksyong walang traffic light o karatula. Sinong drayber ang dapat magbigay-daan?',
      },
      choices: [
        { id: 'a', text: { en: 'The driver on the right yields to the driver on the left', fil: 'Ang nasa kanan ang magbibigay sa nasa kaliwa' } },
        { id: 'b', text: { en: 'The driver on the left yields to the driver on the right', fil: 'Ang drayber sa kaliwa ang magbibigay-daan sa sasakyan sa kanan' } },
        { id: 'c', text: { en: 'Whichever vehicle is smaller must always yield', fil: 'Kung alin ang mas maliit na sasakyan' } },
        { id: 'd', text: { en: 'Whichever driver honks the horn first proceeds', fil: 'Kung sino ang unang bumusina' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'Under RA 4136 Section 42(a), when two vehicles approach an intersection at approximately the same time, the driver on the left shall yield to the vehicle on the right.',
        fil: 'Ayon sa Seksyon 42(a) ng RA 4136, kapag sabay na dumating sa interseksyon, ang nasa kaliwa ang dapat magbigay-daan sa nasa kanan.',
      },
    },
    sourceReferences: ['RA 4136 Sec. 42 & Sec. 43', 'LTO Driver’s Manual'],
    estimatedMinutes: 8,
  },

  // CATEGORY 6: MOTOR VEHICLE REGISTRATION
  {
    id: 'les_6_1',
    categoryId: 'cat_registration',
    title: {
      en: 'OR/CR Documentation, Renewal Schedule & Roadworthiness',
      fil: 'Dokumento ng OR/CR, Iskedyul ng Renewal at Roadworthiness',
    },
    introduction: {
      en: 'Every motor vehicle operated on public highways in the Philippines must hold active LTO registration supported by valid insurance and roadworthiness inspection.',
      fil: 'Bawat sasakyang bumibiyahe sa pampublikong kalsada sa Pilipinas ay dapat rehistrado sa LTO at may valid na insurance at inspeksyon.',
    },
    objectives: [
      {
        en: 'Identify the documents that must always be kept inside the vehicle (copies of OR and CR).',
        fil: 'Matukoy ang mga dokumentong dapat laging nasa loob ng sasakyan (kopya ng OR at CR).',
      },
      {
        en: 'Read the LTO registration renewal month and week from license plate digits.',
        fil: 'Malaman ang buwan at linggo ng pag-renew ng rehistro batay sa numero ng plaka.',
      },
    ],
    explanations: [
      {
        heading: { en: 'Essential Vehicle Documents (OR & CR)', fil: 'Mahahalagang Dokumento (OR at CR)' },
        body: {
          en: 'The Certificate of Registration (CR) establishes ownership and vehicle details, while the current Official Receipt (OR) proves up-to-date annual registration payment. Brand-new vehicles receive an initial three (3) year registration; thereafter, registration is renewed annually alongside Compulsory Third-Party Liability (CTPL) insurance and LTO roadworthiness/emission testing.',
          fil: 'Ang Certificate of Registration (CR) ay patunay ng rehistro ng sasakyan at ang Official Receipt (OR) ang patunay ng bayad sa kasalukuyang taon. Tatlong (3) taon ang unang rehistro ng brand-new na sasakyan at taunan na pagkatapos nito kasama ang CTPL insurance at inspeksyon.',
        },
      },
      {
        heading: { en: 'Plate Number Renewal Schedule', fil: 'Iskedyul ng Renewal Batay sa Plaka' },
        body: {
          en: 'The LAST digit of the license plate determines the registration MONTH: 1 = January, 2 = February, 3 = March, 4 = April, 5 = May, 6 = June, 7 = July, 8 = August, 9 = September, 0 = October. The SECOND-TO-LAST (middle/preceding) digit determines the weekly deadline within that month: 1–3 = 1st to 7th day; 4–6 = 8th to 14th day; 7–8 = 15th to 21st day; 9–0 = 22nd to last day of the month.',
          fil: 'Ang HULING numero ng plaka ang tumutukoy sa BUWAN ng rehistro (1=Enero hanggang 9=Setyembre, at 0=Oktubre). Ang PANGALAWA SA HULING numero naman ang tumutukoy sa linggo ng buwan: 1–3 (ika-1 hanggang 7 araw), 4–6 (ika-8 hanggang 14), 7–8 (ika-15 hanggang 21), at 9–0 (ika-22 hanggang katapusan).',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Operating an unregistered motor vehicle on public roads carries steep fines and potential impoundment.',
        fil: 'Ang pagmamaneho ng paso o hindi rehistradong sasakyan ay may mabigat na multa at maaaring ma-impound.',
      },
    ],
    examples: [
      {
        en: 'A sedan with plate ending in “58” must renew its registration in August (last digit 8), during the second week—8th to 14th of August (preceding digit 5).',
        fil: 'Ang plakang nagtatapos sa “58” ay dapat mag-renew sa buwan ng Agosto (8), mula ika-8 hanggang ika-14 ng buwan (5).',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'A vehicle’s license plate ends with the digit “0”. In which month is its annual LTO registration due?',
        fil: 'Ang plaka ng sasakyan ay nagtatapos sa numerong “0”. Anong buwan nakatakda ang taunang renewal nito sa LTO?',
      },
      choices: [
        { id: 'a', text: { en: 'October', fil: 'Oktubre' } },
        { id: 'b', text: { en: 'December', fil: 'Disyembre' } },
        { id: 'c', text: { en: 'November', fil: 'Nobyembre' } },
        { id: 'd', text: { en: 'January', fil: 'Enero' } },
      ],
      correctChoiceId: 'a',
      explanation: {
        en: 'Under LTO plate-ending schedules, digits 1 through 9 correspond to January through September, and 0 corresponds to October (November and December have no regular ending digits).',
        fil: 'Sa iskedyul ng LTO, ang 1 hanggang 9 ay Enero hanggang Setyembre, at ang 0 ay Oktubre.',
      },
    },
    sourceReferences: ['RA 4136 Chapter II', 'LTO Motor Vehicle Registration Guidelines'],
    estimatedMinutes: 7,
  },

  // CATEGORY 7: LAND TRANSPORTATION LAWS
  {
    id: 'les_7_1',
    categoryId: 'cat_laws',
    title: {
      en: 'Anti-Distracted Driving (RA 10913) & Anti-Drunk/Drugged Driving (RA 10586)',
      fil: 'Anti-Distracted Driving (RA 10913) at Anti-Drunk/Drugged Driving (RA 10586)',
    },
    introduction: {
      en: 'Taking your eyes off the road for just 4 seconds at 60 km/h means driving blind across more than 65 meters. Special Philippine traffic statutes strictly penalize distracted and impaired driving.',
      fil: 'Ang pagtingin sa cellphone nang 4 na segundo sa bilis na 60 km/h ay katumbas ng pagmamaneho nang nakapikit sa mahigit 65 metro. Mahigpit itong ipinagbabawal ng batas.',
    },
    objectives: [
      {
        en: 'Understand what RA 10913 prohibits (including while stopped at a red traffic light) and permitted hands-free mounting rules.',
        fil: 'Maunawaan ang ipinagbabawal ng RA 10913 (kahit nakahinto sa red light) at tamang pwesto ng navigation mount.',
      },
      {
        en: 'Know Field Sobriety Tests and breathalyzer enforcement under RA 10586.',
        fil: 'Malaman ang Field Sobriety Tests at parusa sa pagmamaneho nang lasing sa ilalim ng RA 10586.',
      },
    ],
    explanations: [
      {
        heading: { en: 'RA 10913: Anti-Distracted Driving Act', fil: 'RA 10913: Anti-Distracted Driving Act' },
        body: {
          en: 'Prohibits holding a mobile communications device to text, call, browse, or watch videos while a motor vehicle is in motion OR temporarily stopped at a red traffic light or intersection. Hands-free operation (speakerphone/Bluetooth) is allowed ONLY if the device is mounted below the dashboard line-of-sight so it does not obstruct the driver’s view, excluding genuine emergency calls (medical, fire, police).',
          fil: 'Ipinagbabawal ang paghawak ng cellphone upang mag-text, tumawag, o manood habang umaandar ang sasakyan O kahit pansamantalang nakahinto sa red light. Pinapayagan lamang ang hands-free kung hindi nakaharang sa paningin (line of sight) sa windshield, maliban kung tumatawag sa emergency.',
        },
      },
      {
        heading: { en: 'RA 10586: Anti-Drunk and Drugged Driving Act', fil: 'RA 10586: Anti-Drunk and Drugged Driving Act' },
        body: {
          en: 'Law enforcement officers with probable cause (swerving, overspeeding, smell of alcohol) administer three standardized Field Sobriety Tests: the Eye Test (horizontal gaze nystagmus), the Walk-and-Turn, and the One-Leg Stand—followed by an Alcohol Breath Analyzer (ABA) test. Refusal to undergo mandatory testing results in automatic confiscation and revocation/suspension penalties.',
          fil: 'Kapag may probable cause, isinasagawa ang tatlong Field Sobriety Test: Eye Test, Walk-and-Turn, at One-Leg Stand, kasunod ang Alcohol Breath Analyzer (ABA). Ang pagtanggi sa pagsusuri ay may kaakibat na pagkumpiska at mabigat na parusa sa lisensya.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'For drivers of trucks, buses, motorcycles, and public utility vehicles, the permissible Blood Alcohol Concentration (BAC) threshold is strictly ZERO (0.0%).',
        fil: 'Para sa mga drayber ng pampublikong sasakyan, trak, bus, at motorsiklo, ZERO (0.0%) ang pinapayagang alkohol sa dugo.',
      },
    ],
    examples: [
      {
        en: 'While waiting at a red stoplight in Makati, Ben leaves his phone untouched in its low console cradle rather than picking it up to reply to a message.',
        fil: 'Habang nakahinto sa red light, hindi hinawakan ni Ben ang kanyang cellphone dahil sakop pa rin ng RA 10913 ang pansamantalang paghinto sa intersection.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Does RA 10913 (Anti-Distracted Driving Act) allow holding your smartphone to send a quick text message while temporarily stopped at a red traffic light?',
        fil: 'Pinapayagan ba ng RA 10913 ang paghawak sa cellphone upang mag-text habang pansamantalang nakahinto sa red light?',
      },
      choices: [
        { id: 'a', text: { en: 'Yes, because the wheels are not rotating', fil: 'Oo, dahil hindi naman umiikot ang gulong' } },
        { id: 'b', text: { en: 'No, the prohibition explicitly covers vehicles temporarily stopped at a red light', fil: 'Hindi, sakop ng pagbabawal kahit pansamantalang nakahinto sa red light' } },
        { id: 'c', text: { en: 'Yes, if the message takes less than 10 seconds', fil: 'Oo, kung wala pang 10 segundo' } },
        { id: 'd', text: { en: 'Yes, for Non-Professional drivers only', fil: 'Oo, para sa Non-Professional lamang' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'RA 10913 explicitly defines a vehicle temporarily stopped at a red light at an intersection as still operating in traffic; handheld phone use remains prohibited.',
        fil: 'Malinaw sa RA 10913 na bawal pa ring gumamit ng hawak na cellphone kahit nakahinto sa red light sa interseksyon.',
      },
    },
    sourceReferences: ['RA 10913 & IRR', 'RA 10586 & IRR'],
    estimatedMinutes: 8,
  },

  // CATEGORY 8: FINES AND PENALTIES
  {
    id: 'les_8_1',
    categoryId: 'cat_fines_penalties',
    title: {
      en: 'Demerit Point System, Apprehension Procedures & Incident Duties',
      fil: 'Demerit Point System, Proseso ng Panghuhuli at Tungkulin sa Aksidente',
    },
    introduction: {
      en: 'Knowing your legal duties when flagged down by a deputized officer or involved in a road crash ensures lawful resolution and protects human life first.',
      fil: 'Ang pag-alam sa tamang proseso kapag pinara ng awtorisadong enforcer o nasangkot sa aksidente ay nagpoprotekta sa buhay at nagpapanatili ng kaayusan.',
    },
    objectives: [
      {
        en: 'Understand how LTO demerit points affect license renewal, mandatory reorientation, and revocation under RA 10930.',
        fil: 'Maunawaan kung paano nakaaapekto ang demerit points ng LTO sa pag-renew at suspensyon ng lisensya.',
      },
      {
        en: 'Fulfill legal duties under RA 4136 Section 55 when involved in a road crash.',
        fil: 'Magampanan ang legal na tungkulin sa ilalim ng RA 4136 Seksyon 55 sakaling masangkot sa aksidente.',
      },
    ],
    explanations: [
      {
        heading: { en: 'LTO Demerit Point Categories (RA 10930)', fil: 'Kategorya ng Demerit Points (RA 10930)' },
        body: {
          en: 'Traffic violations are classified by severity into Grave Violations (5 demerit points), Less Grave Violations (3 demerit points), and Light Violations (1 demerit point). Public Utility Vehicle (PUV) drivers receive double demerit points when committing violations while operating a PUV. Accumulating demerit points disqualifies a driver from the 10-year validity privilege, requires driver reorientation courses at threshold totals, and leads to license revocation for habitual offenders.',
          fil: 'Nahahati ang paglabag sa Grave (5 puntos), Less Grave (3 puntos), at Light (1 puntos). Doble ang puntos kapag minamaneho ay PUV. Ang pagkakaroon ng demerit points ay nakaaalis ng kwalipikasyon sa 10-taong bisa ng lisensya at maaaring humantong sa reorientation o pagbawi ng lisensya.',
        },
      },
      {
        heading: { en: 'Duty of Driver in Case of Accident (RA 4136 Sec. 55)', fil: 'Tungkulin ng Drayber sa Aksidente (RA 4136 Sek. 55)' },
        body: {
          en: 'Stop immediately, check for injuries, render reasonable medical assistance (including transporting injured persons to a hospital when safe and necessary), present your name, address, license, and registration to involved parties and police officers, and never flee the scene (“hit and run”), unless under imminent threat to life where you must report immediately to the nearest police station.',
          fil: 'Agad na huminto, tulungan ang nasaktan, ipakita ang pangalan, lisensya, at rehistro sa sangkot at sa pulis, at huwag tumakas (“hit and run”). Kung may seryosong banta sa kaligtasan ng drayber, dapat agad mag-ulat sa pinakamalapit na himpilan ng pulisya.',
        },
      },
    ],
    importantReminders: [
      {
        en: 'Only LTO officers and duly deputized personnel are authorized to confiscate a physical driver’s license unless a specific statute (such as drunk driving) mandates immediate confiscation.',
        fil: 'Mga opisyal ng LTO at awtorisadong deputized agent lamang ang may kapangyarihang magkumpiska ng lisensya ayon sa batas.',
      },
    ],
    examples: [
      {
        en: 'When flagged down for a lane violation, Elena pulls over safely, rolls down her window, keeps her hands visible, politely asks the officer for the specific violation, and verifies the Temporary Operator’s Permit / citation details without offering any bribe.',
        fil: 'Nang parahin dahil sa lane violation, maayos na tumabi si Elena, magalang na itinanong ang paglabag, at hinding-hindi nag-alok ng suhol.',
      },
    ],
    knowledgeCheck: {
      question: {
        en: 'Under RA 4136 Section 55, under what exceptional circumstance may a driver leave the immediate scene of an accident, provided they report at once to the nearest police station?',
        fil: 'Sa ilalim ng RA 4136 Seksyon 55, kailan lamang maaaring umalis sa pinangyarihan ng aksidente ang drayber basta’t agad siyang mag-uulat sa pinakamalapit na pulisya?',
      },
      choices: [
        { id: 'a', text: { en: 'When running late for an office meeting', fil: 'Kapag mahuhuli na sa trabaho o pulong' } },
        { id: 'b', text: { en: 'When in imminent danger of serious harm from persons gathered, or to bring an injured person to a physician/hospital', fil: 'Kapag may malubhang banta ng pananakit sa drayber o upang dalhin sa ospital ang sugatan' } },
        { id: 'c', text: { en: 'Whenever vehicle paint scratches are minor', fil: 'Kapag maliit na gasgas lamang ang natamo' } },
        { id: 'd', text: { en: 'When driving a newly purchased car', fil: 'Kapag bago pa ang minamanehong sasakyan' } },
      ],
      correctChoiceId: 'b',
      explanation: {
        en: 'Section 55 of RA 4136 strictly forbids leaving an accident scene except when in imminent danger of serious harm by reason of the accident, when reporting directly to the nearest officer of the law, or when summoning a physician/nurse/bringing the injured for treatment.',
        fil: 'Pinapayagan lamang ng Seksyon 55 ng RA 4136 kung nasa bingit ng panganib ang drayber, direktang mag-uulat sa pulisya, o magdadala ng sugatan sa pagamutan.',
      },
    },
    sourceReferences: ['RA 4136 Sec. 55', 'RA 10930 IRR (Demerit Point System)', 'DOTr-LTO Joint Administrative Order 2014-01'],
    estimatedMinutes: 9,
  },
];
