import { useEffect, useState } from 'react';
import { X, ArrowUp, ArrowDown, Trash2, Copy, Check, Compass } from 'lucide-react';
import { ATTRACTIONS } from '../data/suncheonData';

export interface SavedStop {
  spotId: string;
  day: 1 | 2;
}

interface ItineraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stops: SavedStop[];
  onMoveStop: (index: number, direction: 'up' | 'down') => void;
  onToggleDay: (index: number) => void;
  onRemoveStop: (spotId: string) => void;
  onClearAll: () => void;
  onLoadDefaultCourse: () => void;
  onSelectSpot: (spotId: string) => void;
}

export function ItineraryDrawer({
  isOpen,
  onClose,
  stops,
  onMoveStop,
  onToggleDay,
  onRemoveStop,
  onClearAll,
  onLoadDefaultCourse,
  onSelectSpot,
}: ItineraryDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resolvedStops = stops
    .map((stop) => {
      const spot = ATTRACTIONS.find((a) => a.id === stop.spotId);
      return spot ? { ...stop, spot } : null;
    })
    .filter((item): item is { spotId: string; day: 1 | 2; spot: (typeof ATTRACTIONS)[number] } => item !== null);

  const totalMinutes = resolvedStops.reduce((sum, item) => sum + item.spot.recommendedDurationMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const handleCopyItinerary = async () => {
    const lines = resolvedStops.map(
      (item, idx) =>
        `${idx + 1}. [${item.day}일차] ${item.spot.name} (권장 ${item.spot.recommendedDurationMinutes}분) — ${item.spot.address}`
    );
    const text = `[순천여정] 나의 순천 여행 일정\n\n${lines.join('\n')}\n\n총 예상 체류 시간: 약 ${totalHours}시간 ${remainingMinutes}분`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="itinerary-drawer-title"
    >
      <aside
        className="w-full max-w-md h-full bg-[#FFFFFF] border-l border-[#DCE2DA] shadow-2xl flex flex-col text-[#14211D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7ECE6]">
          <div>
            <h2 id="itinerary-drawer-title" className="font-serif text-xl font-semibold text-[#14211D]">
              나만의 순천 일정
            </h2>
            <p className="text-xs text-[#55625D] mt-0.5 tabular-nums">
              {resolvedStops.length > 0
                ? `총 ${resolvedStops.length}곳 선택 · 예상 관람 ${totalHours}시간 ${remainingMinutes}분`
                : '아직 담긴 명소가 없습니다'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="일정 서랍 닫기"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#3D4B45] hover:bg-[#EEF2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164E3B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {resolvedStops.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <Compass className="w-10 h-10 text-[#6B7E76] mb-4" strokeWidth={1.5} />
              <p className="font-serif text-lg font-medium text-[#14211D] mb-2">
                원하는 순천 명소를 담아보세요
              </p>
              <p className="text-sm text-[#55625D] leading-relaxed mb-6">
                명소 카드에서 일정을 추가하거나, 추천 당일치기 코스를 바로 불러와 순서를 조정할 수 있습니다.
              </p>
              <button
                type="button"
                onClick={onLoadDefaultCourse}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap"
              >
                당일치기 추천 코스 담기
              </button>
            </div>
          ) : (
            <ol className="divide-y divide-[#E7ECE6]">
              {resolvedStops.map((item, idx) => (
                <li key={item.spot.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#55625D] mb-1">
                        <span className="font-mono tabular-nums font-medium text-[#164E3B]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <button
                          type="button"
                          onClick={() => onToggleDay(idx)}
                          className="text-xs font-medium text-[#164E3B] hover:underline focus-visible:outline-2 focus-visible:outline-[#164E3B] whitespace-nowrap"
                          title="클릭하여 1일차/2일차 전환"
                        >
                          {item.day}일차
                        </button>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.spot.recommendedDurationMinutes}분 권장</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectSpot(item.spot.id)}
                        className="text-left font-serif text-base font-semibold text-[#14211D] hover:text-[#164E3B] transition-colors truncate block w-full"
                      >
                        {item.spot.name}
                      </button>
                      <p className="text-xs text-[#55625D] mt-1 truncate">{item.spot.transitFromStation}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onMoveStop(idx, 'up')}
                        disabled={idx === 0}
                        aria-label={`${item.spot.name} 위로 이동`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[#4A5853] hover:bg-[#EEF2ED] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoveStop(idx, 'down')}
                        disabled={idx === resolvedStops.length - 1}
                        aria-label={`${item.spot.name} 아래로 이동`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[#4A5853] hover:bg-[#EEF2ED] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveStop(item.spot.id)}
                        aria-label={`${item.spot.name} 일정에서 제거`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[#64716C] hover:text-[#991B1B] hover:bg-[#FEE2E2]/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        {resolvedStops.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E7ECE6] bg-[#F7F8F5] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="px-4 py-2.5 text-sm font-medium text-[#4A5853] hover:text-[#14211D] hover:bg-[#E7ECE6] rounded-lg transition-colors whitespace-nowrap"
            >
              전체 비우기
            </button>
            <button
              type="button"
              onClick={handleCopyItinerary}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>일정 복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>일정 텍스트 복사</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
