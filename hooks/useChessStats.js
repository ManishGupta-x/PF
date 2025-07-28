
import { useState, useEffect } from 'react';

const CACHE_KEY = 'chess_stats_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useChessStats = (username = 'nightmare_22') => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = new Date().getTime();
        
        // Check if cache is still valid (less than 24 hours old)
        if (now - timestamp < CACHE_DURATION) {
          return { data, timestamp };
        }
      }
    } catch (err) {
      console.error('Error reading cache:', err);
    }
    return null;
  };

  const setCachedData = (data) => {
    try {
      const timestamp = new Date().getTime();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp }));
      return timestamp;
    } catch (err) {
      console.error('Error setting cache:', err);
      return new Date().getTime();
    }
  };

  const fetchChessStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch chess stats: ${response.status}`);
      }

      const data = await response.json();
      const timestamp = setCachedData(data);
      
      setStats(data);
      setLastUpdated(new Date(timestamp));
    } catch (err) {
      console.error('Error fetching chess stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check cache first
    const cached = getCachedData();
    
    if (cached) {
      setStats(cached.data);
      setLastUpdated(new Date(cached.timestamp));
      setLoading(false);
    } else {
      // No valid cache, fetch fresh data
      fetchChessStats();
    }
  }, [username]);

  const refreshStats = () => {
    //check if last fetch was more than 24 hours ago
    const cached = getCachedData();
    if (cached && new Date().getTime() - cached.timestamp < CACHE_DURATION) {
      setStats(cached.data);
      setLastUpdated(new Date(cached.timestamp));
      return;
    }
    fetchChessStats();
  };

  return {
    stats,
    loading,
    error,
    lastUpdated,
    refreshStats
  };
};