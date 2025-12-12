const STORAGE_KEY = "zen-qdeck:v1";

const App = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const [randomPool, setRandomPool] = React.useState(
    () => [...RANDOM_QUESTIONS].sort(() => Math.random() - 0.5)
  );

  const getRandomQuestion = () => {
    if (randomPool.length === 0) {
      const reshuffled = [...RANDOM_QUESTIONS].sort(() => Math.random() - 0.5);
      setRandomPool(reshuffled.slice(1));
      return reshuffled[0];
    }
    const [next, ...rest] = randomPool;
    setRandomPool(rest);
    return next;
  };

  const generateNextQuestion = (index) =>
    index < INTRO_QUESTIONS.length
      ? INTRO_QUESTIONS[index]
      : getRandomQuestion();

  const startGame = () => {
    setHistory([INTRO_QUESTIONS[0]]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const goNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      const q = generateNextQuestion(history.length);
      setHistory(h => [...h, q]);
      setCurrentIndex(i => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const exitGame = () => {
    setIsPlaying(false);
    setHistory([]);
    setCurrentIndex(-1);
  };

  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "Enter") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, history]);

  return !isPlaying ? (
    <TitleScreen onStart={startGame} />
  ) : (
    <GameScreen
      currentQuestion={history[currentIndex]}
      onNext={goNext}
      onPrev={goPrev}
      canGoBack={currentIndex > 0}
      onExit={exitGame}
    />
  );
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
