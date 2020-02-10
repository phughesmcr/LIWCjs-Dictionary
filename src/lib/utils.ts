'use strict';

export const escape = (str: string): string => str.replace(/[\/^$+?.()|\[\]{}-]/g, '\\$&');
export const makeRegExp = (str: string): RegExp =>
  new RegExp(
    '^' +
      escape(
        str
          .replace('(', '')
          .replace(')', '')
          .replace('*', '\\S*')
      ) +
      '$'
  );
