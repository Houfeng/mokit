import meta from './meta';
import { Error } from 'common';

export default function (template) {
  if (!template) {
    throw new Error('Invalid template');
  }
  return meta({ template });
}