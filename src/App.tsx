import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Plus,
  Check,
  Calendar,
  Clock,
  Train,
  Bus,
  ChevronRight,
} from 'lucide-react';
import {
  ATTRACTIONS,
  SEASONAL_GUIDES,
  CURATED_COURSES,
  CULINARY_SPECIALTIES,
  KEY_FACTS,
  IMAGES,
  AttractionCategory,
  Attraction,
} from './data/suncheonData';
import { SafeImage } from './components/SafeImage';
import { SpotDetailModal } from './components/SpotDetailModal';
import { ItineraryDrawer, SavedStop } from './components/ItineraryDrawer';
import { TravelGuideForm } from './components/TravelGuideForm';

const STORAGE_KEY = 'suncheon_yeojeong_itinerary_v1';

const CATEGORIES: AttractionCategory[] = [
  '전체',
  '생태 · 정원',
  '역사 · 사찰',
  '문화 · 해안',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory>('전체');
  const [selectedSeasonId, setSelectedSeasonId] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('autumn');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(CURATED_COURSES[0].id);
  const [activeSpotId, setActiveSpotId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [courseAppliedNotice, setCourseAppliedNotice] = useState<string | null>(null);

  const [savedStops, setSavedStops] = useState<SavedStop[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback to default starter stops
    }
    return [
      { spotId: 'national-garden', day: 1 },
      { spotId: 'suncheon-bay', day: 1 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStops));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedStops]);

  const savedSpotIds = new Set(savedStops.map((s) => s.spotId));

  const toggleItinerarySpot = (spotId: string) => {
    setSavedStops((prev) => {
      if (prev.some((s) => s.spotId === spotId)) {
        return prev.filter((s) => s.spotId !== spotId);
      }
      return [...prev, { spotId, day: 1 }];
    });
  };

  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    setSavedStops((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleToggleDay = (index: number) => {
    setSavedStops((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, day: item.day === 1 ? 2 : 1 } : item
      )
    );
  };

  const handleRemoveStop = (spotId: string) => {
    setSavedStops((prev) => prev.filter((s) => s.spotId !== spotId));
  };

  const handleClearAll = () => {
    setSavedStops([]);
  };

  const applyCourseToItinerary = (courseId: string) => {
    const course = CURATED_COURSES.find((c) => c.id === courseId);
    if (!course) return;
    const uniqueStops: SavedStop[] = [];
    const seen = new Set<string>();
    for (const stop of course.stops) {
      if (!seen.has(stop.spotId)) {
        seen.add(stop.spotId);
        uniqueStops.push({ spotId: stop.spotId, day: stop.day });
      }
    }
    setSavedStops(uniqueStops);
    setCourseAppliedNotice(`'${course.title}' 명소들이 내 일정에 담겼습니다.`);
    setTimeout(() => setCourseAppliedNotice(null), 3500);
    setIsDrawerOpen(true);
  };

  const applySeasonSpotsToItinerary = (spotIds: string[], seasonLabel: string) => {
    setSavedStops((prev) => {
      const existing = new Set(prev.map((s) => s.spotId));
      const additions: SavedStop[] = spotIds
        .filter((id) => !existing.has(id))
        .map((id) => ({ spotId: id, day: 1 }));
      return [...prev, ...additions];
    });
    setCourseAppliedNotice(`${seasonLabel} 추천 명소가 내 일정에 추가되었습니다.`);
    setTimeout(() => setCourseAppliedNotice(null), 3500);
    setIsDrawerOpen(true);
  };

  const filteredAttractions =
    selectedCategory === '전체'
      ? ATTRACTIONS
      : ATTRACTIONS.filter((item) => item.category === selectedCategory);

  const visualSpots = filteredAttractions.filter((item) => Boolean(item.image));
  const directorySpots = filteredAttractions.filter((item) => !item.image);

  const activeSeason =
    SEASONAL_GUIDES.find((s) => s.id === selectedSeasonId) || SEASONAL_GUIDES[2];
  const activeCourse =
    CURATED_COURSES.find((c) => c.id === selectedCourseId) || CURATED_COURSES[0];
  const activeSpot: Attraction | null =
    ATTRACTIONS.find((a) => a.id === activeSpotId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F5] text-[#14211D]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-[#E2E6DF]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-serif text-xl font-bold tracking-tight text-[#14211D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#164E3B]"
          >
            순천여정
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="주요 메뉴"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44524D]"
          >
            <a
              href="#attractions"
              className="hover:text-[#14211D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              명소 안내
            </a>
            <a
              href="#seasons"
              className="hover:text-[#14211D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              계절별 매력
            </a>
            <a
              href="#courses"
              className="hover:text-[#14211D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              추천 코스
            </a>
            <a
              href="#culinary"
              className="hover:text-[#14211D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              미식 · 특산
            </a>
            <a
              href="#guide"
              className="hover:text-[#14211D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              여행 안내
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164E3B]"
            >
              <Calendar className="w-4 h-4" />
              <span className="tabular-nums">내 일정 ({savedStops.length})</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div className="space-y-6">
                <p className="text-xs font-medium tracking-wide text-[#164E3B]">
                  대한민국 생태수도 · 전라남도 순천시
                </p>
                <h1 className="font-serif text-[clamp(2.25rem,3.6vw,3.35rem)] font-semibold leading-[1.2] tracking-tight text-[#14211D] max-w-xl">
                  갈대와 갯벌, 천년의 시간이 고요히 숨 쉬는 도시
                </h1>
                <p className="text-[15px] md:text-base leading-[1.75] text-[#44524D] max-w-lg">
                  유네스코 세계자연유산의 갯벌과 끝없는 갈대밭, 대한민국 제1호 국가정원, 그리고 조선의 시간이 멈춘 낙안읍성과 조계산 산사까지. 자연과 삶이 조화를 이루는 순천의 사계절을 안내합니다.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E6DF] flex flex-wrap items-center gap-4">
                <a
                  href="#attractions"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164E3B]"
                >
                  <span>대표 명소 둘러보기</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#courses"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#14211D] hover:text-[#164E3B] transition-colors whitespace-nowrap"
                >
                  <span>추천 여행 코스 보기</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Dominant 16:9 Visual Carrier */}
            <div className="lg:col-span-7">
              <figure className="relative h-full min-h-[300px] lg:min-h-[460px] overflow-hidden rounded-xl border border-[#DCE2DA] bg-[#E5EAE4]">
                <SafeImage
                  src={IMAGES.heroBay}
                  alt="황금빛 노을이 내려앉은 순천만습지 S자 수로와 갈대밭 전경"
                  fallbackTitle="순천만습지 S자 수로 일몰"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 md:p-8">
                  <figcaption className="text-white/95">
                    <span className="block text-xs text-white/75 mb-1">
                      순천만습지 · 용산전망대 조망
                    </span>
                    <span className="font-serif text-lg md:text-xl font-medium">
                      해 질 녘 갯벌을 적시는 S자 물길과 5.4㎢ 갈대 군락
                    </span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>

          {/* Full-width 4-Column Key Facts Operational Strip */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-[#DCE2DA] bg-white rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-[#E7ECE6]">
            {KEY_FACTS.map((fact) => (
              <div key={fact.label} className="p-5 md:p-6">
                <div className="font-serif text-2xl md:text-3xl font-semibold text-[#164E3B] tabular-nums">
                  {fact.value}
                </div>
                <div className="mt-1.5 text-sm font-medium text-[#14211D]">
                  {fact.label}
                </div>
                <div className="mt-0.5 text-xs text-[#5E6B66]">{fact.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Attractions Explorer */}
        <section
          id="attractions"
          className="border-t border-[#E2E6DF] bg-white py-16 md:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7ECE6]">
              <div>
                <p className="text-xs font-medium text-[#164E3B] mb-2">01. 대표 관광 명소</p>
                <h2 className="font-serif text-2xl md:text-4xl font-semibold text-[#14211D] tracking-tight">
                  순천에서 꼭 걸어야 할 여덟 곳
                </h2>
              </div>

              {/* Interactive Category Filter Segmented Control */}
              <div
                role="tablist"
                aria-label="명소 분류 필터"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F1F4F0] border border-[#E2E6DF] rounded-lg self-start md:self-auto"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#164E3B] ${
                        isActive
                          ? 'bg-white text-[#14211D] shadow-sm'
                          : 'text-[#55625D] hover:text-[#14211D]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Marquee Grid (Asymmetric when showing all) */}
            {visualSpots.length > 0 && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {visualSpots.map((spot, idx) => {
                  const isSaved = savedSpotIds.has(spot.id);
                  const isLead = selectedCategory === '전체' && idx === 0;
                  return (
                    <article
                      key={spot.id}
                      className={`group flex flex-col border border-[#DCE2DA] rounded-xl overflow-hidden bg-[#F7F8F5] ${
                        isLead ? 'md:col-span-2 lg:grid lg:grid-cols-12' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveSpotId(spot.id)}
                        className={`block text-left overflow-hidden bg-[#E5EAE4] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#164E3B] ${
                          isLead
                            ? 'lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:h-full'
                            : 'aspect-[4/3]'
                        }`}
                      >
                        <SafeImage
                          src={spot.image}
                          alt={spot.imageAlt || spot.name}
                          fallbackTitle={spot.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </button>

                      <div
                        className={`p-6 md:p-8 flex flex-col justify-between ${
                          isLead ? 'lg:col-span-5' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#55625D] mb-2">
                            <span>{spot.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">
                              권장 {spot.recommendedDurationMinutes}분
                            </span>
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#14211D]">
                            <button
                              type="button"
                              onClick={() => setActiveSpotId(spot.id)}
                              className="text-left hover:text-[#164E3B] transition-colors focus-visible:outline-2 focus-visible:outline-[#164E3B]"
                            >
                              {spot.name}
                            </button>
                          </h3>
                          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-[#44524D]">
                            {spot.summary}
                          </p>
                          <p className="mt-4 text-xs text-[#5E6B66]">
                            추천 시간: {spot.bestTime}
                          </p>
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#E2E6DF] flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setActiveSpotId(spot.id)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14211D] hover:text-[#164E3B] transition-colors whitespace-nowrap"
                          >
                            <span>상세 안내 보기</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleItinerarySpot(spot.id)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                              isSaved
                                ? 'bg-[#E5EDE7] text-[#164E3B] border border-[#C2D4C6]'
                                : 'bg-white text-[#14211D] border border-[#CFD7CE] hover:border-[#164E3B] hover:text-[#164E3B]'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>담김</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>일정 담기</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Text-led Editorial Directory for Local Gems */}
            {directorySpots.length > 0 && (
              <div className="mt-12 pt-10 border-t border-[#E2E6DF]">
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="font-serif text-xl font-semibold text-[#14211D]">
                    함께 둘러보면 좋은 순천의 공간
                  </h3>
                  <span className="text-xs text-[#5E6B66] tabular-nums">
                    총 {directorySpots.length}곳
                  </span>
                </div>

                <div className="divide-y divide-[#E7ECE6] border-y border-[#E7ECE6]">
                  {directorySpots.map((spot) => {
                    const isSaved = savedSpotIds.has(spot.id);
                    return (
                      <div
                        key={spot.id}
                        className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#55625D]">
                            <span>{spot.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{spot.hours}</span>
                            <span aria-hidden="true">·</span>
                            <span>{spot.transitFromStation}</span>
                          </div>
                          <h4 className="font-serif text-lg font-semibold text-[#14211D]">
                            <button
                              type="button"
                              onClick={() => setActiveSpotId(spot.id)}
                              className="text-left hover:text-[#164E3B] transition-colors"
                            >
                              {spot.name}
                            </button>
                          </h4>
                          <p className="text-sm text-[#4A5853] leading-relaxed">
                            {spot.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveSpotId(spot.id)}
                            className="px-4 py-2 text-xs font-medium text-[#14211D] hover:text-[#164E3B] border border-[#DCE2DA] rounded-lg bg-[#F7F8F5] hover:bg-white transition-colors whitespace-nowrap"
                          >
                            상세 보기
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleItinerarySpot(spot.id)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                              isSaved
                                ? 'bg-[#E5EDE7] text-[#164E3B] border border-[#C2D4C6]'
                                : 'bg-[#164E3B] text-white hover:bg-[#113D2E]'
                            }`}
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>일정 담김</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>일정 담기</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Seasonal Guides */}
        <section
          id="seasons"
          className="border-t border-[#E2E6DF] bg-[#F7F8F5] py-16 md:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-medium text-[#164E3B] mb-2">02. 계절별 순천 달력</p>
                <h2 className="font-serif text-2xl md:text-4xl font-semibold text-[#14211D] tracking-tight">
                  언제 찾아도 다른 색으로 열리는 풍경
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="계절 선택"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#DCE2DA] rounded-lg self-start md:self-auto"
              >
                {SEASONAL_GUIDES.map((season) => {
                  const isActive = season.id === selectedSeasonId;
                  return (
                    <button
                      key={season.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedSeasonId(season.id)}
                      className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#164E3B] text-white'
                          : 'text-[#55625D] hover:text-[#14211D]'
                      }`}
                    >
                      {season.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-[#DCE2DA] rounded-xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs text-[#55625D] tabular-nums">
                  {activeSeason.months} · {activeSeason.keyEvent}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#14211D]">
                  {activeSeason.title}
                </h3>
                <p className="text-[15px] md:text-base leading-[1.8] text-[#3B4843]">
                  {activeSeason.description}
                </p>
                <div className="pt-4 border-t border-[#E7ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-[#4A5853]">
                    <span className="font-medium text-[#14211D]">여행 메모: </span>
                    {activeSeason.localTip}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      applySeasonSpotsToItinerary(
                        activeSeason.recommendedSpotIds,
                        activeSeason.label
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>계절 추천 명소 모두 담기</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 lg:border-l lg:border-[#E7ECE6] lg:pl-10 space-y-4">
                <h4 className="text-xs font-medium text-[#5E6B66]">
                  이 계절의 핵심 방문지
                </h4>
                <div className="divide-y divide-[#E7ECE6]">
                  {activeSeason.recommendedSpotIds.map((spotId, idx) => {
                    const spot = ATTRACTIONS.find((a) => a.id === spotId);
                    if (!spot) return null;
                    return (
                      <div key={spot.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-[#55625D] mb-1">
                              <span className="font-mono tabular-nums text-[#164E3B]">
                                0{idx + 1}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{spot.category}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveSpotId(spot.id)}
                              className="font-serif text-base font-semibold text-[#14211D] hover:text-[#164E3B] transition-colors text-left"
                            >
                              {spot.name}
                            </button>
                            <p className="mt-1 text-xs text-[#55625D] leading-relaxed">
                              {spot.bestTime}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveSpotId(spot.id)}
                            className="text-xs font-medium text-[#164E3B] hover:underline whitespace-nowrap shrink-0 mt-1"
                          >
                            자세히
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Curated Courses */}
        <section
          id="courses"
          className="border-t border-[#E2E6DF] bg-white py-16 md:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7ECE6]">
              <div>
                <p className="text-xs font-medium text-[#164E3B] mb-2">03. 추천 여행 코스</p>
                <h2 className="font-serif text-2xl md:text-4xl font-semibold text-[#14211D] tracking-tight">
                  동선 낭비 없는 검증된 순천 일정
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="추천 코스 선택"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F1F4F0] border border-[#E2E6DF] rounded-lg self-start md:self-auto"
              >
                {CURATED_COURSES.map((course) => {
                  const isActive = course.id === selectedCourseId;
                  return (
                    <button
                      key={course.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-white text-[#14211D] shadow-sm'
                          : 'text-[#55625D] hover:text-[#14211D]'
                      }`}
                    >
                      {course.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {courseAppliedNotice && (
              <div
                role="status"
                className="mt-6 px-4 py-3 text-sm font-medium text-[#164E3B] bg-[#EEF4F0] border border-[#C6D8CC] rounded-lg"
              >
                {courseAppliedNotice}
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4 space-y-5">
                <div className="text-xs text-[#55625D] tabular-nums">
                  {activeCourse.durationLabel}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#14211D]">
                  {activeCourse.title}
                </h3>
                <p className="text-sm text-[#55625D]">
                  추천 대상: {activeCourse.audience}
                </p>
                <p className="text-[15px] leading-relaxed text-[#3B4843]">
                  {activeCourse.summary}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => applyCourseToItinerary(activeCourse.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>이 코스로 내 일정 채우기</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8">
                <ol className="divide-y divide-[#E7ECE6] border-y border-[#E7ECE6]">
                  {activeCourse.stops.map((stop, idx) => (
                    <li
                      key={`${stop.time}-${idx}`}
                      className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-20 shrink-0">
                          <div className="font-mono text-base font-medium text-[#164E3B] tabular-nums">
                            {stop.time}
                          </div>
                          <div className="text-xs text-[#64716C] tabular-nums mt-0.5">
                            {stop.day}일차 · {stop.durationMinutes}분
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif text-lg font-semibold text-[#14211D]">
                            <button
                              type="button"
                              onClick={() => setActiveSpotId(stop.spotId)}
                              className="text-left hover:text-[#164E3B] transition-colors"
                            >
                              {stop.title}
                            </button>
                          </h4>
                          <p className="text-sm text-[#44524D]">{stop.activity}</p>
                          <p className="text-xs text-[#64716C]">{stop.transitNote}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveSpotId(stop.spotId)}
                        className="self-start sm:self-center text-xs font-medium text-[#164E3B] hover:underline whitespace-nowrap shrink-0"
                      >
                        장소 정보
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Culinary Heritage */}
        <section
          id="culinary"
          className="border-t border-[#E2E6DF] bg-[#F7F8F5] py-16 md:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-10">
              <p className="text-xs font-medium text-[#164E3B] mb-2">04. 순천의 미식</p>
              <h2 className="font-serif text-2xl md:text-4xl font-semibold text-[#14211D] tracking-tight">
                갯벌과 산이 차려낸 남도의 깊은 한 상
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <figure className="lg:col-span-6 flex flex-col">
                <div className="flex-1 overflow-hidden rounded-xl border border-[#DCE2DA] bg-[#E5EAE4] min-h-[280px]">
                  <SafeImage
                    src={IMAGES.foodTable}
                    alt="순천만 꼬막무침과 꼬막비빔밥, 정갈한 반찬이 차려진 순천 로컬 음식 한 상"
                    fallbackTitle="순천만 꼬막정식 한 상"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-[#55625D] font-serif italic">
                  Fig. 1 — 순천만 청정 갯벌에서 채취한 제철 꼬막무침과 꼬막비빔밥 정식 상차림
                </figcaption>
              </figure>

              <div className="lg:col-span-6 bg-white border border-[#DCE2DA] rounded-xl p-6 md:p-8 flex flex-col justify-between">
                <div className="divide-y divide-[#E7ECE6]">
                  {CULINARY_SPECIALTIES.map((food) => (
                    <article key={food.id} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#55625D] mb-1.5">
                        <span>{food.area}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{food.season}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-[#14211D]">
                        {food.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#44524D] leading-relaxed">
                        {food.description}
                      </p>
                      <p className="mt-2 text-xs text-[#164E3B]">
                        추천 팁: {food.tastingNote}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Practical Transit & Guide Request */}
        <section
          id="guide"
          className="border-t border-[#E2E6DF] bg-white py-16 md:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs font-medium text-[#164E3B] mb-2">05. 오시는 길 및 여행 안내</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#14211D] tracking-tight">
                    순천으로 향하는 가장 편안한 방법
                  </h2>
                  <p className="mt-3 text-[15px] text-[#44524D] leading-relaxed">
                    전라선 KTX와 순천역 앞 시내버스·시티투어 노선이 촘촘하게 연결되어 있어 뚜벅이 여행자도 주요 생태·역사 명소를 편리하게 오갈 수 있습니다.
                  </p>
                </div>

                <dl className="divide-y divide-[#E7ECE6] border-y border-[#E7ECE6] text-sm">
                  <div className="py-4 flex items-start gap-3.5">
                    <Train className="w-5 h-5 text-[#164E3B] shrink-0 mt-0.5" />
                    <div>
                      <dt className="font-medium text-[#14211D]">KTX · SRT 철도 (순천역)</dt>
                      <dd className="mt-1 text-[#4A5853] tabular-nums">
                        용산역 기준 약 2시간 30분 · 수서역 기준 약 2시간 20분 소요. 역 광장 앞 버스정류장에서 국가정원·순천만 방면 바로 탑승 가능.
                      </dd>
                    </div>
                  </div>

                  <div className="py-4 flex items-start gap-3.5">
                    <Bus className="w-5 h-5 text-[#164E3B] shrink-0 mt-0.5" />
                    <div>
                      <dt className="font-medium text-[#14211D]">순천 시티투어 &amp; 스카이큐브</dt>
                      <dd className="mt-1 text-[#4A5853] tabular-nums">
                        순천역 출발 순환형·테마형 시티투어 매일 운행(월요일 휴무). 국가정원–순천만 구간은 스카이큐브(약 10분) 연계 이용이 가장 빠릅니다.
                      </dd>
                    </div>
                  </div>

                  <div className="py-4 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#164E3B] shrink-0 mt-0.5" />
                    <div>
                      <dt className="font-medium text-[#14211D]">순천만 통합입장권 안내</dt>
                      <dd className="mt-1 text-[#4A5853] tabular-nums">
                        국가정원과 순천만습지는 통합권(성인 10,000원) 1장으로 당일 양쪽 모두 관람할 수 있으며, 순천시민 및 경로·장애인 할인 규정이 적용됩니다.
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="lg:col-span-7">
                <TravelGuideForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#DCE2DA] bg-[#F7F8F5] py-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-serif text-lg font-bold text-[#14211D]">순천여정</span>
            <p className="text-xs text-[#5E6B66]">
              대한민국 생태수도 전라남도 순천시 관광 큐레이션 안내 · 운영 시간 및 입장료는 계절 및 현지 사정에 따라 변동될 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#44524D]">
            <a href="#attractions" className="hover:text-[#14211D] whitespace-nowrap">
              명소 안내
            </a>
            <a href="#seasons" className="hover:text-[#14211D] whitespace-nowrap">
              계절별 매력
            </a>
            <a href="#courses" className="hover:text-[#14211D] whitespace-nowrap">
              추천 코스
            </a>
            <a href="#culinary" className="hover:text-[#14211D] whitespace-nowrap">
              미식 · 특산
            </a>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="text-[#164E3B] hover:underline whitespace-nowrap"
            >
              내 일정 열기
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Drawers */}
      <SpotDetailModal
        spot={activeSpot}
        isInItinerary={activeSpot ? savedSpotIds.has(activeSpot.id) : false}
        onToggleItinerary={toggleItinerarySpot}
        onClose={() => setActiveSpotId(null)}
      />

      <ItineraryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        stops={savedStops}
        onMoveStop={handleMoveStop}
        onToggleDay={handleToggleDay}
        onRemoveStop={handleRemoveStop}
        onClearAll={handleClearAll}
        onLoadDefaultCourse={() => applyCourseToItinerary(CURATED_COURSES[0].id)}
        onSelectSpot={(spotId) => {
          setIsDrawerOpen(false);
          setActiveSpotId(spotId);
        }}
      />
    </div>
  );
}
