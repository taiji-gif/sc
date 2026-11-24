import { useEffect } from 'react';
import { X, Plus, Check, Clock, MapPin, Train, Ticket } from 'lucide-react';
import { Attraction } from '../data/suncheonData';
import { SafeImage } from './SafeImage';

interface SpotDetailModalProps {
  spot: Attraction | null;
  isInItinerary: boolean;
  onToggleItinerary: (spotId: string) => void;
  onClose: () => void;
}

export function SpotDetailModal({
  spot,
  isInItinerary,
  onToggleItinerary,
  onClose,
}: SpotDetailModalProps) {
  useEffect(() => {
    if (!spot) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spot, onClose]);

  if (!spot) return null;

  const hoursLabel = Math.floor(spot.recommendedDurationMinutes / 60);
  const minsLabel = spot.recommendedDurationMinutes % 60;
  const durationText =
    hoursLabel > 0 && minsLabel > 0
      ? `약 ${hoursLabel}시간 ${minsLabel}분`
      : hoursLabel > 0
        ? `약 ${hoursLabel}시간`
        : `약 ${minsLabel}분`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 md:p-6 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="spot-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#DCE2DA] rounded-xl shadow-xl text-[#14211D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E7ECE6]">
          <div className="flex items-center gap-2 text-xs text-[#55625D] min-w-0">
            <span className="truncate">{spot.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{spot.subtitle}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="상세 창 닫기"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#3D4B45] hover:bg-[#EEF2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164E3B] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {spot.image && (
            <div className="overflow-hidden rounded-lg border border-[#E7ECE6] aspect-[16/9] bg-[#EEF2ED]">
              <SafeImage
                src={spot.image}
                alt={spot.imageAlt || spot.name}
                fallbackTitle={spot.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7ECE6] pb-6">
            <div>
              <h2 id="spot-modal-title" className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-[#14211D]">
                {spot.name}
              </h2>
              <p className="mt-2 text-sm md:text-base text-[#4A5853] leading-relaxed max-w-2xl">
                {spot.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onToggleItinerary(spot.id)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164E3B] ${
                isInItinerary
                  ? 'bg-[#EEF2ED] text-[#164E3B] border border-[#C6D5CA] hover:bg-[#E2EAE3]'
                  : 'bg-[#164E3B] text-white hover:bg-[#113D2E]'
              }`}
            >
              {isInItinerary ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>내 일정에 담김</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>내 일정에 담기</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#14211D]">장소 이야기</h3>
            <p className="text-[15px] leading-[1.75] text-[#303E39]">
              {spot.editorialDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#E7ECE6]">
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#164E3B] mt-0.5 shrink-0" />
                <div>
                  <dt className="text-xs text-[#64716C] mb-0.5">위치</dt>
                  <dd className="text-[#14211D]">{spot.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#164E3B] mt-0.5 shrink-0" />
                <div>
                  <dt className="text-xs text-[#64716C] mb-0.5">운영 시간 · 권장 소요 시간</dt>
                  <dd className="text-[#14211D] tabular-nums">
                    {spot.hours} · {durationText}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ticket className="w-4 h-4 text-[#164E3B] mt-0.5 shrink-0" />
                <div>
                  <dt className="text-xs text-[#64716C] mb-0.5">입장료</dt>
                  <dd className="text-[#14211D] tabular-nums">{spot.admission}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-[#164E3B] mt-0.5 shrink-0" />
                <div>
                  <dt className="text-xs text-[#64716C] mb-0.5">순천역 기준 대중교통</dt>
                  <dd className="text-[#14211D]">{spot.transitFromStation}</dd>
                </div>
              </div>
            </dl>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-[#64716C] mb-2">주요 관람 포인트</h4>
                <ul className="space-y-2.5 text-sm text-[#24322D]">
                  {spot.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#164E3B] tabular-nums mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-[#E7ECE6]">
                <h4 className="text-xs font-medium text-[#64716C] mb-1">추천 방문 시간대</h4>
                <p className="text-sm text-[#14211D]">{spot.bestTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
