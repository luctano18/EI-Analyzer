import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
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
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { JournalEntry, EmotionLog } from '../../lib/supabase';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Emotional Journey Over Time'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      title: {
        display: true,
        text: 'Intensity Level'
      }
    }
  }
};

export default function JourneyDashboard() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [emotionLogs, setEmotionLogs] = useState<EmotionLog[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadJourneyData();
  }, []);

  const loadJourneyData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const [entriesResponse, logsResponse] = await Promise.all([
          supabase
            .from('journal_entries')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('emotion_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })
        ]);

        if (entriesResponse.data) setJournalEntries(entriesResponse.data);
        if (logsResponse.data) setEmotionLogs(logsResponse.data);
      }
    } catch (error) {
      console.error('Error loading journey data:', error);
      toast.error('Failed to load journey data');
    } finally {
      setIsLoading(false);
    }
  };

  const emotionData = {
    labels: emotionLogs.map(log => format(new Date(log.created_at), 'MMM d')),
    datasets: [
      {
        label: 'Emotional Intensity',
        data: emotionLogs.map(log => log.intensity),
        borderColor: 'rgb(217, 119, 6)',
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const exportJourney = async () => {
    if (!dashboardRef.current) return;
    setIsExporting(true);

    try {
      // Configure html2canvas options
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2, // Increase quality
        useCORS: true, // Enable loading cross-origin images
        logging: false, // Disable logging
        backgroundColor: '#ffffff' // Ensure white background
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit the canvas on the page
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the canvas as image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );
      
      // Save the PDF
      pdf.save('emotional-intelligence-journey.pdf');
      toast.success('Journey exported successfully!');
    } catch (error) {
      console.error('Error exporting journey:', error);
      toast.error('Failed to export journey');
    } finally {
      setIsExporting(false);
    }
  };

  const allTags = Array.from(
    new Set(journalEntries.flatMap(entry => entry.tags))
  );

  const filteredEntries = selectedTags.length > 0
    ? journalEntries.filter(entry =>
        selectedTags.some(tag => entry.tags.includes(tag))
      )
    : journalEntries;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div id="journey-dashboard" ref={dashboardRef} className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Your EI Journey</h2>
        <button
          onClick={exportJourney}
          disabled={isExporting}
          className="flex items-center space-x-2 py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{isExporting ? 'Exporting...' : 'Export Journey'}</span>
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Emotional Progress</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          {emotionLogs.length > 0 ? (
            <Line data={emotionData} options={chartOptions} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No emotional logs recorded yet. Start tracking your emotional journey!
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filter by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              )}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <div key={entry.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2">
                  {entry.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(entry.created_at), 'MMM d, yyyy')}
                </span>
              </div>
              <p className="text-gray-700">{entry.content}</p>
              <div className="mt-2 text-sm text-amber-600">
                Feeling: {entry.emotion}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No journal entries found. Start your emotional intelligence journey by sharing your experiences!
          </div>
        )}
      </div>
    </div>
  );
}