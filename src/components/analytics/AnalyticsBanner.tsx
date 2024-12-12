import React, { useEffect } from 'react';
import { TrendingUp, Users, Activity, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { useAnalyticsStore } from '../../stores/analyticsStore';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsBanner() {
  const { 
    totalVisits,
    activeUsers,
    trafficData,
    fetchAnalytics,
    isLoading 
  } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  const chartData = {
    labels: trafficData.map(d => format(new Date(d.timestamp), 'HH:mm')),
    datasets: [
      {
        label: 'Visitors',
        data: trafficData.map(d => d.visitors),
        borderColor: 'rgb(217, 119, 6)',
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(217, 119, 6)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      },
      line: {
        borderWidth: 2
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 rounded-lg p-2 animate-pulse">
        <div className="h-6 bg-white/5 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-lg overflow-hidden">
      <div className="flex divide-x divide-gray-700">
        <div className="flex-1 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-300">Total Visits</p>
              <p className="text-sm font-bold text-white">{totalVisits.toLocaleString()}</p>
            </div>
            <div className="p-1 bg-amber-900/50 rounded-lg">
              <TrendingUp className="w-3 h-3 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-300">Active Users</p>
              <p className="text-sm font-bold text-white">{activeUsers}</p>
            </div>
            <div className="p-1 bg-green-900/50 rounded-lg">
              <Users className="w-3 h-3 text-green-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-300">Traffic Trend</p>
              <div className="h-6 w-24">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            <div className="flex items-center text-[10px] text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {format(new Date(), 'HH:mm')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}