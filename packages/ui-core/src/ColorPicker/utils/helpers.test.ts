import { isLightColor, mergeWithDefaults, sizeMap } from './helpers';
import { DEFAULT_COLOR_PICKER_PROPS } from '../constants/defaults';
import { ColorPickerProps } from '../types';

describe('helpers', () => {
  describe('isLightColor', () => {
    it('returns true for light colors', () => {
      expect(isLightColor('#ffffff')).toBe(true);
      expect(isLightColor('#ffff00')).toBe(true);
      expect(isLightColor('#00ffff')).toBe(true);
    });

    it('returns false for dark colors', () => {
      expect(isLightColor('#000000')).toBe(false);
      expect(isLightColor('#0000ff')).toBe(false);
      expect(isLightColor('#800080')).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isLightColor(undefined)).toBe(false);
    });

    it('returns false for invalid hex colors', () => {
      expect(isLightColor('invalid')).toBe(false);
      expect(isLightColor('#zzz')).toBe(false);
      expect(isLightColor('#12')).toBe(false);
    });

    it('handles hex colors without # prefix', () => {
      expect(isLightColor('ffffff')).toBe(true);
      expect(isLightColor('000000')).toBe(false);
    });
  });

  describe('mergeWithDefaults', () => {
    it('merges props with defaults', () => {
      const props: ColorPickerProps = {
        colors: [],
      };
      const result = mergeWithDefaults(props);
      expect(result).toEqual({
        ...DEFAULT_COLOR_PICKER_PROPS,
        colors: [],
      });
    });

    it('overrides defaults with provided props', () => {
      const props: ColorPickerProps = {
        colors: [],
        variant: 'pill',
        size: 'large',
      };
      const result = mergeWithDefaults(props);
      expect(result.variant).toBe('pill');
      expect(result.size).toBe('large');
    });
  });

  describe('sizeMap', () => {
    it('has correct size mappings', () => {
      expect(sizeMap.small).toBe(24);
      expect(sizeMap.medium).toBe(32);
      expect(sizeMap.large).toBe(40);
    });
  });
});
