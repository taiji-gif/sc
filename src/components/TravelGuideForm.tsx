import { useState, FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function TravelGuideForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [season, setSeason] = useState('가을 · 갈대축제 (10월–11월)');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('성함 또는 별칭을 입력해 주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('올바른 이메일 주소 형식으로 입력해 주세요.');
      return;
    }

    if (!consent) {
      setError('가이드북 발송을 위한 안내 수신 동의가 필요합니다.');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#DCE2DA] rounded-xl p-8 space-y-4">
        <div className="flex items-start gap-3 text-[#164E3B]">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#14211D]">
              순천 여행 가이드 신청이 접수되었습니다
            </h3>
            <p className="mt-2 text-sm text-[#4A5853] leading-relaxed">
              {name}님이 선택하신 <span className="font-medium text-[#14211D]">{season}</span> 맞춤 추천 지도와 순천만 일몰·간조 시간표 안내를{' '}
              <span className="font-mono text-xs text-[#14211D]">{email}</span> 주소로 보내드릴 준비를 마쳤습니다.
            </p>
          </div>
        </div>
        <div className="pt-4 border-t border-[#E7ECE6]">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName('');
              setEmail('');
              setNotes('');
              setConsent(false);
            }}
            className="px-4 py-2 text-sm font-medium text-[#164E3B] bg-[#EEF2ED] hover:bg-[#E2EAE3] rounded-lg transition-colors whitespace-nowrap"
          >
            다른 정보로 다시 신청하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-[#DCE2DA] rounded-xl p-6 md:p-8 space-y-5"
    >
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#14211D]">
          맞춤형 순천 여행 가이드북 신청
        </h3>
        <p className="mt-1.5 text-sm text-[#55625D]">
          계절별 개화·단풍 소식과 순천만 물때(간조·일몰) 안내 리플릿을 이메일로 받아보세요.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 text-sm text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guide-name" className="block text-xs font-medium text-[#303E39] mb-1.5">
            이름
          </label>
          <input
            id="guide-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="김순천"
            className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F5] border border-[#DCE2DA] rounded-lg text-[#14211D] placeholder:text-[#8A9791] focus:outline-none focus:border-[#164E3B] focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label htmlFor="guide-email" className="block text-xs font-medium text-[#303E39] mb-1.5">
            이메일 주소
          </label>
          <input
            id="guide-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="traveler@example.com"
            className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F5] border border-[#DCE2DA] rounded-lg text-[#14211D] placeholder:text-[#8A9791] focus:outline-none focus:border-[#164E3B] focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="guide-season" className="block text-xs font-medium text-[#303E39] mb-1.5">
          방문 예정 시기
        </label>
        <select
          id="guide-season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F5] border border-[#DCE2DA] rounded-lg text-[#14211D] focus:outline-none focus:border-[#164E3B] focus:bg-white transition-colors"
        >
          <option value="봄 · 선암매 & 정원 꽃길 (3월–5월)">봄 · 선암매 &amp; 정원 꽃길 (3월–5월)</option>
          <option value="여름 · 푸른 갈대 & 산사 계곡 (6월–8월)">여름 · 푸른 갈대 &amp; 산사 계곡 (6월–8월)</option>
          <option value="가을 · 갈대축제 & 단풍 (9월–11월)">가을 · 갈대축제 &amp; 단풍 (9월–11월)</option>
          <option value="겨울 · 흑두루미 탐조 & 꼬막 (12월–2월)">겨울 · 흑두루미 탐조 &amp; 꼬막 (12월–2월)</option>
        </select>
      </div>

      <div>
        <label htmlFor="guide-notes" className="block text-xs font-medium text-[#303E39] mb-1.5">
          동행 형태 또는 요청 사항 (선택)
        </label>
        <textarea
          id="guide-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="예: KTX 기차 당일치기, 부모님 동반 무장애 탐방로 정보 등"
          className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F5] border border-[#DCE2DA] rounded-lg text-[#14211D] placeholder:text-[#8A9791] focus:outline-none focus:border-[#164E3B] focus:bg-white transition-colors resize-none"
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="guide-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[#B8C4BC] text-[#164E3B] focus:ring-[#164E3B]"
        />
        <label htmlFor="guide-consent" className="text-xs text-[#55625D] leading-relaxed">
          순천 계절별 여행 리플릿 및 안내 이메일 발송에 동의합니다.
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-[#164E3B] hover:bg-[#113D2E] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164E3B]"
        >
          여행 가이드북 받아보기
        </button>
      </div>
    </form>
  );
}
