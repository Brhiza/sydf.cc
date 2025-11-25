/**
 * @file src/services/storageService.ts
 * @description A unified service for handling localStorage operations.
 */

class StorageService {
  /**
   * Retrieves an item from localStorage and parses it as JSON.
   * @param key The key of the item to retrieve.
   * @returns The parsed object, or null if the item doesn't exist or is invalid JSON.
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item "${key}" from localStorage`, error);
      return null;
    }
  }

  /**
   * Serializes an object to JSON and saves it to localStorage.
   * @param key The key of the item to save.
   * @param value The object to save.
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting item "${key}" in localStorage`, error);
    }
  }

  /**
   * Removes an item from localStorage.
   * @param key The key of the item to remove.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item "${key}" from localStorage`, error);
    }
  }

  /**
   * Clears all items from localStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}

export const storageService = new StorageService();
