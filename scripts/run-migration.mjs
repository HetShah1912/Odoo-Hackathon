import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: '.env.local' });

async function migrate() {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set');
        return;
    }

    const sql = neon(process.env.DATABASE_URL);
    const migrationPath = join(process.cwd(), 'scripts', '003_add_recurrence.sql');
    const migrationSql = readFileSync(migrationPath, 'utf8');

    console.log('Applying migration...');
    try {
        await sql(migrationSql);
        console.log('Migration applied successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
