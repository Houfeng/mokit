import meta from './meta';
import Error from '../common/error';

export default function (template) {
  if (!template) {
    throw new Error('Invalid template');
  }
  return meta({ template });
}