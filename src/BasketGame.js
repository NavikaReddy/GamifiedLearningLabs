import { Unity, useUnityContext } from "react-unity-webgl";
import "./App.css";
function BasketGame() {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl:
      "basketGame/Build/PBL.loader.js",
    dataUrl: "basketGame/Build/PBL.data",
    frameworkUrl:
      "basketGame/Build/PBL.framework.js",
    codeUrl: "basketGame/Build/PBL.wasm",
  });

  return (
    <div className="game-container">
      {isLoaded ? (
        <h3 className="heading-text">TEST your DSA😎</h3>
      ) : (
        <h3 className="heading-text">Please wait loading the game..</h3>
      )}
      <Unity
        style={{ height: '100vh', width: '100vw' }}
        unityProvider={unityProvider}
      />
    </div>
  );
}

export default BasketGame;