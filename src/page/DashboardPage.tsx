import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { User } from 'lucide-react';

interface Report {
  id?: string | number;
  location?: string;
  audioUrls?: string[];
  photoUrls?: string[];
  videoUrls?: string[];
  additionalNotes?: string;
}

function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://4d0c92d0ml.execute-api.us-east-1.amazonaws.com/v1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page: '1', pageSize: '5' }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const parsedData = JSON.parse(data.body);
        // Map API fields to our Report interface
        const mappedReports: Report[] = (parsedData.data || []).map((item: any) => ({
          id: item.id,
          location: item.location,
          audioUrls: item.audio_urls,
          photoUrls: item.photo_urls,
          videoUrls: item.video_urls,
          additionalNotes: item.additional_notes,
        }));
        setReports(mappedReports);
      } catch (err) {
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <img src="/Frame 1000003741 (1).svg" alt="Logo" style={{ height: 60, paddingLeft: 20 }} />
        </div>
        <div className="portal-title">Raksha Portal</div>
        <div className="user-profile">
          <User size={24} color="#667085" />
        </div>
      </div>
      {/* Table Container */}
      <div className="table-container">
        <div className="reports-header">
          <h2 className="reports-title">Reports List</h2>
          <p className="reports-subtitle">All the new reports will be updated here</p>
          <button className="filters-button">
            <span>Filters</span>
          </button>
        </div>
        <div className="table-wrapper">
          {loading ? (
            <div style={{ padding: 24 }}>Loading...</div>
          ) : error ? (
            <div style={{ padding: 24, color: 'red' }}>{error}</div>
          ) : (
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Issue Location</th>
                  <th>Audio</th>
                  <th>Uploaded Photo</th>
                  <th>Uploaded Video</th>
                  <th>Additional Notes</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, idx) => (
                  <tr key={report.id || idx}>
                    <td className="location-cell">
                      <div className="location-info">
                        <div className="location-avatar">
                          <span>P</span>
                          <span>J</span>
                        </div>
                        <span>{report.location || '-'}</span>
                      </div>
                    </td>
                    <td className="audio-cell">
                      <div className="audio-info">
                        {report.audioUrls && report.audioUrls.length > 0 ? (
                          report.audioUrls.map((audio, i) => (
                            <audio key={i} controls style={{ height: 24 }}>
                              <source src={audio} />
                              Your browser does not support the audio element.
                            </audio>
                          ))
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </td>
                    <td className="photos-cell">
                      <div className="photos-grid">
                        {(report.photoUrls && report.photoUrls.length > 0) ? (
                          report.photoUrls.map((photo, index) => (
                            <a key={index} href={photo} target="_blank" rel="noopener noreferrer" className="photo-thumbnail">
                              <img 
                                src={photo} 
                                alt={`Photo ${index + 1}`}
                              />
                            </a>
                          ))
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </td>
                    <td className="video-cell">
                      <div className="video-thumbnail">
                        {(report.videoUrls && report.videoUrls.length > 0) ? (
                          <video width={32} height={32} controls poster={report.photoUrls && report.photoUrls[0]}>
                            <source src={report.videoUrls[0]} />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </td>
                    <td className="notes-cell">
                      {report.additionalNotes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;