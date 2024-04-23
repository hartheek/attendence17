const {Pool} = require('pg');
const pool =new Pool({
    user: 'postgres.fnnizulajcmvwsmygizj',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    database:'postgres',
    password:'Attendence123@',
    port:'5432',
})
module.exports= {pool};




