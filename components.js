const Mascot = () => (
  <div className="mascot-wrapper">
    🐧
  </div>
);

const TitleScreen = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center relative">
    <div className="bg-grid"></div>

    <div className="space-y-10 z-10">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
        ZEN-QDeck
      </h1>

      <div className="text-slate-600 font-bold">
        ZEN大学向け質問デッキ
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-4 border-slate-800 shadow-xl text-left space-y-4">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <span className="text-2xl">📖</span> 遊び方
        </h2>
        <ul className="space-y-3 font-bold text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">●</span>
            <span>「スタート」で自己紹介タイム開始</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">●</span>
            <span>クリック or 矢印キーで進む・戻る</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">●</span>
            <span>固定質問後はランダム質問</span>
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="btn-primary px-12 py-6 rounded-2xl text-3xl font-black border-b-8 border-slate-900 active:border-b-0 active:translate-y-2"
      >
        スタート
      </button>
    </div>
  </div>
);

const GameScreen = ({
  currentQuestion,
  onNext,
  onPrev,
  canGoBack,
  onExit
}) => (
  <div
    onClick={onNext}
    className="h-full w-full flex flex-col items-center justify-center relative cursor-pointer select-none"
  >
    <div className="bg-grid"></div>

    {/* 終了ボタン */}
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm("終了しますか？")) onExit();
        }}
        className="bg-white/80 px-5 py-2 rounded-full text-sm font-black text-slate-500 border-2 border-slate-200 shadow-sm"
      >
        終了
      </button>
    </div>

    <div className="flex flex-col items-center">
      <div key={currentQuestion} className="speech-bubble bubble-enter">
        <h2 className="text-3xl md:text-5xl font-black leading-snug">
          {currentQuestion}
        </h2>
      </div>
      <Mascot />
    </div>

    {/* ナビ */}
    <div className="absolute bottom-6 left-6 right-6 flex justify-between">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        disabled={!canGoBack}
        className="btn-nav"
      >
        ← 前へ
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="btn-nav"
      >
        次へ →
      </button>
    </div>
  </div>
);
