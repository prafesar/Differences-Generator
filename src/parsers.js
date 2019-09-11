import yaml from 'js-yaml';
import ini from 'ini';

const parseActions = {
  '.json': JSON.parse,
  '.ini': ini.parse,
  '.yaml': yaml.load,
};

export default (content, ext) => parseActions[ext](content);
