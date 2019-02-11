export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const API_URL =
  process.env.API_V === 'production'
    ? 'http://www.recipepuppy.com/api'
    : 'http://www.recipepuppy.com/api';

export const REQUESTED = '_REQUESTED';
export const SUCCEDED = '_SUCCEDED';
export const STARTED = '_STARTED';
export const SKIPPED = '_SKIPPED';
export const FAILED = '_FAILED';
export const ERROR = '_ERROR';
export const CLEAR = '_CLEAR';
