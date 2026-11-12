import { ReviewerQuestion } from '../../domain/model/reviewerModels';
import { QUESTIONS } from './questionsData';
import { ROAD_SIGNS } from './roadSignsData';

interface RawQ {
  q: string;
  correct: string;
  wrong1: string;
  wrong2: string;
  exp: string;
  img?: string;
  keepA?: boolean;
}

/**
 * Deterministically assigns choices to A, B, C so that correct answers
 * are naturally distributed across A, B, and C (unless keepA is true for screenshot 1:1 match).
 */
function buildQuestion(
  categoryId: string,
  number: number,
  raw: RawQ
): ReviewerQuestion {
  const options = [raw.correct, raw.wrong1, raw.wrong2];
  // Deterministic rotation based on number unless keepA is true
  const correctSlot = raw.keepA ? 0 : (number * 7 + categoryId.length) % 3;

  let ordered: string[];
  let correctChoiceId: 'a' | 'b' | 'c';

  if (correctSlot === 0) {
    ordered = [options[0], options[1], options[2]];
    correctChoiceId = 'a';
  } else if (correctSlot === 1) {
    ordered = [options[1], options[0], options[2]];
    correctChoiceId = 'b';
  } else {
    ordered = [options[1], options[2], options[0]];
    correctChoiceId = 'c';
  }

  return {
    id: `${categoryId}_q${number}`,
    categoryId,
    number,
    question: raw.q,
    choices: [
      { id: 'a', letter: 'A', text: ordered[0] },
      { id: 'b', letter: 'B', text: ordered[1] },
      { id: 'c', letter: 'C', text: ordered[2] },
    ],
    correctChoiceId,
    explanation: raw.exp,
    imageResource: raw.img,
  };
}

// ============================================================================
// 1. TAGALOG POOL (75 Questions total)
// ============================================================================
const TAGALOG_RAW_BASE: RawQ[] = [
  {
    q: 'Habang nagmamaneho, dapat kang tumingin sa side and rear view mirror ng:',
    correct: 'Mabilis / madalian',
    wrong1: 'Hanggang gusto mo',
    wrong2: 'Hindi kukulangin sa minute',
    exp: 'Dapat tumingin sa mga side at rear view mirror ng mabilis para masiguradong ligtas ang pag-drive.',
    keepA: true,
  },
  {
    q: 'Maaari kang lumusot (overtake) sa kanang bahagi ng sasakyan kung:',
    correct: 'Ang high way ay may dalawa o higit pang linya patungo sa isang direksyon',
    wrong1: 'Ang kalsada ay salubungang-daan',
    wrong2: 'Malapad ang bangketa',
    exp: 'Pinapayagan lamang ang paglusot sa kanan kung ang highway ay may dalawa o higit pang linya sa iisang direksyon at malinaw ang daan.',
    keepA: true,
  },
  {
    q: 'Ang lisensyang Non-Professional ay para lamang sa:',
    correct: 'Mga pribadong sasakyan lamang',
    wrong1: 'Mga pampublikong sasakyan (PUV)',
    wrong2: 'Lahat ng uri ng trak at bus',
    exp: 'Ang Non-Professional Driver’s License ay awtorisasyon para magmaneho ng pribadong sasakyan lamang at hindi para sa pamamasada.',
  },
  {
    q: 'Ano ang kahulugan ng patay-sinding dilaw na ilaw-trapiko (flashing yellow light)?',
    correct: 'Magmenor at magpatuloy nang may higit na pag-iingat',
    wrong1: 'Huminto at hintayin ang berdeng ilaw',
    wrong2: 'Bilisan ang takbo bago mag-pula',
    exp: 'Ang kumikislap na dilaw na ilaw ay nag-aatas sa drayber na magmenor, sumuri sa paligid, at magpatuloy nang maingat.',
    img: '/assets/png/signs/sig_flashing_yellow.png',
  },
  {
    q: 'Kailan dapat gamitin ang hazard warning lights ng iyong sasakyan?',
    correct: 'Kapag nakahinto dahil sa emergency o nasiraan sa gilid ng daan',
    wrong1: 'Habang mabilis na nagmamaneho sa malakas na ulan',
    wrong2: 'Kapag nagmamadali sa interseksyon',
    exp: 'Ang hazard lights ay ginagamit lamang kapag ang sasakyan ay pansamantalang nakahinto dahil sa aberya o emergency.',
  },
  {
    q: 'Sino ang may karapatan sa daan (right-of-way) sa loob ng rotunda?',
    correct: 'Ang mga sasakyang kasalukuyang nasa loob at umiikot na sa rotunda',
    wrong1: 'Ang mga sasakyang papasok pa lamang sa rotunda',
    wrong2: 'Ang pinakamabilis na sasakyan na bumubusina',
    exp: 'Ang mga sasakyang papasok pa lamang sa rotunda ay dapat magbigay-daan sa mga sasakyang nasa loob na nito.',
  },
  {
    q: 'Sa ilalim ng RA 10913 (Anti-Distracted Driving Act), kailan bawal gumamit ng cellphone habang hawak ito?',
    correct: 'Habang umaandar ang sasakyan o pansamantalang nakahinto sa pulang ilaw-trapiko',
    wrong1: 'Kapag nakaparada sa garahe at patay ang makina',
    wrong2: 'Kapag tumatawag sa emergency hotline 911 habang nakatabi',
    exp: 'Sakop ng RA 10913 ang pagbabawal sa paghawak ng mobile device kahit pansamantalang nakatigil sa red light sa interseksyon.',
  },
  {
    q: 'Ano ang ibig sabihin ng dobleng solid na dilaw na linya sa gitna ng kalsada?',
    correct: 'Mahigpit na ipinagbabawal ang pag-overtake sa magkabilang direksyon',
    wrong1: 'Maaaring mag-overtake kung walang kasalubong',
    wrong2: 'Linya para sa mga motorsiklo at bisikleta',
    exp: 'Ang solid double yellow line ay nagbabawal sa pagtawid sa kabilang linya o pag-overtake mula sa parehong direksyon.',
    img: '/assets/png/signs/mark_double_yellow.png',
  },
  {
    q: 'Ilang segundo ang ligtas na distansya sa sinusundang sasakyan sa ilalim ng normal na panahon?',
    correct: 'Hindi bababa sa tatlong (3) segundo',
    wrong1: 'Isang (1) segundo lamang',
    wrong2: 'Kalahating segundo',
    exp: 'Ang 3-second rule ay nagbibigay ng sapat na oras upang makapag-react at makapagpreno nang ligtas.',
  },
  {
    q: 'Ano ang pinakamataas na takdang bilis (speed limit) sa mga school zone at mataong kalsada?',
    correct: '20 km/h',
    wrong1: '40 km/h',
    wrong2: '60 km/h',
    exp: 'Ayon sa RA 4136 Seksyon 35, ang takdang bilis sa mataong lansangan at school zone ay 20 km/h.',
    img: '/assets/png/signs/warn_school_zone.png',
  },
  {
    q: 'Ano ang dapat mong gawin kapag nakarinig ka ng sirena ng ambulansya o trak ng bumbero sa iyong likuran?',
    correct: 'Tumabi nang maingat sa kanang bahagi ng kalsada at huminto kung kinakailangan',
    wrong1: 'Bilisan ang takbo upang hindi maabutan ng ambulansya',
    wrong2: 'Sundan nang malapit ang ambulansya upang makalusot sa trapiko',
    exp: 'Obligasyon ng bawat motorista na magbigay-daan agad sa mga emergency vehicle sa pamamagitan ng pagtabi sa kanan.',
  },
  {
    q: 'Saang linya ka dapat manatili kung mabagal ang iyong pagmamaneho sa multi-lane highway?',
    correct: 'Sa pinakakanang linya (outermost right lane)',
    wrong1: 'Sa pinakakaliwang linya (fast/overtaking lane)',
    wrong2: 'Sa gitna ng dalawang linya',
    exp: 'Ang kaliwang linya ay para sa pag-overtake o mabibilis na sasakyan; ang mabagal na sasakyan ay dapat nasa kanan.',
  },
  {
    q: 'Ano ang kahulugan ng patay-sinding pulang ilaw-trapiko (flashing red light)?',
    correct: 'Huminto nang ganap sa stop line, magbigay-daan, at tumuloy lamang kapag ligtas',
    wrong1: 'Magmenor lamang nang hindi humihinto',
    wrong2: 'Nangangahulugang sira ang traffic light kaya maaaring bumirit',
    exp: 'Ang kumikislap na pulang ilaw ay may parehong bisa sa STOP sign: ganap na paghinto bago tumuloy kapag maluwag.',
    img: '/assets/png/signs/sig_steady_red.png',
  },
  {
    q: 'Bago lumipat ng linya (change lane), ano ang pinakamahalagang dapat gawin bukod sa pagtingin sa salamin?',
    correct: 'Mag-signal nang maaga at lumingon nang mabilis sa blind spot (shoulder check)',
    wrong1: 'Bumusina nang malakas at biglang kabigin ang manibela',
    wrong2: 'Buksan ang hazard lights habang lumilipat',
    exp: 'Hindi lahat ay kita sa side mirror kaya kailangang mag-signal at suriin ang blind spot bago lumipat ng linya.',
  },
  {
    q: 'Ano ang tamang posisyon ng gulong kapag nakaparada nang paakyat (uphill) sa kalsadang may bangketa (curb)?',
    correct: 'Ipihit ang unahang gulong papalayo sa bangketa (pakaliwa)',
    wrong1: 'Ipihit ang unahang gulong paharap sa bangketa (pakanan)',
    wrong2: 'Panatilihing tuwid ang gulong',
    exp: 'Kapag paakyat na may bangketa, ipihit pakaliwa ang gulong upang sumandal sa bangketa ang gulong sakaling umusad paatras.',
  },
  {
    q: 'Ano naman ang tamang posisyon ng gulong kapag nakaparada nang palusong (downhill) may bangketa man o wala?',
    correct: 'Ipihit ang unahang gulong patungo sa bangketa o gilid ng kalsada (pakanan)',
    wrong1: 'Ipihit ang gulong patungo sa gitna ng kalsada',
    wrong2: 'Iwanang naka-neutral ang kambyo',
    exp: 'Sa palusong na kalsada, laging ipihit pakanan (papunta sa gilid/bangketa) ang gulong at gamitin ang parking brake.',
  },
  {
    q: 'Gaano kalayo mula sa kanto ng interseksyon ipinagbabawal ang pagparada ayon sa RA 4136?',
    correct: 'Sa loob ng anim (6) na metro mula sa kanto',
    wrong1: 'Sa loob ng isang (1) metro lamang',
    wrong2: 'Sa loob ng dalawampung (20) metro',
    exp: 'Bawal pumarada sa loob ng 6 na metro mula sa kanto ng interseksyon upang hindi maharangan ang tanaw ng mga lumilikong sasakyan.',
  },
  {
    q: 'Gaano kalayo mula sa fire hydrant mahigpit na ipinagbabawal ang pagparada ng anumang sasakyan?',
    correct: 'Sa loob ng apat (4) na metro mula sa fire hydrant',
    wrong1: 'Sa loob ng kalahating metro',
    wrong2: 'Maaaring pumarada basta nasa loob ng sasakyan ang drayber',
    exp: 'Ayon sa RA 4136 Seksyon 46, bawal pumarada sa loob ng 4 na metro mula sa fire hydrant.',
  },
  {
    q: 'Kailan ka dapat magbaba ng headlight mula sa bright (high beam) patungo sa dim (low beam) sa gabi?',
    correct: 'Kapag may kasalubong na sasakyan o kapag may sinusundang sasakyan sa unahan',
    wrong1: 'Tuwing nagmamaneho sa madilim na probinsya na walang ibang sasakyan',
    wrong2: 'Kapag pumapasok sa kurbada',
    exp: 'Ibababa sa low beam ang ilaw upang hindi masilaw ang kasalubong na drayber o ang drayber sa iyong unahan.',
  },
  {
    q: 'Ano ang dapat gawin kung nasisilaw ka sa high beam ng kasalubong na sasakyan sa gabi?',
    correct: 'Balingan ng tingin ang kanang gilid na guhit ng kalsada at magmenor',
    wrong1: 'Buksan din ang iyong high beam upang gumanti',
    wrong2: 'Ipikit ang mata nang ilang segundo',
    exp: 'Tumingin sa kanang gilid ng iyong linya upang mapanatili ang direksyon nang hindi direktang nakatingin sa nakakasilaw na ilaw.',
  },
  {
    q: 'Saang bahagi ng kalsada mahigpit na ipinagbabawal ang pag-overtake?',
    correct: 'Sa blind curve, paakyat ng tulay, at sa ibabaw ng pedestrian crossing',
    wrong1: 'Sa tuwid na highway na may putol-putol na puting linya',
    wrong2: 'Sa one-way na kalsadang may tatlong linya',
    exp: 'Delikado at labag sa batas ang pag-overtake sa mga kurbada, tulay, sangandaan, at tawiran ng tao.',
  },
  {
    q: 'Ano ang kahulugan ng Yellow Box Junction sa gitna ng interseksyon?',
    correct: 'Huwag pumasok sa dilaw na kahon kung hindi maluwag ang lalabasan kahit berde ang ilaw',
    wrong1: 'Parada para sa mga pampublikong jeepney at bus',
    wrong2: 'Lugar kung saan maaaring mag-U-turn anumang oras',
    exp: 'Ang Yellow Box ay nangangahulugang "Do Not Block Intersection"—huwag pumasok kung maiipit sa loob nito.',
    img: '/assets/png/signs/mark_yellow_box.png',
  },
  {
    q: 'Ilang buwan dapat hawak ng aplikante ang Student Permit bago makapag-apply ng Non-Professional Driver’s License?',
    correct: 'Hindi bababa sa isang (1) buwan mula sa petsa ng pagkakaloob',
    wrong1: 'Isang (1) linggo lamang',
    wrong2: 'Dalawang (2) taon',
    exp: 'Kailangang may bisa nang hindi bababa sa 1 buwan ang Student Permit bago kumuha ng Non-Professional DL.',
  },
  {
    q: 'Ano ang parusa sa pagmamaneho nang may expired na lisensya?',
    correct: 'Multa at pagbabawal na magmaneho hangga’t hindi naire-renew ang lisensya',
    wrong1: 'Walang parusa kung wala pang isang taon na expired',
    wrong2: 'Sasabihan lamang ng traffic enforcer',
    exp: 'Ipinagbabawal ng RA 4136 ang pagmamaneho gamit ang paso o expired na lisensya sa anumang pampublikong kalsada.',
  },
  {
    q: 'Ano ang dapat gawin ng drayber kapag papalapit sa Zebra Pedestrian Crossing na walang traffic light?',
    correct: 'Magmenor at huminto upang paunahin ang mga taong tumatawid',
    wrong1: 'Bumusina nang malakas upang tumigil ang mga tao',
    wrong2: 'Bilisan ang takbo bago makababa sa bangketa ang tao',
    exp: 'May prayoridad ang pedestrian sa mga marked crosswalk; dapat magmenor at magbigay-daan ang motorista.',
    img: '/assets/png/signs/mark_zebra_crossing.png',
  },
  {
    q: 'Sa ilalim ng RA 10054 (Motorcycle Helmet Act), anong uri ng helmet ang dapat isuot ng rider at angkas?',
    correct: 'Standard protective motorcycle helmet na may ICC / PS mark',
    wrong1: 'Construction hard hat o bicycle helmet',
    wrong2: 'Kahit anong sombrero basta may strap',
    exp: 'parehong rider at backrider ay obligadong magsuot ng DTI-approved motorcycle helmet na may ICC o PS sticker.',
  },
  {
    q: 'Kailan pinapayagang umangkas ang bata sa motorsiklo sa mabibilis na highway ayon sa RA 10666?',
    correct: 'Kapag abot ng paa ang foot peg, kayang kumapit sa baywang ng rider, at may suot na standard helmet',
    wrong1: 'Kahit sanggol pa basta hawak ng nanay sa likod',
    wrong2: 'Kapag nakaupo sa tangke sa harap ng nagmamaneho',
    exp: 'Itinatakda ng RA 10666 ang tatlong kondisyon: abot ang foot peg, kayang yapusin ang baywang ng rider, at may wastong helmet.',
  },
  {
    q: 'Ano ang dapat mong gawin kung nagsimulang mag-hydroplane (umangat sa tubig) ang gulong ng sasakyan sa malakas na ulan?',
    correct: 'Dahan-dahang bitawan ang silinyador (accelerator) at hawakan nang tuwid ang manibela',
    wrong1: 'Tapakan nang bigla at madiin ang preno',
    wrong2: 'Kabigin nang mabilis ang manibela pakaliwa at pakanan',
    exp: 'Huwag biglang magpreno kapag nag-hydroplane; bitawan ang gas upang bumagal at muling kumapit ang gulong sa kalsada.',
  },
  {
    q: 'Ano ang kahulugan ng putol-putol na puting linya (broken white line) sa kalsada?',
    correct: 'Maaaring lumipat ng linya o mag-overtake kung ligtas at malinaw ang daan',
    wrong1: 'Mahigpit na ipinagbabawal ang paglipat ng linya',
    wrong2: 'Para lamang sa mga pampublikong bus',
    exp: 'Ang broken white line ay nagpapahintulot sa paglipat ng linya o pag-overtake kapag ligtas.',
    img: '/assets/png/signs/mark_broken_white.png',
  },
  {
    q: 'Kapag ang dalawang sasakyan ay sabay na dumating sa isang walang-kontrol na interseksyon (uncontrolled intersection), sino ang dapat mauna?',
    correct: 'Ang sasakyang nasa kanan (vehicle on the right)',
    wrong1: 'Ang sasakyang nasa kaliwa',
    wrong2: 'Ang mas malaking sasakyan',
    exp: 'Ayon sa RA 4136, kapag sabay dumating sa interseksyon, ang sasakyan sa kaliwa ay dapat magbigay-daan sa sasakyan sa kanan.',
  },
  {
    q: 'Sino ang may karapatan sa daan (right-of-way) kapag ikaw ay papaliko sa kaliwa sa isang interseksyon?',
    correct: 'Ang mga sasakyang pasalubong na dumidiretso at ang mga tumatawid na tao',
    wrong1: 'Ikaw na lumiliko sa kaliwa basta naka-signal',
    wrong2: 'Ang mga sasakyang nasa likuran mo',
    exp: 'Ang sasakyang lumiliko sa kaliwa ay dapat maghintay at magbigay-daan sa lahat ng pasalubong na sasakyang dumidiretso.',
  },
  {
    q: 'Ano ang tamang aksyon kapag lumabas ka mula sa pribadong driveway o parking lot patungo sa pampublikong kalsada?',
    correct: 'Huminto at magbigay-daan sa mga naglalakad sa bangketa at sa lahat ng sasakyan sa kalsada',
    wrong1: 'Bumusina at dumeretso agad sa kalsada',
    wrong2: 'Paunahin lamang ang mga trak at unahan ang mga kotse',
    exp: 'Ang sasakyang galing sa pribadong daan o driveway ay kailangang magbigay-daan sa mga pedestrian at trapiko sa highway.',
  },
  {
    q: 'Sa bulubunduking kalsada (mountain highway) na makitid at hindi magkasya ang dalawang sasakyan, sino ang dapat magbigay-daan?',
    correct: 'Ang sasakyang palusong (downhill) ay dapat magbigay-daan sa sasakyang paakyat (uphill)',
    wrong1: 'Ang sasakyang paakyat ang dapat umatras',
    wrong2: 'Mag-unahan kung sino ang unang bumusina',
    exp: 'Mas mahirap at mas delikadong umatras o magtimpla ng preno/clutch ang sasakyang paakyat, kaya may right-of-way ang paakyat.',
  },
  {
    q: 'Ano ang ibig sabihin ng tuluy-tuloy na isang puting linya (solid white line) sa pagitan ng mga linya sa iisang direksyon?',
    correct: 'Ipinapayo na manatili sa sariling linya at iwasan ang paglipat maliban kung emergency',
    wrong1: 'Malayang lumipat-lipat ng linya anumang oras',
    wrong2: 'Kalsadang nakalaan sa parada',
    exp: 'Ang solid white lane line ay naglilimita sa paglipat ng linya sa mga kritikal na bahagi gaya ng papalapit sa interseksyon.',
  },
  {
    q: 'Ano ang dapat gawin kung pumutok ang iyong unahang gulong (tire blowout) habang tumatakbo nang mabilis?',
    correct: 'Hawakan nang mahigpit ang manibela, huwag biglang tapakan ang preno, at dahan-dahang magmenor',
    wrong1: 'Tapakan nang buong lakas ang foot brake',
    wrong2: 'Hilahin agad ang handbrake at patayin ang makina',
    exp: 'Ang biglaang pagpreno kapag pumutok ang gulong ay maaaring magpabaliktad sa sasakyan; panatilihin ang kontrol sa manibela.',
  },
];

export function getTagalogQuestions(): ReviewerQuestion[] {
  const combined: RawQ[] = [...TAGALOG_RAW_BASE];

  // Add all 40 Filipino questions from QUESTIONS
  QUESTIONS.forEach((item) => {
    const correctChoice = item.choices.find((c) => c.id === item.correctAnswerId) || item.choices[0];
    const wrongs = item.choices.filter((c) => c.id !== item.correctAnswerId);
    combined.push({
      q: item.question.fil,
      correct: correctChoice.text.fil,
      wrong1: wrongs[0]?.text.fil || 'Ipagpatuloy ang mabilis na pagpapatakbo',
      wrong2: wrongs[1]?.text.fil || 'Balewalain ang panuntunan sa kalsada',
      exp: item.explanation.fil,
      img: item.imageResource,
    });
  });

  return combined.slice(0, 75).map((raw, idx) => buildQuestion('tagalog', idx + 1, raw));
}

// ============================================================================
// 2. ENGLISH POOL (97 Questions total)
// ============================================================================
const ENGLISH_RAW_BASE: RawQ[] = [
  {
    q: 'While driving on a highway, how should you check your side and rear view mirrors?',
    correct: 'Quickly and briefly without staring away from the road ahead',
    wrong1: 'Continuously for several minutes at a time',
    wrong2: 'Only when changing tires or parked',
    exp: 'Mirror checks should be brief glance-checks every 5 to 8 seconds so your primary attention remains locked on forward road conditions.',
  },
  {
    q: 'When are you legally permitted to overtake a vehicle on its right side?',
    correct: 'When driving on a highway with two or more lanes moving in the same direction',
    wrong1: 'Whenever driving on a two-way mountain road',
    wrong2: 'By driving onto the unpaved road shoulder',
    exp: 'Passing on the right is only permitted on multi-lane one-way thoroughfares or divided highways with at least two lanes flowing in your direction.',
  },
  {
    q: 'What is the required legal action when approaching a flashing red traffic signal light?',
    correct: 'Come to a complete stop, yield to cross traffic and pedestrians, then proceed when safe',
    wrong1: 'Slow down slightly and maintain speed without stopping',
    wrong2: 'Speed up before the light turns steady red',
    exp: 'A flashing red light functions identically to a standard Stop Sign: motorists must make a full stop before the stop line, yield, and proceed only when clear.',
    img: '/assets/png/signs/sig_steady_red.png',
  },
  {
    q: 'Under RA 4136, within how many meters of an intersection corner curb line is parking strictly prohibited?',
    correct: 'Within 6 meters',
    wrong1: 'Within 1 meter',
    wrong2: 'Within 25 meters',
    exp: 'Section 46 of RA 4136 prohibits parking within 6 meters of the intersection of curb lines to preserve clear corner visibility.',
  },
  {
    q: 'What is the maximum permissible Blood Alcohol Concentration (BAC) limit for drivers of trucks, buses, and public utility vehicles under RA 10586?',
    correct: '0.00% (strictly zero alcohol tolerance)',
    wrong1: '0.05%',
    wrong2: '0.08%',
    exp: 'Commercial, public utility, and heavy goods drivers are held to a strict zero-tolerance 0.00% BAC standard under RA 10586.',
  },
  {
    q: 'What does a solid double yellow center line indicate on a two-lane highway?',
    correct: 'Overtaking or crossing into the opposite lane is prohibited in both directions',
    wrong1: 'Passing is allowed if the vehicle ahead travels below 30 km/h',
    wrong2: 'Reserved lane for express motorcycles only',
    exp: 'Double solid yellow lines indicate severe visibility risks (curves, bridges, crests) and forbid overtaking from either direction.',
    img: '/assets/png/signs/mark_double_yellow.png',
  },
  {
    q: 'What is the statutory speed limit for passenger cars and motorcycles on "open country roads" with no blind corners under RA 4136?',
    correct: '80 km/h',
    wrong1: '40 km/h',
    wrong2: '120 km/h',
    exp: 'Under RA 4136 Section 35, open country roads with no blind corners carry an 80 km/h maximum speed limit for passenger cars and motorcycles.',
  },
  {
    q: 'What is the statutory speed limit for motor trucks and buses on "open country roads" under RA 4136?',
    correct: '50 km/h',
    wrong1: '80 km/h',
    wrong2: '100 km/h',
    exp: 'Heavy trucks and buses have longer stopping distances and are limited to 50 km/h on open country roads under RA 4136.',
  },
  {
    q: 'What is the statutory speed limit for passenger cars and motorcycles on "through streets" or boulevards clear of traffic?',
    correct: '40 km/h',
    wrong1: '20 km/h',
    wrong2: '80 km/h',
    exp: 'Through streets or boulevards with no blind corners carry a statutory maximum speed of 40 km/h for cars and motorcycles (30 km/h for trucks/buses).',
  },
  {
    q: 'What is the statutory speed limit on crowded streets, school zones, or approaching intersections at blind corners?',
    correct: '20 km/h',
    wrong1: '40 km/h',
    wrong2: '60 km/h',
    exp: 'Crowded streets, school zones, and blind intersections have a strict 20 km/h maximum speed limit for all vehicle classes.',
  },
  {
    q: 'Within how many meters of a fire hydrant is parking strictly prohibited under RA 4136 Section 46?',
    correct: 'Within 4 meters of a fire hydrant',
    wrong1: 'Within 1 meter of a fire hydrant',
    wrong2: 'Within 15 meters of a fire hydrant',
    exp: 'Motorists must keep at least 4 meters clear around any fire hydrant so emergency fire trucks have immediate access.',
  },
  {
    q: 'When two vehicles approach an uncontrolled intersection from different streets at approximately the same time, who has the right of way?',
    correct: 'The vehicle on the right has the right of way',
    wrong1: 'The vehicle on the left has the right of way',
    wrong2: 'Whichever vehicle sounds its horn first',
    exp: 'Under RA 4136 Section 42(a), the driver on the left must yield the right-of-way to the vehicle on the right when arriving simultaneously.',
  },
  {
    q: 'When one vehicle is already within an intersection and another is just approaching, who has the right of way?',
    correct: 'The vehicle that first entered the intersection properly',
    wrong1: 'The faster approaching vehicle',
    wrong2: 'The wider vehicle',
    exp: 'Approaching drivers must yield to vehicles that have already lawfully entered the intersection.',
  },
  {
    q: 'What should a driver do when preparing to make a left turn at an intersection?',
    correct: 'Signal left at least 30 meters in advance, stay in the proper left-turn lane, and yield to oncoming straight traffic',
    wrong1: 'Turn sharply from the rightmost curb lane without signaling',
    wrong2: 'Force oncoming vehicles to brake suddenly',
    exp: 'Left-turning vehicles must signal early, position in the leftmost lane, and yield to oncoming vehicles proceeding straight.',
  },
  {
    q: 'When driving behind another vehicle at night, which headlight setting must you use?',
    correct: 'Low beam (dim headlights) to avoid blinding the driver ahead through their mirrors',
    wrong1: 'High beam (bright headlights) so the road ahead is brighter',
    wrong2: 'Hazard lights only with headlights turned off',
    exp: 'High beams reflect directly into the rear-view and side mirrors of the driver ahead, causing dangerous glare.',
  },
  {
    q: 'Within what distance of an oncoming vehicle at night must you switch from high beam to low beam headlights?',
    correct: 'At least 150 to 200 meters before meeting the oncoming vehicle',
    wrong1: 'Only after passing the oncoming vehicle',
    wrong2: 'Within 5 meters of the oncoming bumper',
    exp: 'Dimming your headlights at least 150–200 meters ahead prevents temporary night blindness for oncoming motorists.',
  },
  {
    q: 'What does a continuous solid white line between lanes moving in the same direction signify?',
    correct: 'Lane changing is discouraged and should not be done unless necessary for safety',
    wrong1: 'Drivers are required to weave between lanes',
    wrong2: 'Oncoming counterflow traffic is permitted',
    exp: 'Solid white lines separate same-direction lanes near intersections, tunnels, or hazards where lane changes increase collision risk.',
  },
  {
    q: 'What does a single solid yellow line alongside a broken yellow line in the center of a two-way road indicate?',
    correct: 'Vehicles on the side of the broken yellow line may overtake when clear; vehicles on the solid yellow side may not',
    wrong1: 'Both sides are prohibited from overtaking at all times',
    wrong2: 'Only trucks may overtake on the solid line side',
    exp: 'Combination center lines allow passing only from the lane adjacent to the broken line when visibility is clear.',
  },
  {
    q: 'Under RA 4136, when is a driver required to give a hand or mechanical turn signal?',
    correct: 'Whenever starting from a parked position, changing lanes, or turning left or right',
    wrong1: 'Only when a traffic enforcer is watching at an intersection',
    wrong2: 'Only when driving public utility buses',
    exp: 'Signaling intentions well in advance is mandatory before any lateral movement, turn, or departure from a curb.',
  },
  {
    q: 'What is the proper left-arm hand signal when your vehicle’s electrical turn signals are malfunctioning and you intend to turn LEFT?',
    correct: 'Extend your left arm horizontally straight out the driver’s window',
    wrong1: 'Extend your left arm upward at a 90-degree angle',
    wrong2: 'Point your left arm downward toward the pavement',
    exp: 'Left arm extended straight horizontally signals a LEFT turn; angled upward signals a RIGHT turn; pointed downward signals STOP or SLOW DOWN.',
  },
  {
    q: 'What is the proper left-arm hand signal to indicate a RIGHT turn?',
    correct: 'Extend your left arm out the window with forearm raised upward at a 90-degree angle',
    wrong1: 'Extend your left arm straight horizontally',
    wrong2: 'Wave your hand in circles',
    exp: 'Raising the left forearm vertically upward at a 90-degree angle indicates an intention to turn right.',
  },
  {
    q: 'What is the proper left-arm hand signal to indicate that you are STOPPING or SLOWING DOWN?',
    correct: 'Extend your left arm out the window pointed downward toward the road with palm facing backward',
    wrong1: 'Extend your left arm straight up toward the roof',
    wrong2: 'Tap the outside of the door panel',
    exp: 'Pointing the left arm downward at a 45-to-90-degree angle alerts following drivers that you are braking or stopping.',
  },
  {
    q: 'When driving through a flooded street where water reaches the bottom of the brake drums/rotors, what should you do immediately after exiting the water?',
    correct: 'Test and dry the brakes by tapping the brake pedal lightly while moving slowly',
    wrong1: 'Accelerate immediately to 80 km/h',
    wrong2: 'Turn off the headlights and hazard lights',
    exp: 'Wet brake linings lose friction; gently applying the brakes at low speed creates slight heat that dries the pads and restores braking power.',
  },
  {
    q: 'Why is coasting downhill with the gearshift in "Neutral" or the clutch pedal held down strictly prohibited?',
    correct: 'It removes engine braking control and causes the wheel brakes to overheat and fade rapidly',
    wrong1: 'It saves too much fuel on steep slopes',
    wrong2: 'It makes the power steering too stiff',
    exp: 'Coasting in neutral ("freewheeling") deprives the driver of engine braking, risking runaway speed and total brake failure on long descents.',
  },
  {
    q: 'Which gear should you select when descending a steep mountain highway?',
    correct: 'A lower gear (such as 2nd, L, or manual low mode) to utilize engine braking',
    wrong1: 'Neutral gear to let gravity roll the car',
    wrong2: 'Highest overdrive gear for maximum speed',
    exp: 'Shifting into a lower gear uses engine compression to control descent speed without overheating the brake pads.',
  },
  {
    q: 'What is the minimum safe following distance when driving in heavy rain, fog, or at night?',
    correct: 'At least 4 to 6 seconds behind the vehicle ahead',
    wrong1: '1 second behind the vehicle ahead',
    wrong2: 'Less than one car length',
    exp: 'Wet pavement doubles stopping distance; increasing your following gap to 4–6 seconds prevents rear-end pileups.',
  },
  {
    q: 'If an oncoming vehicle crosses the center line into your lane on a two-way road, what is the safest evasive action?',
    correct: 'Brake firmly, sound your horn, flash your headlights, and steer toward the right shoulder away from oncoming traffic',
    wrong1: 'Swung left into the oncoming lane where the other driver came from',
    wrong2: 'Close your eyes and accelerate straight ahead',
    exp: 'Never swerve left into the oncoming lane, as the errant driver will likely recover back into their own lane. Always steer right toward the shoulder.',
  },
  {
    q: 'What is the purpose of Early Warning Devices (EWD — red and yellow reflectorized triangles) carried in motor vehicles?',
    correct: 'To warn approaching motorists when your vehicle is stalled or disabled on a roadway',
    wrong1: 'To reserve a personal parking space in front of a store',
    wrong2: 'To decorate the rear windshield while driving',
    exp: 'Reflectorized EWD triangles must be placed ahead of and behind a stalled vehicle (at least 4 meters away and further back on highways) to prevent collisions.',
  },
  {
    q: 'Where is parking strictly prohibited on any public roadway under RA 4136?',
    correct: 'On a pedestrian crosswalk, within an intersection, or on any bridge or tunnel',
    wrong1: 'Inside a designated municipal pay-parking bay',
    wrong2: 'Inside a private residential garage',
    exp: 'RA 4136 Section 46 forbids parking on crosswalks, intersections, bridges, approaches to bridges, and in front of private driveways.',
  },
  {
    q: 'What must you do before opening the driver-side door after parking along a street with traffic?',
    correct: 'Check your side mirror and look over your shoulder ("Dutch Reach") to ensure no cyclist or vehicle is approaching',
    wrong1: 'Fling the door wide open immediately without looking',
    wrong2: 'Wait for a horn sound before looking',
    exp: 'Opening a vehicle door into the path of an approaching motorcycle or bicycle ("dooring") causes severe accidents and is the driver’s liability.',
  },
  {
    q: 'Under Philippine law, what is the minimum age requirement to apply for a Student Permit?',
    correct: 'At least 16 years old (with parental/guardian consent if under 18)',
    wrong1: 'At least 12 years old',
    wrong2: 'At least 25 years old',
    exp: 'Filipino citizens aged 16 and above who can read and write English or Filipino and pass the 15-hour TDC may apply for a Student Permit.',
  },
  {
    q: 'What is the minimum age requirement to apply for a Non-Professional Driver’s License?',
    correct: 'At least 17 years old',
    wrong1: 'At least 14 years old',
    wrong2: 'At least 21 years old',
    exp: 'An applicant must be at least 17 years old and have held a valid Student Permit for at least 1 month to apply for a Non-Professional DL.',
  },
  {
    q: 'What is the minimum age requirement to apply for a Professional Driver’s License?',
    correct: 'At least 18 years old',
    wrong1: 'At least 16 years old',
    wrong2: 'At least 30 years old',
    exp: 'Professional Driver’s License applicants must be at least 18 years old and possess the required experience and medical/drug clearances.',
  },
  {
    q: 'What does DL Code "A" authorize a licensed driver to operate?',
    correct: 'Two-wheeled motorcycles (L1, L2, L3)',
    wrong1: 'Articulated heavy trailer trucks (CE)',
    wrong2: 'Passenger buses with more than 16 seats (D)',
    exp: 'DL Code A covers standard two-wheeled motorcycles, while DL Code A1 covers tricycles and three-wheeled vehicles.',
  },
  {
    q: 'What does DL Code "A1" authorize a licensed driver to operate?',
    correct: 'Three-wheeled motor vehicles such as tricycles and e-trikes (L4, L5, L6, L7)',
    wrong1: 'Heavy articulated cargo trucks',
    wrong2: '18-wheeler container vans',
    exp: 'DL Code A1 specifically authorizes three-wheeled vehicles and light quadricycles.',
  },
  {
    q: 'What does DL Code "B" authorize a licensed driver to operate?',
    correct: 'Passenger cars and light vehicles up to 5,000 kg GVW with up to 8 passenger seats (M1)',
    wrong1: 'Commercial buses carrying 50 passengers',
    wrong2: 'Heavy dump trucks over 12,000 kg GVW',
    exp: 'DL Code B is the standard classification for sedans, hatchbacks, and SUVs up to 5,000 kg GVW and up to 8 seats.',
  },
  {
    q: 'What does DL Code "B1" authorize a licensed driver to operate?',
    correct: 'Passenger vans and vehicles up to 5,000 kg GVW with 9 or more passenger seats (M2)',
    wrong1: 'Motorcycles only',
    wrong2: 'Heavy construction cranes',
    exp: 'DL Code B1 covers multi-seat passenger vans up to 5,000 kg gross vehicle weight.',
  },
  {
    q: 'What does DL Code "B2" authorize a licensed driver to operate?',
    correct: 'Light commercial goods/cargo vehicles up to 3,500 kg GVW (N1)',
    wrong1: 'Articulated fuel tankers',
    wrong2: 'Two-wheeled scooters only',
    exp: 'DL Code B2 covers light delivery vans and utility pickups up to 3,500 kg GVW.',
  },
  {
    q: 'What does DL Code "C" authorize a licensed driver to operate?',
    correct: 'Heavy goods/cargo trucks exceeding 3,500 kg GVW (N2, N3)',
    wrong1: 'Motorcycles under 150cc only',
    wrong2: 'Bicycles and pedicabs',
    exp: 'DL Code C is required for drivers operating medium and heavy freight trucks over 3,500 kg GVW.',
  },
  {
    q: 'What does DL Code "D" authorize a licensed driver to operate?',
    correct: 'Passenger buses exceeding 5,000 kg GVW or with more than 8 passenger seats (M3)',
    wrong1: 'Compact 4-seater sedans only',
    wrong2: 'Personal e-scooters',
    exp: 'DL Code D is required for operating large passenger buses and coaches.',
  },
  {
    q: 'What happens if you miss your intended exit while driving on an expressway?',
    correct: 'Continue driving safely to the next exit; never stop or reverse on an expressway',
    wrong1: 'Stop immediately and back up along the expressway shoulder',
    wrong2: 'Make a U-turn across the expressway grass median',
    exp: 'Stopping or reversing on a high-speed expressway is extremely dangerous and strictly illegal; always proceed to the next interchange.',
    img: '/assets/png/signs/guide_expressway.png',
  },
  {
    q: 'What is the minimum legal speed on Philippine expressways (such as NLEX and SLEX) under normal conditions?',
    correct: '60 km/h',
    wrong1: '20 km/h',
    wrong2: '100 km/h',
    exp: 'Expressways enforce a minimum speed of 60 km/h and a maximum of 100 km/h for cars (80 km/h for trucks/buses) to prevent high-speed rear-end collisions.',
  },
  {
    q: 'What is the maximum legal speed for passenger cars and SUVs on most Philippine expressways?',
    correct: '100 km/h (unless otherwise posted)',
    wrong1: '60 km/h',
    wrong2: '150 km/h',
    exp: 'Cars and SUVs may travel up to 100 km/h on expressways, while buses and trucks are restricted to 80 km/h.',
  },
  {
    q: 'Which lane on a multi-lane expressway is designated exclusively for overtaking?',
    correct: 'The leftmost lane (Lane 1)',
    wrong1: 'The rightmost shoulder lane',
    wrong2: 'The tollgate emergency bay',
    exp: 'The innermost left lane is the overtaking lane. After completing a pass, drivers must return to the center or right travel lanes.',
  },
  {
    q: 'Why must you never overtake another vehicle when approaching the crest of a hill or a blind curve?',
    correct: 'Your line of sight is blocked and an unseen oncoming vehicle could collide head-on with you',
    wrong1: 'Your tires will wear out faster on hills',
    wrong2: 'Your radio signal might drop',
    exp: 'Overtaking requires at least 150+ meters of clear forward visibility; crests and blind curves hide oncoming traffic.',
    img: '/assets/png/signs/warn_sharp_curve.png',
  },
  {
    q: 'What is the meaning of a green traffic light arrow pointing LEFT while the main circular signal is RED?',
    correct: 'Vehicles in the left-turn lane may proceed to turn left, while through traffic must remain stopped',
    wrong1: 'All lanes may go straight at full speed',
    wrong2: 'Pedestrians may cross in all directions',
    exp: 'A protected green left-turn arrow grants right-of-way specifically to vehicles turning in the direction of the arrow.',
    img: '/assets/png/signs/sig_steady_green.png',
  },
  {
    q: 'When approaching a green traffic light that has been green for a long time ("stale green light"), what should a defensive driver do?',
    correct: 'Cover the brake, check the rear-view mirror, and be ready to stop smoothly if it turns yellow',
    wrong1: 'Floor the accelerator to beat the upcoming yellow light',
    wrong2: 'Honk continuously through the intersection',
    exp: 'Anticipating signal changes prevents abrupt panic braking or illegal red-light running.',
  },
  {
    q: 'What is the rule regarding horn blowing near hospitals, churches, and school zones?',
    correct: 'Unnecessary horn blowing is prohibited; use the horn only to prevent an immediate collision',
    wrong1: 'Blow the horn continuously to alert patients and students',
    wrong2: 'Use modified loud air horns in hospital zones',
    exp: 'Hospitals, schools, and places of worship are designated quiet zones where unnecessary horn use is prohibited.',
    img: '/assets/png/signs/guide_hospital.png',
  },
  {
    q: 'Under RA 8750 (Seat Belts Use Act), who is legally required to wear a seatbelt in a moving motor vehicle?',
    correct: 'Both the driver and front-seat passengers (and rear passengers as equipped)',
    wrong1: 'Only the driver when travelling on expressways',
    wrong2: 'Only passengers over 60 years old',
    exp: 'RA 8750 mandates seatbelt use for the driver and front seat occupants at all times in both private and public vehicles.',
    img: '/assets/png/signs/reg_seatbelt.png',
  },
  {
    q: 'Under RA 11229 (Child Safety in Motor Vehicles Act), when is a child permitted to sit in the front passenger seat of a car?',
    correct: 'Only when the child is over 12 years old or at least 150 cm (4 ft 11 in) tall and properly belted',
    wrong1: 'Whenever held tightly on an adult’s lap in the front seat',
    wrong2: 'Whenever the car is travelling below 40 km/h',
    exp: 'Front passenger airbags deploy with extreme force that can be fatal to children under 12 years old or shorter than 150 cm.',
  },
  {
    q: 'What should you do if your vehicle’s accelerator pedal sticks down while driving on a highway?',
    correct: 'Shift immediately to Neutral (N), apply steady brakes, steer safely to the shoulder, and turn off the engine once stopped',
    wrong1: 'Turn the ignition key to LOCK while steering at 80 km/h',
    wrong2: 'Jump out of the moving vehicle',
    exp: 'Shifting to Neutral disconnects engine power from the wheels while keeping power steering and power brake assist functional until you stop safely.',
  },
  {
    q: 'What is the correct action if your engine overheats and steam comes from under the hood?',
    correct: 'Pull safely off the road, turn off the engine, and let it cool completely before touching the radiator cap',
    wrong1: 'Immediately twist open the hot pressurized radiator cap with bare hands',
    wrong2: 'Pour ice-cold water directly onto the red-hot engine block while running',
    exp: 'Opening a pressurized hot radiator cap causes explosive scalding steam burns; always wait for the engine to cool down first.',
  },
  {
    q: 'When involved in a road crash resulting in injury to a person, what is the driver’s mandatory duty under RA 4136 Section 55?',
    correct: 'Stop immediately, render reasonable assistance/medical aid to the injured, and report the incident to authorities',
    wrong1: 'Flee the scene quickly to avoid traffic congestion',
    wrong2: 'Argue with bystanders and refuse to show your license',
    exp: 'Hit-and-run is a serious criminal offense under RA 4136 Section 55; drivers must stop and aid injured persons unless facing imminent bodily harm.',
  },
  {
    q: 'What does a white diamond symbol painted in the center of a traffic lane indicate?',
    correct: 'A reserved priority lane (such as a high-occupancy vehicle, bus, or bicycle priority lane)',
    wrong1: 'A speed bump 10 meters ahead',
    wrong2: 'Free overnight street parking',
    exp: 'Diamond pavement symbols denote restricted priority lanes regulated by local or highway authorities.',
  },
  {
    q: 'What is "Blind Spot" in motor vehicle operation?',
    correct: 'The area alongside and slightly behind your vehicle that cannot be seen in your rear-view or side mirrors',
    wrong1: 'The tinted upper strip of the front windshield',
    wrong2: 'The area directly in front of the hood ornament',
    exp: 'Even properly adjusted mirrors leave blind spots on the left and right rear quarters, requiring a brief shoulder glance before lane changes.',
  },
  {
    q: 'How should a motorcyclist position themselves within a traffic lane for optimal visibility and safety?',
    correct: 'In the lane position (typically left-of-center) that maximizes visibility in the ahead driver’s mirrors and avoids road oil/debris',
    wrong1: 'Directly in the blind spot beside a large cargo truck’s rear wheels',
    wrong2: 'Weaving rapidly between moving bumpers at high speed',
    exp: 'Proper lane positioning keeps the motorcyclist visible in the ahead vehicle’s mirrors and away from center-lane oil slicks.',
  },
  {
    q: 'Why is tailgating (following too closely behind a large truck or bus) extremely dangerous?',
    correct: 'It severely blocks your forward view of road hazards and leaves zero time to brake if the truck stops suddenly',
    wrong1: 'It improves your tire pressure',
    wrong2: 'It keeps your headlights cleaner',
    exp: 'Tailgating a tall vehicle blinds you to traffic signals, potholes, and braking hazards ahead while placing you in the truck driver’s rear blind spot.',
  },
];

export function getEnglishQuestions(): ReviewerQuestion[] {
  const combined: RawQ[] = [...ENGLISH_RAW_BASE];

  // Add all 40 English questions from QUESTIONS
  QUESTIONS.forEach((item) => {
    const correctChoice = item.choices.find((c) => c.id === item.correctAnswerId) || item.choices[0];
    const wrongs = item.choices.filter((c) => c.id !== item.correctAnswerId);
    combined.push({
      q: item.question.en,
      correct: correctChoice.text.en,
      wrong1: wrongs[0]?.text.en || 'Accelerate through the hazard zone without slowing down',
      wrong2: wrongs[1]?.text.en || 'Disregard statutory road rules whenever traffic is light',
      exp: item.explanation.en,
      img: item.imageResource,
    });
  });

  return combined.slice(0, 97).map((raw, idx) => buildQuestion('english', idx + 1, raw));
}

// ============================================================================
// 3. TRAFFIC SIGNS, SIGNALS AND MARKINGS POOL (182 Questions total!)
// ============================================================================
export function getTrafficSignsQuestions(): ReviewerQuestion[] {
  const signQuestions: RawQ[] = [];

  // Core high-priority sign questions (Concise prompts & choices matching IMG_4114_2)
  const coreSignQs: RawQ[] = [
    {
      q: 'What should drivers watch for after this sign?',
      correct: 'Animals crossing',
      wrong1: 'Farm equipment',
      wrong2: 'Construction vehicles',
      exp: 'This red-bordered warning triangle with a cattle silhouette (DPWH W6-5) alerts drivers to slow down and watch for livestock or animals crossing the roadway ahead.',
      img: '/assets/png/signs/warn_animals_crossing.png',
    },
    {
      q: 'What does this octagonal red road sign require drivers to do?',
      correct: 'Come to a complete stop',
      wrong1: 'Slow down and proceed',
      wrong2: 'Speed up through the intersection',
      exp: 'The octagonal red Stop sign (DPWH R1-1) commands a complete full stop before the stop line or crosswalk and yielding before proceeding.',
      img: '/assets/png/signs/reg_stop.png',
    },
    {
      q: 'What does this inverted red-and-white triangle sign indicate?',
      correct: 'Give way / Yield to priority traffic',
      wrong1: 'You have absolute right-of-way',
      wrong2: 'Two-way traffic ahead',
      exp: 'The inverted triangle (DPWH R1-2) requires drivers to slow down, prepare to stop if needed, and yield the right-of-way to traffic on the priority road.',
      img: '/assets/png/signs/reg_give_way.png',
    },
    {
      q: 'What does this red circular sign with a white horizontal bar mean?',
      correct: 'No entry for all vehicles',
      wrong1: 'Toll booth ahead',
      wrong2: 'Dead-end street ahead',
      exp: 'DPWH R2-3 No Entry prohibits all vehicular entry from this direction to prevent counterflow collisions.',
      img: '/assets/png/signs/reg_no_entry.png',
    },
    {
      q: 'What does this yellow criss-cross box painted in an intersection mean?',
      correct: 'Do not enter unless your exit is clear',
      wrong1: 'Jeepney loading and unloading zone',
      wrong2: 'Pedestrian-only crossing plaza',
      exp: 'In a Yellow Box Junction, you must never enter the box unless your exit lane is completely clear, even if the traffic light is green.',
      img: '/assets/png/signs/mark_yellow_box.png',
    },
    {
      q: 'What does this circular sign displaying "60" indicate?',
      correct: 'Maximum speed limit of 60 km/h',
      wrong1: 'Minimum speed of 60 km/h',
      wrong2: 'Next city is 60 km away',
      exp: 'Red-bordered circular numerical signs (DPWH R4-1) establish the maximum legal speed limit for that road section.',
      img: '/assets/png/signs/reg_speed_60.png',
    },
    {
      q: 'What does this blue circular sign require vehicle occupants to do?',
      correct: 'Wear seatbelts at all times',
      wrong1: 'Use passenger pickup lane',
      wrong2: 'Give way to pedestrians',
      exp: 'Blue circular signs indicate mandatory regulatory instructions—here, mandatory seatbelt compliance under RA 8750 (DPWH R6-4).',
      img: '/assets/png/signs/reg_seatbelt.png',
    },
    {
      q: 'What does a double solid yellow center line on a roadway mean?',
      correct: 'No overtaking from either direction',
      wrong1: 'Overtaking allowed during daytime',
      wrong2: 'Reversible counterflow lane',
      exp: 'Solid double yellow lines divide opposing traffic where crossing the center line to pass is strictly prohibited from both directions.',
      img: '/assets/png/signs/mark_double_yellow.png',
    },
    {
      q: 'What does a broken white line separating highway lanes indicate?',
      correct: 'Changing lanes or overtaking is allowed if safe',
      wrong1: 'Lane changing is strictly prohibited',
      wrong2: 'Roadside parking zone',
      exp: 'Broken white lines divide lanes where changing lanes or passing is permitted after signaling and checking mirrors and blind spots.',
      img: '/assets/png/signs/mark_broken_white.png',
    },
    {
      q: 'What does this sign showing two cars with a diagonal red slash mean?',
      correct: 'No overtaking zone',
      wrong1: 'Two-lane highway begins',
      wrong2: 'Car dealership ahead',
      exp: 'DPWH R3-16 No Overtaking prohibits passing other vehicles on curves, bridges, and narrow road sections.',
      img: '/assets/png/signs/reg_no_overtaking.png',
    },
    {
      q: 'What does this circular sign with a curved arrow and red slash mean?',
      correct: 'No U-turn allowed',
      wrong1: 'Sharp hairpin curve ahead',
      wrong2: 'U-turn slot for buses only',
      exp: 'DPWH R3-13 No U-Turn prohibits turning back in the opposite direction at that intersection or median opening.',
      img: '/assets/png/signs/reg_no_uturn.png',
    },
    {
      q: 'What does this sign showing the letter "P" with a red slash mean?',
      correct: 'No parking allowed',
      wrong1: 'Police station ahead',
      wrong2: 'Pedestrian overpass ahead',
      exp: 'DPWH R5-1 No Parking forbids leaving a vehicle parked along this restricted roadway section.',
      img: '/assets/png/signs/reg_no_parking.png',
    },
    {
      q: 'What hazard does this warning triangle with skid marks indicate?',
      correct: 'Slippery road ahead',
      wrong1: 'Winding mountain road',
      wrong2: 'Rough gravel pavement',
      exp: 'DPWH W5-9 warns drivers to decelerate smoothly and avoid sudden braking or sharp steering on slippery surfaces.',
      img: '/assets/png/signs/warn_slippery.png',
    },
  ];

  signQuestions.push(...coreSignQs);

  // Generate 8 distinct, concise exam angles for each of the 20 ROAD_SIGNS (20 * 8 = 160 questions)
  ROAD_SIGNS.forEach((sign) => {
    const shortMeaningEn = sign.meaning.en.split('—')[0].split('.')[0].trim();
    const shortMeaningFil = sign.meaning.fil.split('—')[0].split('.')[0].trim();
    const shortActionEn = sign.requiredAction.en.split('.')[0].split(';')[0].trim();
    const shortActionFil = sign.requiredAction.fil.split('.')[0].split(';')[0].trim();

    // Angle 1: English Sign Identification
    signQuestions.push({
      q: 'What is the official name of this road sign or marking?',
      correct: sign.name.en,
      wrong1: 'End of Speed Limit',
      wrong2: 'Road Closed Ahead',
      exp: `${sign.name.en}: ${sign.explanation.en} (${sign.sourceReference})`,
      img: sign.imageResource,
    });

    // Angle 2: English Meaning
    signQuestions.push({
      q: `What does this "${sign.name.en}" sign indicate to drivers?`,
      correct: shortMeaningEn,
      wrong1: 'Accelerate without yielding',
      wrong2: 'Free roadside parking zone',
      exp: `${sign.explanation.en} ${sign.requiredAction.en}`,
      img: sign.imageResource,
    });

    // Angle 3: Required Driver Action (English)
    signQuestions.push({
      q: 'What should drivers do when approaching this sign?',
      correct: shortActionEn,
      wrong1: 'Honk continuously and speed up',
      wrong2: 'Stop in the middle of the lane',
      exp: `${sign.requiredAction.en} (${sign.sourceReference})`,
      img: sign.imageResource,
    });

    // Angle 4: Tagalog Sign Identification
    signQuestions.push({
      q: 'Ano ang tawag sa opisyal na karatula o markang ito sa kalsada?',
      correct: sign.name.fil,
      wrong1: 'Bawal Bumusina',
      wrong2: 'Sarado ang Kalsada',
      exp: `${sign.name.fil}: ${sign.explanation.fil}`,
      img: sign.imageResource,
    });

    // Angle 5: Tagalog Meaning
    signQuestions.push({
      q: `Ano ang kahulugan ng karatulang "${sign.name.fil}"?`,
      correct: shortMeaningFil,
      wrong1: 'Bumilis nang walang pag-iingat',
      wrong2: 'Libreng paradahan sa bangketa',
      exp: `${sign.explanation.fil} ${sign.requiredAction.fil}`,
      img: sign.imageResource,
    });

    // Angle 6: Tagalog Required Action
    signQuestions.push({
      q: `Ano ang dapat gawin ng drayber kapag nakita ang "${sign.name.fil}"?`,
      correct: shortActionFil,
      wrong1: 'Bilisan pa ang takbo agad',
      wrong2: 'Mag-counterflow sa kabilang linya',
      exp: `${sign.requiredAction.fil} (${sign.sourceReference})`,
      img: sign.imageResource,
    });

    // Angle 7: Category Classification
    const catLabel =
      sign.category === 'REGULATORY'
        ? 'Regulatory Sign'
        : sign.category === 'WARNING'
        ? 'Warning Sign'
        : sign.category === 'GUIDE_INFORMATIONAL'
        ? 'Guide / Informational Sign'
        : sign.category === 'PAVEMENT_MARKINGS'
        ? 'Pavement Marking'
        : 'Traffic Light Signal';

    signQuestions.push({
      q: `Which official LTO classification does "${sign.name.en}" belong to?`,
      correct: catLabel,
      wrong1: 'Temporary Detour Banner',
      wrong2: 'Commercial Billboard',
      exp: `${sign.name.en} is classified as a ${catLabel}. ${sign.explanation.en}`,
      img: sign.imageResource,
    });

    // Angle 8: Hazard / Rule Watch
    signQuestions.push({
      q: 'What traffic rule or road condition does this sign enforce?',
      correct: `${sign.name.en} (${shortMeaningEn})`,
      wrong1: 'Minimum highway speed of 80 km/h',
      wrong2: 'Designated truck weighing station',
      exp: `${sign.meaning.en} — ${sign.requiredAction.en}`,
      img: sign.imageResource,
    });
  });

  // Add 10 additional specialized road sign & marking questions to exceed 182
  const extraSigns: RawQ[] = [
    {
      q: 'What does an equilateral red-bordered triangle pointing UPWARD always signify in the Philippine road sign system?',
      correct: 'A Warning Sign alerting motorists to a hazard or special road condition ahead',
      wrong1: 'A Mandatory speed increase zone',
      wrong2: 'A tourist hotel directory',
      exp: 'Upward-pointing red-bordered triangles (DPWH W-Series) are standard hazard warning signs.',
      img: '/assets/png/signs/warn_pedestrian.png',
    },
    {
      q: 'What does a fluorescent yellow-green pentagon (5-sided house shape) sign indicate?',
      correct: 'School Zone / Children Crossing Ahead — slow down to 20 km/h and watch for students',
      wrong1: 'National park campground ahead',
      wrong2: 'Tollway E-Pass lane ahead',
      exp: 'The pentagon shape (DPWH W6-4) is reserved specifically for School Zone and Children Crossing warnings.',
      img: '/assets/png/signs/warn_school_zone.png',
    },
    {
      q: 'What does a green rectangular highway sign with white lettering and an arrow indicate?',
      correct: 'Directional Guide Sign showing distances, towns, or upcoming expressway exits',
      wrong1: 'Strict prohibition against entering the highway',
      wrong2: 'Hazardous chemical spill warning',
      exp: 'Green background signs with white text provide directional guidance on highways and expressways.',
      img: '/assets/png/signs/guide_expressway.png',
    },
    {
      q: 'What does a blue rectangular sign with white symbols (such as "H" or a fuel pump) indicate?',
      correct: 'Service Guide Sign indicating nearby motorist facilities like hospitals or fuel stations',
      wrong1: 'High-voltage electrical hazard',
      wrong2: 'Minimum speed limit of 80 km/h',
      exp: 'Blue rectangular signs (DPWH S-Series) guide motorists to essential roadside services.',
      img: '/assets/png/signs/guide_hospital.png',
    },
    {
      q: 'What does a circular sign with a blue background and white symbol always command?',
      correct: 'A Mandatory Regulatory Instruction that drivers must follow (e.g., Use Seat Belt, Keep Right)',
      wrong1: 'Optional scenic viewpoint suggestion',
      wrong2: 'Historical landmark marker',
      exp: 'Blue circular signs (DPWH R6-Series) issue mandatory instructions rather than prohibitions.',
      img: '/assets/png/signs/reg_seatbelt.png',
    },
    {
      q: 'What does a solid white transverse line painted across your traffic lane just before an intersection or crosswalk indicate?',
      correct: 'STOP LINE — the exact point behind which your front bumper must stop on a red light or Stop sign',
      wrong1: 'Speed trap timing line for race cars',
      wrong2: 'Bicycle parking rack boundary',
      exp: 'Stop lines mark where vehicles must halt so they do not encroach into the pedestrian crosswalk or intersecting lane.',
      img: '/assets/png/signs/mark_zebra_crossing.png',
    },
    {
      q: 'When approaching a traffic signal displaying a STEADY YELLOW (amber) light, what is the rule?',
      correct: 'Prepare to stop safely behind the stop line because the red light is about to appear',
      wrong1: 'Accelerate hard to beat the red light across the intersection',
      wrong2: 'Make a sudden U-turn without signaling',
      exp: 'Steady yellow warns that the green phase has ended and red is imminent; stop if it is safe to do so.',
      img: '/assets/png/signs/sig_flashing_yellow.png',
    },
    {
      q: 'What does a warning triangle with two opposing vertical arrows (one pointing up, one pointing down) mean?',
      correct: 'Two-Way Traffic Ahead — you are entering a road section with oncoming traffic in the adjacent lane',
      wrong1: 'Vertical elevator bridge ahead',
      wrong2: 'Divided 6-lane expressway begins',
      exp: 'DPWH W4-11 warns drivers transitioning from a one-way or divided road onto an undivided two-way carriageway.',
      img: '/assets/png/signs/warn_two_way.png',
    },
    {
      q: 'What does a warning triangle showing a vertical traffic light with red, yellow, and green circles mean?',
      correct: 'Traffic Signals Ahead — slow down and prepare for a signalized intersection ahead',
      wrong1: 'Traffic lights are permanently out of order',
      wrong2: 'Fire station exit only',
      exp: 'DPWH W3-2 gives advance notice of a signalized intersection where visibility may be obstructed by curves or grades.',
      img: '/assets/png/signs/warn_traffic_light_ahead.png',
    },
    {
      q: 'When you see a Yellow Box Junction painted at an intersection and your light turns GREEN, but traffic on the far side is completely stopped, what must you do?',
      correct: 'Wait behind the stop line until there is enough space beyond the yellow box for your entire vehicle to clear it',
      wrong1: 'Drive into the middle of the yellow box and wait there until traffic moves',
      wrong2: 'Honk continuously and block the cross-street lanes',
      exp: 'Entering a Yellow Box when the exit is blocked causes gridlock and is a punishable violation.',
      img: '/assets/png/signs/mark_yellow_box.png',
    },
  ];

  signQuestions.push(...extraSigns);

  return signQuestions.slice(0, 182).map((raw, idx) => buildQuestion('signs', idx + 1, raw));
}

// ============================================================================
// 4. CDE: COMPREHENSIVE DRIVER'S EDUCATION - ENGLISH (98 Questions total)
// ============================================================================
const CDE_EN_EXTRA: RawQ[] = [
  {
    q: 'What does the letter "B" stand for in the LTO pre-driving vehicle inspection acronym BLOWBAGETS?',
    correct: 'Battery and Brakes',
    wrong1: 'Body paint and Bumper',
    wrong2: 'Blower and Bluetooth',
    exp: 'In BLOWBAGETS, the first "B" stands for Battery and the second "B" stands for Brakes.',
  },
  {
    q: 'Under RA 10930, how many demerit points accumulate before a driver is required to undergo a mandatory driver’s reorientation course?',
    correct: '5 demerit points',
    wrong1: '1 demerit point',
    wrong2: '50 demerit points',
    exp: 'Under the IRR of RA 10930, accumulating 5 demerit points requires the driver to complete a Driver’s Reorientation Course.',
  },
  {
    q: 'Under RA 10930, what happens if a driver accumulates 40 or more demerit points?',
    correct: 'Revocation of the driver’s license for at least 2 years',
    wrong1: 'A small verbal warning at the renewal counter',
    wrong2: 'Automatic 10-year license extension',
    exp: 'Accumulating 40 total demerit points leads to license revocation for 2 years under RA 10930.',
  },
  {
    q: 'Under RA 10930, how are demerit points calculated if a holder of a Non-Professional or Professional license commits a violation while operating a Public Utility Vehicle (PUV)?',
    correct: 'Double (2x) the standard demerit points for the violation',
    wrong1: 'Half (0.5x) the standard demerit points',
    wrong2: 'Zero demerit points for PUV operators',
    exp: 'Because public transport carries a higher duty of public safety, violations committed while operating a PUV incur double demerit points.',
  },
  {
    q: 'What is the minimum passing score required in the LTO Comprehensive Driver’s Education (CDE) Online Validation Exam for license renewal?',
    correct: 'At least 80% (20 correct answers out of 25 questions)',
    wrong1: '50% (12 out of 25 questions)',
    wrong2: '30% (8 out of 25 questions)',
    exp: 'Drivers renewing their license must score at least 80% on the CDE validation exam.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "L" stand for?',
    correct: 'Lights (headlights, brake lights, signal lights, hazard lights)',
    wrong1: 'Luggage compartment carpet',
    wrong2: 'License plate frame color',
    exp: 'Checking all exterior and warning lights before departure ensures visibility and safe communication with other road users.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "O" stand for?',
    correct: 'Oil (engine oil level and absence of leaks)',
    wrong1: 'Odometer trip reset button',
    wrong2: 'Ornament on the dashboard',
    exp: 'Adequate engine oil level and pressure prevent catastrophic engine seizure on the highway.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "W" stand for?',
    correct: 'Water / Coolant (radiator coolant reservoir and windshield washer fluid)',
    wrong1: 'Window tint darkness',
    wrong2: 'Wheel hubcap polish',
    exp: 'Proper coolant levels prevent engine overheating during heavy traffic or long drives.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "A" stand for?',
    correct: 'Air (proper tire inflation pressure including the spare tire)',
    wrong1: 'Air freshener scent',
    wrong2: 'Audio amplifier wattage',
    exp: 'Proper tire air pressure prevents blowouts, improves braking grip, and optimizes fuel economy.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "G" stand for?',
    correct: 'Gas / Fuel (sufficient fuel level for the planned trip and no fuel leaks)',
    wrong1: 'Glovebox organization',
    wrong2: 'GPS screen brightness',
    exp: 'Running out of fuel on an expressway or bridge creates a dangerous road obstruction.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "E" stand for?',
    correct: 'Engine (smooth engine operation, belts, hoses, and no warning lights)',
    wrong1: 'Entertainment system speakers',
    wrong2: 'Exhaust chrome tip',
    exp: 'Listening for abnormal engine noises and checking dashboard warning indicators prevents breakdowns.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the letter "T" stand for?',
    correct: 'Tires and Tools (tire tread depth, lug nuts, jack, wrench, and Early Warning Device)',
    wrong1: 'Tollway sticker placement',
    wrong2: 'Trunk mat color',
    exp: 'Tires must have safe tread depth (above the tread wear indicator) and the vehicle must carry a jack, tire wrench, and EWD.',
  },
  {
    q: 'In the BLOWBAGETS checklist, what does the final letter "S" stand for?',
    correct: 'Self (the driver’s physical alertness, sobriety, emotional calmness, and valid license)',
    wrong1: 'Spoiler aerodynamics',
    wrong2: 'Sunroof operation',
    exp: 'The driver ("Self") is the most critical safety element—never drive when fatigued, intoxicated, ill, or emotionally distressed.',
  },
  {
    q: 'Under RA 10913 (Anti-Distracted Driving Act), where may a hands-free navigation smartphone be mounted on the dashboard?',
    correct: 'At a point that does not obstruct the driver’s line of sight (maximum 4 inches from the lowest edge of the windshield)',
    wrong1: 'Directly in the center of the windshield blocking the driver’s forward view',
    wrong2: 'Taped onto the steering wheel airbag cover',
    exp: 'Hands-free mounts are permitted only if they do not obstruct the driver’s field of view.',
  },
  {
    q: 'Under RA 10586 (Anti-Drunk and Drugged Driving Act), which three standardized Field Sobriety Tests (FST) are conducted by deputized officers?',
    correct: 'The Eye Test (Horizontal Gaze Nystagmus), the Walk-and-Turn Test, and the One-Leg Stand Test',
    wrong1: 'Push-ups, 100-meter sprint, and spelling test',
    wrong2: 'Reciting the alphabet backward while hopping',
    exp: 'RA 10586 mandates the three scientific Field Sobriety Tests prior to administering the chemical breath analyzer (Breathalyzer) test.',
  },
  {
    q: 'Under RA 10586, what is the consequence if a driver suspected of drunk driving refuses to undergo the mandatory Field Sobriety and Breathalyzer tests?',
    correct: 'Confiscation and automatic revocation of the driver’s license, in addition to other statutory penalties',
    wrong1: 'The driver is immediately released without any citation',
    wrong2: 'Only a P100 parking ticket is issued',
    exp: 'Refusal to submit to mandatory sobriety/chemical testing under RA 10586 results in automatic confiscation and revocation of the driver’s license.',
  },
  {
    q: 'Under RA 11229 (Child Safety in Motor Vehicles Act), why is it strictly illegal to leave a child unattended inside a closed motor vehicle?',
    correct: 'Rapid heat buildup (vehicular heatstroke) or accidental vehicle movement can be fatal to the child within minutes',
    wrong1: 'The child might change the radio station presets',
    wrong2: 'It drains the 12V battery',
    exp: 'Interior cabin temperatures rise dangerously fast in the Philippine climate, making unattended children in cars a life-threatening hazard.',
  },
  {
    q: 'Under RA 11235 (Motorcycle Crime Prevention Act), what is required regarding motorcycle license plates?',
    correct: 'Readable, bigger, color-coded front and rear number plates must be kept clean and unobstructed',
    wrong1: 'Plates may be folded or hidden under the fender for styling',
    wrong2: 'Handwritten cardboard plates may be used permanently',
    exp: 'RA 11235 penalizes driving without proper readable plates or tampering with/obscuring motorcycle plates.',
  },
];

export function getCdeEnglishQuestions(): ReviewerQuestion[] {
  const pool: RawQ[] = [...CDE_EN_EXTRA];

  // Add all 40 English questions from QUESTIONS
  QUESTIONS.forEach((item) => {
    const correctChoice = item.choices.find((c) => c.id === item.correctAnswerId) || item.choices[0];
    const wrongs = item.choices.filter((c) => c.id !== item.correctAnswerId);
    pool.push({
      q: item.question.en,
      correct: correctChoice.text.en,
      wrong1: wrongs[0]?.text.en || 'Proceed without checking road clearance',
      wrong2: wrongs[1]?.text.en || 'Ignore statutory LTO rules',
      exp: `${item.explanation.en} (${item.sourceReference})`,
      img: item.imageResource,
    });
  });

  // Add English bases
  pool.push(...ENGLISH_RAW_BASE);

  return pool.slice(0, 98).map((raw, idx) => buildQuestion('cde_en', idx + 1, raw));
}

// ============================================================================
// 5. CDE: COMPREHENSIVE DRIVER'S EDUCATION - TAGALOG (90 Questions total)
// ============================================================================
const CDE_TL_EXTRA: RawQ[] = [
  {
    q: 'Ano ang kinakatawan ng titik "S" sa LTO pre-drive checklist na BLOWBAGETS?',
    correct: 'Self — ang pisikal, mental, at emosyonal na kahandaan ng drayber',
    wrong1: 'Speedometer calibration',
    wrong2: 'Stereo at speaker volume',
    exp: 'Kahit nasa kondisyon ang sasakyan, mapanganib bumiyahe kung ang drayber ("Self") ay puyat, lasing, maysakit, o galit.',
  },
  {
    q: 'Sa ilalim ng RA 11229 (Child Safety in Motor Vehicles Act), saan dapat nakaupo ang batang 12 taong gulang pababa na mas mababa sa 150 cm ang taas?',
    correct: 'Sa likurang upuan gamit ang angkop na Child Restraint System (CRS)',
    wrong1: 'Sa harapang upuan kandong ng magulang',
    wrong2: 'Nakatayo sa pagitan ng mga upuan',
    exp: 'Ipinagbabawal sa harapang upuan ang mga bata dahil sa matinding panganib ng airbag; kailangang nakaupo sa likod gamit ang certified CRS.',
  },
  {
    q: 'Sa ilalim ng RA 10930, ilang taon ang bisa ng lisensya na ipinagkakaloob sa drayber na walang naitalang traffic violation sa nakaraang 5 taon?',
    correct: 'Sampung (10) taon na bisa ng lisensya',
    wrong1: 'Tatlong (3) taon lamang',
    wrong2: 'Habambuhay na bisa',
    exp: 'Ang mga drayber na malinis ang rekord (zero violations) at nakapasa sa CDE exam ay ginagantimpalaan ng 10-year validity license.',
  },
  {
    q: 'Ilang demerit points sa ilalim ng RA 10930 ang mag-uutos sa isang drayber na dumaan sa mandatory Driver’s Reorientation Course?',
    correct: 'Limang (5) demerit points',
    wrong1: 'Isang (1) demerit point',
    wrong2: 'Isandaang (100) demerit points',
    exp: 'Kapag umabot sa 5 demerit points ang naipon ng drayber, kailangan niyang kumuha ng Driver’s Reorientation Course.',
  },
  {
    q: 'Ano ang mangyayari sa lisensya ng drayber na nakaipon ng 40 o higit pang demerit points sa ilalim ng RA 10930?',
    correct: 'Babawiin (revocation) ang lisensya nang hindi bababa sa dalawang (2) taon',
    wrong1: 'Bibigyan lamang ng paalala sa text',
    wrong2: 'Walang epekto basta magbayad ng renewal fee',
    exp: 'Ang pagkakaroon ng 40 demerit points ay nagreresulta sa pagbawi ng pribilehiyong magmaneho sa loob ng 2 taon.',
  },
  {
    q: 'Ano ang kinakatawan ng dalawang titik "B" sa akronim na BLOWBAGETS?',
    correct: 'Battery (baterya) at Brakes (preno)',
    wrong1: 'Bumper at Body paint',
    wrong2: 'Busina at Bluetooth',
    exp: 'Sinusuri sa BLOWBAGETS ang Battery (karga at koneksyon) at Brakes (brake fluid at kapit ng preno).',
  },
  {
    q: 'Ano ang kinakatawan ng titik "L" sa BLOWBAGETS?',
    correct: 'Lights — pagsusuri sa headlight, tail light, brake light, at signal light',
    wrong1: 'Lisensya ng kapitbahay',
    wrong2: 'Laki ng gulong',
    exp: 'Mahalagang gumagana ang lahat ng ilaw ng sasakyan para sa kaligtasan at tamang komunikasyon sa kalsada.',
  },
  {
    q: 'Ano ang kinakatawan ng titik "O" sa BLOWBAGETS?',
    correct: 'Oil — pagsusuri kung sapat at malinis ang langis ng makina',
    wrong1: 'Orasan sa dashboard',
    wrong2: 'Odometer reading',
    exp: 'Ang kakulangan sa engine oil ay maaaring magdulot ng pagkasira o pagkatirik ng makina sa gitna ng biyahe.',
  },
  {
    q: 'Ano ang kinakatawan ng titik "W" sa BLOWBAGETS?',
    correct: 'Water / Coolant — lebel ng tubig o coolant sa radiator reservoir at windshield washer',
    wrong1: 'Wiper blade color',
    wrong2: 'Window tint',
    exp: 'Pinipigilan ng sapat na coolant/water ang pag-overheat ng makina lalo na sa matinding trapiko.',
  },
  {
    q: 'Ano ang kinakatawan ng titik "A" sa BLOWBAGETS?',
    correct: 'Air — tamang presyon ng hangin sa lahat ng gulong kasama ang reserba',
    wrong1: 'Aircon temperature',
    wrong2: 'Antenna ng radyo',
    exp: 'Ang tamang tire air pressure ay nag-iiwas sa pagsabog ng gulong at nagbibigay ng maayos na kapit sa pagpreno.',
  },
  {
    q: 'Ano ang kinakatawan ng titik "G" sa BLOWBAGETS?',
    correct: 'Gas / Fuel — sapat na karga ng krudo o gasolina para sa biyahe',
    wrong1: 'Garahe ng sasakyan',
    wrong2: 'Gearshift knob',
    exp: 'Tiyaking sapat ang gasolina o diesel bago bumiyahe upang hindi maubusan at makaharang sa highway.',
  },
  {
    q: 'Ano ang kinakatawan ng titik "E" sa BLOWBAGETS?',
    correct: 'Engine — maayos na tunog at takbo ng makina at walang umiilaw na warning icon',
    wrong1: 'Emergency exit',
    wrong2: 'Exhaust pipe sticker',
    exp: 'Pakinggan ang makina at suriin ang dashboard kung may check-engine o warning indicator bago umalis.',
  },
  {
    q: 'Ano ang kinakatawan ng titik "T" sa BLOWBAGETS?',
    correct: 'Tires and Tools — kapal ng pudpod ng gulong, jack, tire wrench, at Early Warning Device (EWD)',
    wrong1: 'Telepono at charger',
    wrong2: 'Ticket sa tollgate',
    exp: 'Kailangang nasa maayos na kondisyon ang mga gulong at kumpleto ang pang-emergency na gamit at EWD.',
  },
  {
    q: 'Sa ilalim ng RA 10586 (Anti-Drunk and Drugged Driving Act), ano ang parusa sa drayber na tumangging sumailalim sa Field Sobriety at Breathalyzer test?',
    correct: 'Kukumpiskahin at awtomatikong babawiin (revocation) ang kanyang lisensya sa pagmamaneho',
    wrong1: 'Papayagan siyang umuwi nang walang multa',
    wrong2: 'Pagmumultahin lamang ng P200',
    exp: 'Ang pagtanggi sa mandatory test sa ilalim ng RA 10586 ay may katumbas na awtomatikong pagbawi ng lisensya.',
  },
  {
    q: 'Ano ang tamang distansya ng paglalagay ng Early Warning Device (EWD) kapag nasiraan ang sasakyan sa kalsada?',
    correct: 'Hindi bababa sa 4 na metro sa unahan at likuran ng sasakyan (mas malayo pa kung sa highway)',
    wrong1: 'Idikit mismo sa bumper ng sasakyan',
    wrong2: 'Ilagay sa loob ng sasakyan sa tapat ng salamin',
    exp: 'Inilalagay ang pulang at dilaw na EWD sa sapat na distansya upang maagang makita ng mga paparating na motorista.',
  },
  {
    q: 'Ano ang dapat gawin ng drayber kapag naramdamang inaantok habang nagmamaneho sa mahabang biyahe?',
    correct: 'Humanap ng ligtas na gasolinahan o rest area, pumarada, at umidlip o magpahinga muna',
    wrong1: 'Buksan nang malakas ang radyo at pilitin ang sariling magmaneho nang mabilis',
    wrong2: 'Uminom ng alak upang magising',
    exp: 'Walang kapalit ang pahinga kapag inaantok (microsleep); ligtas na tumabi sa rest stop at magpahinga.',
  },
  {
    q: 'Paano maiiwasan ang "Road Rage" o away-trapiko habang nagmamaneho?',
    correct: 'Maging mahinahon, magpasensya sa pagkakamali ng iba, at iwasang makipaggitgitan o gumanti',
    wrong1: 'Habulin at harangan ang sasakyang sumingit sa iyo',
    wrong2: 'Bumusina nang walang tigil at sumigaw sa bintana',
    exp: 'Ang defensive driver ay nananatiling kalmado at inuuna ang ligtas na pag-uwi kaysa sa init ng ulo sa kalsada.',
  },
];

export function getCdeTagalogQuestions(): ReviewerQuestion[] {
  const pool: RawQ[] = [...CDE_TL_EXTRA];

  // Add all 40 Filipino questions from QUESTIONS
  QUESTIONS.forEach((item) => {
    const correctChoice = item.choices.find((c) => c.id === item.correctAnswerId) || item.choices[0];
    const wrongs = item.choices.filter((c) => c.id !== item.correctAnswerId);
    pool.push({
      q: item.question.fil,
      correct: correctChoice.text.fil,
      wrong1: wrongs[0]?.text.fil || 'Magpatuloy nang walang pag-iingat',
      wrong2: wrongs[1]?.text.fil || 'Suwayin ang alituntunin ng LTO',
      exp: `${item.explanation.fil} (${item.sourceReference})`,
      img: item.imageResource,
    });
  });

  // Add Tagalog base questions
  pool.push(...TAGALOG_RAW_BASE);

  // Add Tagalog Road Sign questions
  ROAD_SIGNS.forEach((sign) => {
    pool.push({
      q: `Sa ilalim ng CDE Road Safety Review, ano ang ibig sabihin ng "${sign.name.fil}"?`,
      correct: `${sign.meaning.fil} — ${sign.requiredAction.fil}`,
      wrong1: 'Malayang bumilis at umovertake sa magkabilang linya',
      wrong2: 'Bawal dumaan ang lahat ng pribadong kotse',
      exp: sign.explanation.fil,
      img: sign.imageResource,
    });
  });

  return pool.slice(0, 90).map((raw, idx) => buildQuestion('cde_tl', idx + 1, raw));
}

// ============================================================================
// 6. TDC: THEORETICAL DRIVING COURSE (80 Questions total)
// ============================================================================
const TDC_RAW_BASE: RawQ[] = [
  {
    q: 'How long is the validity of a Student Permit issued by the Land Transportation Office (LTO)?',
    correct: 'One (1) year from the date of issuance',
    wrong1: 'Six (6) months',
    wrong2: 'Five (5) years',
    exp: 'A Student Permit is valid for one year. An applicant may apply for a Non-Professional driver’s license after holding the permit for at least one month.',
  },
  {
    q: 'Who must accompany a Student Permit holder whenever driving a motor vehicle on any public road?',
    correct: 'A duly licensed driver holding the appropriate DL code for the vehicle being operated',
    wrong1: 'Any adult passenger with a valid government ID',
    wrong2: 'No companion is needed during daylight hours',
    exp: 'Under RA 4136 Section 30, a Student Permit holder must be accompanied by a licensed driver possessing the proper vehicle qualification code.',
  },
  {
    q: 'How many total hours of instruction are required to complete the mandatory LTO Theoretical Driving Course (TDC) for a Student Permit?',
    correct: '15 hours of classroom / theoretical instruction',
    wrong1: '2 hours only',
    wrong2: '60 hours of highway racing',
    exp: 'LTO MC 2019-2176 mandates a 15-hour Theoretical Driving Course (TDC) before an applicant can be issued a Student Permit.',
  },
  {
    q: 'After obtaining a Student Permit, what is the minimum number of hours required in the Practical Driving Course (PDC) before applying for a new driver’s license?',
    correct: 'At least 8 hours of hands-on Practical Driving Course (PDC) per vehicle category',
    wrong1: '1 hour of parking practice only',
    wrong2: 'No practical driving course is required',
    exp: 'Applicants upgrading from a Student Permit to a Non-Professional DL must complete at least 8 hours of accredited Practical Driving Course (PDC).',
  },
  {
    q: 'How long must a holder of a Student Permit wait before becoming eligible to apply for a Non-Professional Driver’s License?',
    correct: 'At least 1 month (30 days) after the issuance of the Student Permit',
    wrong1: 'The very next day after getting the Student Permit',
    wrong2: '3 years after getting the Student Permit',
    exp: 'A Student Permit must be held for at least 1 month before the applicant can take the Non-Professional Driver’s License exam.',
  },
  {
    q: 'If a Student Permit expires after 1 year and the holder has not yet applied for a Driver’s License, what happens?',
    correct: 'The Student Permit may be renewed within 1 year, or a new application must be filed if expired beyond 2 years',
    wrong1: 'It automatically converts into a 10-year Professional License',
    wrong2: 'The holder is permanently banned from driving',
    exp: 'LTO rules allow renewal of an expired Student Permit within the prescribed period so the applicant can proceed to PDC and licensing.',
  },
  {
    q: 'What is the primary goal of Defensive Driving taught in the LTO Theoretical Driving Course?',
    correct: 'To anticipate potential hazards and human errors early so you can prevent crashes regardless of road conditions or others’ mistakes',
    wrong1: 'To drive as fast as possible so you spend less time on the road',
    wrong2: 'To insist on your right-of-way even if it causes a collision',
    exp: 'Defensive driving prioritizes crash prevention through foresight, space management, and courtesy over aggressive right-of-way enforcement.',
  },
  {
    q: 'What is the proper hand position on a modern steering wheel equipped with a driver’s frontal airbag?',
    correct: '9 o’clock and 3 o’clock (or 8 o’clock and 4 o’clock) with thumbs resting safely along the rim',
    wrong1: 'Both hands crossed at 12 o’clock directly over the airbag cover',
    wrong2: 'One finger on the bottom spoke while holding a phone',
    exp: 'Holding the wheel at 9 and 3 gives maximum steering control and keeps your arms clear of the deploying airbag module.',
  },
  {
    q: 'In what sequence should a new driver adjust their cabin setup upon entering the driver’s seat?',
    correct: 'Adjust seat position and pedal reach first, then adjust rear-view and side mirrors, then fasten the seatbelt before starting the engine',
    wrong1: 'Start driving at 60 km/h first, then adjust the seat and mirrors while moving',
    wrong2: 'Adjust mirrors before moving the seat forward or back',
    exp: 'Seat position changes your eye angle, so always adjust your seat and posture first, then align your mirrors, then buckle up.',
  },
  {
    q: 'When starting a vehicle with a Manual Transmission (MT), what must you do before turning the ignition key?',
    correct: 'Ensure the gear lever is in Neutral, press the clutch pedal fully to the floor, and keep the parking brake engaged',
    wrong1: 'Put the car in 1st gear without pressing the clutch and floor the gas',
    wrong2: 'Release all pedals and turn the key while in Reverse',
    exp: 'Depressing the clutch and verifying Neutral prevents the vehicle from lurching forward unexpectedly when the starter engages.',
  },
];

export function getTdcQuestions(): ReviewerQuestion[] {
  const pool: RawQ[] = [...TDC_RAW_BASE];

  // Add all 40 English questions from QUESTIONS
  QUESTIONS.forEach((item) => {
    const correctChoice = item.choices.find((c) => c.id === item.correctAnswerId) || item.choices[0];
    const wrongs = item.choices.filter((c) => c.id !== item.correctAnswerId);
    pool.push({
      q: item.question.en,
      correct: correctChoice.text.en,
      wrong1: wrongs[0]?.text.en || 'Proceed without yielding',
      wrong2: wrongs[1]?.text.en || 'Disregard road signs',
      exp: item.explanation.en,
      img: item.imageResource,
    });
  });

  // Add Road Sign fundamentals for TDC students
  ROAD_SIGNS.forEach((sign) => {
    pool.push({
      q: `[TDC Road Sign Module] What is the meaning and required action for "${sign.name.en}"?`,
      correct: `${sign.meaning.en} — ${sign.requiredAction.en}`,
      wrong1: 'Increase speed and overtake immediately',
      wrong2: 'Stop on the crosswalk and sound your horn',
      exp: `${sign.explanation.en} (${sign.sourceReference})`,
      img: sign.imageResource,
    });
  });

  // Add remaining from English base to reach 80
  pool.push(...ENGLISH_RAW_BASE);

  return pool.slice(0, 80).map((raw, idx) => buildQuestion('tdc', idx + 1, raw));
}
