
import React from 'react';
import { CheckCircle } from 'lucide-react';

export const JobProcessStepper = ({ status }: { status: string }) => {
  const steps = [
    { label: 'Open', index: 0 },
    { label: 'Active', index: 1 },
    { label: 'Review', index: 2 },
    { label: 'Done', index: 3 }
  ];

  let currentStep = 0;
  if (['Scheduled', 'In Progress'].includes(status)) currentStep = 1;
  else if (['Pending Approval', 'Revision'].includes(status)) currentStep = 2;
  else if (['Completed'].includes(status)) currentStep = 3;
  else if (status === 'Cancelled') currentStep = -1;

  return (
    <div className="w-full max-w-2xl mx-auto px-1 mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const isLast = i === steps.length - 1;

          return (
            <React.Fragment key={i}>
              <div className="relative flex flex-col items-center z-10">
                <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                        ? 'bg-jambo-600 border-jambo-600 text-white shadow-md' 
                        : isCurrent 
                            ? 'bg-white dark:bg-jambo-950 border-jambo-600 text-jambo-600 scale-110 shadow-[0_0_0_4px_rgba(132,27,160,0.15)] dark:shadow-[0_0_0_4px_rgba(132,27,160,0.3)]'
                            : 'bg-white dark:bg-[#13111c] border-gray-200 dark:border-white/10 text-gray-300 dark:text-gray-600'
                    }
                `}>
                    {isCompleted ? (
                        <CheckCircle size={18} className="md:w-6 md:h-6" strokeWidth={3} />
                    ) : (
                        <span className={`text-xs md:text-sm font-bold ${isCurrent ? 'animate-pulse' : ''}`}>{i + 1}</span>
                    )}
                </div>
                
                <div className={`
                    absolute top-11 md:top-14 text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300
                    ${isCurrent || isCompleted ? 'text-jambo-700 dark:text-jambo-400 opacity-100' : 'text-gray-300 dark:text-gray-600'}
                `}>
                    {step.label}
                </div>
              </div>

              {!isLast && (
                  <div className="flex-1 mx-2 md:mx-4 h-[2px] bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden relative">
                      <div className={`absolute left-0 top-0 bottom-0 bg-jambo-600 transition-all duration-700 ease-in-out ${isCompleted ? 'w-full' : 'w-0'}`}></div>
                  </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
