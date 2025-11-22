import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testDatabase(): Promise<void> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        console.log('🔄 Connecting to database...');
        await connection.connect();
        console.log('✅ Connected successfully!');

        console.log('\n🔍 Testing queries...');

        // Test 1: Check tables exist
        const [tables] = await connection.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = ? 
      ORDER BY table_name;
    `, [process.env.DB_NAME]);
        console.log('📋 Tables found:', (tables as any[]).map(r => r.TABLE_NAME));

        // Test 2: Count questions
        const [questionsResult] = await connection.query('SELECT COUNT(*) as count FROM questions;');
        console.log('❓ Questions in database:', (questionsResult as any[])[0].count);

        // Test 3: Get a sample question
        const [sampleResult] = await connection.query('SELECT * FROM questions LIMIT 1;');
        console.log('📝 Sample question:', (sampleResult as any[])[0]);

        console.log('\n✅ All tests passed! Database is working correctly.');

    } catch (error) {
        console.error('❌ Database error:', (error as Error).message);
        console.error('Full error:', error);
    } finally {
        await connection.end();
        console.log('👋 Connection closed');
    }
}

testDatabase();