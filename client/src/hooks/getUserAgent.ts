import {UserAgent} from "../utils/types/ResponseTypes";

export const getUserAgent = () => {
  const [isMobile, isTablet] = [
    /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
      navigator.userAgent.toLowerCase()
    ),
    /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
      navigator.userAgent.toLowerCase()
    ),
  ];

  if (isMobile && !isTablet) {
    return UserAgent.Mobile;
  } else if (!isMobile && isTablet) {
    return UserAgent.Tablet;
  } else {
    return UserAgent.Desktop;
  }
};