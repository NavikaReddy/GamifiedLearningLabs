import { Unity, useUnityContext } from "react-unity-webgl";

function DSAQuiz() {
    const { unityProvider, isLoaded } = useUnityContext({
        loaderUrl:
          "BSWebBuild/Build/BSWebBuild.loader.js",
        dataUrl: "BSWebBuild/Build/BSWebBuild.data",
        frameworkUrl:
          "BSWebBuild/Build/BSWebBuild.framework.js",
        codeUrl: "BSWebBuild/Build/BSWebBuild.wasm",
      });
  return (
    <div className="game-container">
      {isLoaded ? (
        <h3 className="heading-text">DSA Quiz😎</h3>
      ) : (
        <h3 className="heading-text">Please wait loading the game..</h3>
      )}
      <Unity
        style={{ height: '100vh', width: '100vw' }}
        unityProvider={unityProvider}
      />
    </div>
  )
}

export default DSAQuiz