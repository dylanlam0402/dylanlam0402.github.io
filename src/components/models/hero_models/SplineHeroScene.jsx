import { Component, useState } from "react";
import Spline from "@splinetool/react-spline";
import HeroExperience from "./HeroExperience";

class SplineHeroErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <HeroExperience />;
    return this.props.children;
  }
}

const SplineHeroScene = () => {
  const [splineError, setSplineError] = useState(false);

  if (splineError) return <HeroExperience />;

  return (
    <SplineHeroErrorBoundary>
      <Spline
        scene="/models/chat_gpt_keyboard.spline"
        onError={() => setSplineError(true)}
        style={{ width: "100%", height: "100%" }}
      />
    </SplineHeroErrorBoundary>
  );
};

export default SplineHeroScene;
