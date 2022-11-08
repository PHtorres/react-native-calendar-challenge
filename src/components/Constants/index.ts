import { Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { PixelRatio } from 'react-native';


const getScreenHeight = (): number => {
  if (Platform.OS === 'ios') return Dimensions.get('window').height;

  return Dimensions.get('screen').height !== Dimensions.get('window').height &&
    (StatusBar.currentHeight || 0) > 24
    ? Dimensions.get('screen').height - (StatusBar.currentHeight || 0)
    : Dimensions.get('window').height;
}

export const STATUS_BAR_HEIGHT = getStatusBarHeight(false);
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = getScreenHeight();
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const ORIGIN_PHONE_DIMENSIONS = {
  width: 320,
  height: 680,
};

type sizeProps = {
  origin_size: number;
  destination_size: number;
  size: number;
};

const scale = ({
  origin_size,
  destination_size,
  size,
}: sizeProps): number => {
  return PixelRatio.roundToNearestPixel(
    (size / origin_size) * destination_size,
  );
};

export const scaledSize = (size: number) =>
  scale({
    destination_size: SCREEN_WIDTH,
    origin_size: ORIGIN_PHONE_DIMENSIONS.width,
    size,
  });


export const CALENDAR_MONTH_CONTAINER_HEIGHT = scaledSize(210);
export const MONTH_DAY_BOX_HEIGHT = scaledSize(30);

export const COLOR_PICKER_LIST_ROW_HEIGHT = scaledSize(50);
export const COLOR_PICKER_BOX_HEIGHT = COLOR_PICKER_LIST_ROW_HEIGHT - scaledSize(10);

export const REMINDER_CARD_HEIGHT = scaledSize(50);
export const REMINDER_CARD_DAY_SLOT_WIDTH = scaledSize(42);

export const TIME_PICKER_LIST_ROW_HEIGHT = scaledSize(50);
export const TIME_PICKER_NUMBER_BOX_HEIGHT = TIME_PICKER_LIST_ROW_HEIGHT - scaledSize(10);