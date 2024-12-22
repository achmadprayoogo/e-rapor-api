import { seedGradeClasses } from './gradeClassSeeder.js';

async function run() {
    try {
        await seedGradeClasses();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

run();
