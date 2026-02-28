import { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    const actionType =
      typeof action === 'object' && action !== null && 'type' in action
        ? String((action as { type: unknown }).type)
        : 'unknown';

    console.group(`Action: ${actionType}`);
    console.log('Prev State:', store.getState());
    console.log('Action:', action);
    
    const result = next(action);
    
    console.log('Next State:', store.getState());
    console.groupEnd();
    
    return result;
  }
  
  return next(action);
};