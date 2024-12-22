import { seedQuarterAcademicYears } from './quarterAcademicYearSeeder.js';

async function run() {
    try {
        await seedQuarterAcademicYears();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

run();
