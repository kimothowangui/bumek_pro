import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local manually
const envPath = join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};

envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value.length > 0) {
        envConfig[key.trim()] = value.join('=').trim();
    }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

console.log('Using URL:', supabaseUrl);
// Don't log the full key for security, but check if it's there
console.log('Service Key starts with:', supabaseKey?.substring(0, 10));

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndAdd() {
    console.log('Checking materials table details...');
    const result = await supabase
        .from('materials')
        .select('*')
        .limit(1);

    if (result.error) {
        console.error('Initial check failed:', result.error);
        if (result.error.code === 'PGRST205') {
            console.log('TIP: This often means the table was just created. Try refreshing the Supabase API cache or wait 1 minute.');
        }
        return;
    }

    console.log('Check succeeded. Items found:', result.data.length);
    console.log('Inserting "Bamburi" material...');

    const { data, error } = await supabase
        .from('materials')
        .insert([
            {
                name: 'Bamburi',
                category: 'Cement',
                price_per_unit: 800,
                unit: 'Bag(11.9Kg)',
                description: 'This is the smaller bag',
                status: 'IN STOCK'
            }
        ])
        .select();

    if (error) {
        console.error('Error adding material:', error);
    } else {
        console.log('Material added successfully:', data);
    }
}

checkAndAdd();
