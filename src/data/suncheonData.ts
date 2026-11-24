export type AttractionCategory = '전체' | '생태 · 정원' | '역사 · 사찰' | '문화 · 해안';

export interface Attraction {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<AttractionCategory, '전체'>;
  summary: string;
  editorialDescription: string;
  address: string;
  hours: string;
  admission: string;
  transitFromStation: string;
  recommendedDurationMinutes: number;
  bestTime: string;
  highlights: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface SeasonGuide {
  id: 'spring' | 'summer' | 'autumn' | 'winter';
  label: string;
  months: string;
  title: string;
  description: string;
  keyEvent: string;
  localTip: string;
  recommendedSpotIds: string[];
}

export interface CourseStop {
  time: string;
  day: 1 | 2;
  spotId: string;
  title: string;
  activity: string;
  transitNote: string;
  durationMinutes: number;
}

export interface CuratedCourse {
  id: string;
  title: string;
  durationLabel: string;
  audience: string;
  summary: string;
  stops: CourseStop[];
}

export interface CulinaryItem {
  id: string;
  name: string;
  area: string;
  season: string;
  description: string;
  tastingNote: string;
}

export const IMAGES = {
  heroBay: '/src/assets/images/hero_suncheon_bay_1795483561279.jpg',
  nationalGarden: '/src/assets/images/spot_national_garden_1795483561700.jpg',
  naganEupseong: '/src/assets/images/spot_nagan_eupseong_1795483562646.jpg',
  seonamsa: '/src/assets/images/spot_seonamsa_temple_1795483563041.jpg',
  foodTable: '/src/assets/images/food_suncheon_table_1795483563931.jpg',
};

export const KEY_FACTS = [
  {
    value: '580만 ㎡',
    label: '순천만 갯벌 · 갈대군락',
    detail: '람사르 협약 등록 연안습지',
  },
  {
    value: '112만 ㎡',
    label: '순천만국가정원',
    detail: '대한민국 제1호 국가정원',
  },
  {
    value: '600여 년',
    label: '낙안읍성 민속마을',
    detail: '주민이 실거주하는 조선 읍성',
  },
  {
    value: '2018년',
    label: '조계산 선암사 등재',
    detail: '유네스코 세계문화유산 산사',
  },
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'suncheon-bay',
    name: '순천만습지',
    subtitle: 'Suncheon Bay Wetland Reserve',
    category: '생태 · 정원',
    summary: '끝없이 펼쳐진 5.4㎢ 갈대밭과 S자 물길이 빚어내는 세계 5대 연안습지의 압도적인 일몰.',
    editorialDescription:
      '순천만습지는 강과 바다가 만나 빚어낸 광활한 갯벌 위에 거대한 갈대 군락이 자생하는 살아 있는 생태 보고입니다. 1.2km 구간의 나무 데크 탐방로를 따라 걸으며 칠면초와 짱뚱어, 농게를 가까이에서 관찰하고, 용산전망대에 오르면 남해안 최고의 S자 수로 낙조를 한눈에 담을 수 있습니다.',
    address: '전라남도 순천시 순천만길 513-25',
    hours: '08:00 – 일몰 시 (매표 마감 17:00~18:00 계절별 상이)',
    admission: '성인 10,000원 · 청소년 7,000원 (국가정원 통합권 기준)',
    transitFromStation: '순천역에서 66번·67번 시내버스 약 30분 / 스카이큐브 연계',
    recommendedDurationMinutes: 150,
    bestTime: '일몰 1시간 30분 전 (용산전망대 도보 왕복 약 50분 포함)',
    highlights: [
      '용산전망대 S자 수로 황금빛 낙조 조망',
      '무진교와 1.2km 갈대밭 생태 탐방로',
      '겨울철 천연기념물 흑두루미 월동지',
    ],
    image: IMAGES.heroBay,
    imageAlt: '해 질 녘 황금빛 갈대밭과 S자 수로가 어우러진 순천만습지 전경',
    featured: true,
  },
  {
    id: 'national-garden',
    name: '순천만국가정원',
    subtitle: 'Suncheonman National Garden',
    category: '생태 · 정원',
    summary: '대한민국 제1호 국가정원. 호수정원과 세계 정원, 스카이큐브로 이어지는 도심 속 거대 녹지.',
    editorialDescription:
      '도심과 순천만습지를 잇는 생태 완충 지대로 조성된 대한민국 최초의 국가정원입니다. 세계적 정원 디자이너 찰스 젱스가 순천의 지형을 본떠 설계한 봉화언덕과 호수정원을 중심으로, 11개국 전통 정원과 계절별 화훼 단지가 사계절 내내 다채로운 풍경을 선사합니다.',
    address: '전라남도 순천시 국가정원1호길 47',
    hours: '09:00 – 20:00 (동절기 18:00까지, 매월 마지막 주 월요일 휴무 확인)',
    admission: '성인 10,000원 (순천만습지 무료 연계 관람 가능)',
    transitFromStation: '순천역에서 66번 버스 약 15분, 택시 약 10분',
    recommendedDurationMinutes: 180,
    bestTime: '오전 09:30 – 12:30 (빛이 맑고 관람객이 여유로운 시간대)',
    highlights: [
      '순천호수정원 봉화언덕 및 꿈의다리 산책',
      '무인 궤도열차 스카이큐브(정원역–문학관역) 탑승',
      '어린이동물원 및 시크릿어드벤처 실내 전시관',
    ],
    image: IMAGES.nationalGarden,
    imageAlt: '부드러운 곡선의 봉화언덕과 호수가 어우러진 순천만국가정원 아침 풍경',
  },
  {
    id: 'nagan-eupseong',
    name: '낙안읍성 민속마을',
    subtitle: 'Naganeupseong Folk Village',
    category: '역사 · 사찰',
    summary: '석성(石城) 안에 실제 주민이 살아 숨 쉬는 조선시대 계획도시, 고즈넉한 초가 골목과 성곽길.',
    editorialDescription:
      '임경업 장군이 중수한 1,410m 길이의 튼튼한 성곽 안에 90여 채의 초가와 관아, 객사가 온전히 보존되어 있습니다. 박제된 전시 마을이 아니라 현재도 수십 가구의 주민이 장독대를 가꾸며 살아가는 생활 문화 공간으로, 동문에서 서문으로 이어지는 성곽 위를 걸으면 마을 전체의 지붕선이 파노라마처럼 펼쳐집니다.',
    address: '전라남도 순천시 낙안면 충민길 30',
    hours: '09:00 – 18:00 (동절기 17:30까지)',
    admission: '성인 4,000원 · 청소년 2,500원 · 어린이 1,500원',
    transitFromStation: '순천역에서 61번·63번·68번 버스 약 50분',
    recommendedDurationMinutes: 120,
    bestTime: '오후 15:00 – 17:00 (부드러운 서쪽 햇살이 초가에 내려앉는 시간)',
    highlights: [
      '전망대(남내리 성곽)에서 내려다보는 초가 군락',
      '동헌·내아 등 조선시대 지방 관아 건축 탐방',
      '전통 길쌈·가야금 병창 등 주말 민속 체험',
    ],
    image: IMAGES.naganEupseong,
    imageAlt: '조선시대 석성 안으로 고즈넉하게 자리 잡은 낙안읍성 초가집 마을',
  },
  {
    id: 'seonamsa',
    name: '조계산 선암사',
    subtitle: 'Seonamsa Temple, UNESCO World Heritage',
    category: '역사 · 사찰',
    summary: '보물 승선교 무지개다리와 600년 선암매, 고요한 계곡 소리가 감싸는 천년 고찰.',
    editorialDescription:
      '2018년 유네스코 세계문화유산으로 등재된 한국의 산지승원 중 한 곳입니다. 일주문으로 향하는 깊은 편백나무·삼나무 숲길과 계곡 위에 걸린 반원형 돌다리 승선교는 선암사의 상징입니다. 번잡한 장식 대신 소박하고 단정한 가람 배치가 돋보이며, 봄철 천연기념물 선암매와 가을철 붉은 단풍이 장관을 이룹니다.',
    address: '전라남도 순천시 승주읍 선암사길 450',
    hours: '06:00 – 19:00 (계절별 변동)',
    admission: '무료 (문화유산 관람료 감면 시행, 주차료 별도)',
    transitFromStation: '순천역에서 1번 시내버스 약 55분',
    recommendedDurationMinutes: 120,
    bestTime: '오전 08:30 – 11:00 (계곡 물안개와 산사 고요함을 온전히 느끼는 시간)',
    highlights: [
      '보물 승선교와 강선루 계곡 반영 감상',
      '한국에서 가장 아름다운 전통 해우소 및 대웅전',
      '천연기념물 선암매(3월 하순) 및 조계산 굴목재 트레킹',
    ],
    image: IMAGES.seonamsa,
    imageAlt: '맑은 숲 계곡 위로 아치형 돌다리가 반영을 이루는 조계산 선암사 승선교',
  },
  {
    id: 'waon-beach',
    name: '와온해변 & 솔섬',
    subtitle: 'Waon Beach Sunset Point',
    category: '문화 · 해안',
    summary: '썰물 때 갯벌 위로 S자 물길이 열리고 솔섬 너머로 붉은 해가 잠기는 드라이브 일몰 명소.',
    editorialDescription:
      '순천만 동쪽 끝에 자리한 와온마을 해변은 관광객으로 붐비는 전망대와 달리 바다 바로 앞에서 고요하게 낙조를 마주할 수 있는 곳입니다. 해 질 무렵 갯벌에 남은 물고랑이 붉은 노을을 반사하며 황금빛 띠를 만들어 내며, 해안 데크길을 따라 소박한 어촌의 저녁 풍경을 산책하기 좋습니다.',
    address: '전라남도 순천시 해룡면 와온길 133',
    hours: '연중 상시 개방',
    admission: '무료',
    transitFromStation: '순천역에서 95번 버스 약 40분 또는 차량 25분',
    recommendedDurationMinutes: 70,
    bestTime: '간조 시간대와 겹치는 일몰 전후 40분',
    highlights: [
      '솔섬 너머로 떨어지는 남해안 대표 해넘이',
      '바닷바람을 맞으며 걷는 해안 목재 데크 산책로',
      '어촌 마을 카페에서 즐기는 여유로운 일몰 감상',
    ],
  },
  {
    id: 'drama-set',
    name: '순천 드라마촬영장',
    subtitle: 'Suncheon Open Film Set',
    category: '문화 · 해안',
    summary: '1960년대 순천 읍내와 1980년대 서울 달동네 거리를 실제 크기로 재현한 레트로 야외 세트장.',
    editorialDescription:
      '과거 군부대 부지였던 언덕을 활용해 1950~80년대 한국의 근현대 골목 풍경을 생생하게 복원한 공간입니다. 순천 읍내 거리, 서울 봉천동 달동네, 변두리 극장가 등이 이어져 있어 세대를 넘어 함께 걸으며 옛 사진관과 고고장 소품을 배경으로 기록을 남기기에 좋습니다.',
    address: '전라남도 순천시 비례골길 24',
    hours: '09:00 – 18:00 (입장 마감 17:00)',
    admission: '성인 3,000원 · 청소년 2,000원 · 어린이 1,000원',
    transitFromStation: '순천역에서 77번·777번 버스 약 20분',
    recommendedDurationMinutes: 90,
    bestTime: '오후 13:30 – 15:30',
    highlights: [
      '달동네 언덕 전망대에서 내려다보는 세트장 전경',
      '옛 교복 대여 및 근현대 생활사 전시관',
      '가족 단위 여행객에게 호응 높은 골목 포토 스폿',
    ],
  },
  {
    id: 'songgwangsa',
    name: '조계산 송광사',
    subtitle: 'Songgwangsa Temple',
    category: '역사 · 사찰',
    summary: '한국 불교 승보종찰(僧寶宗刹). 16명의 국사를 배출한 깊은 산사의 기품과 계곡 숲길.',
    editorialDescription:
      '조계산 서쪽 자락에 자리한 송광사는 삼보사찰 중 하나로 꼽히는 한국 불교의 중심 도량입니다. 경내로 들어서는 길목의 우화각과 침계루는 맑은 물 위에 떠 있는 듯한 건축미를 보여 주며, 국보 목조삼존불감을 비롯한 수많은 성보 문화재를 간직하고 있습니다.',
    address: '전라남도 순천시 송광면 송광사안길 100',
    hours: '06:00 – 19:00 (동절기 18:00까지)',
    admission: '무료 (주차료 별도)',
    transitFromStation: '순천역에서 111번 버스 약 65분',
    recommendedDurationMinutes: 110,
    bestTime: '오전 09:00 – 11:30',
    highlights: [
      '계곡 위에 지어진 우화각과 능허교 정취',
      '무소유 법정 스님의 발자취가 남은 불일암 산책길',
      '조계산 천자암 쌍향수(천연기념물) 연계 산행',
    ],
  },
  {
    id: 'downtown-market',
    name: '청춘창고 & 아랫장',
    subtitle: 'Cheongchun Changgo & Araetjang Market',
    category: '문화 · 해안',
    summary: '오래된 양곡 창고를 개조한 청년 문화 공간과 남도의 인심이 살아 있는 순천 최대 전통시장.',
    editorialDescription:
      '순천역에서 도보로 이동할 수 있는 원도심 권역은 여행의 시작과 마무리에 제격입니다. 1961년 지어진 농협 양곡창고가 청년 공방과 다이닝 공간인 청춘창고로 탈바꿈했고, 매월 2·7일 열리는 아랫장 오일장과 금·토요일 저녁 야시장은 순천의 활기찬 밤을 채워 줍니다.',
    address: '전라남도 순천시 역전길 34 (청춘창고) / 장평로 60 (아랫장)',
    hours: '청춘창고 11:00 – 21:00 / 아랫장 야시장 금·토 18:00 – 23:00',
    admission: '무료',
    transitFromStation: '순천역 도보 5~10분',
    recommendedDurationMinutes: 90,
    bestTime: '저녁 17:30 – 20:30 (열차 탑승 전 식사 및 기념품 구매)',
    highlights: [
      '순천역 도보권으로 기차 여행자 접근성 최상',
      '아랫장 야시장의 남도 먹거리와 로컬 수공예품',
      '인근 문화의 거리 갤러리 및 독립서점 산책',
    ],
  },
];

export const SEASONAL_GUIDES: SeasonGuide[] = [
  {
    id: 'spring',
    label: '봄 · 3월–5월',
    months: '3월 하순 – 5월',
    title: '600년 선암매와 백만 송이 정원 꽃길',
    description:
      '매실이 익는 향기가 조계산 계곡을 채우는 3월 말 선암사의 홍매·백매(선암매)를 시작으로, 순천만국가정원은 튤립과 유채, 철쭉으로 화사한 색을 입습니다. 동천 벚꽃길과 함께 온화한 봄바람을 맞으며 걷기 가장 좋은 계절입니다.',
    keyEvent: '선암사 선암매 개화 (3월 말) · 국가정원 봄꽃 향연 (4월)',
    localTip: '일교차가 크므로 오전 정원 산책 시 얇은 겉옷을 챙기세요.',
    recommendedSpotIds: ['seonamsa', 'national-garden', 'nagan-eupseong'],
  },
  {
    id: 'summer',
    label: '여름 · 6월–8월',
    months: '6월 – 8월',
    title: '짙푸른 갈대의 물결과 산사 계곡의 그늘',
    description:
      '한여름 순천만의 갈대밭은 황금빛과 전혀 다른 짙은 에메랄드빛 생명력으로 일렁입니다. 낮에는 울창한 편백 숲과 계곡을 품은 선암사·송광사에서 더위를 식히고, 해 질 녘 야간 개장을 연 국가정원과 와온해변의 바람을 즐겨 보세요.',
    keyEvent: '국가정원 여름 야간 정원 산책 · 순천만 푸른 갈대 물결',
    localTip: '습지 탐방은 오전 이른 시간이나 17시 이후가 가장 쾌적합니다.',
    recommendedSpotIds: ['seonamsa', 'songgwangsa', 'waon-beach'],
  },
  {
    id: 'autumn',
    label: '가을 · 9월–11월',
    months: '10월 – 11월',
    title: '황금빛 갈대축제와 단풍이 물든 돌담길',
    description:
      '순천 여행의 백미로 꼽히는 계절입니다. 키를 훌쩍 넘긴 갈대 이삭이 은빛에서 황금빛으로 일렁이며 순천만갈대축제가 열리고, 낙안읍성의 감나무와 선암사·송광사의 단풍이 깊은 가을의 정취를 완성합니다.',
    keyEvent: '순천만 갈대축제 (10월 말~11월 초) · 낙안읍성 민속문화축제',
    localTip: '주말 일몰 시간대 순천만 진입로는 혼잡하므로 스카이큐브 이용을 권장합니다.',
    recommendedSpotIds: ['suncheon-bay', 'national-garden', 'nagan-eupseong'],
  },
  {
    id: 'winter',
    label: '겨울 · 12월–2월',
    months: '12월 – 2월',
    title: '흑두루미의 날갯짓과 제철 꼬막 한 상',
    description:
      '찬 바람이 불면 시베리아에서 날아온 수천 마리의 천연기념물 흑두루미가 순천만 갯벌을 찾아옵니다. 탐조대에서 경이로운 군무를 바라본 뒤, 쫄깃하게 살이 오른 제철 순천만 꼬막정식과 따끈한 웃장 국밥으로 몸을 녹이는 겨울 여행을 권합니다.',
    keyEvent: '순천만 흑두루미 월동 탐조 (11월~3월) · 제철 꼬막 미식 시즌',
    localTip: '이른 아침 탐조 시 방풍 재킷과 쌍안경(탐조관 대여 가능)이 유용합니다.',
    recommendedSpotIds: ['suncheon-bay', 'downtown-market', 'nagan-eupseong'],
  },
];

export const CURATED_COURSES: CuratedCourse[] = [
  {
    id: 'day-core',
    title: '당일치기 핵심 생태 코스',
    durationLabel: '약 8시간 · 도보 & 스카이큐브',
    audience: '순천을 처음 찾는 KTX 기차 여행자',
    summary:
      '순천역에서 출발해 국가정원과 스카이큐브, 순천만습지 일몰을 하루에 가장 매끄럽게 연결한 동선입니다.',
    stops: [
      {
        time: '09:30',
        day: 1,
        spotId: 'national-garden',
        title: '순천만국가정원 동문 입장',
        activity: '호수정원 봉화언덕 산책 및 세계 정원 관람',
        transitNote: '순천역에서 66번 버스 15분',
        durationMinutes: 150,
      },
      {
        time: '12:15',
        day: 1,
        spotId: 'national-garden',
        title: '스카이큐브 정원역 출발 · 점심 식사',
        activity: '친환경 무인궤도열차 탑승 후 순천만 인근 꼬막정식 식사',
        transitNote: '스카이큐브 약 10분 소요',
        durationMinutes: 90,
      },
      {
        time: '14:30',
        day: 1,
        spotId: 'suncheon-bay',
        title: '순천만습지 갈대밭 & 용산전망대',
        activity: '무진교 갈대 데크 탐방 및 용산전망대 일몰 감상',
        transitNote: '문학관역에서 갈대열차/도보 연계',
        durationMinutes: 180,
      },
      {
        time: '18:10',
        day: 1,
        spotId: 'downtown-market',
        title: '청춘창고 & 아랫장 저녁',
        activity: '원도심 로컬 다이닝 및 특산품 구매 후 귀가',
        transitNote: '순천만에서 버스 30분',
        durationMinutes: 90,
      },
    ],
  },
  {
    id: 'two-days',
    title: '1박 2일 생태 · 역사 완주 코스',
    durationLabel: '1박 2일 · 자차 또는 시티투어 권장',
    audience: '자연 생태와 천년 문화유산을 깊이 보고 싶은 여행자',
    summary:
      '첫날 순천만과 정원의 생태계를, 둘째 날 선암사와 낙안읍성의 시간을 온전히 경험하는 대표 1박 2일 일정입니다.',
    stops: [
      {
        time: '10:00',
        day: 1,
        spotId: 'national-garden',
        title: '순천만국가정원 관람',
        activity: '한국정원·유럽정원 및 실내 전시관 여유롭게 투어',
        transitNote: '순천역 출발 약 10분',
        durationMinutes: 160,
      },
      {
        time: '14:30',
        day: 1,
        spotId: 'suncheon-bay',
        title: '순천만습지 & 용산전망대 낙조',
        activity: '생태체험선 또는 도보 탐방 후 S자 수로 일몰 감상',
        transitNote: '국가정원에서 스카이큐브 연계',
        durationMinutes: 180,
      },
      {
        time: '09:00',
        day: 2,
        spotId: 'seonamsa',
        title: '조계산 선암사 아침 산책',
        activity: '승선교 돌다리 반영과 산사 고요함 체험',
        transitNote: '시내 출발 약 35분',
        durationMinutes: 120,
      },
      {
        time: '13:00',
        day: 2,
        spotId: 'nagan-eupseong',
        title: '낙안읍성 민속마을 & 성곽길',
        activity: '초가 골목 산책과 읍성 성곽 파노라마 조망',
        transitNote: '선암사에서 차량 25분',
        durationMinutes: 130,
      },
      {
        time: '16:30',
        day: 2,
        spotId: 'waon-beach',
        title: '와온해변 일몰 드라이브',
        activity: '솔섬 해넘이로 순천 여정 마무리',
        transitNote: '낙안읍성에서 차량 35분',
        durationMinutes: 70,
      },
    ],
  },
  {
    id: 'slow-family',
    title: '가족 · 효도 느린 휴식 코스',
    durationLabel: '1일 · 평지 위주 무리 없는 동선',
    audience: '부모님·아이와 함께하는 편안한 힐링 여행',
    summary:
      '가파른 산행 없이 평지 데크길과 옛 골목, 정겨운 남도 한 상을 여유 있게 즐길 수 있도록 구성했습니다.',
    stops: [
      {
        time: '10:00',
        day: 1,
        spotId: 'drama-set',
        title: '순천 드라마촬영장 추억 산책',
        activity: '부모님 세대 추억의 골목과 가족 사진 촬영',
        transitNote: '순천역에서 15분',
        durationMinutes: 90,
      },
      {
        time: '12:00',
        day: 1,
        spotId: 'downtown-market',
        title: '웃장 국밥 또는 남도 한정식 점심',
        activity: '돼지머리 수육을 곁들인 순천 식도락 체험',
        transitNote: '시내 이동 10분',
        durationMinutes: 80,
      },
      {
        time: '14:00',
        day: 1,
        spotId: 'national-garden',
        title: '국가정원 관람차 투어',
        activity: '도보 부담을 줄여주는 정원 관람차로 주요 테마정원 감상',
        transitNote: '시내 이동 15분',
        durationMinutes: 150,
      },
      {
        time: '17:00',
        day: 1,
        spotId: 'waon-beach',
        title: '와온해변 해안 데크 노을 감상',
        activity: '완만한 바닷가 산책길에서 잔잔한 갯벌 노을 보기',
        transitNote: '국가정원에서 20분',
        durationMinutes: 60,
      },
    ],
  },
];

export const CULINARY_SPECIALTIES: CulinaryItem[] = [
  {
    id: 'kkomak',
    name: '순천만 꼬막정식',
    area: '순천만습지 입구 · 별량면 · 조례동 일대',
    season: '11월 – 3월 (사계절 가능)',
    description:
      '청정 순천만 갯벌에서 자란 참꼬막과 새꼬막을 삶고 무치고 전으로 부쳐 내는 대표 한 상입니다. 탱글탱글한 꼬막무침을 따끈한 밥에 김가루와 참기름을 더해 비벼 먹는 꼬막비빔밥이 일품입니다.',
    tastingNote: '양념 꼬막, 통꼬막 데침, 꼬막전, 된장국이 한 번에 차려지는 정식을 추천합니다.',
  },
  {
    id: 'jjangttungeo',
    name: '순천만 짱뚱어탕',
    area: '순천만로 · 대대동 일대',
    season: '5월 – 11월',
    description:
      '깨끗한 1급수 갯벌에서만 서식하는 짱뚱어를 푹 고아 우거지, 된장, 들깨가루를 넣고 끓여낸 남도 전통 보양식입니다. 생선 비린내가 전혀 없고 구수하고 걸쭉한 국물 맛이 깊습니다.',
    tastingNote: '취향에 따라 산초가루와 다진 마늘을 살짝 곁들이면 풍미가 한층 살아납니다.',
  },
  {
    id: 'sanchae',
    name: '조계산 산채보리밥 · 더덕구이',
    area: '선암사 · 송광사 입구 상가',
    season: '사계절 (봄철 산나물 특히 우수)',
    description:
      '조계산 자락에서 채취한 취나물, 고사리, 도라지 등 열 가지가 넘는 제철 나물을 정갈하게 무쳐 보리밥과 함께 내는 산사 앞 별미입니다. 숯불 향을 입힌 매콤한 더덕구이를 곁들이면 든든한 산행 식사가 됩니다.',
    tastingNote: '선암사 트레킹을 마친 뒤 계곡 앞 식당가에서 도토리묵·파전과 함께 즐기기에 좋습니다.',
  },
  {
    id: 'utjang-gukbap',
    name: '순천 웃장 국밥',
    area: '순천 웃장 국밥거리 (매곡동)',
    season: '사계절 · 아침/점심',
    description:
      '다른 지역과 달리 순천 웃장 국밥은 돼지 내장을 쓰지 않고 살코기만을 고아 맑고 깔끔한 국물을 내는 것이 특징입니다. 국밥을 주문하면 두 명당 한 접시씩 푸짐한 돼지수육과 부추무침이 곁들여 나옵니다.',
    tastingNote: '이른 아침 일정 시작 전 든든하게 채우거나 아랫장·웃장 오일장날 방문해 보세요.',
  },
];
