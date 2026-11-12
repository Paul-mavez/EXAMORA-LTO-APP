import { RoadSign } from '../../domain/model/models';

export const ROAD_SIGNS: RoadSign[] = [
  // 1. REGULATORY SIGNS
  {
    id: 'sign_stop',
    name: { en: 'Stop Sign', fil: 'Huminto (Stop Sign)' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_stop.png',
    explanation: {
      en: 'An octagonal red regulatory sign with white border and bold white “STOP” lettering (DPWH R1-1). It commands a complete cessation of movement.',
      fil: 'Walong-sulok (octagon) na pulang karatula na may puting titik na “STOP” (DPWH R1-1). Nag-uutos ito ng ganap na paghinto.',
    },
    meaning: {
      en: 'Come to a full and complete stop.',
      fil: 'Ganap na ihinto ang sasakyan.',
    },
    requiredAction: {
      en: 'Stop completely before the stop line or pedestrian crosswalk. Look left, right, and left again; yield to all pedestrians and cross traffic before proceeding.',
      fil: 'Huminto nang buo bago lumampas sa stop line o pedestrian lane. Lumingon sa kaliwa at kanan at magbigay-daan bago tumuloy.',
    },
    exampleSituation: {
      en: 'Approaching a minor barangay street intersecting a major national highway where cross traffic moves fast.',
      fil: 'Paglabas mula sa maliit na kalye patungo sa pangunahing highway.',
    },
    sourceReference: 'DPWH Highway Safety Design Standards Manual (R1-1) / LTO Manual',
  },
  {
    id: 'sign_give_way',
    name: { en: 'Give Way / Yield', fil: 'Magbigay-Daan (Give Way)' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_give_way.png',
    explanation: {
      en: 'A downward-pointing equilateral triangle with a thick red border on a white background (DPWH R1-2).',
      fil: 'Nakabaliktad na tatsulok na may makapal na pulang gilid at puting gitna (DPWH R1-2).',
    },
    meaning: {
      en: 'Assigns priority to traffic on the intersecting road or roundabout.',
      fil: 'Ibigay ang karapatan sa daan sa mga sasakyang nasa kabilang kalsada o rotunda.',
    },
    requiredAction: {
      en: 'Slow down, prepare to stop if necessary, and yield the right of way to vehicles and pedestrians on the priority road or inside a rotunda.',
      fil: 'Magmenor, humanda sa paghinto kung kinakailangan, at paunahin ang mga sasakyan sa pangunahing kalsada o sa loob ng rotunda.',
    },
    exampleSituation: {
      en: 'Entering Quezon Memorial Circle or merging onto a major arterial avenue via a slip lane.',
      fil: 'Pagpasok sa isang rotunda o slip lane patungo sa malaking abenida.',
    },
    sourceReference: 'DPWH Road Signs & Pavement Markings Manual (R1-2)',
  },
  {
    id: 'sign_no_entry',
    name: { en: 'No Entry for All Vehicles', fil: 'Bawal Pumasok (No Entry)' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_no_entry.png',
    explanation: {
      en: 'A solid red circle containing a centered horizontal white bar (DPWH R2-3).',
      fil: 'Buong pulang bilog na may pahalang na puting guhit sa gitna (DPWH R2-3).',
    },
    meaning: {
      en: 'Entry is strictly prohibited for all vehicles from your direction.',
      fil: 'Mahigpit na ipinagbabawal ang pagpasok ng anumang sasakyan sa direksyong ito.',
    },
    requiredAction: {
      en: 'Do not enter the street or ramp; choose an alternative legal route to avoid driving counterflow into oncoming one-way traffic.',
      fil: 'Huwag pumasok sa kalyeng ito dahil maaaring one-way at pasalubong ang daloy ng sasakyan.',
    },
    exampleSituation: {
      en: 'Posted at the exit end of a one-way city street or expressway off-ramp.',
      fil: 'Nakalagay sa labasan ng one-way na kalsada sa lungsod.',
    },
    sourceReference: 'DPWH Road Signs Manual (R2-3) / LTO Manual',
  },
  {
    id: 'sign_speed_60',
    name: { en: 'Speed Limit (60 km/h)', fil: 'Takdang Bilis (60 km/h)' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_speed_60.png',
    explanation: {
      en: 'A circular white regulatory sign with a bold red ring displaying the maximum lawful speed in kilometers per hour (DPWH R4-1).',
      fil: 'Bilog na puting karatula na may pulang bilog sa gilid at numero ng pinakamataas na bilis sa km/h (DPWH R4-1).',
    },
    meaning: {
      en: 'Maximum permissible speed under ideal road and weather conditions is 60 km/h.',
      fil: 'Ang pinakamataas na pinapayagang bilis sa magandang panahon ay 60 km/h.',
    },
    requiredAction: {
      en: 'Keep your speedometer at or below 60 km/h, and drive even slower during heavy rain, night glare, or dense traffic.',
      fil: 'Panatilihing hindi lalampas sa 60 km/h ang takbo, at lalo pang magmenor kung umuulan o masikip ang daloy.',
    },
    exampleSituation: {
      en: 'Posted along Commonwealth Avenue or circumferential urban highways.',
      fil: 'Nakapaskil sa malalapad na lansangan gaya ng Commonwealth Avenue.',
    },
    sourceReference: 'DPWH Road Signs Manual (R4-1)',
  },
  {
    id: 'sign_no_uturn',
    name: { en: 'No U-Turn', fil: 'Bawal Mag-U-Turn' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_no_uturn.png',
    explanation: {
      en: 'A red-bordered circular prohibitory sign with a 180-degree U-turn arrow crossed by a diagonal red slash (DPWH R3-13).',
      fil: 'Bilog na may pulang gilid at palaso ng U-turn na may pulang pahilis na guhit (DPWH R3-13).',
    },
    meaning: {
      en: 'Reversing direction via a 180-degree turn is prohibited at this intersection or median opening.',
      fil: 'Ipinagbabawal ang pag-ikot pabalik (U-turn) sa bahaging ito ng kalsada.',
    },
    requiredAction: {
      en: 'Continue straight or make a permitted turn and proceed to the next designated U-turn slot.',
      fil: 'Magpatuloy nang diretso hanggang sa susunod na awtorisadong U-turn slot.',
    },
    exampleSituation: {
      en: 'Signalized intersections where turning back would block left-turn lanes and endanger oncoming vehicles.',
      fil: 'Sa mga interseksyong may traffic light kung saan makakaabala at delikado ang pag-ikot.',
    },
    sourceReference: 'DPWH Road Signs Manual (R3-13)',
  },
  {
    id: 'sign_no_overtaking',
    name: { en: 'No Overtaking', fil: 'Bawal Umovertake' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_no_overtaking.png',
    explanation: {
      en: 'Circular red-bordered prohibitory sign depicting two cars side-by-side with a diagonal slash (DPWH R3-16).',
      fil: 'Bilog na karatula na nagpapakita ng dalawang magkatabing sasakyan na may pulang pahilis na guhit (DPWH R3-16).',
    },
    meaning: {
      en: 'Passing or overtaking ahead vehicles is prohibited throughout this zone.',
      fil: 'Mahigpit na ipinagbabawal ang paglampas o pag-overtake sa nauunang sasakyan.',
    },
    requiredAction: {
      en: 'Stay in your lane behind the vehicle ahead until the end-of-prohibition sign or clear passing zone.',
      fil: 'Manatili sa sariling linya at huwag lumipat sa kabilang linya upang umovertake.',
    },
    exampleSituation: {
      en: 'Approaching narrow two-lane bridges, mountain curves, and blind crests.',
      fil: 'Bago dumating sa makikitid na tulay o blind curve sa probinsya.',
    },
    sourceReference: 'DPWH Road Signs Manual (R3-16)',
  },
  {
    id: 'sign_no_parking',
    name: { en: 'No Parking', fil: 'Bawal Pumarada (No Parking)' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_no_parking.png',
    explanation: {
      en: 'Circular red-bordered sign showing the letter “P” crossed out by a red diagonal slash (DPWH R5-1).',
      fil: 'Bilog na karatula na may titik “P” at pulang pahilis na guhit (DPWH R5-1).',
    },
    meaning: {
      en: 'Leaving a vehicle parked along this curb or roadway zone is prohibited.',
      fil: 'Bawal iwan o iparada ang sasakyan sa bahaging ito ng kalsada.',
    },
    requiredAction: {
      en: 'Do not leave your vehicle stationary here; locate a legal off-street or designated parking bay.',
      fil: 'Humanap ng legal na parking area upang hindi mahatak o matiketan.',
    },
    exampleSituation: {
      en: 'Mabuhay Lanes, hospital emergency driveways, and narrow city thoroughfares.',
      fil: 'Sa mga Mabuhay Lanes at tapat ng emergency entrance ng ospital.',
    },
    sourceReference: 'DPWH Road Signs Manual (R5-1)',
  },
  {
    id: 'sign_seatbelt',
    name: { en: 'Use Seat Belt Sign', fil: 'Magsuot ng Seat Belt' },
    category: 'REGULATORY',
    imageResource: '/assets/png/signs/reg_seatbelt.png',
    explanation: {
      en: 'Mandatory blue circular regulatory sign displaying a belted occupant symbol (DPWH R6-4).',
      fil: 'Asul na bilog na karatula na nag-uutos ng pagsusuot ng seat belt (DPWH R6-4).',
    },
    meaning: {
      en: 'Mandatory seatbelt compliance under RA 8750 is strictly enforced ahead.',
      fil: 'Obligadong nakasuot ng seat belt ang drayber at mga pasahero.',
    },
    requiredAction: {
      en: 'Verify that you and your passengers have properly fastened three-point seatbelts and child restraints.',
      fil: 'Tiyaking maayos na nakakabit ang seat belt ng drayber at mga sakay.',
    },
    exampleSituation: {
      en: 'Tollway entry plazas (NLEX, SLEX, Skyway, CALAX) and national highways.',
      fil: 'Pagpasok sa mga tollgate ng expressway at pambansang lansangan.',
    },
    sourceReference: 'RA 8750 / DPWH Road Signs Manual (R6-4)',
  },

  // 2. WARNING SIGNS
  {
    id: 'sign_warn_pedestrian',
    name: { en: 'Pedestrian Crossing Ahead', fil: 'Babala: Tawiran ng Tao sa Unahan' },
    category: 'WARNING',
    imageResource: '/assets/png/signs/warn_pedestrian.png',
    explanation: {
      en: 'Upward-pointing equilateral red-bordered warning triangle showing a walking pedestrian symbol (DPWH W6-1).',
      fil: 'Pataas na tatsulok na may pulang gilid at simbolo ng taong naglalakad (DPWH W6-1).',
    },
    meaning: {
      en: 'Advance warning that a marked or heavily used pedestrian crossing lies ahead.',
      fil: 'Babala na may malapit nang tawiran ng tao sa unahan.',
    },
    requiredAction: {
      en: 'Reduce speed, cover the brake pedal, scan both sidewalks, and prepare to stop completely for pedestrians.',
      fil: 'Magmenor, maging alerto sa magkabilang bangketa, at humandang huminto para sa mga tatawid.',
    },
    exampleSituation: {
      en: '50–100 meters before public markets, plazas, and transit terminals.',
      fil: 'Bago sumapit sa palengke, simbahan, o sakayan.',
    },
    sourceReference: 'DPWH Highway Safety Design Standards (W6-1)',
  },
  {
    id: 'sign_warn_curve',
    name: { en: 'Sharp Turn / Curve Ahead', fil: 'Babala: Biglang Liko o Kurbada' },
    category: 'WARNING',
    imageResource: '/assets/png/signs/warn_sharp_curve.png',
    explanation: {
      en: 'Warning triangle showing a sharp directional bend arrow to the right (DPWH W1-1).',
      fil: 'Tatsulok na babala na may nakabaluktot na palaso pakanan (DPWH W1-1).',
    },
    meaning: {
      en: 'The roadway ahead curves sharply to the right with limited sight distance.',
      fil: 'May matalim na kurbada pakanan sa unahan at limitado ang tanaw.',
    },
    requiredAction: {
      en: 'Decelerate BEFORE entering the curve, keep centered in your lane, and strictly avoid overtaking.',
      fil: 'Magmenor BAGO pumasok sa kurbada, manatili sa tamang linya, at huwag mag-overtake.',
    },
    exampleSituation: {
      en: 'Provincial zigzag highways in Quezon (Bitukang Manok), Rizal, or Cordillera.',
      fil: 'Sa mga pakurbang daan sa bundok o probinsya.',
    },
    sourceReference: 'DPWH Road Signs Manual (W1-1)',
  },
  {
    id: 'sign_warn_slippery',
    name: { en: 'Slippery Road When Wet', fil: 'Madulas ang Kalsada' },
    category: 'WARNING',
    imageResource: '/assets/png/signs/warn_slippery.png',
    explanation: {
      en: 'Warning triangle showing a vehicle silhouette above wavy skid tracks (DPWH W5-9).',
      fil: 'Tatsulok na babala na may sasakyan at kumikiwal na bakas ng gulong (DPWH W5-9).',
    },
    meaning: {
      en: 'Pavement ahead becomes unusually slick during rain, mud, or moisture.',
      fil: 'Nagiging madulas ang ibabaw ng kalsada lalo na kapag basa o maulan.',
    },
    requiredAction: {
      en: 'Slow down smoothly, avoid abrupt steering, hard braking, or sudden acceleration, and increase following distance.',
      fil: 'Bagalan ang takbo, iwasan ang biglaang pagpreno o pagkabig ng manibela, at dagdagan ang distansya sa sinusundan.',
    },
    exampleSituation: {
      en: 'Steel deck bridges, newly resurfaced asphalt, and shaded mountain roads.',
      fil: 'Sa mga bakal na tulay at bagong latag na aspalto kapag umuulan.',
    },
    sourceReference: 'DPWH Road Signs Manual (W5-9)',
  },
  {
    id: 'sign_warn_school',
    name: { en: 'Children / School Zone Ahead', fil: 'Babala: Paaralan / Tawiran ng mga Bata' },
    category: 'WARNING',
    imageResource: '/assets/png/signs/warn_school_zone.png',
    explanation: {
      en: 'Fluorescent yellow/amber pentagon sign featuring two school children walking (DPWH W6-4).',
      fil: 'Dilaw na pentagon (hugis-bahay) na may simbolo ng dalawang batang naglalakad (DPWH W6-4).',
    },
    meaning: {
      en: 'You are entering a school zone where young students frequently cross unpredictably.',
      fil: 'Pumapasok ka sa school zone kung saan maraming batang mag-aaral na tumatawid.',
    },
    requiredAction: {
      en: 'Slow down to 20 km/h or lower, obey school crossing guards, and never overtake near school gates.',
      fil: 'Magmenor hanggang 20 km/h o mas mababa, sumunod sa traffic aide ng paaralan, at huwag mag-overtake.',
    },
    exampleSituation: {
      en: 'Public and private elementary and high school frontages nationwide.',
      fil: 'Sa tapat ng mga mababa at mataas na paaralan.',
    },
    sourceReference: 'RA 4136 Sec. 35 / DPWH Manual (W6-4)',
  },
  {
    id: 'sign_warn_twoway',
    name: { en: 'Two-Way Traffic Ahead', fil: 'Salubungang Daloy ng Trapiko' },
    category: 'WARNING',
    imageResource: '/assets/png/signs/warn_two_way.png',
    explanation: {
      en: 'Warning triangle containing opposing upward and downward vertical arrows (DPWH W4-11).',
      fil: 'Tatsulok na babala na may magkasalubong na palaso pataas at pababa (DPWH W4-11).',
    },
    meaning: {
      en: 'A divided or one-way road is transitioning into an undivided road carrying oncoming traffic.',
      fil: 'Mula sa one-way o may center island na daan ay papasok ka na sa kalsadang may kasalubong.',
    },
    requiredAction: {
      en: 'Keep to the right lane and stay alert for oncoming vehicles in the left lane.',
      fil: 'Manatili sa kanang linya at maging alerto sa mga kasalubong sa kaliwang linya.',
    },
    exampleSituation: {
      en: 'End of a divided boulevard or during road construction detours.',
      fil: 'Sa dulo ng center island o kapag may ginagawang bahagi ng highway.',
    },
    sourceReference: 'DPWH Road Signs Manual (W4-11)',
  },
  {
    id: 'sign_warn_signals',
    name: { en: 'Traffic Signals Ahead', fil: 'May Ilaw-Trapiko sa Unahan' },
    category: 'WARNING',
    imageResource: '/assets/png/signs/warn_traffic_light_ahead.png',
    explanation: {
      en: 'Warning triangle displaying vertical red, yellow, and green signal lamps (DPWH W3-2).',
      fil: 'Tatsulok na babala na may larawan ng pula, dilaw, at berdeng ilaw-trapiko (DPWH W3-2).',
    },
    meaning: {
      en: 'A signalized intersection lies ahead that may not yet be visible due to a curve or overpass.',
      fil: 'May malapit nang traffic light sa unahan na maaaring natatakpan pa ng kurbada o tulay.',
    },
    requiredAction: {
      en: 'Reduce speed and prepare to stop smoothly in case the signal turns yellow or red.',
      fil: 'Magmenor nang maaga upang handang huminto kung pula o dilaw ang ilaw.',
    },
    exampleSituation: {
      en: 'Descending from a flyover ramp straight toward a signalized crossroad.',
      fil: 'Pagbaba mula sa flyover patungo sa interseksyon.',
    },
    sourceReference: 'DPWH Road Signs Manual (W3-2)',
  },

  // 3. GUIDE & INFORMATIONAL SIGNS
  {
    id: 'sign_guide_hospital',
    name: { en: 'Hospital / Medical Emergency Service', fil: 'Ospital / Serbisyong Medikal' },
    category: 'GUIDE_INFORMATIONAL',
    imageResource: '/assets/png/signs/guide_hospital.png',
    explanation: {
      en: 'Rectangular blue service sign featuring a bold white “H” symbol (DPWH S1-2).',
      fil: 'Asul na parisukat na karatula na may malaking puting titik na “H” (DPWH S1-2).',
    },
    meaning: {
      en: 'Indicates proximity to a hospital emergency room AND reminds motorists that this is a quiet zone.',
      fil: 'Nagtuturo na malapit sa ospital at nagpapaalalang iwasan ang malakas na pagbusina.',
    },
    requiredAction: {
      en: 'Refrain from unnecessary horn blowing, drive cautiously, and keep ambulance bays completely unobstructed.',
      fil: 'Iwasan ang pagbusina, magmaneho nang maingat, at huwag harangan ang daanan ng ambulansya.',
    },
    exampleSituation: {
      en: 'Streets bordering Philippine General Hospital or regional medical centers.',
      fil: 'Sa paligid ng mga pampubliko at pribadong ospital.',
    },
    sourceReference: 'DPWH Guide & Service Signs Manual (S1-2)',
  },
  {
    id: 'sign_guide_expressway',
    name: { en: 'Expressway Advance Exit Direction Sign', fil: 'Gabay sa Labasan ng Expressway' },
    category: 'GUIDE_INFORMATIONAL',
    imageResource: '/assets/png/signs/guide_expressway.png',
    explanation: {
      en: 'Standard green background directional sign with white reflectorized text and exit arrow (DPWH G-Series).',
      fil: 'Berdeng karatula na may puting sulat na nagbibigay-gabay sa distansya ng susunod na exit sa expressway.',
    },
    meaning: {
      en: 'Provides advance notice of an upcoming expressway interchange or exit 1 km ahead.',
      fil: 'Nagbibigay-alam na 1 kilometro na lamang bago ang susunod na labasan (exit).',
    },
    requiredAction: {
      en: 'Signal early and transition safely into the rightmost deceleration lane well before the exit gore—never reverse on an expressway if you miss an exit.',
      fil: 'Maagang lumipat sa kanang linya kung lalabas. Kung lumampas sa exit, huwag kailanman umatras sa expressway; tumuloy sa susunod na exit.',
    },
    exampleSituation: {
      en: 'Overhead gantry signs along NLEX, SLEX, STAR Tollway, and SCTEX.',
      fil: 'Sa kahabaan ng NLEX, SLEX, at iba pang expressway.',
    },
    sourceReference: 'DPWH Expressway Signing Standards',
  },
  {
    id: 'sign_guide_ped_crossing',
    name: { en: 'Pedestrian Crossing Location Sign', fil: 'Palatandaan ng Aktwal na Tawiran' },
    category: 'GUIDE_INFORMATIONAL',
    imageResource: '/assets/png/signs/guide_ped_crossing.png',
    explanation: {
      en: 'Blue square informational sign containing a white triangle with a crossing pedestrian figure.',
      fil: 'Asul na karatula na may puting tatsulok at larawan ng tumatawid na tao.',
    },
    meaning: {
      en: 'Marks the exact location of a designated pedestrian crosswalk.',
      fil: 'Tinutukoy ang mismong tapat ng pedestrian lane.',
    },
    requiredAction: {
      en: 'Yield right of way to pedestrians stepping onto or crossing the marked lane, and never stop on top of the stripes.',
      fil: 'Paunahin ang mga tumatawid at huwag huminto sa ibabaw mismo ng pedestrian lane.',
    },
    exampleSituation: {
      en: 'Mounted directly beside painted crosswalks in commercial districts.',
      fil: 'Nakatayo mismo sa gilid ng zebra crossing sa mga sentro ng lungsod.',
    },
    sourceReference: 'DPWH Road Signs Manual',
  },

  // 4. PAVEMENT MARKINGS
  {
    id: 'sign_mark_double_yellow',
    name: { en: 'Solid Double Yellow Center Line', fil: 'Dobleng Solid na Dilaw na Guhit sa Gitna' },
    category: 'PAVEMENT_MARKINGS',
    imageResource: '/assets/png/signs/mark_double_yellow.png',
    explanation: {
      en: 'Two parallel unbroken yellow lines painted down the center of a two-way undivided roadway.',
      fil: 'Dalawang magkatabing buong dilaw na linya sa gitna ng salubungang kalsada.',
    },
    meaning: {
      en: 'Strictly NO overtaking or crossing the center line from either direction.',
      fil: 'Mahigpit na BAWAL umovertake o tumawid sa kabilang linya sa parehong direksyon.',
    },
    requiredAction: {
      en: 'Remain completely to the right of the double yellow lines; never cross them to pass slow traffic.',
      fil: 'Manatili sa sariling kanang linya sa lahat ng oras.',
    },
    exampleSituation: {
      en: 'Winding two-way national roads, bridge decks, and underpasses.',
      fil: 'Sa mga kurbada, tulay, at salubungang highway.',
    },
    sourceReference: 'DPWH Pavement Markings Manual / LTO Manual',
  },
  {
    id: 'sign_mark_broken_white',
    name: { en: 'Broken White Lane Line', fil: 'Putol-putol na Puting Guhit sa Linya' },
    category: 'PAVEMENT_MARKINGS',
    imageResource: '/assets/png/signs/mark_broken_white.png',
    explanation: {
      en: 'Dashed white longitudinal lines separating lanes moving in the same direction.',
      fil: 'Putol-putol na puting linya na naghihiwalay sa mga linyang pareho ang direksyon ng takbo.',
    },
    meaning: {
      en: 'Lane changing or overtaking is permitted when safe to do so.',
      fil: 'Pinapayagan ang paglipat ng linya o pag-overtake basta’t ligtas at maluwag.',
    },
    requiredAction: {
      en: 'Check mirrors, signal for at least 3 seconds, check your blind spot, and change lanes smoothly without cutting off other vehicles.',
      fil: 'Tumingin sa salamin, mag-signal nang maaga, suriin ang blind spot, at maingat na lumipat ng linya.',
    },
    exampleSituation: {
      en: 'Multi-lane avenues and expressways.',
      fil: 'Sa mga malalapad na abenida at expressway na may maraming linya.',
    },
    sourceReference: 'DPWH Pavement Markings Manual',
  },
  {
    id: 'sign_mark_yellow_box',
    name: { en: 'Yellow Box Junction (“Do Not Block Intersection”)', fil: 'Yellow Box sa Interseksyon' },
    category: 'PAVEMENT_MARKINGS',
    imageResource: '/assets/png/signs/mark_yellow_box.png',
    explanation: {
      en: 'Criss-crossed yellow diagonal grid painted across the center of an intersection.',
      fil: 'Kulay dilaw na parisukat na may ekis-ekis na guhit sa gitna ng interseksyon.',
    },
    meaning: {
      en: 'Keep the intersection clear at all times—no vehicle may stop stationary inside the yellow box.',
      fil: 'Huwag harangan ang interseksyon—bawal maiwang nakahinto sa loob ng yellow box.',
    },
    requiredAction: {
      en: 'Even if your traffic light is GREEN, do NOT enter the yellow box unless there is enough clear space on the far side for your entire vehicle to exit it without stopping.',
      fil: 'Kahit BERDE ang ilaw-trapiko, HUWAG pumasok sa yellow box kung barado pa ang kabilang dulo at maiipit ka sa gitna.',
    },
    exampleSituation: {
      en: 'Busy Metro Manila, Cebu, and Davao intersections during rush hour.',
      fil: 'Sa malalaking sangandaan tuwing mabigat ang trapiko.',
    },
    sourceReference: 'DPWH Pavement Markings Manual / MMDA & LTO Rules',
  },
  {
    id: 'sign_mark_zebra',
    name: { en: 'Pedestrian Zebra Crossing', fil: 'Zebra Pedestrian Crossing' },
    category: 'PAVEMENT_MARKINGS',
    imageResource: '/assets/png/signs/mark_zebra_crossing.png',
    explanation: {
      en: 'Broad white longitudinal stripes painted across the carriageway.',
      fil: 'Malalapad na puting guhit na patawid sa kalsada.',
    },
    meaning: {
      en: 'Protected right-of-way zone for pedestrians crossing the road.',
      fil: 'Opisyal na tawiran kung saan may prayoridad ang mga naglalakad na tumatawid.',
    },
    requiredAction: {
      en: 'Stop behind the stop line before the stripes; yield completely to crossing pedestrians and never stop your vehicle on the crosswalk.',
      fil: 'Huminto bago ang guhit at paunahin ang lahat ng tumatawid.',
    },
    exampleSituation: {
      en: 'Unsignalized crossings near schools, hospitals, and commercial centers.',
      fil: 'Sa mga tawiran malapit sa paaralan, ospital, at pamilihan.',
    },
    sourceReference: 'RA 4136 Sec. 42(c) / DPWH Manual',
  },

  // 5. TRAFFIC SIGNALS
  {
    id: 'sign_sig_red',
    name: { en: 'Steady Red & Flashing Red Traffic Light', fil: 'Steady Red at Kumikislap na Pulang Ilaw' },
    category: 'TRAFFIC_SIGNALS',
    imageResource: '/assets/png/signs/sig_steady_red.png',
    explanation: {
      en: 'Top circular red lamp on a standard three-aspect traffic signal.',
      fil: 'Pinakamataas na pulang ilaw sa traffic signal.',
    },
    meaning: {
      en: 'Steady Red means full stop until green. Flashing Red operates identically to a STOP sign.',
      fil: 'Ang Steady Red ay ganap na paghinto hanggang mag-berde. Ang Kumikislap na Pula (Flashing Red) ay katumbas ng STOP sign.',
    },
    requiredAction: {
      en: 'On Steady Red: stop behind the stop line and wait for green (turning right on red is prohibited unless a “Turn Right With Care” sign explicitly permits it). On Flashing Red: come to a full stop, yield to cross traffic/pedestrians, then proceed only when safe.',
      fil: 'Sa Steady Red: huminto bago ang stop line at hintayin ang berde. Sa Flashing Red: huminto nang buo, sumilip at magbigay-daan, saka tumuloy kapag ligtas.',
    },
    exampleSituation: {
      en: 'Late-night intersections switching from steady cycle to flashing red on minor streets.',
      fil: 'Sa mga interseksyon sa lungsod sa araw at hatinggabi.',
    },
    sourceReference: 'LTO Driver’s Manual: Traffic Signals',
  },
  {
    id: 'sign_sig_yellow',
    name: { en: 'Steady Yellow & Flashing Yellow Traffic Light', fil: 'Steady Yellow at Kumikislap na Dilaw na Ilaw' },
    category: 'TRAFFIC_SIGNALS',
    imageResource: '/assets/png/signs/sig_flashing_yellow.png',
    explanation: {
      en: 'Middle amber/yellow lamp on a traffic signal.',
      fil: 'Gitnang dilaw (amber) na ilaw sa traffic signal.',
    },
    meaning: {
      en: 'Steady Yellow warns that the red light is about to appear—it does NOT mean “speed up to beat the red light.” Flashing Yellow means proceed with caution.',
      fil: 'Ang Steady Yellow ay babalang magpupula na ang ilaw—HINDI ito hudyat upang bumirit (“beating the red light”). Ang Flashing Yellow ay magmenor at tumuloy nang may pag-iingat.',
    },
    requiredAction: {
      en: 'On Steady Yellow: stop safely behind the stop line unless you are already so close that stopping abruptly would cause a rear-end collision. On Flashing Yellow: slow down, scan the crossroad carefully, and proceed with caution.',
      fil: 'Sa Steady Yellow: huminto nang maayos bago ang stop line kung ligtas pang gawin. Sa Flashing Yellow: magmenor, maging alerto sa paligid, at dahan-dahang tumuloy.',
    },
    exampleSituation: {
      en: 'Approaching an intersection as the green timer hits zero.',
      fil: 'Paglapit sa sangandaan habang patapos na ang berdeng ilaw.',
    },
    sourceReference: 'LTO Driver’s Manual: Traffic Signals',
  },
  {
    id: 'sign_sig_green',
    name: { en: 'Steady Green Light & Green Directional Arrow', fil: 'Steady Green Light at Berdeng Palaso' },
    category: 'TRAFFIC_SIGNALS',
    imageResource: '/assets/png/signs/sig_steady_green.png',
    explanation: {
      en: 'Bottom circular green signal lamp (or directional green arrow).',
      fil: 'Pinakababang berdeng ilaw o berdeng palaso sa traffic signal.',
    },
    meaning: {
      en: 'Traffic facing the green signal may proceed, provided the intersection is clear and pedestrians finishing their crossing are yielded to.',
      fil: 'Maaaring tumuloy sa direksyong pinapayagan basta’t maluwag ang interseksyon at ligtas ang mga tumatawid.',
    },
    requiredAction: {
      en: 'Scan left and right for late red-light runners, yield to pedestrians still in the crosswalk, ensure the yellow box exit is clear, and proceed smoothly.',
      fil: 'Sumulyap muna sa kaliwa at kanan, pagbigyan ang natitirang tumatawid, tiyaking hindi ka maiipit sa yellow box, at umusad nang maingat.',
    },
    exampleSituation: {
      en: 'Protected left-turn green arrow phase at major avenues.',
      fil: 'Pagliko sa kaliwa kapag umilaw ang berdeng palaso.',
    },
    sourceReference: 'LTO Driver’s Manual: Traffic Signals',
  },
];
