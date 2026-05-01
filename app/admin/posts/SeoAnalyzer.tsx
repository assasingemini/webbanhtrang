'use client';

import { useState, useEffect } from 'react';
import { SeoData, analyzeSeo, SeoCheck } from './seoHelpers';
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface SeoAnalyzerProps {
  data: SeoData;
}

export default function SeoAnalyzer({ data }: SeoAnalyzerProps) {
  const [checks, setChecks] = useState<SeoCheck[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Debounce the analysis
    const timer = setTimeout(() => {
      const results = analyzeSeo(data);
      setChecks(results);
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [data]);

  // Group checks
  const categories = {
    basic: { title: 'Basic SEO', items: checks.filter(c => c.category === 'basic') },
    additional: { title: 'Additional', items: checks.filter(c => c.category === 'additional') },
    title: { title: 'Title Readability', items: checks.filter(c => c.category === 'title') },
    content: { title: 'Content Readability', items: checks.filter(c => c.category === 'content') },
  };

  const calculateScore = (items: SeoCheck[]) => {
    if (items.length === 0) return { text: 'Không xác định', color: 'bg-gray-100 text-gray-500' };
    const errors = items.filter(i => i.status === 'error').length;
    const warnings = items.filter(i => i.status === 'warning').length;
    if (errors > 0 || items.length === 0) return { text: `${errors} Error${errors > 1 ? 's' : ''}`, color: 'bg-red-100 text-red-600' };
    if (warnings > 0) return { text: `${warnings} Warning${warnings > 1 ? 's' : ''}`, color: 'bg-orange-100 text-orange-600' };
    return { text: 'All Good', color: 'bg-green-100 text-green-600' };
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'good') return <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />;
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />;
    return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />;
  };

  if (!data.seoKeyword) {
    return (
      <div className="mt-6 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <h3 className="text-lg font-medium text-gray-900 border-l-4 border-blue-500 pl-3">Phân Tích SEO</h3>
          {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </div>
        
        {isExpanded && (
           <div className="p-5 bg-yellow-50 text-yellow-800 flex flex-col md:flex-row items-center gap-4">
             <AlertTriangle className="w-10 h-10 text-yellow-500 flex-shrink-0" />
             <div>
                 <h4 className="font-semibold text-lg mb-1">Thiếu Từ Khóa SEO</h4>
                 <p className="text-sm">Vui lòng nhập <strong>Từ khóa SEO (Focus Keyword)</strong> ở ô thông tin phía trên để hệ thống bắt đầu chấm điểm bài viết.</p>
             </div>
           </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-lg font-medium text-gray-900 border-l-4 border-blue-500 pl-3">Phân Tích SEO (Real-time)</h3>
        {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>

      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {Object.entries(categories).map(([key, category]) => {
            if (category.items.length === 0) return null;
            const score = calculateScore(category.items);

            return (
              <div key={key} className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="font-semibold text-gray-800 text-base">{category.title}</h4>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium shadow-sm ${score.color}`}>
                    {score.text}
                  </span>
                </div>
                
                <ul className="space-y-3.5 pl-1">
                  {category.items.map((item) => (
                    <li key={item.id} className="flex items-start gap-3.5 text-[15px] text-gray-700 leading-snug">
                      <StatusIcon status={item.status} />
                      <span dangerouslySetInnerHTML={{ __html: item.text }} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
