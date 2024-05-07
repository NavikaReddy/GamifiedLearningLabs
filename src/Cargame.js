import { Unity, useUnityContext } from "react-unity-webgl";
function Cargame() {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl:
      "Game_WebGL/Build/Game_WebGL.loader.js",
    dataUrl: "Game_WebGL/Build/Game_WebGL.data",
    frameworkUrl:
      "Game_WebGL/Build/Game_WebGL.framework.js",
    codeUrl: "Game_WebGL/Build/Game_WebGL.wasm",
  });

  return (
    <div className="game-container">
      {isLoaded ? (
        <h3 className="heading-text">Dijkstra Game 😎</h3>
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

export default Cargame;