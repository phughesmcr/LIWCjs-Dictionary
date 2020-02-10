'use strict';

import { DictionaryParserResult } from './interfaces';
import { Category } from './category';
import { Value } from './value';

const extractID = (n: number | string): number => {
  // tslint:disable-next-line: ban
  if (typeof n === 'string') n = parseInt(n, 10);
  if (Number.isNaN(n)) {
    throw new Error(`Could not convert category id "${n}" to number.`);
  }
  return n;
};

const extractName = (str: string): string => {
  if (/[^a-zA-Z0-9]/.test(str)) {
    throw new Error(`Invalid category name "${str}".`);
  }
  return str;
};

const extractDescription = (str?: string): string | undefined => {
  if (!str) return undefined;
  let description;
  description = str;
  if (description.charAt(0) === '(') {
    const brackets = str.match(/\(([^)]+)\)/);
    description = brackets?.length ? brackets[1] : str;
  }
  return description;
};

export const parseDictionary = (str: string, locale?: string): DictionaryParserResult => {
  const result: DictionaryParserResult = {
    categories: {},
    values: [],
    counts: {
      categories: 0,
      values: 0,
    },
  };

  // split data into lines
  const lines = str.split(/\r|\n|\r\n/g);

  // ensure correct start of data
  if (lines[0] !== '%') {
    throw new Error(`Expected "%" on first line of dictionary. Found "${lines[0]}".`);
  }

  /** hierarchy object for category parent / child relationships */
  const hierarchy: { [key: number]: number } = {};

  /** 1 = categories, 2 = values */
  let mode = 0;

  // id incrementor for category separator rows
  let separator = 0;

  // loop through every line of the data
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // handle mode markers
    if (line === '%') {
      mode += 1;
      continue;
    }

    // split row into tabs
    let row = line.split('\t');

    // parse categories
    if (mode === 1) {
      // handle parent / child hierarchy
      const level = row.findIndex((str) => str !== '');

      // remove empty elements from start of row
      row.splice(0, level);

      // ensure row still has elements
      if (!row.length || !row[0]) continue;

      if (/^\D/.test(row[0])) {
        separator -= 1;
        row = [separator.toString(), row[0]];
      }

      const id = extractID(row[0]);
      const text = row[1].split(' ');
      const name = extractName(text[0]);
      text.shift();
      const description = extractDescription(text.join(' '));

      // create category
      const category = new Category(id, name, description);
      // handle parent / child relationship
      hierarchy[level] = id;
      if (level >= 1) {
        const parentID = hierarchy[level - 1];
        const parentCategory = result.categories[parentID];
        category.setParent(parentCategory.id);
        result.categories[parentID].addChild(category);
      }
      // add to result object
      result.categories[id] = category;
      result.counts.categories += 1;
    }

    // parse values
    else if (mode === 2) {
      const value = row.shift();
      if (!value) continue;
      const categories = [];
      for (let c = 0; c < row.length; c++) {
        // tslint:disable-next-line: ban
        const category = parseInt(row[c], 10);
        if (Number.isNaN(category)) {
          throw new Error(`Invalid value category "${category}".`);
        }
        categories.push(category);
      }
      result.values.push(new Value(value, categories));
      result.counts.values += 1;
    }
  }

  // ensure correct number of mode changes
  if (mode <= 1 || mode > 2) {
    throw new Error('Invalid dictionary file.');
  }

  // returns { categories: {}, values: {}} shaped object
  return result;
};
