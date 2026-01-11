/**
 * Find Unnamed Providers Script
 * 
 * Scans counties.json for providers labeled "Local ISP #XXXXXX"
 * and outputs a research-ready list with geographic context.
 * 
 * Usage: node scripts/find-unnamed-providers.js
 */

const fs = require('fs');
const path = require('path');

async function main() {
    const dataPath = path.join(__dirname, '..', 'data', 'counties.json');

    if (!fs.existsSync(dataPath)) {
        console.error('❌ counties.json not found. Run seed-data.js first.');
        process.exit(1);
    }

    console.log('📂 Reading counties.json...');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Extract all unnamed providers with their context
    const unnamedProviders = new Map();

    for (const county of data.counties) {
        const match = county.topProvider.match(/^Local ISP #(\d+)$/);
        if (match) {
            const providerId = match[1];
            if (!unnamedProviders.has(providerId)) {
                unnamedProviders.set(providerId, {
                    id: providerId,
                    counties: [],
                    states: new Set()
                });
            }
            const provider = unnamedProviders.get(providerId);
            provider.counties.push({
                county: county.county,
                state: county.state,
                fips: county.fips
            });
            provider.states.add(county.state);
        }
    }

    // Sort by frequency (providers appearing in most counties first)
    const sorted = [...unnamedProviders.values()]
        .sort((a, b) => b.counties.length - a.counties.length);

    console.log(`\n📊 Found ${sorted.length} unnamed providers\n`);

    // Generate output
    const output = {
        generatedAt: new Date().toISOString(),
        totalUnnamed: sorted.length,
        providers: sorted.map(p => ({
            id: p.id,
            frequency: p.counties.length,
            states: [...p.states].sort(),
            sampleCounties: p.counties.slice(0, 5).map(c => `${c.county}, ${c.state}`)
        }))
    };

    // Write JSON output
    const outputPath = path.join(__dirname, '..', 'data', 'unnamed-providers.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`📁 Output: ${outputPath}`);

    // Console summary
    console.log('\n🏢 Top 30 Unnamed Providers (by frequency):');
    console.log('─'.repeat(80));

    sorted.slice(0, 30).forEach((p, i) => {
        const stateList = [...p.states].sort().join(', ');
        const sampleCounty = p.counties[0];
        console.log(`${String(i + 1).padStart(2)}. ID: ${p.id.padEnd(7)} | ${String(p.counties.length).padStart(3)} counties | States: ${stateList.substring(0, 40)}`);
        console.log(`    Sample: ${sampleCounty.county}, ${sampleCounty.state}`);
    });

    console.log('\n✅ Full list saved to unnamed-providers.json');
    console.log('   Use these IDs to search: "FCC provider ID [NUMBER]" or "[County], [State] ISP"');

    return output;
}

main().catch(console.error);
