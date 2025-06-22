async function main() {
    console.log('Upserting to Supabase...');
    try {
      console.log('Done.');
    } catch (error) {
      console.error('Script failed:', error);
      process.exit(1);
    }
  }
  
  main().catch(console.error);
  