import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './IncidentOverlay.css';

const IncidentOverlay = () => {
    const [visibleReports, setVisibleReports] = useState([]);
    const [visibleDecisions, setVisibleDecisions] = useState([]);
    const [lastReportId, setLastReportId] = useState(null);
    const [lastDecisionId, setLastDecisionId] = useState(null);
    const [isVisible, setIsVisible] = useState(false); // Track if overlay is visible

    // Function to fetch incident data
    const fetchIncidentData = useCallback(async () => {
        try {
            // Fetch the incident reports
            const reportResponse = await axios.get('https://api.rfro-1000km.com/incident-report');
            const reports = reportResponse.data;

            // Fetch the incident decisions
            const decisionResponse = await axios.get('https://api.rfro-1000km.com/incident-decision');
            const decisions = decisionResponse.data;

            // Filter and show only new reports since the last fetch
            const newReports = reports.filter(report => report.id !== lastReportId);
            if (newReports.length > 0) {
                setVisibleReports(newReports);
                setLastReportId(newReports[0].id); // Update to the latest report
                setIsVisible(true); // Make the overlay visible
            }

            // Filter and show only new decisions since the last fetch
            const newDecisions = decisions.filter(decision => decision.id !== lastDecisionId);
            if (newDecisions.length > 0) {
                setVisibleDecisions(newDecisions);
                setLastDecisionId(newDecisions[0].id); // Update to the latest decision
                setIsVisible(true); // Make the overlay visible
            }

            // Hide the notifications after 5 seconds
            if (newReports.length > 0 || newDecisions.length > 0) {
                setTimeout(() => {
                    setIsVisible(false); // Hide the overlay after 5 seconds
                }, 5000);
            }

        } catch (error) {
            console.error("Error fetching incident data:", error);
        }
    }, [lastReportId, lastDecisionId]); // Dependencies to track last fetched data

    useEffect(() => {
        // Fetch initially and then every 10 seconds
        fetchIncidentData(); // Fetch immediately on load
        const interval = setInterval(fetchIncidentData, 10000); // Set interval to fetch every 10 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [fetchIncidentData]); // Ensure the effect runs when the callback changes

    return (
        <div className={`overlay-container ${isVisible ? 'visible' : 'hidden'}`}>
            {visibleReports.map((report, index) => (
                <div key={`${report.id}-${index}`} className="incident-box animated-slide-in">
                    Incident involving cars #{report.offending_team} and #{report.defending_team} noted.
                </div>
            ))}

            {visibleDecisions.map((decision, index) => (
                <div key={`${decision.id}-${index}`} className="incident-box animated-slide-in">
                    Incident involving cars #{visibleReports.find(r => r.id === decision.incident_report_id)?.offending_team} and #{visibleReports.find(r => r.id === decision.incident_report_id)?.defending_team} - {decision.penalty_type} for {visibleReports.find(r => r.id === decision.incident_report_id)?.description}.
                </div>
            ))}
        </div>
    );
};

export default IncidentOverlay;