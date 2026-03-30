'use client';

import { useState, useEffect } from 'react';

export default function SeedButtons() {
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check if data exists on mount
  useEffect(() => {
    checkDataExists();
  }, []);

  async function checkDataExists() {
    try {
      const response = await fetch('/api/data-status');
      const data = await response.json();
      setHasData(data.hasData);
    } catch (err) {
      console.error('Error checking data:', err);
      setHasData(false);
    } finally {
      setIsChecking(false);
    }
  }

  async function insertSampleData() {
    setLoading(true);
    try {
      const response = await fetch('/api/seed', { method: 'POST' });
      if (response.ok) {
        setHasData(true);
        // Optionally trigger a page reload to see updated data
        window.location.reload();
      } else {
        alert('Failed to insert sample data');
      }
    } catch (err) {
      console.error('Error inserting data:', err);
      alert('Error inserting sample data');
    } finally {
      setLoading(false);
    }
  }

  async function deleteSampleData() {
    if (!confirm('Are you sure you want to delete all sample data?')) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/seed', { method: 'DELETE' });
      if (response.ok) {
        setHasData(false);
        // Optionally trigger a page reload to see updated data
        window.location.reload();
      } else {
        alert('Failed to delete sample data');
      }
    } catch (err) {
      console.error('Error deleting data:', err);
      alert('Error deleting sample data');
    } finally {
      setLoading(false);
    }
  }

  async function randomiseSampleData() {
    setLoading(true);
    try {
      const response = await fetch('/api/seed', { method: 'PATCH' });
      if (response.ok) {
        // Trigger a page reload to see randomised data
        window.location.reload();
      } else {
        alert('Failed to randomise sample data');
      }
    } catch (err) {
      console.error('Error randomising data:', err);
      alert('Error randomising sample data');
    } finally {
      setLoading(false);
    }
  }

  if (isChecking) {
    return (
      <div className="flex gap-2">
        <div className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md text-sm font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {!hasData ? (
        <button
          onClick={insertSampleData}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md text-sm font-medium transition-colors"
        >
          {loading ? 'Inserting...' : 'Insert sample data'}
        </button>
      ) : (
        <>
          <button
            onClick={deleteSampleData}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-md text-sm font-medium transition-colors"
          >
            {loading ? 'Deleting...' : 'Delete sample data'}
          </button>
          <button
            onClick={randomiseSampleData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md text-sm font-medium transition-colors"
          >
            {loading ? 'Randomising...' : 'Randomise order data'}
          </button>
        </>
      )}
    </div>
  );
}
