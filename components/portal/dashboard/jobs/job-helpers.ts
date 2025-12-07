import { Job } from '@/data/mockDatabase';

/**
 * Calculates the total estimated payout for an interpreting job based on its detailed rates.
 * @param job The job object.
 * @returns The total payout as a number, or null if it's not a calculable interpreting job.
 */
export const getInterpretingJobPayout = (job: Job): number | null => {
    const details = getInterpretingJobPayoutDetails(job);
    return details ? details.total : null;
};


/**
 * Returns a detailed breakdown of an interpreting job's payout.
 * @param job The job object.
 * @returns An object with detailed pay components, or null.
 */
export const getInterpretingJobPayoutDetails = (job: Job) => {
    if (job.category !== 'Interpreting' || typeof job.hourlyRate !== 'number') {
        return null;
    }

    let hours = 0;
    if (job.duration) {
        const hoursMatch = job.duration.match(/(\d+(?:\.\d+)?)\s*h/);
        const minutesMatch = job.duration.match(/(\d+)\s*m/);
        if (hoursMatch) hours += parseFloat(hoursMatch[1]);
        if (minutesMatch) hours += parseInt(minutesMatch[1]) / 60;
    }

    const sessionPay = hours * job.hourlyRate;
    const mileagePay = (job.distance || 0) * (job.mileageRate || 0);
    const travelPay = (job.travelHours || 0) * (job.travelRate || 0);
    
    // Remote jobs should not have mileage or travel pay
    const isRemote = job.type === 'Video' || job.type === 'Telephone';
    const total = isRemote ? sessionPay : sessionPay + mileagePay + travelPay;

    return {
        hours,
        sessionPay,
        mileagePay: isRemote ? 0 : mileagePay,
        travelPay: isRemote ? 0 : travelPay,
        total,
    };
};

/**
 * Calculates the definitive payout for any job type from its base attributes.
 * This function does not rely on a pre-calculated `totalPayout` field, making it reliable for on-the-fly calculations.
 * @param job The job object.
 * @returns The calculated total payout as a number.
 */
export const calculateJobPayout = (job: Job): number => {
    switch (job.category) {
        case 'Interpreting': {
            const payoutDetails = getInterpretingJobPayoutDetails(job);
            const total = payoutDetails ? payoutDetails.total : 0;
            return parseFloat(total.toFixed(2));
        }

        case 'Translation': {
            if (typeof job.fixedRate === 'number' && job.fixedRate > 0) {
                return parseFloat(job.fixedRate.toFixed(2));
            }
            const wordCount = job.wordCount || 0;
            const wordRate = job.wordRate || 0;
            const total = wordCount * wordRate;
            return parseFloat(total.toFixed(2));
        }

        case 'Transcription': {
            // The duration string can be "45 mins audio", "45m", or just "45" from an input
            const durationMatch = job.duration?.match(/(\d+)/);
            const minutes = durationMatch ? parseInt(durationMatch[1], 10) : 0;
            const minuteRate = job.minuteRate || 0;
            const total = minutes * minuteRate;
            return parseFloat(total.toFixed(2));
        }

        default: {
            // Fallback for simple fixed rates from the summary string
            if (job.rate) {
                const rateNum = parseFloat(job.rate.replace(/[^0-9.]/g, ''));
                if (!isNaN(rateNum)) {
                    return rateNum;
                }
            }
            return 0;
        }
    }
};
