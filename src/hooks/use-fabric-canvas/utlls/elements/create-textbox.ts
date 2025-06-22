import { Textbox } from 'fabric';
import { ITexboxConfig } from '@/shared/types/textbox.type';

export function createTextbox(text: string, config: ITexboxConfig) {
  const defaultConfig = {
    left: 0,
    top: 0,
    fontSize: 16,
    fontFamily: 'Arial',
    fill: '#000000',
    selectable: false,
    objectCaching: false,
  };
  const adjustedConfig = Object.assign({}, defaultConfig, config);
  return new Textbox(text, adjustedConfig);
}
